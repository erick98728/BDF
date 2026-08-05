type SectionTitleVariant = "chapter" | "section" | "compact" | "record";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  hideEyebrow?: boolean;
  className?: string;
  variant?: SectionTitleVariant;
};

export function SectionTitle({
  title,
  subtitle,
  eyebrow = "Registro oficial",
  hideEyebrow = false,
  className = "",
  variant = "section",
}: SectionTitleProps) {
  return (
    <div
      className={`section-heading fx-reveal-title ${className}`.trim()}
      data-fx-reveal="title"
      data-heading-variant={variant}
    >
      {hideEyebrow ? null : (
        <p className="section-heading__eyebrow">{eyebrow}</p>
      )}
      <h2 className="section-heading__title">{title}</h2>
      <div className="tester-title-line section-heading__line" />
      {subtitle ? (
        <p className="section-heading__subtitle">{subtitle}</p>
      ) : null}
    </div>
  );
}
