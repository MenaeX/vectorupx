"use client";

import { useRef, type CSSProperties, type MouseEvent } from "react";

/**
 * Spotlight: mouse-tracked radial light over Hero. Cleaner than video bg,
 * weighs ~0 KB extra, follows cursor for a premium B2B feel.
 */
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
      {/* Курсорный спотлайт — следует за мышью, тёплый оранжевый */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle 700px at var(--mx) var(--my), rgba(251, 146, 60, 0.28), transparent 62%)",
        }}
      />
      {/* Большое тёплое пятно снизу слева — статичная атмосфера */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_900px_600px_at_15%_85%,rgba(217,119,6,0.22),transparent_70%)]" />
      {/* Прохладное пятно сверху справа — для контраста и глубины */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_700px_500px_at_85%_25%,rgba(30,64,145,0.14),transparent_70%)]" />
      {/* Фактура плёнки (повторяем существующий стиль страницы) */}
      <div className="absolute inset-0 film-grain" />
      {/* Плавное растворение Hero в космический фон body */}
      <div className="absolute inset-x-0 bottom-0 h-48 hero-fade-bottom" />
    </div>
  );
}
