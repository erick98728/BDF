type SectionTitleProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  hideEyebrow?: boolean;
};

export function SectionTitle({ title, subtitle, eyebrow = "Registro oficial", hideEyebrow = false }: SectionTitleProps) {
  return (
    <div className="mb-6 md:mb-7">
      {hideEyebrow ? null : <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200/75 sm:text-xs">{eyebrow}</p>}
      <h2 className="text-2xl font-bold tracking-[0.01em] text-white sm:text-[1.7rem] md:text-3xl">{title}</h2>
      <div className="tester-title-line mt-3 max-w-24" />
      {subtitle ? <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:text-[0.95rem]">{subtitle}</p> : null}
    </div>
  );
}
