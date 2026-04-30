"use client";

import { type FormEvent, useState } from "react";

// Worker отдаёт авторизацию на api.vectorupx.com. credentials: "include"
// обязательно — без него браузер не примет Set-Cookie с другого поддомена,
// даже если Domain=.vectorupx.com.
const API_BASE = "https://api.vectorupx.com";

interface LoginResponse {
  ok: boolean;
  error?: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const r = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = (await r.json()) as LoginResponse;
      if (data.ok) {
        // /dashboard ещё не создан — после редиректа GitHub Pages
        // отдаст 404. Это норма для текущей сессии, кабинет добавим
        // следующим шагом.
        window.location.href = "/dashboard";
        return;
      }
      setError(
        data.error === "missing_credentials"
          ? "Введите email и пароль"
          : "Неверный email или пароль",
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

      <form
        onSubmit={onSubmit}
        className="reveal relative w-full max-w-sm rounded-2xl border border-white/10 bg-stone-950/70 p-8 shadow-2xl backdrop-blur-sm"
      >
        <a
          href="/"
          className="mb-6 block text-center text-sm font-medium uppercase tracking-widest text-orange-400 transition hover:text-orange-300"
        >
          VectorUpX
        </a>

        <h1 className="mb-1 text-center text-2xl font-medium tracking-tight">
          Вход в кабинет
        </h1>
        <p className="mb-6 text-center text-sm text-white/50">
          Только для клиентов VectorUpX.
        </p>

        <div className="space-y-3">
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
          <input
            type="password"
            autoComplete="current-password"
            required
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-stone-900/60 px-4 py-3 text-sm placeholder:text-white/30 focus:border-orange-400/60 focus:outline-none"
          />
        </div>

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
          disabled={loading || !email || !password}
          className="mt-6 w-full rounded-full bg-orange-400 px-4 py-3 text-sm font-medium text-stone-950 transition hover:bg-orange-300 disabled:cursor-not-allowed disabled:bg-orange-400/40 disabled:text-stone-950/60"
        >
          {loading ? "Входим…" : "Войти"}
        </button>

        <a
          href="/forgot-password"
          className="mt-4 block text-center text-xs text-white/50 transition hover:text-white/80"
        >
          Забыли пароль?
        </a>
      </form>
    </main>
  );
}
