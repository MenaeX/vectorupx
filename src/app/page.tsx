export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden text-white">
      <BackgroundVideo />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-12">
        <a href="#" className="text-xl font-semibold tracking-tight">
          Vector<span className="text-white/60">Up</span>
          <span className="text-orange-400">X</span>
        </a>
        <a
          href="#demo"
          className="rounded-full bg-white/95 px-5 py-2.5 text-sm font-medium text-stone-950 shadow-lg shadow-orange-900/40 transition hover:bg-white"
        >
          Записаться на demo
        </a>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex flex-1 items-end px-6 pb-24 sm:px-12 sm:pb-32">
        <div className="max-w-5xl">
          <h1 className="text-[clamp(2.75rem,9vw,8rem)] font-medium leading-[0.95] tracking-[-0.04em] [text-shadow:0_2px_30px_rgba(0,0,0,0.6)]">
            Холодные продажи.
            <br />
            Без звонков.
          </h1>

          <div className="mt-10 max-w-lg border-t border-white/20 pt-6">
            <p className="text-base leading-relaxed text-white/80 sm:text-lg [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
              AI-SDR сам находит клиентов в B2B, пишет персональные письма
              и бронирует demo в вашем календаре. 15 встреч в месяц — или
              возврат.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/60">
              <span>B2B IT &amp; SaaS</span>
              <span aria-hidden>·</span>
              <span>от 150 000 ₽ / мес</span>
              <span aria-hidden>·</span>
              <span>пилот с мая 2026</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function BackgroundVideo() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden bg-black">
      {/* Ночная планета из космоса — каждый огонёк континента = B2B-клиент */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover filter-[brightness(0.85)_saturate(1.15)]"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Мягкая виньетка — края слегка темнее, центр в полной красе */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.55)_100%)]" />

      {/* Локальная подсветка текста — тень из левого нижнего угла */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_900px_700px_at_15%_85%,rgba(0,0,0,0.75),transparent_70%)]" />

      {/* Тёплый бренд-акцент — лёгкий warm glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(194,99,40,0.20),transparent_50%)]" />

      {/* Film grain — премиум, фотографично */}
      <div className="absolute inset-0 film-grain" />
    </div>
  );
}
