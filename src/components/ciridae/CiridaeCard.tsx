import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";

type CiridaeCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  bleed?: boolean;
  accent?: boolean;
};

export function CiridaeCard({ children, className, bleed = false, accent = false, ...props }: CiridaeCardProps) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[var(--radius-card)] border bg-[var(--surface-charcoal-card)] text-[var(--text-primary)] shadow-[var(--elevation-none)]",
        accent ? "border-[var(--color-ember-rust-hairline)]" : "border-[var(--color-ash-hairline)]",
        bleed ? "p-0" : "p-[var(--card-padding)]",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--color-ember-rust)] opacity-60" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
