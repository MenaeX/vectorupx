import { Spotlight } from "./Spotlight";
import { Counter } from "./Counter";
import { LeadForm } from "./LeadForm";
import { LidaDialog } from "./LidaDialog";
import { AgentTeam } from "./AgentTeam";

export default function Home() {
  return (
    <div className="text-white">
      <Hero />
      <SectionSeam />
      <ScenariosMarquee />
      <SectionSeam />
      <AgentTeam />
      <SectionSeam />
      <HowItWorks />
      <SectionSeam />
      <LidaDialog />
      <SectionSeam />
      <WhatYouGet />
      <SectionSeam />
      <WhoIsItFor />
      <SectionSeam />
      <Pricing />
      <SectionSeam />
      <Faq />
      <SectionSeam />
      <FinalCta />
      <SiteFooter />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   1. HERO
═══════════════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      <Spotlight />

      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-12">
        <a href="#" className="text-xl font-semibold tracking-tight">
          Vector<span className="text-white/60">Up</span>
          <span className="text-orange-400">X</span>
        </a>
        <a
          href="#contact"
          className="rounded-full bg-white/95 px-5 py-2.5 text-sm font-medium text-stone-950 shadow-lg shadow-orange-900/40 transition hover:bg-white"
        >
          Обсудить запуск
        </a>
      </header>

      <main className="relative z-10 flex flex-1 items-end px-6 pb-24 sm:px-12 sm:pb-32">
        <div className="max-w-5xl">
          <h1 className="text-[clamp(2.75rem,9vw,8rem)] font-medium leading-[0.95] tracking-[-0.04em] [text-shadow:0_2px_30px_rgba(0,0,0,0.6)]">
            15 B2B-встреч в месяц.
            <br />
            Каждую находит AI-агент.
          </h1>

          <div className="mt-10 max-w-lg border-t border-white/20 pt-6">
            <p className="text-base leading-relaxed text-white/80 sm:text-lg [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
              Лида находит лиц, принимающих решения, в IT и SaaS, ведёт
              переписку и сама ставит встречу в ваш календарь. Гарантия
              прописана в договоре.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/60">
              <span>Запуск за 5 рабочих дней</span>
              <span aria-hidden>·</span>
              <span>от 150 000 ₽ / мес</span>
              <span aria-hidden>·</span>
              <span>Старт первого потока 12 мая</span>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   1.5 SCENARIOS MARQUEE — бегущая строка сценариев работы Лиды
═══════════════════════════════════════════════════════════════ */

function ScenariosMarquee() {
  const scenarios = [
    "15 встреч в месяц",
    "Холодная B2B-рассылка",
    "Реактивация старой базы",
    "Письма после конференций",
    "Адресная работа по списку",
    "Покрытие 12 000 IT-компаний",
    "Возврат потерянных лидов",
    "Подогрев входящих заявок",
    "Письма 24/7 без выходных",
  ];
  // Дублируем содержимое — для бесшовной зацикленной анимации
  const items = [...scenarios, ...scenarios];

  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <div aria-hidden className="parallax-slow absolute inset-0 cosmic-glow-warm-br" />

      <div className="relative">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-orange-400">
          Где работает Лида
        </p>
        <div className="marquee-row">
          <div className="marquee-track">
            {items.map((s, i) => (
              <span key={i} className="marquee-pill">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3. HOW IT WORKS — 3 шага
═══════════════════════════════════════════════════════════════ */

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Находит",
      text: "Парсит базу 12 000 IT-интеграторов и B2B SaaS в РФ через Dealrocket. Фильтрует по выручке, размеру, технологиям — оставляет только тех, кому реально нужен ваш продукт.",
    },
    {
      n: "02",
      title: "Изучает",
      text: "Читает сайт компании, последние новости в СМИ, профили ЛПР в Хабре, TenChat и HH. Понимает, чем компания живёт сейчас — это и есть зацепка для первого письма.",
    },
    {
      n: "03",
      title: "Пишет",
      text: "Каждое письмо персонализировано: упоминает продукт компании, свежую новость, релевантный кейс. Пишет через Claude — тон деловой, без шаблонов и спам-маркеров.",
    },
    {
      n: "04",
      title: "Записывает",
      text: "Когда клиент готов говорить, Лида ведёт переписку, отвечает на возражения и сама ставит встречу в ваш календарь. Вам остаётся только её провести.",
    },
  ];

  return (
    <section className="relative px-6 py-24 sm:px-12 sm:py-32">
      <div aria-hidden className="parallax-slow absolute inset-0 cosmic-glow-deep-blue-tr" />

      <div className="reveal relative mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-orange-400">
          Как работает
        </p>
        <h2 className="mb-16 text-5xl font-medium leading-tight tracking-tight sm:text-6xl">
          Четыре шага. <span className="text-white/60">Без вашего участия.</span>
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              {/* Соединительная линия между карточками только на больших экранах,
                  где все 4 шага в одну строку */}
              {i < steps.length - 1 && (
                <div
                  aria-hidden
                  className="absolute top-1/2 -right-4 z-0 hidden h-px w-8 bg-linear-to-r from-orange-400/40 to-transparent lg:block"
                />
              )}
              <div className="relative h-full rounded-2xl border border-white/10 bg-white/2 p-8 backdrop-blur-sm transition hover:border-orange-400/30 hover:bg-white/4">
                <div className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-400/40 font-mono text-sm text-orange-400">
                  {s.n}
                </div>
                <h3 className="mb-4 text-2xl font-medium tracking-tight">{s.title}</h3>
                <p className="text-base leading-relaxed text-white/65">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   4. WHAT YOU GET — результаты
═══════════════════════════════════════════════════════════════ */

function WhatYouGet() {
  const items: Array<{
    target: number | null;
    start?: number;
    fallback: string;
    unit: string;
    text: string;
  }> = [
    {
      target: 15,
      start: 0,
      fallback: "15",
      unit: "встреч / мес",
      text: "С релевантной B2B-целевой. Не дотянули — продолжаем работать бесплатно.",
    },
    {
      target: 0,
      start: 12,
      fallback: "0",
      unit: "звонков с вашей стороны",
      text: "Лида ведёт переписку в email и мессенджерах сама.",
    },
    {
      target: null,
      fallback: "24/7",
      unit: "в работе",
      text: "Не болеет, не уходит в отпуск, не просит индексацию.",
    },
    {
      target: 5,
      start: 0,
      fallback: "5",
      unit: "дней до запуска",
      text: "Подписали — через рабочую неделю первые письма уходят.",
    },
  ];

  return (
    <section className="relative px-6 py-24 sm:px-12 sm:py-32">
      <div aria-hidden className="parallax-slow absolute inset-0 cosmic-glow-warm-br" />

      <div className="reveal relative mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-orange-400">
          Что получите
        </p>
        <h2 className="mb-16 text-5xl font-medium leading-tight tracking-tight sm:text-6xl">
          Результат, а не процесс.
        </h2>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div
              key={it.unit}
              className="bg-stone-950/80 p-8 backdrop-blur-sm transition hover:bg-stone-900/80"
            >
              <div className="mb-2 text-5xl font-medium tracking-tight text-orange-400">
                {it.target !== null ? (
                  <Counter target={it.target} start={it.start} />
                ) : (
                  it.fallback
                )}
              </div>
              <div className="mb-4 text-sm font-medium text-white/80">{it.unit}</div>
              <p className="text-sm leading-relaxed text-white/55">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   5. WHO IS IT FOR — социальное доказательство (целевая аудитория)
═══════════════════════════════════════════════════════════════ */

function WhoIsItFor() {
  const segments = [
    {
      title: "IT-интеграторы",
      description:
        "Корпоративные решения, цикл сделки 3-6 месяцев. Лида находит CIO, IT-директоров, технических руководителей — тех, кто реально решает.",
    },
    {
      title: "B2B SaaS-продукты",
      description:
        "CRM, ERP, аналитика, лидген. У вас подписочная модель и нужны новые подписчики. Лида приводит генеральных директоров малого и среднего бизнеса с реальной потребностью.",
    },
    {
      title: "Облачные и DevOps-сервисы",
      description:
        "Cloud, hosting, IaaS / PaaS. Лида находит CTO и DevOps-руководителей, для которых ваш стек закрывает конкретную боль.",
    },
  ];

  return (
    <section className="relative px-6 py-24 sm:px-12 sm:py-32">
      <div aria-hidden className="parallax-slow absolute inset-0 cosmic-glow-deep-blue-tr" />

      <div className="reveal relative mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-orange-400">
          Кому подходит
        </p>
        <h2 className="mb-4 text-5xl font-medium leading-tight tracking-tight sm:text-6xl">
          B2B IT и SaaS,
          <br />
          где сделки длинные,
          <br />
          а лиды дорогие.
        </h2>
        <p className="mb-16 max-w-2xl text-lg text-white/60">
          Если у вас цикл продаж от месяца, средний чек от 100 000 ₽
          и нет времени собирать команду на холодные продажи — вы наша целевая.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {segments.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-white/10 bg-white/2 p-8 backdrop-blur-sm transition hover:border-orange-400/30 hover:bg-white/4"
            >
              <h3 className="mb-4 text-2xl font-medium tracking-tight">{s.title}</h3>
              <p className="text-base leading-relaxed text-white/65">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   6. PRICING — тарифы
═══════════════════════════════════════════════════════════════ */

function Pricing() {
  const plans = [
    {
      name: "Пилот",
      price: "50 000",
      priceNote: "₽ за 1-й месяц",
      tagline: "Чтобы убедиться, что подходит вашей нише",
      features: [
        "3-5 квалифицированных встреч с ЛПР",
        "1 целевая ниша на ваш выбор",
        "Прогрев базы и первые письма",
        "Полный отчёт по итогам месяца",
        "Решение, переходим ли в Стандарт",
      ],
      highlighted: false,
    },
    {
      name: "Стандарт",
      price: "150 000",
      priceNote: "₽ / мес, со 2-го месяца",
      tagline: "Основной режим работы",
      features: [
        "15 встреч в месяц минимум",
        "Если меньше 15 — продолжаем работать бесплатно, пока не дадим",
        "1 целевая ниша",
        "Письма + еженедельный отчёт",
        "Поддержка по email и Telegram",
      ],
      highlighted: true,
    },
    {
      name: "Премиум",
      price: "250 000",
      priceNote: "₽ / мес",
      tagline: "Для тех, кому нужно больше",
      features: [
        "30+ встреч в месяц",
        "До 2 целевых ниш",
        "Письма + WhatsApp-канал",
        "Тестирование разных вариантов писем",
        "Отдельный менеджер сопровождения",
        "Отчёт раз в день",
      ],
      highlighted: false,
    },
  ];

  return (
    <section className="relative px-6 py-24 sm:px-12 sm:py-32">
      <div aria-hidden className="parallax-slow absolute inset-0 cosmic-glow-amber-c" />

      <div className="reveal relative mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-orange-400">
          Тарифы
        </p>
        <h2 className="mb-4 text-5xl font-medium leading-tight tracking-tight sm:text-6xl">
          Цена за результат, а не за попытку.
        </h2>
        <p className="mb-16 max-w-2xl text-lg text-white/60">
          Не дотянули 15 встреч за месяц — продолжаем работать <span className="text-white">бесплатно</span>,
          пока не дадим минимум 15. Без возвратов и пересчётов.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`group relative rounded-2xl border p-10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                p.highlighted
                  ? "border-orange-400/50 bg-linear-to-br from-orange-950/40 to-stone-950/80 hover:border-orange-400/80 hover:shadow-orange-500/30"
                  : "border-white/10 bg-stone-950/60 hover:border-orange-400/40 hover:shadow-orange-500/15"
              }`}
            >
              {p.highlighted && (
                <div className="absolute -top-3 left-10 rounded-full bg-orange-400 px-3 py-1 text-xs font-medium text-stone-950">
                  Рекомендуем
                </div>
              )}
              <div className="mb-2 text-sm uppercase tracking-widest text-white/60">
                {p.name}
              </div>
              <div className="mb-2 flex flex-col gap-1">
                <span className="text-5xl font-medium tracking-tight whitespace-nowrap">{p.price}</span>
                <span className="text-sm text-white/60">{p.priceNote}</span>
              </div>
              <div className="mb-8 text-sm text-white/55">{p.tagline}</div>
              <ul className="mb-10 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-white/80">
                    <span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-orange-400" />
                    <span className="text-sm leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`block rounded-full px-6 py-3 text-center text-sm font-medium transition ${
                  p.highlighted
                    ? "bg-orange-400 text-stone-950 hover:bg-orange-300"
                    : "border border-white/20 text-white hover:bg-white/5"
                }`}
              >
                Обсудить запуск
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   6. FAQ
═══════════════════════════════════════════════════════════════ */

function Faq() {
  const items = [
    {
      q: "С каких ниш начинаете?",
      a: "Стартуем с IT-интеграторов и B2B SaaS в РФ — здесь у нас отработанные шаблоны и база ~12 000 компаний. Со второго месяца пилотного запуска подключаем консалтинг (управленческий, маркетинговый, юридический). Другие ниши обсуждаем индивидуально.",
    },
    {
      q: "Сколько занимает запуск?",
      a: "5 рабочих дней от подписания договора до первой рассылки. Дни 1–3: брифинг, прогрев доменов, согласование шаблонов писем. Дни 4–5: финальные правки, старт кампании. Первые ответы и согласованные встречи — обычно на 2-й неделе.",
    },
    {
      q: "Что если не будет 15 встреч в месяц?",
      a: "Продолжаем работать бесплатно, пока не дадим минимум 15. Никаких возвратов и пересчётов — просто продолжаем кампанию за свой счёт. Это прописано в договоре, а не в маркетинге.",
    },
    {
      q: "Зачем нужен Пилот за 50 000 ₽?",
      a: "Чтобы вы не платили 150 000 ₽ наугад. За первый месяц мы покажем 3-5 квалифицированных встреч с ЛПР именно в вашей нише — этого достаточно, чтобы понять, подходит ли Лида. После Пилота вы решаете: переходим в Стандарт 150 000 ₽ или расходимся без обязательств.",
    },
    {
      q: "Чем вы отличаетесь от обычного SDR-агентства?",
      a: "Обычные агентства нанимают людей, мы — настраиваем AI. У человека 8 часов в день, у Лиды — 24. У человека эффективность зависит от настроения, у AI — от качества промптов и базы. Цена та же, выход в 3-5 раз больше.",
    },
    {
      q: "А лидов вы передадите в нашу CRM?",
      a: "Да. Подключаемся к вашей amoCRM или Битрикс24. Каждый ответивший лид попадает в воронку с тегом «от Лиды» и историей переписки.",
    },
  ];

  return (
    <section className="relative px-6 py-24 sm:px-12 sm:py-32">
      <div aria-hidden className="parallax-slow absolute inset-0 cosmic-glow-warm-tl" />

      <div className="reveal relative mx-auto max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-orange-400">
          Вопросы
        </p>
        <h2 className="mb-16 text-5xl font-medium leading-tight tracking-tight sm:text-6xl">
          Что часто спрашивают.
        </h2>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {items.map((it) => (
            <details key={it.q} className="group py-6">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-medium text-white transition group-open:text-orange-400">
                {it.q}
                <span className="shrink-0 text-2xl text-white/40 transition group-open:rotate-45 group-open:text-orange-400">
                  +
                </span>
              </summary>
              <p className="mt-4 text-base leading-relaxed text-white/65">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   7. FINAL CTA — кульминация
═══════════════════════════════════════════════════════════════ */

function FinalCta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-24 sm:px-12 sm:py-32"
    >
      {/* Большой центральный взрыв света — кульминация, с параллаксом */}
      <div
        aria-hidden
        className="parallax-slow absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.30),transparent_60%)] mix-blend-screen"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_center,rgba(255,200,100,0.15),transparent_70%)] mix-blend-screen"
      />

      <div className="reveal relative mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h2 className="mb-6 text-5xl font-medium leading-tight tracking-tight sm:text-6xl">
            Первые встречи —<br />
            через неделю.
          </h2>
          <p className="mx-auto max-w-xl text-lg text-white/70">
            Заполните форму — Лида разберёт вашу нишу, посчитает количество
            встреч и решит, подходим ли друг другу.
            Без созвонов и обязательств.
          </p>
        </div>

        <LeadForm />

        <div className="mt-10 text-center text-sm text-white/50">
          Или напишите напрямую в{" "}
          <a
            href="https://t.me/vectorupx_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white/80"
          >
            Telegram
          </a>
          <p className="mt-3 text-xs text-white/40">
            Telegram в России работает через VPN. Без VPN — заполните форму выше.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   8. FOOTER
═══════════════════════════════════════════════════════════════ */

function SiteFooter() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-12 sm:px-12">
      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 text-sm text-white/50 sm:flex-row sm:items-center">
        <div>
          <div className="text-base font-semibold text-white">
            Vector<span className="text-white/60">Up</span>
            <span className="text-orange-400">X</span>
          </div>
          <div className="mt-1">© 2026 · AI-SDR для B2B</div>
        </div>
        <a
          href="https://t.me/vectorupx_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          Telegram
        </a>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION SEAM — энергетическая линия на стыке секций.
═══════════════════════════════════════════════════════════════ */

function SectionSeam() {
  return <div aria-hidden className="section-seam relative z-10" />;
}
