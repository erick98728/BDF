type SectionTitleProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  hideEyebrow?: boolean;
};

export function SectionTitle({ title, subtitle, eyebrow = "Registro oficial", hideEyebrow = false }: SectionTitleProps) {
  return (
    <div
      className="section-heading fx-reveal-title"
      data-fx-reveal="title"
    >
      {hideEyebrow ? null : <p className="section-heading__eyebrow">{eyebrow}</p>}
      <h2 className="section-heading__title">{title}</h2>
      <div className="tester-title-line section-heading__line" />
      {subtitle ? <p className="section-heading__subtitle">{subtitle}</p> : null}
    </div>
  );
}
