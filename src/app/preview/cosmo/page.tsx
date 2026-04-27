import { AgentTeam } from "../../AgentTeam";

export default function CosmoPreview() {
  return (
    <div className="text-white">
      <div className="px-6 py-12 text-center sm:px-12">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-yellow-400">
          ⚠️ Превью — выбор фона секции AgentTeam
        </p>
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          Три варианта космонавтов
        </h1>
        <p className="mt-3 text-sm text-white/60">
          Скажи в чате цифру (V1, V2 или V3) — поставлю на боевой лендинг
        </p>
      </div>

      <AgentTeam bgImage="/vectorupx/cosmo_v1.jpg" variantLabel="V1" />
      <div aria-hidden className="section-seam relative z-10" />
      <AgentTeam bgImage="/vectorupx/cosmo_v2.jpg" variantLabel="V2" />
      <div aria-hidden className="section-seam relative z-10" />
      <AgentTeam bgImage="/vectorupx/cosmo_v3.jpg" variantLabel="V3" />
      <div aria-hidden className="section-seam relative z-10" />

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
