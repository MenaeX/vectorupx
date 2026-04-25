"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * GlobalSpotlight: компактный «фонарик» (225px), следит за курсором по всей
 * странице. Fixed-позиция, mix-blend-mode: plus-lighter — только подсвечивает
 * подложку, не затемняет текст. pointer-events: none — не блокирует клики.
 */
export function GlobalSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.setProperty("--gx", `${e.clientX}px`);
      ref.current.style.setProperty("--gy", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const initial = { "--gx": "50vw", "--gy": "30vh" } as CSSProperties;

  return (
    <div
      aria-hidden
      ref={ref}
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        ...initial,
        background:
          "radial-gradient(circle 225px at var(--gx) var(--gy), rgba(251, 146, 60, 0.30), transparent 65%)",
        mixBlendMode: "plus-lighter",
      }}
    />
  );
}
