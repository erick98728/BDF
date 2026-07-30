import { MistDivider } from "./MistDivider";

export function SectionContainer({ children, withDivider = false }: { children: React.ReactNode; withDivider?: boolean }) {
  return (
    <section
      className="site-section fx-section fx-content-auto"
      data-fx-watch="section"
    >
      {withDivider ? <MistDivider /> : null}
      <div className="min-w-0">{children}</div>
    </section>
  );
}
