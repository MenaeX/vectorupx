"use client";

import { useEffect, useState } from "react";

type Status = "active" | "idle" | "processing";

interface Agent {
  emoji: string;
  name: string;
  role: string;
  status: Status;
}

const team: Agent[] = [
  { emoji: "🦁", name: "Лев", role: "AI-Продажник", status: "active" },
  { emoji: "🧑‍💼", name: "Капитан", role: "AI-Гендиректор", status: "idle" },
  { emoji: "⚖️", name: "Юрист", role: "AI-Юр-консультант", status: "idle" },
  { emoji: "🔧", name: "Настройщик", role: "AI-Тех-специалист", status: "idle" },
  { emoji: "📊", name: "Тонер", role: "AI-Аналитик качества", status: "processing" },
  { emoji: "🤖", name: "Брифер", role: "AI-Онбординг", status: "idle" },
  { emoji: "🤖", name: "Лида", role: "AI-SDR клиента", status: "active" },
  { emoji: "✍️", name: "Писатель", role: "AI-Копирайтер", status: "active" },
  { emoji: "📈", name: "Аналитик", role: "AI-Отчётность", status: "idle" },
  { emoji: "🔭", name: "Скаут", role: "AI-Разведка рынка", status: "active" },
  { emoji: "📝", name: "Контент-агент", role: "AI-SMM", status: "idle" },
];

interface ActiveTask {
  emoji: string;
  agent: string;
  task: string;
}

const activeTaskCycle: ActiveTask[] = [
  { emoji: "🦁", agent: "Лев", task: "обрабатывает входящий запрос от 1С-интегратора" },
  { emoji: "✍️", agent: "Писатель", task: "генерирует шаблон холодного письма" },
  { emoji: "🔭", agent: "Скаут", task: "анализирует тарифы конкурента" },
  { emoji: "📊", agent: "Тонер", task: "разбирает диалог #142" },
  { emoji: "🤖", agent: "Лида", task: "ведёт переписку с лидом клиента" },
];

interface CompletedTask {
  emoji: string;
  agent: string;
  task: string;
  ago: string;
}

const completedTasks: CompletedTask[] = [
  { emoji: "📊", agent: "Тонер", task: "анализ диалога #142", ago: "2 мин" },
  { emoji: "🔭", agent: "Скаут", task: "добавил конкурента в наблюдение", ago: "12 мин" },
  { emoji: "⚖️", agent: "Юрист", task: "ответил по 152-ФЗ ст. 18", ago: "18 мин" },
  { emoji: "✍️", agent: "Писатель", task: "шаблон письма для ниши SaaS", ago: "24 мин" },
  { emoji: "🦁", agent: "Лев", task: "ответ 1С-интегратору АльфаПром", ago: "31 мин" },
  { emoji: "🤖", agent: "Брифер", task: "обработал бриф клиента (этап 2)", ago: "47 мин" },
  { emoji: "📈", agent: "Аналитик", task: "сформировал еженедельный отчёт", ago: "1 ч" },
  { emoji: "🔧", agent: "Настройщик", task: "помог настроить amoCRM", ago: "2 ч" },
];

const systemMetrics: Array<[string, string]> = [
  ["CPU", "4%"],
  ["RAM", "412 / 8192 MB"],
  ["DISK", "31 / 100 GB"],
  ["UPTIME", "12d 4h 17m"],
  ["API CALLS", "47 219"],
  ["LATENCY", "1.2 s"],
];

const statusConfig: Record<Status, { dot: string; label: string; pulse: boolean }> = {
  active: { dot: "bg-emerald-400", label: "active", pulse: true },
  processing: { dot: "bg-blue-400", label: "processing", pulse: true },
  idle: { dot: "bg-emerald-400/40", label: "idle", pulse: false },
};

export function AgentOffice() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIdx((i) => (i + 1) % activeTaskCycle.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const active = activeTaskCycle[activeIdx];

  return (
    <section className="relative px-6 py-24 sm:px-12 sm:py-32">
      <div aria-hidden className="parallax-slow absolute inset-0 cosmic-glow-deep-blue-tr" />

      <div className="reveal relative mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-orange-400">
          Виртуальный офис
        </p>
        <h2 className="mb-6 text-5xl font-medium leading-tight tracking-tight sm:text-6xl">
          Команда работает прямо сейчас.
        </h2>
        <p className="mb-12 max-w-2xl text-lg text-white/60">
          11 AI-сотрудников. Каждый со своей ролью. Не уходят на больничный,
          не просят повышения, не конкурируют за бонус.
        </p>

        <div className="space-y-4 font-mono">
          {/* ── TEAM ──────────────────────────────────── */}
          <div className="rounded-2xl border border-white/10 bg-stone-950/80 p-5 backdrop-blur-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3 text-[11px] font-semibold uppercase tracking-widest text-white/50">
              <span>TEAM</span>
              <span>11 агентов</span>
            </div>
            <ul className="space-y-2.5">
              {team.map((a) => {
                const cfg = statusConfig[a.status];
                return (
                  <li
                    key={a.name}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <span
                        aria-hidden
                        className={`inline-block h-2 w-2 shrink-0 rounded-full ${cfg.dot} ${
                          cfg.pulse ? "animate-pulse" : ""
                        }`}
                      />
                      <span aria-hidden className="shrink-0 text-base">
                        {a.emoji}
                      </span>
                      <span className="shrink-0 font-medium text-white/90">
                        {a.name}
                      </span>
                      <span className="hidden truncate text-xs text-white/45 sm:inline">
                        {a.role}
                      </span>
                    </div>
                    <span className="shrink-0 text-xs text-white/40">{cfg.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── TASK QUEUE ────────────────────────────── */}
          <div className="rounded-2xl border border-white/10 bg-stone-950/80 p-5 backdrop-blur-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3 text-[11px] font-semibold uppercase tracking-widest text-white/50">
              <span>TASK QUEUE</span>
              <span className="rounded-md border border-orange-400/40 bg-orange-400/10 px-2 py-0.5 text-[10px] tracking-widest text-orange-300">
                + new
              </span>
            </div>

            {/* Active */}
            <div className="mb-5">
              <div className="mb-1.5 text-[10px] uppercase tracking-widest text-white/40">
                Active
              </div>
              <div
                key={activeIdx}
                className="event-line flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-3 py-2.5 text-sm"
              >
                <span className="inline-block h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-400" />
                <span aria-hidden className="shrink-0 text-base">
                  {active.emoji}
                </span>
                <span className="shrink-0 font-medium text-white/90">
                  {active.agent}
                </span>
                <span className="truncate text-white/55">·</span>
                <span className="truncate text-white/70">{active.task}</span>
              </div>
            </div>

            {/* Completed log */}
            <div>
              <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/40">
                <span>▼ COMPLETED {completedTasks.length}+</span>
              </div>
              <ul className="space-y-1.5">
                {completedTasks.map((t, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <span aria-hidden className="shrink-0 text-sm">
                        {t.emoji}
                      </span>
                      <span className="shrink-0 text-white/75">{t.agent}</span>
                      <span className="shrink-0 text-white/30">·</span>
                      <span className="truncate text-white/50">{t.task}</span>
                    </div>
                    <span className="shrink-0 rounded-md bg-emerald-400/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-300">
                      done · {t.ago}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── SYSTEM ────────────────────────────────── */}
          <div className="rounded-2xl border border-white/10 bg-stone-950/80 p-5 backdrop-blur-sm sm:p-6">
            <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3 text-[11px] font-semibold uppercase tracking-widest text-white/50">
              <span>SYSTEM</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                healthy
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
              {systemMetrics.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-2 border-b border-white/5 pb-1.5"
                >
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
