import Image from "next/image";

type Sender = "lida" | "lead";

interface Msg {
  from: Sender;
  time: string;
  text: string;
}

// Собирательный диалог: 1С-интегратор (наш клиент) → IT-директор производственной
// компании (лид). Имена и компании выдуманы, но возражение «у нас свой программист»
// — самое частое в нише, и так Лида реально его обрабатывает.
const messages: Msg[] = [
  {
    from: "lida",
    time: "10:12",
    text: "Дмитрий, добрый день. Видела в Хабре ваш кейс «АльфаПром» — расширили склад до 5 точек. Один из наших клиентов — производственная компания на 200 человек — делал похожее в 2025: после интеграции «Управления складом» цикл сборки заказа сократился на 40%. Если интересно — расскажу детали прямо здесь, в чате. Глянете?",
  },
  {
    from: "lead",
    time: "12:48",
    text: "Спасибо, но мы с 1С с 2018 года. Есть свой штатный 1С-программист.",
  },
  {
    from: "lida",
    time: "12:51",
    text: "Поняла, не настаиваю. Один уточняющий вопрос: ваш программист поддерживает конфигурацию или развивает? Клиенты с похожим стажем приходят к нам именно тогда, когда штатный закрывает текучку, а на новые модули (WMS, B2B-портал) рук уже не хватает. Если узнаваемо — пришлю 3 варианта расширения за 15 минут.",
  },
  {
    from: "lead",
    time: "14:02",
    text: "Смотрите, у нас как раз обсуждаем B2B-портал. Если предметно — давайте.",
  },
  {
    from: "lida",
    time: "14:03",
    text: "Отлично. Записала нас на четверг в 15:00 — короткая онлайн-встреча с нашим инженером по проекту. Подходит?",
  },
  {
    from: "lead",
    time: "14:05",
    text: "Да, давайте.",
  },
  {
    from: "lida",
    time: "14:05",
    text: "Записала. Ссылку пришлю в Telegram за 30 минут до встречи. До четверга.",
  },
];

export function LidaDialog() {
  return (
    <section className="relative px-6 py-24 sm:px-12 sm:py-32">
      <div aria-hidden className="parallax-slow absolute inset-0 cosmic-glow-warm-tl" />

      <div className="reveal relative mx-auto max-w-4xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-orange-400">
          Как Лида общается
        </p>
        <h2 className="mb-6 text-5xl font-medium leading-tight tracking-tight sm:text-6xl">
          Реальный пример диалога.
        </h2>
        <p className="mb-12 max-w-2xl text-lg text-white/60">
          Как Лида ловит возражение «у нас уже свой программист» и переводит
          холодный отказ в тёплую заявку на встречу. Имена и компании
          в примере — собирательные.
        </p>

        <div className="rounded-2xl border border-white/10 bg-stone-950/60 p-6 backdrop-blur-sm sm:p-8">
          {/* Шапка чата */}
          <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-orange-400/30 bg-stone-900">
                <Image
                  src="/lida.jpg"
                  alt="Лида"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover object-[center_10%]"
                />
              </div>
              <div>
                <div className="text-sm font-medium">Лида · от 1С-Профи</div>
                <div className="text-xs text-white/40">
                  Дмитрий Иванов · IT-директор · «АльфаПром»
                </div>
              </div>
            </div>
            <span className="hidden rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-400 sm:inline-block">
              в работе
            </span>
          </div>

          {/* Сообщения */}
          <div className="space-y-4">
            {messages.map((m, i) => {
              const isLida = m.from === "lida";
              return (
                <div
                  key={i}
                  className={`flex ${isLida ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      isLida
                        ? "rounded-bl-sm border border-orange-400/20 bg-orange-400/10"
                        : "rounded-br-sm border border-white/10 bg-white/5"
                    }`}
                  >
                    <p className="text-sm leading-relaxed text-white/90">
                      {m.text}
                    </p>
                    <p className="mt-1.5 text-[10px] uppercase tracking-wider text-white/40">
                      {m.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Подвал — статус сделки */}
          <div className="mt-6 border-t border-white/5 pt-4 text-center text-xs text-white/40">
            🟢 Встреча записана в календарь · следующее касание через 7 дней
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-white/50">
          От первого касания до записи на встречу — ~4 часа. Без вашего
          участия. Если возражение нестандартное, Лида эскалирует — вы
          получаете уведомление в Telegram.
        </p>
      </div>
    </section>
  );
}
