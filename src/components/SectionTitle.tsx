export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold tracking-wide text-slate-50 md:text-3xl">{title}</h2>
      <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-300/70 to-amber-300/40" />
      {subtitle ? <p className="mt-3 max-w-2xl text-sm text-slate-300">{subtitle}</p> : null}
    </div>
  );
}
