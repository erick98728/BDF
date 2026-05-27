import { TesterMark } from "./TesterVisualSystem";

export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <section className="relative overflow-hidden py-12 sm:py-14 md:py-20">
      <div className="absolute inset-0 opacity-35 tester-panel-grid" aria-hidden="true" />
      <div className="absolute right-0 top-8 hidden opacity-55 sm:block">
        <TesterMark />
      </div>
      <div className="absolute left-0 top-8 h-28 w-28 rounded-full bg-cyan-300/8 blur-2xl" />
      <div className="relative z-10 max-w-3xl">
        <p className="tester-kicker">Arquivo da Névoa</p>
        <h1 className="mt-4 text-4xl font-black tracking-wide text-white drop-shadow-[0_0_22px_rgba(99,221,255,0.12)] sm:text-5xl md:text-6xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">{description}</p>
        <div className="tester-title-line mt-6" />
      </div>
    </section>
  );
}
