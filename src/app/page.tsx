export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden text-white">
      <BackgroundAurora />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-12">
        <a href="#" className="text-xl font-semibold tracking-tight">
          Лида<span className="text-orange-400">.ai</span>
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
          <h1 className="text-[clamp(2.75rem,9vw,8rem)] font-medium leading-[0.95] tracking-[-0.04em]">
            Холодные продажи.
            <br />
            Без звонков.
          </h1>

          <div className="mt-10 max-w-lg border-t border-white/15 pt-6">
            <p className="text-base leading-relaxed text-white/65 sm:text-lg">
              AI-SDR сам находит клиентов в B2B, пишет персональные письма
              и бронирует demo в вашем календаре. 15 встреч в месяц — или
              возврат.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/45">
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

function BackgroundAurora() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 aurora-base" />
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="absolute inset-0 film-grain" />
    </div>
  );
}
