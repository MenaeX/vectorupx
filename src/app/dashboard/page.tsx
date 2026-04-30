"use client";

import { useCallback, useEffect, useState } from "react";

const API_BASE = "https://api.vectorupx.com";

type Period = "today" | "week" | "month" | "all";

const PERIOD_LABELS: Record<Period, string> = {
  today: "Сегодня",
  week: "Неделя",
  month: "Месяц",
  all: "Всего",
};

interface MeResponse {
  ok: boolean;
  email: string;
  clientName: string | null;
}

interface MetricsResponse {
  ok: boolean;
  period: Period;
  parsed: number;
  sent: number;
  opened: number;
  replied: number;
  meetings: number;
  sinceMs: number;
}

type FeedKind =
  | "parsed"
  | "sent"
  | "opened"
  | "replied"
  | "meeting"
  | "system";

interface FeedEvent {
  id: string;
  tsMs: number;
  kind: FeedKind;
  text: string;
  leadId?: string;
}

interface FeedResponse {
  ok: boolean;
  events: FeedEvent[];
}

const KIND_DOT: Record<FeedKind, string> = {
  parsed: "bg-sky-400",
  sent: "bg-amber-300",
  opened: "bg-violet-400",
  replied: "bg-emerald-400",
  meeting: "bg-orange-400",
  system: "bg-stone-500",
};

const KIND_LABEL: Record<FeedKind, string> = {
  parsed: "Парсинг",
  sent: "Письмо",
  opened: "Открыто",
  replied: "Ответ",
  meeting: "Встреча",
  system: "Система",
};

const TILES: Array<{
  key: keyof Pick<
    MetricsResponse,
    "parsed" | "sent" | "opened" | "replied" | "meetings"
  >;
  label: string;
  hint: string;
}> = [
  { key: "parsed", label: "Лидов спарсено", hint: "Найдено в нише" },
  { key: "sent", label: "Писем отправлено", hint: "Доставлено" },
  { key: "opened", label: "Открыто", hint: "Прочитано адресатом" },
  { key: "replied", label: "Ответов", hint: "Получили реакцию" },
  { key: "meetings", label: "Встреч", hint: "Назначено в календаре" },
];

export default function DashboardPage() {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [period, setPeriod] = useState<Period>("all");
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [events, setEvents] = useState<FeedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleAuthError = useCallback((status: number): boolean => {
    if (status === 401) {
      window.location.href = "/login";
      return true;
    }
    return false;
  }, []);

  // Первая загрузка: me + feed (one-shot) + metrics (зависит от period).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [meRes, feedRes] = await Promise.all([
          fetch(`${API_BASE}/api/dashboard/me`, { credentials: "include" }),
          fetch(`${API_BASE}/api/dashboard/feed?limit=20`, {
            credentials: "include",
          }),
        ]);
        if (handleAuthError(meRes.status) || handleAuthError(feedRes.status))
          return;
        if (!meRes.ok || !feedRes.ok) {
          setError("Не удалось загрузить кабинет");
          return;
        }
        const meData = (await meRes.json()) as MeResponse;
        const feedData = (await feedRes.json()) as FeedResponse;
        if (cancelled) return;
        setMe(meData);
        setEvents(feedData.events);
      } catch {
        if (!cancelled) setError("Сервис временно недоступен");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [handleAuthError]);

  // Метрики перезагружаются при смене периода.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const r = await fetch(
          `${API_BASE}/api/dashboard/metrics?period=${period}`,
          { credentials: "include" },
        );
        if (handleAuthError(r.status)) return;
        if (!r.ok) {
          setError("Не удалось загрузить метрики");
          return;
        }
        const data = (await r.json()) as MetricsResponse;
        if (cancelled) return;
        setMetrics(data);
      } catch {
        if (!cancelled) setError("Сервис временно недоступен");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [period, handleAuthError]);

  async function onLogout() {
    try {
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Даже если запрос не дошёл — кука истечёт по Max-Age,
      // а на /login защита от анонимов не нужна.
    }
    window.location.href = "/login";
  }

  return (
    <main className="relative min-h-screen px-4 py-8 sm:px-8">
      <div
        aria-hidden
        className="parallax-slow pointer-events-none absolute inset-0 cosmic-glow-warm-tl"
      />

      <div className="relative mx-auto max-w-6xl">
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

        <PeriodSwitcher value={period} onChange={setPeriod} />

        <Tiles metrics={metrics} loading={loading} />

        <FeedList events={events} />
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
      <a
        href="/"
        className="text-sm font-medium uppercase tracking-widest text-orange-400 transition hover:text-orange-300"
      >
        VectorUpX
      </a>
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

function PeriodSwitcher(props: {
  value: Period;
  onChange: (p: Period) => void;
}) {
  const periods: Period[] = ["today", "week", "month", "all"];
  return (
    <div
      role="tablist"
      aria-label="Период метрик"
      className="mb-6 inline-flex rounded-full border border-white/10 bg-stone-950/60 p-1"
    >
      {periods.map((p) => {
        const active = p === props.value;
        return (
          <button
            key={p}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => props.onChange(p)}
            className={
              active
                ? "rounded-full bg-orange-400 px-4 py-1.5 text-xs font-medium text-stone-950"
                : "rounded-full px-4 py-1.5 text-xs text-white/60 transition hover:text-white"
            }
          >
            {PERIOD_LABELS[p]}
          </button>
        );
      })}
    </div>
  );
}

function Tiles(props: {
  metrics: MetricsResponse | null;
  loading: boolean;
}) {
  return (
    <section
      aria-label="Ключевые метрики"
      className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
    >
      {TILES.map((tile) => {
        const value = props.metrics ? props.metrics[tile.key] : null;
        return (
          <div
            key={tile.key}
            className="rounded-2xl border border-white/10 bg-stone-950/60 p-5 backdrop-blur-sm"
          >
            <div className="text-xs uppercase tracking-wider text-white/40">
              {tile.label}
            </div>
            <div className="mt-2 text-3xl font-medium tracking-tight text-white">
              {props.loading || value === null ? "—" : value.toLocaleString("ru-RU")}
            </div>
            <div className="mt-1 text-xs text-white/40">{tile.hint}</div>
          </div>
        );
      })}
    </section>
  );
}

function FeedList(props: { events: FeedEvent[] }) {
  if (props.events.length === 0) {
    return (
      <section
        aria-label="Лента событий"
        className="rounded-2xl border border-white/10 bg-stone-950/60 p-8 text-center text-sm text-white/40"
      >
        Лента пока пустая. События появятся после первого парсинга и рассылки.
      </section>
    );
  }

  return (
    <section aria-label="Лента событий">
      <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-white/50">
        Лента
      </h2>
      <ol className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-stone-950/60">
        {props.events.map((e) => (
          <li
            key={e.id}
            className="flex items-start gap-3 px-5 py-3 text-sm"
          >
            <span
              aria-hidden
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${KIND_DOT[e.kind]}`}
            />
            <div className="min-w-0 flex-1">
              <div className="text-white/90">{e.text}</div>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-white/40">
                <span>{KIND_LABEL[e.kind]}</span>
                <span aria-hidden>·</span>
                <span>{formatRelativeRu(e.tsMs)}</span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function formatRelativeRu(tsMs: number): string {
  const diffMs = Date.now() - tsMs;
  if (diffMs < 60_000) return "только что";
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 60) return `${minutes} ${pluralRu(minutes, ["минуту", "минуты", "минут"])} назад`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${pluralRu(hours, ["час", "часа", "часов"])} назад`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ${pluralRu(days, ["день", "дня", "дней"])} назад`;
  return new Date(tsMs).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
}

function pluralRu(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}
