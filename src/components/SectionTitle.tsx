export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6 md:mb-7">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200/65">Registro do sistema</p>
      <h2 className="text-2xl font-bold tracking-wide text-white md:text-3xl">{title}</h2>
      <div className="tester-title-line mt-3 max-w-24" />
      {subtitle ? <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">{subtitle}</p> : null}
    </div>
  );
}
