"use client";

import { useEffect, useState } from "react";

export function LevChatWidget() {
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => setShowHint(true), 4000);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (open) setShowHint(false);
  }, [open]);

  return (
    <>
      {/* Плавающая кнопка */}
      <button
        type="button"
        aria-label="Открыть чат со Львом"
        onClick={() => setOpen(true)}
        className={`group fixed right-5 bottom-5 z-40 transition-opacity sm:right-6 sm:bottom-6 ${
          open ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <span
          aria-hidden
          className="absolute inset-0 -z-10 animate-pulse rounded-full bg-orange-400/40 blur-xl group-hover:bg-orange-300/60"
        />
        <span className="relative block h-14 w-14 overflow-hidden rounded-full border-2 border-orange-400/60 bg-stone-900 shadow-lg shadow-orange-900/40 transition group-hover:scale-105 sm:h-16 sm:w-16 [clip-path:circle(50%)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/vectorupx/lev.jpg"
            alt="Лев"
            className="h-full w-full object-cover"
          />
        </span>
        <span
          aria-hidden
          className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 animate-pulse rounded-full bg-emerald-400 ring-2 ring-stone-950"
        />
      </button>

      {/* Подсказка-облачко */}
      {showHint && !open && (
        <button
          type="button"
          aria-label="Открыть чат со Львом"
          onClick={() => setOpen(true)}
          className="fixed right-5 bottom-24 z-40 max-w-[260px] rounded-2xl rounded-br-sm border border-orange-400/30 bg-stone-950/95 p-4 text-left text-sm leading-relaxed text-white/85 shadow-xl backdrop-blur-sm transition hover:border-orange-400/60 sm:right-6"
        >
          <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-orange-400">
            Лев
          </span>
          Привет! Расскажу про Лиду и помогу с запуском.
        </button>
      )}

      {/* Панель чата */}
      {open && (
        <div className="fixed inset-0 z-50 sm:flex sm:items-end sm:justify-end sm:p-6">
          <div
            aria-hidden
            className="absolute inset-0 bg-black/40 backdrop-blur-sm sm:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="relative flex h-full w-full max-w-md flex-col bg-stone-950/95 shadow-2xl sm:h-[560px] sm:rounded-2xl sm:border sm:border-orange-400/30">
            {/* Шапка */}
            <div className="flex items-center gap-3 border-b border-white/10 p-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-orange-400/40 bg-stone-900 [clip-path:circle(50%)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/vectorupx/lev.jpg"
                  alt="Лев"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Лев · VectorUpX
                </div>
                <div className="text-xs text-white/50">
                  AI-продажник · в разработке
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Закрыть"
                className="rounded-full p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Тело чата */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-orange-400/20 bg-orange-400/10 px-4 py-3 text-sm leading-relaxed text-white/90">
                  Привет! Я Лев — AI-продажник VectorUpX. Помогу разобраться,
                  как Лида может работать на вас, и оформить запуск.
                  <br />
                  <br />
                  Сейчас меня настраивают — отвечать в этом окне смогу через
                  несколько дней. Пока напишите мне в Telegram или заполните
                  форму ниже — отвечу там.
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <a
                  href="https://t.me/vectorupx_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-orange-400/40 bg-orange-400/10 px-4 py-2.5 text-center text-sm font-medium text-orange-200 transition hover:bg-orange-400/20"
                >
                  Открыть Telegram
                </a>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-center text-sm text-white/80 transition hover:bg-white/10"
                >
                  Заполнить форму
                </a>
              </div>
            </div>

            {/* Поле ввода (заглушка) */}
            <div className="border-t border-white/10 p-4">
              <input
                type="text"
                placeholder="Скоро смогу отвечать здесь…"
                disabled
                aria-label="Поле ввода (отключено)"
                className="w-full cursor-not-allowed rounded-full border border-white/10 bg-stone-900/60 px-4 py-2.5 text-sm text-white/60 placeholder:text-white/30"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
