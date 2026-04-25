/**
 * Spotlight: cosmic Hero background — drifting glows, floating particles,
 * occasional shooting stars. Курсорный спотлайт теперь глобальный, лежит
 * в layout.tsx (GlobalSpotlight) и работает по всей странице.
 */

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
  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-10 overflow-hidden bg-stone-950"
    >
      {/* Большое тёплое пятно снизу-слева — заметно дрейфует */}
      <div className="hero-glow-drift-1 absolute inset-0 bg-[radial-gradient(ellipse_900px_600px_at_15%_85%,rgba(217,119,6,0.26),transparent_70%)]" />

      {/* Прохладное пятно сверху-справа — в противофазе */}
      <div className="hero-glow-drift-2 absolute inset-0 bg-[radial-gradient(ellipse_700px_500px_at_85%_25%,rgba(30,64,145,0.20),transparent_70%)]" />

      {/* Светящиеся частицы */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p, i) => {
          const isWarm = p.hue === "warm";
          const color = isWarm ? "rgba(251, 146, 60, 0.95)" : "rgba(255, 255, 255, 0.9)";
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

      {/* Падающие звёзды */}
      <div className="hero-shooting-star hero-shooting-star-1" />
      <div className="hero-shooting-star hero-shooting-star-2" />
      <div className="hero-shooting-star hero-shooting-star-3" />

      {/* Фактура плёнки */}
      <div className="absolute inset-0 film-grain" />

      {/* Плавное растворение в космос */}
      <div className="absolute inset-x-0 bottom-0 h-48 hero-fade-bottom" />
    </div>
  );
}
