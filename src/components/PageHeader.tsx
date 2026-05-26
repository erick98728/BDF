import { ForestSigil } from "./ForestSigil";

export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <section className="relative overflow-hidden py-12 sm:py-14 md:py-20">
      <div className="absolute right-0 top-8 hidden opacity-45 sm:block">
        <ForestSigil compact />
      </div>
      <div className="absolute left-0 top-8 h-28 w-28 rounded-full bg-cyan-300/8 blur-2xl" />
      <div className="relative z-10 max-w-3xl">
        <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-cyan-300/8 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200/90">
          <span className="h-1 w-1 rounded-full bg-amber-200" />
          Arquivo da Névoa
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-wide text-white drop-shadow-[0_0_22px_rgba(99,221,255,0.12)] sm:text-5xl md:text-6xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">{description}</p>
        <div className="mt-6 h-px w-full max-w-md bg-gradient-to-r from-cyan-200/55 via-amber-200/30 to-transparent" />
      </div>
    </section>
  );
}
