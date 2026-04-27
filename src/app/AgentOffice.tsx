"use client";

import { useEffect, useState } from "react";

type Status = "online" | "processing" | "idle";

interface Agent {
  emoji: string;
  name: string;
  role: string;
  desc: string;
  status: Status;
}

const team: Agent[] = [
  // Поток 1 — продажи и поддержка Льва
  {
    emoji: "🦁",
    name: "Лев",
    role: "AI-Продажник",
    desc: "Продаёт услугу 1С-интеграторам в чате, Telegram и через холодные письма.",
    status: "online",
  },
  {
    emoji: "🧑‍💼",
    name: "Капитан",
    role: "AI-Гендиректор",
    desc: "Оркестрирует команду, эскалирует Андрею только важное.",
    status: "online",
  },
  {
    emoji: "⚖️",
    name: "Юрист",
    role: "AI-Юр-консультант",
    desc: "152-ФЗ, ГК РФ, договоры, NDA — отвечает за минуту.",
    status: "online",
  },
  {
    emoji: "🔧",
    name: "Настройщик",
    role: "AI-Тех-специалист",
    desc: "amoCRM, Битрикс24, ЮKassa, DNS — собирает интеграции.",
    status: "online",
  },
  {
    emoji: "📊",
    name: "Тонер",
    role: "AI-Аналитик качества",
    desc: "Слушает диалоги Льва и Лиды, предлагает улучшения промптов.",
    status: "processing",
  },
  // Поток 3 — работа на клиента
  {
    emoji: "🤖",
    name: "Брифер",
    role: "AI-Онбординг",
    desc: "После оплаты собирает 23 поля брифа клиента в фоне.",
    status: "idle",
  },
  {
    emoji: "🤖",
    name: "Лида",
    role: "AI-SDR клиента",
    desc: "Работает на клиента: ищет лидов, ведёт переписку, ставит встречи.",
    status: "online",
  },
  {
    emoji: "✍️",
    name: "Писатель",
    role: "AI-Копирайтер",
    desc: "Пишет персональные холодные письма по брифу клиента.",
    status: "online",
  },
  {
    emoji: "📈",
    name: "Аналитик",
    role: "AI-Отчётность",
    desc: "Еженедельные отчёты клиенту по метрикам кампании.",
    status: "idle",
  },
  // Поток 4 — управление и разведка
  {
    emoji: "🔭",
    name: "Скаут",
    role: "AI-Разведка рынка",
    desc: "Следит за конкурентами AI-SDR в РФ и мире.",
    status: "online",
  },
  // Бонус
  {
    emoji: "📝",
    name: "Контент-агент",
    role: "AI-SMM",
    desc: "Пишет посты в TG-канал VectorUpX 3-5 раз в неделю.",
    status: "idle",
  },
];

const events = [
  "🦁 Лев получил входящий запрос от 1С-интегратора",
  "📊 Тонер закончил анализ диалога #142",
  "🔭 Скаут добавил нового конкурента в наблюдение",
  "✍️ Писатель сгенерировал шаблон холодного письма",
  "🧑‍💼 Капитан утвердил предложение Скаута",
  "⚖️ Юрист ответил на вопрос про 152-ФЗ",
  "🔧 Настройщик помог настроить amoCRM",
  "🤖 Лида забронировала встречу на четверг",
  "📈 Аналитик сформировал еженедельный отчёт",
  "🤖 Брифер получил ответы клиента по этапу 2",
];

const statusConfig: Record<
  Status,
  { dot: string; label: string; text: string; pulse: boolean }
> = {
  online: {
    dot: "bg-emerald-400",
    label: "онлайн",
    text: "text-emerald-300",
    pulse: true,
  },
  processing: {
    dot: "bg-blue-400",
    label: "анализирует",
    text: "text-blue-300",
    pulse: true,
  },
  idle: {
    dot: "bg-white/30",
    label: "отдыхает",
    text: "text-white/50",
    pulse: false,
  },
};

const counters = [
  { n: "11", label: "AI-сотрудников" },
  { n: "24/7", label: "без выходных" },
  { n: "0", label: "больничных" },
  { n: "0", label: "увольнений" },
];

export function AgentOffice() {
  const [eventIdx, setEventIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setEventIdx((i) => (i + 1) % events.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative px-6 py-24 sm:px-12 sm:py-32">
      <div aria-hidden className="parallax-slow absolute inset-0 cosmic-glow-deep-blue-tr" />

      <div className="reveal relative mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-orange-400">
          Виртуальный офис
        </p>
        <h2 className="mb-6 text-5xl font-medium leading-tight tracking-tight sm:text-6xl">
          Команда работает прямо сейчас.
        </h2>
        <p className="mb-12 max-w-2xl text-lg text-white/60">
          11 AI-сотрудников. У каждого своя роль, должность и зона
          ответственности. Не конкурируют, не уходят на больничный,
          не просят повышения.
        </p>

        {/* Счётчики */}
        <div className="mb-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {counters.map((c) => (
            <div
              key={c.label}
              className="bg-stone-950/80 p-6 text-center backdrop-blur-sm"
            >
              <div className="text-3xl font-medium tracking-tight text-orange-400 sm:text-4xl">
                {c.n}
              </div>
              <div className="mt-1 text-xs text-white/55 sm:text-sm">
                {c.label}
              </div>
            </div>
          ))}
        </div>

        {/* Грид агентов */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((a) => {
            const cfg = statusConfig[a.status];
            return (
              <div
                key={a.name}
                className="rounded-2xl border border-white/10 bg-stone-950/60 p-5 backdrop-blur-sm transition hover:border-orange-400/30 hover:bg-stone-900/60"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-stone-900 text-xl">
                      {a.emoji}
                    </div>
                    <div>
                      <div className="font-medium tracking-tight">{a.name}</div>
                      <div className="text-xs text-white/55">{a.role}</div>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${cfg.dot} ${
                        cfg.pulse ? "animate-pulse" : ""
                      }`}
                    />
                    <span className={`text-[11px] ${cfg.text}`}>
                      {cfg.label}
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-white/65">
                  {a.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Лента событий */}
        <div className="rounded-2xl border border-orange-400/20 bg-orange-400/5 p-5 backdrop-blur-sm">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-orange-400">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live · поток событий
          </div>
          <div
            key={eventIdx}
            className="event-line min-h-[1.5em] text-sm text-white/85 sm:text-base"
          >
            {events[eventIdx]}
          </div>
        </div>
      </div>
    </section>
  );
}
