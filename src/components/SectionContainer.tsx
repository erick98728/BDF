import { MistDivider } from "./MistDivider";

type SectionContainerProps = {
  children: React.ReactNode;
  withDivider?: boolean;
  id?: string;
  className?: string;
};

export function SectionContainer({
  children,
  withDivider = false,
  id,
  className = "",
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={`site-section fx-section fx-content-auto ${className}`.trim()}
      data-fx-watch="section"
    >
      {withDivider ? <MistDivider /> : null}
      <div className="min-w-0">{children}</div>
    </section>
  );
}
