import { MistDivider } from "./MistDivider";

export function SectionContainer({ children, withDivider = false }: { children: React.ReactNode; withDivider?: boolean }) {
  return (
    <section className="py-8 md:py-11">
      {withDivider ? <MistDivider /> : null}
      {children}
    </section>
  );
}
