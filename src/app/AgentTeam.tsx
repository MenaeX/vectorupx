import { AgentLidaAvatar } from "./AgentLidaAvatar";
import { AgentLevAvatar } from "./AgentLevAvatar";
import { LevChatTrigger } from "./LevChatTrigger";

interface AgentTeamProps {
  /**
   * Опциональная фоновая картинка под секцию (например, космонавты).
   * Накладывается под cosmic-glow-warm-tl с тёмным градиентом сверху для читаемости.
   */
  bgImage?: string;
  /**
   * Метка варианта (например «V1») — показывается только в превью.
   */
  variantLabel?: string;
}

export function AgentTeam({ bgImage, variantLabel }: AgentTeamProps = {}) {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-12 sm:py-32">
      {bgImage && (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-stone-950/85 via-stone-950/70 to-stone-950/95"
          />
        </>
      )}
      <div aria-hidden className="parallax-slow absolute inset-0 cosmic-glow-warm-tl" />

      {variantLabel && (
        <div className="absolute top-6 left-1/2 z-10 -translate-x-1/2 rounded-full border border-yellow-400/40 bg-yellow-950/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-yellow-300 backdrop-blur">
          Превью · {variantLabel}
        </div>
      )}

      <div className="reveal relative mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-orange-400">
          Знакомьтесь с командой
        </p>
        <h2 className="mb-4 text-5xl font-medium leading-tight tracking-tight sm:text-6xl">
          Два AI-агента.
          <br />
          <span className="text-white/60">У каждого — своя миссия.</span>
        </h2>
        <p className="mb-20 max-w-2xl text-lg text-white/60">
          Лев встречает вас, рассказывает про Лиду и оформляет запуск.
          Лида после оплаты уходит в работу — ищет лидов, ведёт переписку
          и ставит встречи в ваш календарь.
        </p>

        <div className="grid gap-20 lg:grid-cols-2 lg:gap-12">
          {/* ЛЕВ — продаёт Лиду, работает на нас */}
          <div className="flex flex-col items-center">
            <AgentLevAvatar />
            <div className="mt-12 max-w-md">
              <div className="mb-3 inline-block rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-orange-300">
                Работает на нас
              </div>
              <h3 className="mb-4 text-3xl font-medium tracking-tight">
                Лев · AI-Продажник
              </h3>
              <blockquote className="mb-6 border-l-2 border-orange-400/60 pl-6 text-base leading-relaxed text-white/80">
                «Расскажу, как Лида работает в вашей нише, посчитаю реалистичное
                число встреч и оформлю запуск. Со мной можно говорить здесь,
                в Telegram или ответить на моё письмо.»
              </blockquote>
              <ul className="mb-8 space-y-3 text-white/70">
                {[
                  "Подберёт тариф под вашу нишу и цикл сделки",
                  "Посчитает реалистичный план встреч на месяц",
                  "Оформит оплату через ЮKassa и запустит работу Лиды",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <LevChatTrigger className="inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-400/10 px-5 py-2.5 text-sm font-medium text-orange-200 transition hover:bg-orange-400/20">
                Поговорить со Львом
                <span aria-hidden>→</span>
              </LevChatTrigger>
            </div>
          </div>

          {/* ЛИДА — продукт, работает на клиента */}
          <div className="flex flex-col items-center">
            <AgentLidaAvatar />
            <div className="mt-12 max-w-md">
              <div className="mb-3 inline-block rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-emerald-300">
                Работает на вас
              </div>
              <h3 className="mb-4 text-3xl font-medium tracking-tight">
                Лида · AI-SDR
              </h3>
              <blockquote className="mb-6 border-l-2 border-orange-400/60 pl-6 text-base leading-relaxed text-white/80">
                «Нахожу ЛПР в B2B, веду переписку, отвечаю на возражения
                и сама ставлю встречу в ваш календарь. Круглосуточно.
                Не болею. Не прошу повышения.»
              </blockquote>
              <ul className="mb-8 space-y-3 text-white/70">
                {[
                  "Парсит базу 12 000 IT-компаний РФ",
                  "До 100 персональных писем в день",
                  "Сама ставит встречи в ваш календарь",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-orange-400 px-5 py-2.5 text-sm font-medium text-stone-950 shadow-lg shadow-orange-500/30 transition hover:bg-orange-300"
              >
                Запустить Лиду
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
