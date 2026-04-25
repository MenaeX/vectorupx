"use client";

import { useRef, useState } from "react";

export function AgentLidaAvatar() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  function toggleSound() {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    if (!next) {
      v.play().catch(() => {});
    }
  }

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md lg:mx-0 lg:ml-auto">
      <div
        aria-hidden
        className="pulse-glow absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.7),rgba(217,119,6,0.35)_40%,transparent_70%)] blur-3xl"
      />

      <div
        aria-hidden
        className="orbit-ring-cw absolute inset-0 rounded-full border-2 border-dashed border-orange-400/40"
      />
      <div
        aria-hidden
        className="orbit-ring-ccw absolute inset-4 rounded-full border border-orange-300/25"
      />
      <div
        aria-hidden
        className="absolute inset-8 rounded-full border border-white/10"
      />

      <div className="avatar-breathe absolute inset-12 overflow-hidden rounded-full border-2 border-orange-400/30 bg-stone-900 shadow-[0_0_60px_rgba(251,146,60,0.4)]">
        <video
          ref={videoRef}
          src="/vectorupx/lida.mp4"
          poster="/vectorupx/lida.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label="Лида — AI-SDR агент VectorUpX"
          className="h-full w-full object-cover object-[center_10%]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,transparent_40%,rgba(120,40,10,0.25)_100%)] mix-blend-overlay" />
      </div>

      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/80 px-4 py-1.5 backdrop-blur">
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="font-medium">Лида</span>
          <span className="text-white/50">· AI-SDR · v1.0</span>
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Включить звук Лиды" : "Выключить звук Лиды"}
            className="ml-1 flex h-5 w-5 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            {muted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
                aria-hidden
              >
                <path d="M11 5 6 9H2v6h4l5 4z" />
                <line x1="22" y1="9" x2="16" y2="15" />
                <line x1="16" y1="9" x2="22" y2="15" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
                aria-hidden
              >
                <path d="M11 5 6 9H2v6h4l5 4z" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
