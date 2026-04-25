"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  target: number;
  start?: number;
  duration?: number; // ms
}

/**
 * Counter: запускает плавный отсчёт от start до target когда элемент попадает
 * в viewport. Использует IntersectionObserver + requestAnimationFrame —
 * работает во всех современных браузерах надёжно.
 */
export function Counter({ target, start = 0, duration = 1500 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(start);
  const hasRunRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || hasRunRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRunRef.current) return;
        hasRunRef.current = true;

        const startTime = performance.now();
        const tick = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // easeOutCubic — плавно замедляется в конце
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(start + (target - start) * eased);
          setValue(current);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);

        observer.disconnect();
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, start, duration]);

  return <span ref={ref}>{value}</span>;
}
