#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Статейник — генератор раздела статей для меньшиков.ai

Читает:   site/stati-src/*.md   (Markdown + фронтматтер: title/description/slug/date, cover опц.)
Пишет:    site/stati/<slug>/index.html  — страница статьи
          site/stati/index.html         — индекс со списком карточек (свежие сверху)

Запуск:   python3 build_stati.py
Без внешних зависимостей (свой мини-парсер Markdown).

Конвенции Markdown:
  - Фронтматтер между `---` в начале файла: key: value
  - Оглавление собирается по H2 автоматически.
  - Fenced-блоки ``` оформляются рамкой «Скопируй это» (промпт-вставка).
    ```code — обычный код-блок без рамки-промпта.
  - Секция `## FAQ` (или H2, содержащий «вопрос»): каждый H3 внутри
    превращается в <details><summary> — аккордеон без JS.
"""

import html
import os
import re
import shutil
import sys

BASE = os.path.dirname(os.path.abspath(__file__))
SRC_DIR = os.path.join(BASE, "stati-src")
OUT_DIR = os.path.join(BASE, "stati")

MONTHS = ["января", "февраля", "марта", "апреля", "мая", "июня",
          "июля", "августа", "сентября", "октября", "ноября", "декабря"]


# ---------------------------------------------------------------- frontmatter

def parse_frontmatter(text):
    # служебные HTML-комментарии конвейера перед фронтматтером — убираем
    text = re.sub(r"^\s*(?:<!--.*?-->\s*)+", "", text, flags=re.S)
    meta, body = {}, text
    if text.lstrip().startswith("---"):
        stripped = text.lstrip()
        parts = stripped.split("---", 2)
        if len(parts) >= 3:
            raw, body = parts[1], parts[2]
            for line in raw.splitlines():
                line = line.strip()
                if not line or line.startswith("#") or ":" not in line:
                    continue
                key, _, val = line.partition(":")
                val = val.strip().strip('"').strip("'")
                meta[key.strip().lower()] = val
    return meta, body.lstrip("\n")


# ------------------------------------------------------------ inline markdown

_CODE_SPAN = re.compile(r"`([^`]+)`")
_BOLD = re.compile(r"\*\*(.+?)\*\*")
_ITALIC = re.compile(r"(?<!\*)\*([^*\n]+)\*(?!\*)")
_IMG = re.compile(r"!\[([^\]]*)\]\(([^)\s]+)\)")
_LINK = re.compile(r"\[([^\]]+)\]\(([^)\s]+)\)")


def inline(text):
    """HTML-экранирование + инлайновый Markdown. Код-спаны защищены от замен."""
    slots = []

    def stash(m):
        slots.append("<code>%s</code>" % html.escape(m.group(1)))
        return "\x00%d\x00" % (len(slots) - 1)

    text = _CODE_SPAN.sub(stash, text)
    text = html.escape(text, quote=False)
    text = _IMG.sub(lambda m: '<img src="%s" alt="%s" loading="lazy">'
                    % (html.escape(m.group(2), quote=True), html.escape(m.group(1), quote=True)), text)
    text = _LINK.sub(lambda m: '<a href="%s">%s</a>'
                     % (html.escape(m.group(2), quote=True), m.group(1)), text)
    text = _BOLD.sub(r"<strong>\1</strong>", text)
    text = _ITALIC.sub(r"<em>\1</em>", text)
    text = re.sub("\x00(\\d+)\x00", lambda m: slots[int(m.group(1))], text)
    return text


# ------------------------------------------------------------- block markdown

def parse_blocks(md):
    """Markdown -> список блоков: (type, payload)."""
    blocks = []
    lines = md.splitlines()
    i, n = 0, len(lines)
    while i < n:
        line = lines[i]

        if not line.strip():
            i += 1
            continue

        # fenced code / prompt
        m = re.match(r"^```(\S*)\s*$", line)
        if m:
            lang = m.group(1).lower()
            buf = []
            i += 1
            while i < n and not lines[i].startswith("```"):
                buf.append(lines[i])
                i += 1
            i += 1  # closing fence
            kind = "code" if lang in ("code", "js", "python", "html", "css", "lua", "bash", "sh", "json") else "prompt"
            blocks.append((kind, "\n".join(buf)))
            continue

        # heading
        m = re.match(r"^(#{1,4})\s+(.*)$", line)
        if m:
            blocks.append(("h%d" % len(m.group(1)), m.group(2).strip()))
            i += 1
            continue

        # hr
        if re.match(r"^\s*(---+|\*\*\*+)\s*$", line):
            blocks.append(("hr", ""))
            i += 1
            continue

        # blockquote
        if line.lstrip().startswith(">"):
            buf = []
            while i < n and lines[i].lstrip().startswith(">"):
                buf.append(re.sub(r"^\s*>\s?", "", lines[i]))
                i += 1
            blocks.append(("quote", "\n".join(buf)))
            continue

        # unordered list
        if re.match(r"^\s*[-*]\s+", line):
            buf = []
            while i < n and re.match(r"^\s*[-*]\s+", lines[i]):
                buf.append(re.sub(r"^\s*[-*]\s+", "", lines[i]))
                i += 1
            blocks.append(("ul", buf))
            continue

        # ordered list
        if re.match(r"^\s*\d+[.)]\s+", line):
            buf = []
            while i < n and re.match(r"^\s*\d+[.)]\s+", lines[i]):
                buf.append(re.sub(r"^\s*\d+[.)]\s+", "", lines[i]))
                i += 1
            blocks.append(("ol", buf))
            continue

        # paragraph
        buf = [line]
        i += 1
        while i < n and lines[i].strip() and not re.match(
                r"^(#{1,4}\s|```|\s*[-*]\s+|\s*\d+[.)]\s+|\s*>)", lines[i]):
            buf.append(lines[i])
            i += 1
        blocks.append(("p", " ".join(s.strip() for s in buf)))
    return blocks


def slugify_anchor(text, used):
    t = re.sub(r"[^\w\s-]", "", text.lower()).strip()
    t = re.sub(r"[\s_]+", "-", t) or "sec"
    base, k = t, 2
    while t in used:
        t = "%s-%d" % (base, k)
        k += 1
    used.add(t)
    return t


def render_blocks(blocks):
    """Блоки -> (html, toc). FAQ-секции превращаются в details/summary."""
    out, toc = [], []
    used = set()
    in_faq = False
    faq_open = False

    def close_faq_item():
        nonlocal faq_open
        if faq_open:
            out.append("</div></details>")
            faq_open = False

    for kind, payload in blocks:
        if kind == "h2":
            close_faq_item()
            anchor = slugify_anchor(payload, used)
            toc.append((anchor, payload))
            in_faq = bool(re.search(r"faq|вопрос", payload, re.I))
            out.append('<h2 id="%s">%s</h2>' % (anchor, inline(payload)))
        elif kind == "h3":
            if in_faq:
                close_faq_item()
                out.append("<details><summary>%s</summary><div class=\"faq-body\">" % inline(payload))
                faq_open = True
            else:
                out.append("<h3>%s</h3>" % inline(payload))
        elif kind == "h1":
            close_faq_item()
            out.append("<h2>%s</h2>" % inline(payload))  # H1 в теле понижаем
        elif kind == "h4":
            out.append("<h4>%s</h4>" % inline(payload))
        elif kind == "p":
            out.append("<p>%s</p>" % inline(payload))
        elif kind == "ul":
            out.append("<ul>%s</ul>" % "".join("<li>%s</li>" % inline(x) for x in payload))
        elif kind == "ol":
            out.append("<ol>%s</ol>" % "".join("<li>%s</li>" % inline(x) for x in payload))
        elif kind == "quote":
            out.append("<blockquote>%s</blockquote>" % inline(payload))
        elif kind == "hr":
            out.append("<hr>")
        elif kind == "prompt":
            out.append(
                '<figure class="prompt">'
                '<figcaption><span class="chip chip-sm">Скопируй это</span>'
                '<button type="button" class="copy-btn" onclick="copyPrompt(this)">Копировать</button>'
                "</figcaption>"
                "<pre>%s</pre></figure>" % html.escape(payload)
            )
        elif kind == "code":
            out.append('<pre class="codeblock"><code>%s</code></pre>' % html.escape(payload))
    close_faq_item()
    return "\n".join(out), toc


# ------------------------------------------------------------------ templates

FONTS = """<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;600&family=Golos+Text:wght@400;600;700&display=swap" rel="stylesheet">"""

CSS_BASE = """
:root{color-scheme:dark;--bg:#14110C;--bg-deep:#0C0B09;--alt:#191510;--card:#1E1A12;--text:#EFE9DC;--text-hi:#F5F0E4;--text2:#B8AE9C;--muted:#8F8674;--marker:#FFCE00;--on-marker:#17150F;--line:#2B251A;--line-soft:rgba(239,233,220,.14);--line-strong:rgba(239,233,220,.40);--btn2-bg:var(--text);--btn2-text:#17150F}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
::selection{background:var(--marker);color:var(--on-marker)}
body{background:radial-gradient(900px 520px at 88% -80px, rgba(255,206,0,.08), transparent 70%),radial-gradient(760px 480px at -120px 34%, rgba(214,178,94,.06), transparent 70%),var(--bg);color:var(--text);font-family:"Golos Text",system-ui,-apple-system,sans-serif;font-size:17px;line-height:1.65;-webkit-font-smoothing:antialiased;overflow-x:hidden}
img{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
.container{max-width:1200px;margin:0 auto;padding:0 32px}
a:hover,a:focus-visible,button:hover,button:focus-visible,summary:hover,summary:focus-visible{outline:3px solid var(--marker);outline-offset:3px}
a:focus:not(:focus-visible):not(:hover){outline:none}
h1{font-family:"Unbounded",sans-serif;font-weight:600;font-size:clamp(30px,3.3vw,46px);line-height:1.12;letter-spacing:-0.01em;color:var(--text-hi)}
h2{font-family:"Unbounded",sans-serif;font-weight:500;font-size:clamp(24px,3vw,38px);line-height:1.2;color:var(--text-hi)}
.eyebrow{font-weight:600;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;color:var(--text2)}
.chip{display:inline-flex;align-items:center;height:32px;padding:6px 14px;background:var(--marker);color:var(--on-marker);font-weight:700;font-size:15px;text-transform:uppercase;letter-spacing:0.03em;transform:rotate(-1deg);border-radius:4px;line-height:1}
.header{height:72px;border-bottom:1px solid var(--line);background:var(--bg)}
.header .container{height:100%;display:flex;align-items:center;justify-content:space-between}
.wordmark{font-family:"Unbounded",sans-serif;font-weight:500;font-size:17px;display:inline-flex;align-items:center;height:44px;padding:0 4px;border-radius:8px;color:var(--text-hi)}
.wordmark .dot{color:var(--marker)}
.nav{display:flex;align-items:center;gap:4px}
.nav a{display:inline-flex;align-items:center;height:44px;padding:12px 16px;font-weight:600;font-size:16px;border-radius:10px;color:var(--text)}
.ig-btn{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;background:var(--marker);color:var(--on-marker);border:none;border-radius:50%;margin-left:8px}
.mob-only{display:none}
.footer{background:var(--bg-deep);color:var(--text);border-top:1px solid var(--line);padding:72px 0 48px;margin-top:96px}
.footer-cols{display:grid;grid-template-columns:1fr 1fr 1fr;gap:32px;margin-bottom:56px}
.footer h3{font-weight:700;font-size:15px;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px;color:var(--text);font-family:"Golos Text",sans-serif}
.footer-cols a{display:flex;align-items:center;height:44px;font-size:16px;color:var(--text);border-radius:8px;width:fit-content;padding:0 4px}
.footer-bottom{border-top:1px solid var(--line-soft);padding-top:28px}
.footer-bottom .copy{font-weight:600;font-size:15px;margin-bottom:8px}
.footer-bottom .legal{font-size:14px;color:rgba(239,233,220,.66);line-height:1.5}
@media (max-width:720px){
.container{padding:0 20px}
.nav{display:none}
.mob-only{display:inline-flex;margin-left:0}
.footer-cols{grid-template-columns:1fr;gap:36px}
.footer-cols a{height:48px}
}
body::after{content:"";position:fixed;inset:0;z-index:90;pointer-events:none;opacity:.04;mix-blend-mode:screen;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E")}
"""

CSS_ARTICLE = """
.article{max-width:calc(68ch + 64px);margin:0 auto;padding:56px 32px 0}
.article-head{margin-bottom:40px}
.article-head .eyebrow{margin-bottom:14px}
.article-head h1{margin-bottom:18px}
.article-head .desc{font-size:20px;line-height:1.55;color:var(--text2)}
.article-head .meta{margin-top:18px;font-size:15px;color:var(--muted);font-weight:600}
.cover{border-radius:20px;overflow:hidden;border:1px solid var(--line);margin:0 0 40px}
.cover img{width:100%;height:auto}
.toc{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:24px 28px;margin:0 0 48px}
.toc-title{font-weight:700;font-size:15px;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px}
.toc ol{list-style:none;counter-reset:toc}
.toc li{counter-increment:toc}
.toc a{display:flex;gap:12px;align-items:baseline;padding:7px 4px;border-radius:8px;font-weight:600;font-size:16px;line-height:1.4}
.toc a::before{content:counter(toc,decimal-leading-zero);font-family:"Unbounded",sans-serif;font-size:13px;color:var(--muted);flex:none}
.body h2{margin:56px 0 18px;scroll-margin-top:24px}
.body h3{font-size:22px;font-weight:700;margin:36px 0 12px}
.body h4{font-size:18px;font-weight:700;margin:28px 0 10px}
.body p{margin:0 0 18px}
.body ul,.body ol{margin:0 0 20px;padding-left:26px}
.body li{margin-bottom:8px}
.body li::marker{color:var(--text2);font-weight:700}
.body a{font-weight:600;box-shadow:inset 0 -2px 0 var(--marker);border-radius:2px}
.body strong{font-weight:700}
.body code{background:var(--alt);border:1px solid var(--line);border-radius:6px;padding:2px 7px;font-size:15px;font-family:ui-monospace,"SF Mono",Menlo,monospace}
.body blockquote{border-left:4px solid var(--marker);background:var(--card);border-radius:0 12px 12px 0;padding:16px 22px;margin:0 0 22px;color:var(--text2)}
.body hr{border:none;border-top:1px solid var(--line);margin:44px 0}
.body img{border-radius:14px;border:1px solid var(--line);margin:0 0 20px}
/* промпт-вставка «скопируй это» */
.prompt{margin:0 0 26px;border:2px dashed var(--line-strong);border-radius:16px;background:var(--card);overflow:hidden}
.prompt figcaption{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 16px;border-bottom:1px solid var(--line);background:var(--alt)}
.chip-sm{height:26px;padding:4px 10px;font-size:12px}
.copy-btn{border:1.5px solid var(--text);background:transparent;color:var(--text);font-family:"Golos Text",sans-serif;font-weight:600;font-size:13px;height:30px;padding:0 14px;border-radius:8px;cursor:pointer}
.prompt pre{padding:18px 20px;white-space:pre-wrap;overflow-wrap:break-word;font-family:ui-monospace,"SF Mono",Menlo,monospace;font-size:15px;line-height:1.6;overflow-x:auto}
.codeblock{background:var(--bg-deep);color:var(--text);border:1px solid var(--line);border-radius:14px;padding:18px 20px;margin:0 0 26px;overflow-x:auto;font-size:14.5px;line-height:1.6;font-family:ui-monospace,"SF Mono",Menlo,monospace}
/* FAQ-аккордеон без JS */
.body details{background:var(--card);border:1px solid var(--line);border-radius:14px;margin:0 0 12px;overflow:hidden}
.body summary{cursor:pointer;list-style:none;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 22px;font-weight:700;font-size:18px;line-height:1.4;border-radius:14px}
.body summary::-webkit-details-marker{display:none}
.body summary::after{content:"+";font-family:"Unbounded",sans-serif;font-size:20px;color:var(--text);flex:none;transition:transform .2s ease}
.body details[open] summary::after{transform:rotate(45deg)}
.body details[open] summary{border-bottom:1px solid var(--line);border-radius:14px 14px 0 0}
.faq-body{padding:16px 22px 6px;color:var(--text2)}
.back-link{display:inline-flex;align-items:center;gap:8px;margin-top:56px;font-weight:600;font-size:16px;border-radius:8px;padding:6px 8px}
@media (max-width:720px){
.article{padding:36px 20px 0}
.article-head h1{font-size:30px}
.article-head .desc{font-size:18px}
.body h3{font-size:20px}
.toc{padding:18px 20px}
}
@media (prefers-reduced-motion: reduce){html{scroll-behavior:auto}.body summary::after{transition:none}}
"""

CSS_INDEX = """
.page-head{padding:64px 0 8px}
.page-head .eyebrow{margin-bottom:14px}
.page-head h1{margin-bottom:16px}
.page-head .lead{font-size:20px;line-height:1.55;color:var(--text2);max-width:62ch}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:24px;padding:48px 0 0}
.card{display:flex;flex-direction:column;background:var(--card);border:1px solid var(--line);border-radius:20px;overflow:hidden}
.card-photo{height:200px;flex:none;background:var(--alt)}
.card-photo img{width:100%;height:100%;object-fit:cover}
.card-body{flex:1;display:flex;flex-direction:column;padding:22px 22px 18px}
.card-date{font-weight:600;font-size:13px;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted);margin-bottom:10px}
.card-title{font-weight:700;font-size:21px;line-height:1.3;margin-bottom:8px;text-wrap:balance;color:var(--text-hi)}
.card-desc{font-size:16px;color:var(--text2);line-height:1.5;margin-bottom:20px}
.card-cta{margin-top:auto;display:inline-flex;align-items:center;gap:10px;font-weight:600;font-size:17px}
.card-cta svg{transition:transform .2s ease}
.card:hover .card-cta svg,.card:focus-visible .card-cta svg{transform:translateX(4px)}
.empty{padding:64px 0;color:var(--text2);font-size:18px}
@media (max-width:720px){.page-head{padding:40px 0 0}.cards{grid-template-columns:1fr;padding:36px 0 0}}
@media (prefers-reduced-motion: reduce){.card-cta svg{transition:none}}
"""

HEADER = """<header class="header">
  <div class="container">
    <a class="wordmark" href="/">меньшиков<span class="dot">.</span>ai</a>
    <nav class="nav" aria-label="Основные разделы">
      <a href="/instrukcii/">Инструкции</a>
      <a href="/proekty/">Мастерская</a>
      <a href="/kurs/">Почему бесплатно</a>
      <a class="ig-btn" href="https://instagram.com/menshikov.ai" rel="noopener" target="_blank" aria-label="Instagram">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none"/></svg>
      </a>
    </nav>
    <a class="ig-btn mob-only" href="https://instagram.com/menshikov.ai" rel="noopener" target="_blank" aria-label="Instagram">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none"/></svg>
    </a>
  </div>
</header>"""

FOOTER = """<footer class="footer">
  <div class="container">
    <div class="footer-cols">
      <div>
        <h3>Разделы</h3>
        <a href="/instrukcii/">Инструкции</a>
        <a href="/proekty/">Мастерская</a>
        <a href="/manifest/">Манифест</a>
        <a href="/devlog/">Дневник разработки</a>
      </div>
      <div>
        <h3>Читать</h3>
        <a href="/stati/">Статьи</a>
        <a href="/razbory/">Разборы</a>
        <a href="/kofaunder/">AI-Кофаундер</a>
      </div>
      <div>
        <h3>Про курс</h3>
        <a href="/kurs/">Почему всё бесплатно</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="copy">© Андрей Меньшиков</p>
      <p class="legal">Instagram принадлежит Meta, признанной экстремистской организацией и запрещённой в РФ</p>
    </div>
  </div>
</footer>"""

COPY_JS = """<script>
function copyPrompt(btn){
  var pre = btn.closest('figure').querySelector('pre');
  var done = function(){ btn.textContent='Скопировано ✓'; setTimeout(function(){btn.textContent='Копировать';},1800); };
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(pre.textContent).then(done);
  } else {
    var r = document.createRange(); r.selectNodeContents(pre);
    var s = getSelection(); s.removeAllRanges(); s.addRange(r);
    try{ document.execCommand('copy'); done(); }catch(e){}
    s.removeAllRanges();
  }
}
</script>"""


def ru_date(iso):
    m = re.match(r"^(\d{4})-(\d{2})-(\d{2})", iso or "")
    if not m:
        return iso or ""
    y, mo, d = int(m.group(1)), int(m.group(2)), int(m.group(3))
    if 1 <= mo <= 12:
        return "%d %s %d" % (d, MONTHS[mo - 1], y)
    return iso


def page(title, description, css_extra, body_html, extra_js=""):
    return """<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#14110C">
<title>%s</title>
<meta name="description" content="%s">
%s
<style>%s%s</style>
</head>
<body>
%s
%s
%s
</body>
</html>
""" % (html.escape(title), html.escape(description, quote=True), FONTS,
       CSS_BASE, css_extra, body_html, FOOTER, extra_js)


def render_article(meta, body_md):
    body_html, toc = render_blocks(parse_blocks(body_md))
    toc_html = ""
    if len(toc) >= 2:
        items = "".join('<li><a href="#%s">%s</a></li>' % (a, inline(t)) for a, t in toc)
        toc_html = ('<nav class="toc" aria-label="Оглавление">'
                    '<div class="toc-title">Оглавление</div><ol>%s</ol></nav>' % items)
    cover_html = ""
    if meta.get("cover"):
        cover_html = ('<figure class="cover"><img src="%s" alt="%s"></figure>'
                      % (html.escape(meta["cover"], quote=True),
                         html.escape(meta.get("title", ""), quote=True)))
    date_html = ""
    if meta.get("date"):
        date_html = '<p class="meta">%s · Андрей Меньшиков</p>' % html.escape(ru_date(meta["date"]))

    main = """<main class="article">
  <div class="article-head">
    <p class="eyebrow"><a href="/stati/">Статьи</a></p>
    <h1>%s</h1>
    <p class="desc">%s</p>
    %s
  </div>
  %s
  %s
  <div class="body">
%s
  </div>
  <a class="back-link" href="/stati/">&#8592; Все статьи</a>
</main>""" % (html.escape(meta.get("title", "Без названия")),
              html.escape(meta.get("description", "")),
              date_html, cover_html, toc_html, body_html)

    title = "%s — меньшиков.ai" % meta.get("title", "Статья")
    js = COPY_JS if 'class="prompt"' in body_html else ""
    return page(title, meta.get("description", ""), CSS_ARTICLE, HEADER + "\n" + main, js)


ARROW = ('<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
         'stroke-width="2.2" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>')


def render_index(articles):
    cards = []
    for a in articles:
        photo = ""
        if a.get("cover"):
            cover = a["cover"]
            if not cover.startswith(("http://", "https://", "/")):
                cover = "/stati/%s/%s" % (a["slug"], cover)
            photo = ('<div class="card-photo"><img src="%s" alt="" loading="lazy"></div>'
                     % html.escape(cover, quote=True))
        cards.append("""<a class="card" href="/stati/%s/">
  %s
  <div class="card-body">
    <div class="card-date">%s</div>
    <div class="card-title">%s</div>
    <div class="card-desc">%s</div>
    <span class="card-cta">Читать статью %s</span>
  </div>
</a>""" % (html.escape(a["slug"], quote=True), photo,
           html.escape(ru_date(a.get("date", ""))),
           html.escape(a.get("title", "")),
           html.escape(a.get("description", "")), ARROW))

    body = cards and '<div class="cards">%s</div>' % "\n".join(cards) or \
        '<p class="empty">Статьи скоро появятся — первая уже пишется.</p>'

    main = """<main class="container">
  <div class="page-head">
    <p class="eyebrow">Читать</p>
    <h1>Статьи</h1>
    <p class="lead">Разборы и пошаговые тексты: как нейросети собирают блог, игры и контент — простыми словами, с промптами, которые можно скопировать.</p>
  </div>
  %s
</main>""" % body

    return page("Статьи — меньшиков.ai",
                "Статьи про нейросети без камеры: пошаговые тексты, промпты, разборы. Бесплатно и в открытую.",
                CSS_INDEX, HEADER + "\n" + main)


# ------------------------------------------------------------------- pipeline

def build():
    if not os.path.isdir(SRC_DIR):
        print("Нет папки с исходниками: %s" % SRC_DIR)
        sys.exit(1)

    articles = []
    for name in sorted(os.listdir(SRC_DIR)):
        if not name.endswith(".md"):
            continue
        path = os.path.join(SRC_DIR, name)
        with open(path, encoding="utf-8") as f:
            meta, body = parse_frontmatter(f.read())
        # обложка с сайтовым путём, которой ещё нет на диске — пропускаем,
        # чтобы не рисовать битую картинку на карточке и в статье
        cov = meta.get("cover", "")
        if cov.startswith("/") and not os.path.isfile(os.path.join(BASE, cov.lstrip("/"))):
            meta.pop("cover", None)

        slug = meta.get("slug") or re.sub(r"\.md$", "", name)
        slug = re.sub(r"[^a-z0-9-]", "-", slug.lower()).strip("-") or "statya"
        meta["slug"] = slug
        if not meta.get("title"):
            m = re.search(r"^#\s+(.+)$", body, re.M)
            meta["title"] = m.group(1).strip() if m else slug
            if m:  # первый H1 уходит в шапку, из тела убираем
                body = body.replace(m.group(0), "", 1)
        else:
            # заголовок уже есть в фронтматтере — ведущий H1 тела убираем,
            # иначе на странице будет два почти одинаковых заголовка подряд
            body = re.sub(r"^#\s+.+\n+", "", body, count=1)

        out_dir = os.path.join(OUT_DIR, slug)
        os.makedirs(out_dir, exist_ok=True)
        with open(os.path.join(out_dir, "index.html"), "w", encoding="utf-8") as f:
            f.write(render_article(meta, body))
        articles.append(meta)
        print("  + /stati/%s/  (%s)" % (slug, meta.get("title", "")))

        # локальная обложка рядом с md — копируем в папку статьи
        cover = meta.get("cover", "")
        if cover and not cover.startswith(("http://", "https://", "/")):
            src_cover = os.path.join(SRC_DIR, cover)
            if os.path.isfile(src_cover):
                shutil.copy2(src_cover, os.path.join(out_dir, os.path.basename(cover)))

    articles.sort(key=lambda a: a.get("date", ""), reverse=True)
    os.makedirs(OUT_DIR, exist_ok=True)
    with open(os.path.join(OUT_DIR, "index.html"), "w", encoding="utf-8") as f:
        f.write(render_index(articles))
    print("  + /stati/index.html  (%d карточек)" % len(articles))


if __name__ == "__main__":
    build()
