/* ───────────────────────────────────────────────────────────────
   Превью композита под maxtreysi: пиксельный фон + панели справа.
   Три варианта фона (V1/V2/V3) с одинаковыми оверлеями TEAM/QUEUE/SYSTEM.
   ─────────────────────────────────────────────────────────────── */

const variants = [
  {
    id: "v1",
    label: "V1 — стилизованный cartoon",
    bgClass: "bg-[url(/vectorupx/office_v1.jpg)]",
  },
  {
    id: "v2",
    label: "V2 — самый «пиксельный»",
    bgClass: "bg-[url(/vectorupx/office_v2.jpg)]",
  },
  {
    id: "v3",
    label: "V3 — неоновая обводка",
    bgClass: "bg-[url(/vectorupx/office_v3.jpg)]",
  },
];

const team = [
  { name: "Лев", role: "AI-Продажник", status: "active" },
  { name: "Капитан", role: "AI-Гендиректор", status: "idle" },
  { name: "Юрист", role: "AI-Юр-консультант", status: "idle" },
  { name: "Настройщик", role: "AI-Тех", status: "idle" },
  { name: "Тонер", role: "AI-Аналитик", status: "processing" },
  { name: "Брифер", role: "AI-Онбординг", status: "idle" },
  { name: "Лида", role: "AI-SDR клиента", status: "active" },
  { name: "Писатель", role: "AI-Копирайтер", status: "active" },
  { name: "Аналитик", role: "AI-Отчётность", status: "idle" },
  { name: "Скаут", role: "AI-Разведка", status: "active" },
  { name: "Контент-агент", role: "AI-SMM", status: "idle" },
];

const completed = [
  { agent: "Тонер", task: "анализ диалога #142", ago: "2 мин" },
  { agent: "Скаут", task: "+1 конкурент", ago: "12 мин" },
  { agent: "Юрист", task: "152-ФЗ ст. 18", ago: "18 мин" },
  { agent: "Писатель", task: "шаблон SaaS", ago: "24 мин" },
  { agent: "Лев", task: "ответ АльфаПром", ago: "31 мин" },
];

const dot = (s: string) =>
  s === "active"
    ? "bg-emerald-400 animate-pulse"
    : s === "processing"
      ? "bg-blue-400 animate-pulse"
      : "bg-emerald-400/40";

function OfficeSection({
  variantLabel,
  bgUrl,
}: {
  variantLabel: string;
  bgUrl: string;
}) {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-12 sm:py-32">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgUrl})` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/60 to-stone-950/40 sm:from-stone-950/85 sm:via-stone-950/40 sm:to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-stone-950/40 to-stone-950/70"
      />

      <div className="absolute top-6 left-1/2 z-10 -translate-x-1/2 rounded-full border border-yellow-400/40 bg-yellow-950/80 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-yellow-300 backdrop-blur">
        Превью · {variantLabel}
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-8 pt-16 lg:grid-cols-[1fr_400px] lg:items-center">
        {/* Левая часть — заголовок и описание */}
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-orange-400">
            Виртуальный офис
          </p>
          <h2 className="mb-6 text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            Команда работает
            <br />
            прямо сейчас.
          </h2>
          <p className="max-w-md text-base text-white/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)] sm:text-lg">
            11 AI-сотрудников. Каждый со своей ролью.
            Не уходят на больничный, не просят повышения.
          </p>
        </div>

        {/* Правая часть — стэк панелей */}
        <div className="space-y-3 font-mono">
          {/* TEAM */}
          <div className="rounded-2xl border border-white/10 bg-stone-950/85 p-4 backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-between border-b border-white/5 pb-2 text-[10px] font-semibold uppercase tracking-widest text-white/50">
              <span>TEAM</span>
              <span>11</span>
            </div>
            <ul className="space-y-1.5 text-xs">
              {team.map((a) => (
                <li key={a.name} className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${dot(a.status)}`}
                    />
                    <span className="shrink-0 font-medium text-white/90">{a.name}</span>
                    <span className="hidden truncate text-[11px] text-white/40 sm:inline">
                      {a.role}
                    </span>
                  </div>
                  <span className="shrink-0 text-[10px] text-white/40">{a.status}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* TASK QUEUE */}
          <div className="rounded-2xl border border-white/10 bg-stone-950/85 p-4 backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-between border-b border-white/5 pb-2 text-[10px] font-semibold uppercase tracking-widest text-white/50">
              <span>TASK QUEUE</span>
              <span className="rounded border border-orange-400/40 bg-orange-400/10 px-1.5 py-0.5 text-[9px] tracking-widest text-orange-300">
                + new
              </span>
            </div>
            <div className="mb-3">
              <div className="mb-1 text-[9px] uppercase tracking-widest text-white/40">
                Active
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-2 text-xs">
                <span className="inline-block h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-400" />
                <span className="truncate text-white/85">
                  Лев · обрабатывает запрос 1С-интегратора
                </span>
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-[9px] uppercase tracking-widest text-white/40">
                ▼ COMPLETED 47+
              </div>
              <ul className="space-y-1 text-[11px]">
                {completed.map((t, i) => (
                  <li key={i} className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <span className="shrink-0 text-white/70">{t.agent}</span>
                      <span className="shrink-0 text-white/30">·</span>
                      <span className="truncate text-white/45">{t.task}</span>
                    </div>
                    <span className="shrink-0 rounded bg-emerald-400/10 px-1.5 py-0.5 text-[9px] uppercase text-emerald-300">
                      done · {t.ago}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SYSTEM */}
          <div className="rounded-2xl border border-white/10 bg-stone-950/85 p-4 backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-between border-b border-white/5 pb-2 text-[10px] font-semibold uppercase tracking-widest text-white/50">
              <span>SYSTEM</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                healthy
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              {[
                ["CPU", "4%"],
                ["RAM", "412 MB"],
                ["UPTIME", "12d 4h"],
                ["LATENCY", "1.2s"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-white/40">
                    {k}
                  </span>
                  <span className="tabular-nums text-emerald-300">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function OfficePreview() {
  return (
    <div className="text-white">
      <div className="px-6 py-12 text-center sm:px-12">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-yellow-400">
          ⚠️ Превью — композит maxtreysi-стиля
        </p>
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Пиксельный офис + панели справа
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/60">
          Три варианта фона (V1/V2/V3) с одинаковыми оверлеями TEAM /
          TASK QUEUE / SYSTEM как у maxtreysi. Скажи, какой фон.
        </p>
      </div>

      {variants.map((v) => (
        <OfficeSection
          key={v.id}
          variantLabel={v.label}
          bgUrl={`/vectorupx/office_${v.id}.jpg`}
        />
      ))}

      <div className="px-6 py-24 text-center sm:px-12">
        <p className="text-sm text-white/40">
          Это превью-страница. Боевой лендинг —{" "}
          <a href="/vectorupx/" className="underline hover:text-white">
            на главной
          </a>
          .
        </p>
      </div>
    </div>
  );
}
