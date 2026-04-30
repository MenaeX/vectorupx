"use client";

import { useCallback, useEffect, useState } from "react";

const API_BASE = "https://api.vectorupx.com";

type MeetingStatus = "confirmed" | "tentative" | "cancelled";

interface Meeting {
  meetingId: string;
  leadId?: string;
  leadName: string;
  companyName: string;
  scheduledAtMs: number;
  durationMin: number;
  calendarLink?: string;
  topic: string;
  status: MeetingStatus;
}

interface CalendarResponse {
  ok: boolean;
  meetings: Meeting[];
}

interface MeResponse {
  ok: boolean;
  email: string;
  clientName: string | null;
}

const STATUS_LABEL: Record<MeetingStatus, string> = {
  confirmed: "Подтверждено",
  tentative: "Предварительно",
  cancelled: "Отменено",
};

const STATUS_DOT: Record<MeetingStatus, string> = {
  confirmed: "bg-emerald-400",
  tentative: "bg-amber-300",
  cancelled: "bg-stone-500",
};

export default function CalendarPage() {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [meetings, setMeetings] = useState<Meeting[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAuthError = useCallback((status: number): boolean => {
    if (status === 401) {
      window.location.href = "/login";
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [meRes, calRes] = await Promise.all([
          fetch(`${API_BASE}/api/dashboard/me`, { credentials: "include" }),
          fetch(`${API_BASE}/api/dashboard/calendar`, {
            credentials: "include",
          }),
        ]);
        if (handleAuthError(meRes.status) || handleAuthError(calRes.status))
          return;
        if (!meRes.ok || !calRes.ok) {
          setError("Не удалось загрузить календарь");
          return;
        }
        const meData = (await meRes.json()) as MeResponse;
        const calData = (await calRes.json()) as CalendarResponse;
        if (cancelled) return;
        setMe(meData);
        setMeetings(calData.meetings);
      } catch {
        if (!cancelled) setError("Сервис временно недоступен");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [handleAuthError]);

  async function onLogout() {
    try {
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Кука всё равно истечёт по Max-Age.
    }
    window.location.href = "/login";
  }

  return (
    <main className="relative min-h-screen px-4 py-8 sm:px-8">
      <div
        aria-hidden
        className="parallax-slow pointer-events-none absolute inset-0 cosmic-glow-warm-tl"
      />
      <div className="relative mx-auto max-w-4xl">
        <TopBar
          email={me?.email ?? null}
          clientName={me?.clientName ?? null}
          onLogout={onLogout}
        />

        {error && (
          <p
            role="alert"
            className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {error}
          </p>
        )}

        <h1 className="mb-6 text-lg font-medium text-white">
          Ближайшие встречи
        </h1>

        <Agenda meetings={meetings} />
      </div>
    </main>
  );
}

function TopBar(props: {
  email: string | null;
  clientName: string | null;
  onLogout: () => void;
}) {
  return (
    <header className="mb-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-6">
        <a
          href="/"
          className="text-sm font-medium uppercase tracking-widest text-orange-400 transition hover:text-orange-300"
        >
          VectorUpX
        </a>
        <nav className="flex items-center gap-4 text-sm">
          <a
            href="/dashboard"
            className="text-white/60 transition hover:text-white"
          >
            Метрики
          </a>
          <a
            href="/dashboard/leads"
            className="text-white/60 transition hover:text-white"
          >
            Лиды
          </a>
          <a
            href="/dashboard/calendar"
            className="text-white transition"
            aria-current="page"
          >
            Календарь
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden text-right sm:block">
          {props.clientName && (
            <div className="text-sm text-white/80">{props.clientName}</div>
          )}
          {props.email && (
            <div className="text-xs text-white/50">{props.email}</div>
          )}
        </div>
        <button
          type="button"
          onClick={props.onLogout}
          className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/70 transition hover:border-white/30 hover:text-white"
        >
          Выйти
        </button>
      </div>
    </header>
  );
}

function Agenda(props: { meetings: Meeting[] | null }) {
  if (props.meetings === null) {
    return (
      <div className="rounded-2xl border border-white/10 bg-stone-950/60 p-8 text-center text-sm text-white/40">
        Загружаем…
      </div>
    );
  }
  if (props.meetings.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-stone-950/60 p-8 text-center text-sm text-white/40">
        Встреч пока нет. Появятся, когда лиды согласуют время.
      </div>
    );
  }

  const groups = groupByDay(props.meetings);

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <section key={group.dayKey} aria-label={group.dayLabel}>
          <div className="mb-2 flex items-baseline gap-3">
            <h2 className="text-sm font-medium uppercase tracking-wider text-white/60">
              {group.dayLabel}
            </h2>
            {group.isToday && (
              <span className="rounded-full bg-orange-400/15 px-2 py-0.5 text-xs text-orange-300">
                Сегодня
              </span>
            )}
          </div>
          <ol className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-stone-950/60">
            {group.meetings.map((m) => (
              <MeetingRow key={m.meetingId} meeting={m} />
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

function MeetingRow(props: { meeting: Meeting }) {
  const m = props.meeting;
  const start = new Date(m.scheduledAtMs);
  const end = new Date(m.scheduledAtMs + m.durationMin * 60_000);
  const timeRange = `${formatHm(start)}–${formatHm(end)}`;

  return (
    <li className="flex items-start gap-4 px-5 py-4">
      <div className="w-24 shrink-0 text-sm font-medium text-white/80 tabular-nums">
        {timeRange}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-sm font-medium text-white">{m.topic}</div>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-white/50">
            <span
              aria-hidden
              className={`h-2 w-2 rounded-full ${STATUS_DOT[m.status]}`}
            />
            {STATUS_LABEL[m.status]}
          </span>
        </div>
        <div className="mt-0.5 truncate text-xs text-white/50">
          {m.leadName} · {m.companyName} · {m.durationMin} мин
        </div>
        {m.calendarLink && (
          <a
            href={m.calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-xs text-orange-300 transition hover:text-orange-200"
          >
            Подключиться →
          </a>
        )}
      </div>
    </li>
  );
}

interface DayGroup {
  dayKey: string;
  dayLabel: string;
  isToday: boolean;
  meetings: Meeting[];
}

function groupByDay(meetings: Meeting[]): DayGroup[] {
  const map = new Map<string, Meeting[]>();
  for (const m of meetings) {
    const d = new Date(m.scheduledAtMs);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    const arr = map.get(key) ?? [];
    arr.push(m);
    map.set(key, arr);
  }

  const todayKey = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  })();

  return Array.from(map.entries())
    .sort(([, a], [, b]) => a[0].scheduledAtMs - b[0].scheduledAtMs)
    .map(([key, items]) => ({
      dayKey: key,
      dayLabel: formatDayLabel(items[0].scheduledAtMs),
      isToday: key === todayKey,
      meetings: items,
    }));
}

function formatDayLabel(tsMs: number): string {
  const target = new Date(tsMs);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetMidnight = new Date(target);
  targetMidnight.setHours(0, 0, 0, 0);
  const diffDays = Math.round(
    (targetMidnight.getTime() - today.getTime()) / (24 * 60 * 60 * 1000),
  );
  if (diffDays === 0) {
    return target.toLocaleDateString("ru-RU", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }
  if (diffDays === 1) {
    return `Завтра, ${target.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}`;
  }
  return target.toLocaleDateString("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function formatHm(d: Date): string {
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
