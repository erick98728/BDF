import { MistDivider } from "./MistDivider";

export function SectionContainer({ children, withDivider = false }: { children: React.ReactNode; withDivider?: boolean }) {
  return (
    <section
      className="fx-section fx-content-auto py-7 sm:py-8 md:py-11"
      data-fx-watch="section"
    >
      {withDivider ? <MistDivider /> : null}
      <div className="min-w-0">{children}</div>
    </section>
  );
}
