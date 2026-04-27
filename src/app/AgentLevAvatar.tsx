export function AgentLevAvatar() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/vectorupx/lev.jpg"
          alt="Лев — AI-продажник VectorUpX"
          className="h-full w-full object-cover [clip-path:circle(50%)]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,transparent_40%,rgba(120,40,10,0.25)_100%)] mix-blend-overlay" />
      </div>

      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/80 px-4 py-1.5 backdrop-blur">
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="font-medium">Лев</span>
          <span className="text-white/50">· AI-Продажник · v1.0</span>
        </div>
      </div>
    </div>
  );
}
