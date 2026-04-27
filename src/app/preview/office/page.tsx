const variants = [
  {
    id: "v1",
    label: "V1 — open-plan",
    desc: "Open-plan офис, несколько столов, сбалансированная композиция, тёплая оранжево-синяя палитра",
  },
  {
    id: "v2",
    label: "V2 — уютный",
    desc: "Обилие растений, персонажи на переднем плане, мягкое тёплое освещение, cosy-вайб",
  },
  {
    id: "v3",
    label: "V3 — кибер",
    desc: "Вид на ночной город из окон, программисты за терминалами, sci-fi атмосфера",
  },
];

export default function OfficePreview() {
  return (
    <div className="text-white">
      <div className="px-6 py-12 text-center sm:px-12">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-yellow-400">
          ⚠️ Превью — выбор 3D-офиса для секции «Виртуальный офис»
        </p>
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Три варианта офиса в Pixar-style 3D
        </h1>
        <p className="mt-3 text-sm text-white/60">
          Каждый показан на полную ширину секции, как будет выглядеть на лендинге.
          Скажи в чате цифру (V1, V2 или V3).
        </p>
      </div>

      {variants.map((v) => (
        <section key={v.id} className="relative px-6 py-24 sm:px-12 sm:py-32">
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(/vectorupx/office_${v.id}.jpg)` }}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-950/30 to-stone-950/70"
          />

          <div className="absolute top-6 left-1/2 z-10 -translate-x-1/2 rounded-full border border-yellow-400/40 bg-yellow-950/80 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-yellow-300 backdrop-blur">
            Превью · {v.label}
          </div>

          <div className="relative mx-auto max-w-4xl pt-20">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-orange-400">
              Виртуальный офис
            </p>
            <h2 className="mb-6 text-5xl font-medium leading-tight tracking-tight sm:text-6xl">
              Команда работает прямо сейчас.
            </h2>
            <p className="mb-8 max-w-2xl text-lg text-white/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
              11 AI-сотрудников. Каждый со своей ролью. Не уходят на больничный,
              не просят повышения, не конкурируют за бонус.
            </p>
            <p className="text-sm text-white/65 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
              {v.desc}
            </p>
          </div>
        </section>
      ))}

      <div className="px-6 py-24 text-center sm:px-12">
        <p className="text-sm text-white/40">
          Это превью-страница. Боевой лендинг —{" "}
          <a href="/vectorupx/" className="underline hover:text-white">
            на главной
          </a>
          .
        </p>
      </div>
    </div>
  );
}
