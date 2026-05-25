export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6 md:mb-7">
      <h2 className="text-2xl font-bold tracking-wide text-white md:text-3xl">{title}</h2>
      <div className="mt-3 h-px w-24 bg-gradient-to-r from-cyan-200/80 via-amber-200/45 to-transparent" />
      {subtitle ? <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">{subtitle}</p> : null}
    </div>
  );
}
