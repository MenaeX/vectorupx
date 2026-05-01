"use client";

import { type FormEvent, useEffect, useState } from "react";

const API_BASE = "https://api.vectorupx.com";
const MIN_PASSWORD_LENGTH = 8;

interface ResetResponse {
  ok: boolean;
  error?: string;
}

export default function ResetPasswordPage() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Читаем token из URL вручную, без useSearchParams — иначе для
  // output:'export' нужен Suspense boundary, а одна строка не стоит того.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token"));
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Ссылка повреждена. Запросите новую через «Забыли пароль?».");
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Пароль должен быть от ${MIN_PASSWORD_LENGTH} символов.`);
      return;
    }
    if (password !== confirm) {
      setError("Пароли не совпадают.");
      return;
    }

    setLoading(true);
    try {
      const r = await fetch(`${API_BASE}/api/auth/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = (await r.json()) as ResetResponse;
      if (data.ok) {
        setDone(true);
        return;
      }
      if (data.error === "invalid_token") {
        setError(
          "Ссылка устарела или уже использовалась. Запросите новую через «Забыли пароль?».",
        );
      } else if (data.error === "password_too_short") {
        setError(`Пароль должен быть от ${MIN_PASSWORD_LENGTH} символов.`);
      } else {
        setError("Не удалось сменить пароль. Попробуйте через минуту.");
      }
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

        {done ? (
          <>
            <h1 className="mb-3 text-center text-2xl font-medium tracking-tight">
              Пароль обновлён
            </h1>
            <p className="mb-6 text-center text-sm leading-relaxed text-white/60">
              Теперь вы можете войти в кабинет с новым паролем.
            </p>
            <a
              href="/login"
              className="block w-full rounded-full bg-orange-400 px-4 py-3 text-center text-sm font-medium text-stone-950 transition hover:bg-orange-300"
            >
              Войти
            </a>
          </>
        ) : (
          <form onSubmit={onSubmit}>
            <h1 className="mb-1 text-center text-2xl font-medium tracking-tight">
              Новый пароль
            </h1>
            <p className="mb-6 text-center text-sm text-white/50">
              Минимум {MIN_PASSWORD_LENGTH} символов.
            </p>

            <div className="space-y-3">
              <input
                type="password"
                autoComplete="new-password"
                required
                placeholder="Новый пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-stone-900/60 px-4 py-3 text-sm placeholder:text-white/30 focus:border-orange-400/60 focus:outline-none"
              />
              <input
                type="password"
                autoComplete="new-password"
                required
                placeholder="Повторите пароль"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
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
              disabled={loading || !password || !confirm}
              className="mt-6 w-full rounded-full bg-orange-400 px-4 py-3 text-sm font-medium text-stone-950 transition hover:bg-orange-300 disabled:cursor-not-allowed disabled:bg-orange-400/40 disabled:text-stone-950/60"
            >
              {loading ? "Обновляем…" : "Сменить пароль"}
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
