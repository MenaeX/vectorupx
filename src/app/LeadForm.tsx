"use client";

import { useState, type FormEvent } from "react";

const WORKER_URL = "https://bot-relay.amenshikov007.workers.dev/form";

type Status = "idle" | "sending" | "ok" | "error";

export function LeadForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — скрыт от людей, заполняется ботами
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, contact, message, website }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      setStatus("ok");
      setName("");
      setCompany("");
      setContact("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Не получилось отправить"
      );
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-orange-400/40 bg-stone-950/80 p-10 text-center backdrop-blur-sm">
        <div className="mb-4 text-3xl">✓</div>
        <h3 className="mb-3 text-2xl font-medium tracking-tight">Заявка получена</h3>
        <p className="text-white/70">
          Лида разберёт вашу нишу и напишет в течение часа в рабочее время.
          Если срочно — напишите напрямую, ссылки ниже.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-stone-950/60 px-4 py-3 text-base text-white placeholder:text-white/40 transition focus:border-orange-400/60 focus:outline-none focus:ring-2 focus:ring-orange-400/20";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-white/10 bg-stone-950/60 p-6 backdrop-blur-sm sm:p-8"
    >
      {/* Honeypot — скрытое поле, реальные пользователи его не видят */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Не заполняйте это поле:
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-white/70">Как вас зовут</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Иван Петров"
            className={inputCls}
            required
            maxLength={200}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-white/70">Компания</span>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="ООО «Ромашка»"
            className={inputCls}
            maxLength={200}
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block text-sm text-white/70">
          Контакт для связи <span className="text-orange-400">*</span>
        </span>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Telegram @username, email, или телефон"
          className={inputCls}
          required
          maxLength={300}
        />
      </label>

      <label className="mt-4 block">
        <span className="mb-2 block text-sm text-white/70">
          Чем занимается компания и что хотите получить от Лиды
        </span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Например: 1С-интегратор в Москве, целевая 50-500 чел, нужны встречи с финдиректорами"
          rows={4}
          className={`${inputCls} resize-y`}
          maxLength={2000}
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-full bg-orange-400 px-8 py-4 text-base font-medium text-stone-950 shadow-lg shadow-orange-500/30 transition hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Отправляю…" : "Отправить заявку →"}
      </button>

      {status === "error" && (
        <p className="mt-4 text-center text-sm text-red-400">
          Не получилось отправить ({errorMsg}). Напишите напрямую — ссылки ниже.
        </p>
      )}

      <p className="mt-4 text-center text-xs text-white/40">
        Отправляя форму, вы соглашаетесь на обработку персональных данных.
        Никакого спама, никаких рассылок — только ответ Лиды.
      </p>
    </form>
  );
}
