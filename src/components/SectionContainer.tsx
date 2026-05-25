import { MistDivider } from "./MistDivider";

export function SectionContainer({ children, withDivider = false }: { children: React.ReactNode; withDivider?: boolean }) {
  return (
    <section className="py-4 md:py-6">
      {withDivider ? <MistDivider /> : null}
      {children}
    </section>
  );
}
