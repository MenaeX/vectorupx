export default function Home() {
  return (
    <div className="text-white">
      <Hero />
      <AgentLida />
      <HowItWorks />
      <WhatYouGet />
      <Pricing />
      <Faq />
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
      <BackgroundVideo />

      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-12">
        <a href="#" className="text-xl font-semibold tracking-tight">
          Vector<span className="text-white/60">Up</span>
          <span className="text-orange-400">X</span>
        </a>
        <a
          href="#demo"
          className="rounded-full bg-white/95 px-5 py-2.5 text-sm font-medium text-stone-950 shadow-lg shadow-orange-900/40 transition hover:bg-white"
        >
          Записаться на demo
        </a>
      </header>

      <main className="relative z-10 flex flex-1 items-end px-6 pb-24 sm:px-12 sm:pb-32">
        <div className="max-w-5xl">
          <h1 className="text-[clamp(2.75rem,9vw,8rem)] font-medium leading-[0.95] tracking-[-0.04em] [text-shadow:0_2px_30px_rgba(0,0,0,0.6)]">
            Холодные продажи.
            <br />
            Без звонков.
          </h1>

          <div className="mt-10 max-w-lg border-t border-white/20 pt-6">
            <p className="text-base leading-relaxed text-white/80 sm:text-lg [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
              AI-SDR сам находит клиентов в B2B, пишет персональные письма
              и бронирует demo в вашем календаре. 15 встреч в месяц — или
              возврат.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/60">
              <span>B2B IT &amp; SaaS</span>
              <span aria-hidden>·</span>
              <span>от 150 000 ₽ / мес</span>
              <span aria-hidden>·</span>
              <span>пилот с мая 2026</span>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

function BackgroundVideo() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover filter-[brightness(0.85)_saturate(1.15)]"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_900px_700px_at_15%_85%,rgba(0,0,0,0.75),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(194,99,40,0.20),transparent_50%)]" />
      <div className="absolute inset-0 film-grain" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   2. AGENT LIDA — знакомство с живым видео-аватаром
═══════════════════════════════════════════════════════════════ */

function AgentLida() {
  return (
    <section className="relative overflow-hidden cosmic-bg px-6 py-24 sm:px-12 sm:py-32">
      {/* Тёплое свечение, продолжающее настроение Hero */}
      <div aria-hidden className="absolute inset-0 cosmic-glow-warm-tl" />

      <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-orange-400">
            Знакомьтесь
          </p>
          <h2 className="mb-8 text-5xl font-medium leading-tight tracking-tight sm:text-6xl">
            Лида — ваш AI-SDR.
          </h2>
          <blockquote className="mb-10 max-w-xl border-l-2 border-orange-400/60 pl-6 text-lg leading-relaxed text-white/80 sm:text-xl">
            «Я нахожу ваших клиентов в B2B, пишу им персональные письма
            и бронирую demo прямо в вашем календаре. Работаю круглосуточно.
            Не болею. Не прошу повышения зарплаты.»
          </blockquote>
          <ul className="grid gap-4 text-white/70 sm:grid-cols-2">
            {[
              "Парсит базу 12 000 IT-компаний РФ",
              "До 100 персональных писем в день",
              "Ведёт диалог в email и WhatsApp",
              "Бронирует demo через ваш Calendly",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Живой видео-аватар Лиды + орбитальные круги */}
        <div className="relative mx-auto aspect-square w-full max-w-md lg:mx-0 lg:ml-auto">
          {/* Орбитальный круг 1 — медленно вращается */}
          <div
            aria-hidden
            className="orbit-ring absolute inset-0 rounded-full border border-orange-400/15"
          />
          {/* Орбитальный круг 2 — поменьше */}
          <div
            aria-hidden
            className="absolute inset-6 rounded-full border border-white/5"
          />

          {/* Тёплый glow позади аватара */}
          <div
            aria-hidden
            className="absolute inset-10 -z-10 rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.45),transparent_70%)] blur-2xl"
          />

          {/* Видео-аватар в круге */}
          <div className="absolute inset-12 overflow-hidden rounded-full border border-white/15 bg-stone-900 shadow-2xl shadow-orange-900/40">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            >
              <source src="/lida.mp4" type="video/mp4" />
            </video>
            {/* Лёгкий тёплый tint поверх */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,transparent_50%,rgba(0,0,0,0.4)_100%)]" />
          </div>

          {/* Подпись под аватаром */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/70 px-4 py-1.5 backdrop-blur">
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span className="font-medium">Лида</span>
              <span className="text-white/50">· AI-SDR · v1.0</span>
            </div>
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
      text: "Парсит базу 12 000 IT-интеграторов и B2B SaaS в РФ через Dealrocket. Фильтрует по выручке, размеру, теху — оставляет только тех, кому реально нужен ваш продукт.",
    },
    {
      n: "02",
      title: "Пишет",
      text: "Каждое письмо персонализировано: упоминает их продукт, последнюю новость, релевантный кейс. Пишет через Claude — тон деловой, без шаблонов и спам-маркеров.",
    },
    {
      n: "03",
      title: "Бронирует",
      text: "Когда клиент отвечает «интересно», Лида ведёт диалог, отвечает на возражения и бронирует demo прямо в вашем календаре. Вы получаете готовую встречу.",
    },
  ];

  return (
    <section className="relative cosmic-bg px-6 py-24 sm:px-12 sm:py-32">
      <div aria-hidden className="absolute inset-0 cosmic-glow-deep-blue-tr" />

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-orange-400">
          Как работает
        </p>
        <h2 className="mb-16 text-5xl font-medium leading-tight tracking-tight sm:text-6xl">
          Три шага. <span className="text-white/60">Без вашего участия.</span>
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              {/* Соединительная линия между карточками (только на десктопе) */}
              {i < steps.length - 1 && (
                <div
                  aria-hidden
                  className="absolute top-1/2 -right-4 z-0 hidden h-px w-8 bg-linear-to-r from-orange-400/40 to-transparent md:block"
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
  const items = [
    {
      stat: "15",
      unit: "встреч / мес",
      text: "С релевантной B2B-целевой. Гарантировано или возврат.",
    },
    {
      stat: "0",
      unit: "звонков с вашей стороны",
      text: "Лида ведёт переписку в email и мессенджерах сама.",
    },
    {
      stat: "24/7",
      unit: "в работе",
      text: "Не болеет, не уходит в отпуск, не просит индексацию.",
    },
    {
      stat: "5",
      unit: "дней до запуска",
      text: "Подписали — через рабочую неделю первые письма уходят.",
    },
  ];

  return (
    <section className="relative cosmic-bg px-6 py-24 sm:px-12 sm:py-32">
      <div aria-hidden className="absolute inset-0 cosmic-glow-warm-br" />

      <div className="relative mx-auto max-w-6xl">
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
                {it.stat}
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
   5. PRICING — тарифы
═══════════════════════════════════════════════════════════════ */

function Pricing() {
  const plans = [
    {
      name: "Базовый",
      price: "150 000",
      tagline: "Для проверки гипотезы",
      features: [
        "15 встреч в месяц",
        "1 целевая ниша",
        "Базовая воронка email",
        "Отчёт раз в неделю",
        "Поддержка по email",
      ],
      highlighted: false,
    },
    {
      name: "Премиум",
      price: "250 000",
      tagline: "Для масштабирования",
      features: [
        "30 встреч в месяц",
        "До 2 целевых ниш",
        "Email + WhatsApp + Telegram",
        "A/B-тестирование писем",
        "Выделенный SDR-менеджер",
        "Отчёт раз в день",
      ],
      highlighted: true,
    },
  ];

  return (
    <section className="relative cosmic-bg px-6 py-24 sm:px-12 sm:py-32">
      <div aria-hidden className="absolute inset-0 cosmic-glow-amber-c" />

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-orange-400">
          Тарифы
        </p>
        <h2 className="mb-4 text-5xl font-medium leading-tight tracking-tight sm:text-6xl">
          Платите за встречи.
        </h2>
        <p className="mb-16 text-lg text-white/60">
          Не за «попытку». Меньше 15 встреч в месяц — возвращаем разницу.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl border p-10 backdrop-blur-sm transition ${
                p.highlighted
                  ? "border-orange-400/50 bg-linear-to-br from-orange-950/40 to-stone-950/80"
                  : "border-white/10 bg-stone-950/60"
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
              <div className="mb-2 flex items-baseline gap-2">
                <span className="text-5xl font-medium tracking-tight">{p.price}</span>
                <span className="text-lg text-white/60">₽ / мес</span>
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
                href="#demo"
                className={`block rounded-full px-6 py-3 text-center text-sm font-medium transition ${
                  p.highlighted
                    ? "bg-orange-400 text-stone-950 hover:bg-orange-300"
                    : "border border-white/20 text-white hover:bg-white/5"
                }`}
              >
                Записаться на demo
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
      a: "5 рабочих дней от подписания договора до первой рассылки. Первая неделя: брифинг, прогрев доменов, согласование шаблонов писем. Вторая неделя — пошли первые встречи.",
    },
    {
      q: "Что если не будет 15 встреч в месяц?",
      a: "Возвращаем разницу пропорционально. Например, если за месяц получилось 10 встреч — возвращаем 1/3 платежа. Это не маркетинг — это в договоре.",
    },
    {
      q: "Чем вы отличаетесь от обычного SDR-агентства?",
      a: "Обычные агентства нанимают людей, мы — настраиваем AI. У человека 8 часов в день, у Лиды — 24. У человека эффективность зависит от настроения, у AI — от качества промтов и базы. Цена та же, выход в 3-5 раз больше.",
    },
    {
      q: "А лидов вы передадите в нашу CRM?",
      a: "Да. Подключаемся к вашей amoCRM, Bitrix24 или HubSpot. Каждый ответивший лид попадает в воронку с тегом «от Лиды» и историей переписки.",
    },
  ];

  return (
    <section className="relative cosmic-bg px-6 py-24 sm:px-12 sm:py-32">
      <div aria-hidden className="absolute inset-0 cosmic-glow-warm-tl" />

      <div className="relative mx-auto max-w-3xl">
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
      id="demo"
      className="relative overflow-hidden cosmic-bg px-6 py-32 sm:px-12 sm:py-40"
    >
      {/* Большой центральный взрыв света — кульминация */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.30),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_center,rgba(255,200,100,0.15),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-5xl font-medium leading-tight tracking-tight sm:text-7xl">
          Запустите Лиду <br />
          на следующей неделе.
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-lg text-white/70">
          15 минут разговора — вы понимаете, подойдёт ли вам Лида. Без обязательств.
        </p>
        <a
          href="mailto:hello@vectorupx.ai?subject=Demo VectorUpX"
          className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-base font-medium text-stone-950 shadow-2xl shadow-orange-500/40 transition hover:bg-orange-100"
        >
          Записаться на demo →
        </a>
        <p className="mt-6 text-sm text-white/40">
          Или напишите на{" "}
          <a href="mailto:hello@vectorupx.ai" className="underline hover:text-white/70">
            hello@vectorupx.ai
          </a>
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   8. FOOTER
═══════════════════════════════════════════════════════════════ */

function SiteFooter() {
  return (
    <footer className="relative cosmic-bg border-t border-white/5 px-6 py-12 sm:px-12">
      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 text-sm text-white/50 sm:flex-row sm:items-center">
        <div>
          <div className="text-base font-semibold text-white">
            Vector<span className="text-white/60">Up</span>
            <span className="text-orange-400">X</span>
          </div>
          <div className="mt-1">© 2026 · AI-SDR для B2B</div>
        </div>
        <div className="flex gap-6">
          <a href="mailto:hello@vectorupx.ai" className="hover:text-white">
            hello@vectorupx.ai
          </a>
          <a href="#" className="hover:text-white">
            Политика
          </a>
        </div>
      </div>
    </footer>
  );
}
