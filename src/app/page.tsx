export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden text-white">
      {/* Тёплый монохромный фон в стиле 11x — глубокий терракот */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_#3d1f0e_0%,_#1a0a04_70%,_#000000_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(194,99,40,0.45),_transparent_60%)]"
      />
      {/* Лёгкая текстура «песка» через gradient mesh */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-30 mix-blend-overlay [background:repeating-linear-gradient(45deg,_transparent_0_2px,_rgba(255,255,255,0.03)_2px_4px)]"
      />

      {/* Top bar */}
      <div className="relative w-full border-b border-white/10 bg-black/40 py-2 text-center text-xs text-white/70 backdrop-blur">
        Бета-запуск · принимаем 5 пилотных клиентов
      </div>

      {/* Header */}
      <header className="relative flex items-center justify-between px-6 py-6 sm:px-12">
        <a href="#" className="text-2xl font-semibold tracking-tight">
          Лида<span className="text-orange-400">.ai</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
          <a className="hover:text-white" href="#how">
            Как работает
          </a>
          <a className="hover:text-white" href="#pricing">
            Тарифы
          </a>
          <a className="hover:text-white" href="#cases">
            Кейсы
          </a>
          <a className="hover:text-white" href="#faq">
            FAQ
          </a>
        </nav>

        <a
          href="#demo"
          className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90 md:inline-block"
        >
          Записаться на demo
        </a>
      </header>

      {/* Hero */}
      <main className="relative flex flex-1 items-center px-6 pb-24 sm:px-12">
        <div className="max-w-6xl">
          <h1 className="text-[clamp(3rem,9vw,9rem)] font-semibold leading-[0.95] tracking-tight">
            15 встреч с вашей ЦА.
            <br />
            <span className="text-white/85">Каждый месяц.</span>
          </h1>

          <div className="mt-12 max-w-xl border-t border-white/30 pt-8">
            <p className="text-lg leading-relaxed text-white/80 sm:text-xl">
              AI-SDR, который сам находит клиентов в B2B, пишет
              персонализированные письма и бронирует demo в вашем календаре.
              Без звонков с вашей стороны. Или возврат.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-base font-medium text-black transition hover:bg-white/90"
              >
                Записаться на demo
              </a>
              <a
                href="#how"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-base font-medium text-white transition hover:bg-white/10"
              >
                Как работает →
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer микро */}
      <footer className="relative border-t border-white/10 px-6 py-6 text-xs text-white/50 sm:px-12">
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <div>© 2026 Лида.ai · AI-SDR для B2B</div>
          <div>
            <a href="mailto:hello@lida.ai" className="hover:text-white">
              hello@lida.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
