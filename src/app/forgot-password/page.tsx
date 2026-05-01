"use client";

import { type FormEvent, useState } from "react";

const API_BASE = "https://api.vectorupx.com";

interface ForgotResponse {
  ok: boolean;
  error?: string;
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const r = await fetch(`${API_BASE}/api/auth/forgot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await r.json()) as ForgotResponse;
      if (data.ok) {
        setSubmitted(true);
        return;
      }
      setError(
        data.error === "missing_email"
          ? "Введите email"
          : "Не удалось отправить письмо. Попробуйте через минуту.",
      );
    } catch {
      setError("Сервис временно недоступен. Попробуйте через минуту.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <div
        aria-hidden
        className="parallax-slow absolute inset-0 cosmic-glow-warm-tl"
      />

      <div className="reveal relative w-full max-w-sm rounded-2xl border border-white/10 bg-stone-950/70 p-8 shadow-2xl backdrop-blur-sm">
        <a
          href="/"
          className="mb-6 block text-center text-sm font-medium uppercase tracking-widest text-orange-400 transition hover:text-orange-300"
        >
          VectorUpX
        </a>

        {submitted ? (
          <>
            <h1 className="mb-3 text-center text-2xl font-medium tracking-tight">
              Письмо отправлено
            </h1>
            <p className="mb-6 text-center text-sm leading-relaxed text-white/60">
              Если такой email зарегистрирован, мы отправили на него ссылку для
              сброса пароля. Проверьте папку «Входящие» и «Спам». Ссылка
              действует 1 час.
            </p>
            <a
              href="/login"
              className="block w-full rounded-full border border-white/15 px-4 py-3 text-center text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Вернуться ко входу
            </a>
          </>
        ) : (
          <form onSubmit={onSubmit}>
            <h1 className="mb-1 text-center text-2xl font-medium tracking-tight">
              Забыли пароль?
            </h1>
            <p className="mb-6 text-center text-sm text-white/50">
              Укажите email, на который зарегистрирован кабинет.
            </p>

            <input
              type="email"
              inputMode="email"
              autoComplete="username"
              required
              placeholder="email@компания.ру"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-stone-900/60 px-4 py-3 text-sm placeholder:text-white/30 focus:border-orange-400/60 focus:outline-none"
            />

            {error && (
              <p
                role="alert"
                className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !email}
              className="mt-6 w-full rounded-full bg-orange-400 px-4 py-3 text-sm font-medium text-stone-950 transition hover:bg-orange-300 disabled:cursor-not-allowed disabled:bg-orange-400/40 disabled:text-stone-950/60"
            >
              {loading ? "Отправляем…" : "Отправить ссылку"}
            </button>

            <a
              href="/login"
              className="mt-4 block text-center text-xs text-white/50 transition hover:text-white/80"
            >
              Вернуться ко входу
            </a>
          </form>
        )}
      </div>
    </main>
  );
}
