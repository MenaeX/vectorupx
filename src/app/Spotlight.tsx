"use client";

import { useRef, type CSSProperties, type MouseEvent } from "react";

/**
 * Spotlight: cosmic Hero background — mouse-tracked spotlight, drifting glows,
 * floating particles, occasional shooting stars. Pure CSS animations, no deps.
 */

// Детерминированный набор частиц — без random, чтобы не было mismatch при hydrate.
const PARTICLES = [
  { left: "8%", top: "22%", size: 2, delay: 0, duration: 8, hue: "warm" },
  { left: "18%", top: "68%", size: 1, delay: 2, duration: 10, hue: "white" },
  { left: "27%", top: "15%", size: 3, delay: 4, duration: 12, hue: "white" },
  { left: "33%", top: "82%", size: 2, delay: 1, duration: 9, hue: "warm" },
  { left: "42%", top: "35%", size: 1, delay: 5, duration: 11, hue: "white" },
  { left: "51%", top: "78%", size: 2, delay: 3, duration: 8, hue: "white" },
  { left: "58%", top: "20%", size: 3, delay: 6, duration: 13, hue: "warm" },
  { left: "67%", top: "55%", size: 2, delay: 2.5, duration: 10, hue: "white" },
  { left: "75%", top: "12%", size: 1, delay: 4.5, duration: 9, hue: "white" },
  { left: "82%", top: "72%", size: 2, delay: 1.5, duration: 11, hue: "warm" },
  { left: "89%", top: "40%", size: 1, delay: 3.5, duration: 8, hue: "white" },
  { left: "94%", top: "85%", size: 2, delay: 5.5, duration: 12, hue: "warm" },
];

export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--mx", `${x}%`);
    ref.current.style.setProperty("--my", `${y}%`);
  };

  const initial = { "--mx": "50%", "--my": "30%" } as CSSProperties;

  return (
    <div
      aria-hidden
      ref={ref}
      onMouseMove={onMouseMove}
      className="absolute inset-0 -z-10 overflow-hidden bg-stone-950"
      style={initial}
    >
      {/* Курсорный спотлайт — следует за мышью */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle 700px at var(--mx) var(--my), rgba(251, 146, 60, 0.28), transparent 62%)",
        }}
      />

      {/* Большое тёплое пятно снизу-слева — дрифтит */}
      <div className="hero-glow-drift-1 absolute inset-0 bg-[radial-gradient(ellipse_900px_600px_at_15%_85%,rgba(217,119,6,0.22),transparent_70%)]" />

      {/* Прохладное пятно сверху-справа — дрифтит в противофазе */}
      <div className="hero-glow-drift-2 absolute inset-0 bg-[radial-gradient(ellipse_700px_500px_at_85%_25%,rgba(30,64,145,0.16),transparent_70%)]" />

      {/* Светящиеся частицы — космическая атмосфера */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p, i) => {
          const isWarm = p.hue === "warm";
          const color = isWarm ? "rgba(251, 146, 60, 0.9)" : "rgba(255, 255, 255, 0.85)";
          const glow = isWarm ? "rgba(251, 146, 60, 0.7)" : "rgba(255, 255, 255, 0.5)";
          return (
            <span
              key={i}
              className="hero-particle absolute rounded-full"
              style={{
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: color,
                boxShadow: `0 0 ${p.size * 4}px ${glow}`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          );
        })}
      </div>

      {/* Падающие звёзды — диагональные стрики, разные тайминги */}
      <div className="hero-shooting-star hero-shooting-star-1" />
      <div className="hero-shooting-star hero-shooting-star-2" />
      <div className="hero-shooting-star hero-shooting-star-3" />

      {/* Фактура плёнки */}
      <div className="absolute inset-0 film-grain" />

      {/* Плавное растворение в космический фон body */}
      <div className="absolute inset-x-0 bottom-0 h-48 hero-fade-bottom" />
    </div>
  );
}
