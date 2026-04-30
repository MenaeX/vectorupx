"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const API_BASE = "https://api.vectorupx.com";

type LeadStatus =
  | "cold"
  | "warm"
  | "hot"
  | "paused"
  | "customer"
  | "declined";

type StatusFilter = "all" | "hot" | "warm" | "cold";

interface LeadIndexEntry {
  leadId: string;
  status: LeadStatus;
  name: string;
  role: string;
  companyName: string;
  lastActivityMs: number;
  lastSnippet: string;
}

interface LeadsListResponse {
  ok: boolean;
  leads: LeadIndexEntry[];
  hasMore: boolean;
  nextCursor: number | null;
}

interface MeResponse {
  ok: boolean;
  email: string;
  clientName: string | null;
}

interface LeadProfile {
  leadId: string;
  clientId: string;
  targetCompanyId: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  source: string;
  matchCategory: "full" | "partial" | "none";
  mismatchReason?: string;
  firstContactAtMs?: number;
  letterNumber?: number;
  tags: string[];
}

interface TargetCompanyData {
  targetCompanyId: string;
  companyName: string;
  industry?: string;
  sizeEmployees?: string;
  website?: string;
  inn?: string;
  revenue?: string;
  geo?: string;
  recentNews: string[];
  triggerSignals: string[];
}

type DialogChannel = "telegram" | "email" | "web_chat";
type DialogAuthor = "lead" | "lida" | "lev" | "writer" | "system";
type DialogDirection = "inbound" | "outbound";

interface DialogMessage {
  id: string;
  channel: DialogChannel;
  direction: DialogDirection;
  author: DialogAuthor;
  text: string;
  sentAtMs: number;
  email?: { messageId: string; subject?: string; threadId?: string };
}

interface LeadDetailResponse {
  ok: boolean;
  profile: LeadProfile;
  status: LeadStatus | null;
  company: TargetCompanyData | null;
  messages: DialogMessage[];
}

const STATUS_LABEL: Record<LeadStatus, string> = {
  cold: "Холодный",
  warm: "Тёплый",
  hot: "Горячий",
  paused: "Пауза",
  customer: "Клиент",
  declined: "Отказ",
};

const STATUS_DOT: Record<LeadStatus, string> = {
  cold: "bg-sky-400",
  warm: "bg-amber-300",
  hot: "bg-orange-400",
  paused: "bg-stone-500",
  customer: "bg-emerald-400",
  declined: "bg-stone-600",
};

const FILTER_TABS: Array<{ key: StatusFilter; label: string }> = [
  { key: "all", label: "Все" },
  { key: "hot", label: "Горячие" },
  { key: "warm", label: "Тёплые" },
  { key: "cold", label: "Холодные" },
];

const AUTHOR_LABEL: Record<DialogAuthor, string> = {
  lead: "Лид",
  lida: "Лида",
  lev: "Лев",
  writer: "Писатель",
  system: "Система",
};

const CHANNEL_LABEL: Record<DialogChannel, string> = {
  telegram: "Telegram",
  email: "Email",
  web_chat: "Чат на сайте",
};

export default function LeadsPage() {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [leads, setLeads] = useState<LeadIndexEntry[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<LeadDetailResponse | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuthError = useCallback((status: number): boolean => {
    if (status === 401) {
      window.location.href = "/login";
      return true;
    }
    return false;
  }, []);

  // Первичная загрузка: профиль клиента + список + восстановление выбранного
  // лида из ?id= в URL.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const initialId = params.get("id");
        if (initialId) setSelectedId(initialId);

        const [meRes, leadsRes] = await Promise.all([
          fetch(`${API_BASE}/api/dashboard/me`, { credentials: "include" }),
          fetch(`${API_BASE}/api/dashboard/leads?limit=100`, {
            credentials: "include",
          }),
        ]);
        if (handleAuthError(meRes.status) || handleAuthError(leadsRes.status))
          return;
        if (!meRes.ok || !leadsRes.ok) {
          setError("Не удалось загрузить лидов");
          return;
        }
        const meData = (await meRes.json()) as MeResponse;
        const leadsData = (await leadsRes.json()) as LeadsListResponse;
        if (cancelled) return;
        setMe(meData);
        setLeads(leadsData.leads);
      } catch {
        if (!cancelled) setError("Сервис временно недоступен");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [handleAuthError]);

  // Подгрузка деталей выбранного лида.
  useEffect(() => {
    if (selectedId === null) {
      setDetail(null);
      return;
    }
    let cancelled = false;
    setDetailLoading(true);
    (async () => {
      try {
        const r = await fetch(
          `${API_BASE}/api/dashboard/leads/${encodeURIComponent(selectedId)}`,
          { credentials: "include" },
        );
        if (handleAuthError(r.status)) return;
        if (r.status === 404) {
          if (!cancelled) {
            setDetail(null);
            setError("Лид не найден");
          }
          return;
        }
        if (!r.ok) {
          if (!cancelled) setError("Не удалось загрузить лида");
          return;
        }
        const data = (await r.json()) as LeadDetailResponse;
        if (cancelled) return;
        setDetail(data);
        setError(null);
      } catch {
        if (!cancelled) setError("Сервис временно недоступен");
      } finally {
        if (!cancelled) setDetailLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedId, handleAuthError]);

  const filtered = useMemo(() => {
    if (leads === null) return [];
    if (filter === "all") return leads;
    return leads.filter((l) => l.status === filter);
  }, [leads, filter]);

  function onSelectLead(id: string) {
    setSelectedId(id);
    const url = `/dashboard/leads?id=${encodeURIComponent(id)}`;
    window.history.replaceState({}, "", url);
  }

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
      <div className="relative mx-auto max-w-7xl">
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

        <FilterBar value={filter} onChange={setFilter} />

        <section
          aria-label="Лиды"
          className="grid grid-cols-1 gap-4 lg:grid-cols-[360px_1fr]"
        >
          <LeadsListColumn
            leads={filtered}
            allLoading={leads === null}
            selectedId={selectedId}
            onSelect={onSelectLead}
          />
          <LeadDetailColumn
            detail={detail}
            loading={detailLoading}
            hasSelection={selectedId !== null}
          />
        </section>
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
    <header className="mb-6 flex items-center justify-between gap-4">
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
            className="text-white transition"
            aria-current="page"
          >
            Лиды
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

function FilterBar(props: {
  value: StatusFilter;
  onChange: (v: StatusFilter) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Фильтр по статусу"
      className="mb-5 inline-flex rounded-full border border-white/10 bg-stone-950/60 p-1"
    >
      {FILTER_TABS.map((t) => {
        const active = t.key === props.value;
        return (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => props.onChange(t.key)}
            className={
              active
                ? "rounded-full bg-orange-400 px-4 py-1.5 text-xs font-medium text-stone-950"
                : "rounded-full px-4 py-1.5 text-xs text-white/60 transition hover:text-white"
            }
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function LeadsListColumn(props: {
  leads: LeadIndexEntry[];
  allLoading: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  if (props.allLoading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-stone-950/60 p-8 text-center text-sm text-white/40">
        Загружаем…
      </div>
    );
  }
  if (props.leads.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-stone-950/60 p-8 text-center text-sm text-white/40">
        Лидов в этом фильтре пока нет.
      </div>
    );
  }
  return (
    <ol
      role="listbox"
      aria-label="Список лидов"
      className="max-h-[calc(100vh-12rem)] divide-y divide-white/5 overflow-y-auto rounded-2xl border border-white/10 bg-stone-950/60"
    >
      {props.leads.map((l) => {
        const active = l.leadId === props.selectedId;
        return (
          <li key={l.leadId}>
            <button
              type="button"
              role="option"
              aria-selected={active}
              onClick={() => props.onSelect(l.leadId)}
              className={
                "block w-full px-4 py-3 text-left transition " +
                (active ? "bg-orange-400/10" : "hover:bg-white/5")
              }
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${STATUS_DOT[l.status]}`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="truncate text-sm font-medium text-white">
                      {l.name}
                    </div>
                    <div className="shrink-0 text-xs text-white/40">
                      {formatRelativeRu(l.lastActivityMs)}
                    </div>
                  </div>
                  <div className="mt-0.5 truncate text-xs text-white/50">
                    {l.role} · {l.companyName}
                  </div>
                  <div className="mt-1 line-clamp-2 text-xs text-white/40">
                    {l.lastSnippet}
                  </div>
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

function LeadDetailColumn(props: {
  detail: LeadDetailResponse | null;
  loading: boolean;
  hasSelection: boolean;
}) {
  if (!props.hasSelection) {
    return (
      <div className="rounded-2xl border border-white/10 bg-stone-950/60 p-12 text-center text-sm text-white/40">
        Выберите лида слева, чтобы посмотреть переписку.
      </div>
    );
  }
  if (props.loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-stone-950/60 p-12 text-center text-sm text-white/40">
        Загружаем переписку…
      </div>
    );
  }
  if (!props.detail) {
    return (
      <div className="rounded-2xl border border-white/10 bg-stone-950/60 p-12 text-center text-sm text-white/40">
        Лид не найден.
      </div>
    );
  }

  const { profile, status, company, messages } = props.detail;

  return (
    <article className="flex max-h-[calc(100vh-12rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-stone-950/60">
      <header className="border-b border-white/5 px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-base font-medium text-white">
              {profile.name}
            </div>
            <div className="mt-0.5 text-sm text-white/60">
              {profile.role}
              {company?.companyName && ` · ${company.companyName}`}
            </div>
            {profile.email && (
              <div className="mt-1 text-xs text-white/40">{profile.email}</div>
            )}
          </div>
          {status && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
              <span
                aria-hidden
                className={`h-2 w-2 rounded-full ${STATUS_DOT[status]}`}
              />
              {STATUS_LABEL[status]}
            </span>
          )}
        </div>

        {company && (company.triggerSignals.length > 0 || profile.tags.length > 0) && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {company.triggerSignals.map((s) => (
              <span
                key={`t-${s}`}
                className="rounded-full bg-orange-400/10 px-2.5 py-0.5 text-xs text-orange-300"
              >
                {s}
              </span>
            ))}
            {profile.tags.map((t) => (
              <span
                key={`tag-${t}`}
                className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/60"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {company && (
          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-white/50">
            {company.industry && (
              <div className="flex justify-between gap-2">
                <dt>Отрасль</dt>
                <dd className="text-white/70">{company.industry}</dd>
              </div>
            )}
            {company.sizeEmployees && (
              <div className="flex justify-between gap-2">
                <dt>Размер</dt>
                <dd className="text-white/70">{company.sizeEmployees}</dd>
              </div>
            )}
            {company.geo && (
              <div className="flex justify-between gap-2">
                <dt>География</dt>
                <dd className="text-white/70">{company.geo}</dd>
              </div>
            )}
            {company.revenue && (
              <div className="flex justify-between gap-2">
                <dt>Выручка</dt>
                <dd className="text-white/70">{company.revenue}</dd>
              </div>
            )}
          </dl>
        )}
      </header>

      <ol className="flex-1 space-y-3 overflow-y-auto px-6 py-4">
        {messages.length === 0 ? (
          <li className="text-center text-sm text-white/40">
            Переписки пока нет.
          </li>
        ) : (
          messages.map((m) => <MessageBubble key={m.id} message={m} />)
        )}
      </ol>
    </article>
  );
}

function MessageBubble(props: { message: DialogMessage }) {
  const m = props.message;
  const isOutbound = m.direction === "outbound";
  const subject =
    m.channel === "email" && m.email?.subject ? m.email.subject : null;
  return (
    <li
      className={isOutbound ? "flex justify-end" : "flex justify-start"}
    >
      <div className="max-w-[80%]">
        {subject && (
          <div
            className={
              "mb-1 text-xs font-medium text-white/50 " +
              (isOutbound ? "text-right" : "text-left")
            }
          >
            {subject}
          </div>
        )}
        <div
          className={
            "rounded-2xl px-4 py-3 text-sm whitespace-pre-line " +
            (isOutbound
              ? "bg-orange-400/15 text-white/90"
              : "bg-white/5 text-white/85")
          }
        >
          {m.text}
        </div>
        <div
          className={
            "mt-1 text-xs text-white/40 " +
            (isOutbound ? "text-right" : "text-left")
          }
        >
          {AUTHOR_LABEL[m.author]} · {CHANNEL_LABEL[m.channel]} ·{" "}
          {formatRelativeRu(m.sentAtMs)}
        </div>
      </div>
    </li>
  );
}

function formatRelativeRu(tsMs: number): string {
  const diffMs = Date.now() - tsMs;
  if (diffMs < 60_000) return "только что";
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 60)
    return `${minutes} ${pluralRu(minutes, ["минуту", "минуты", "минут"])} назад`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24)
    return `${hours} ${pluralRu(hours, ["час", "часа", "часов"])} назад`;
  const days = Math.floor(hours / 24);
  if (days < 7)
    return `${days} ${pluralRu(days, ["день", "дня", "дней"])} назад`;
  return new Date(tsMs).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
}

function pluralRu(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
    return forms[1];
  return forms[2];
}
