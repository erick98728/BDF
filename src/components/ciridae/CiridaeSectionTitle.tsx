import type { HTMLAttributes, ReactNode } from "react";
import { CiridaeBadge } from "./CiridaeBadge";
import { cx } from "./utils";

type CiridaeSectionTitleProps = HTMLAttributes<HTMLDivElement> & {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
};

export function CiridaeSectionTitle({ eyebrow, title, subtitle, align = "center", className, ...props }: CiridaeSectionTitleProps) {
  return (
    <div className={cx("grid gap-[var(--spacing-16)]", align === "center" && "mx-auto max-w-3xl text-center", className)} {...props}>
      {eyebrow ? <CiridaeBadge tone="accent" className={align === "center" ? "mx-auto" : undefined}>{eyebrow}</CiridaeBadge> : null}
      <h2 className="font-[var(--font-pragmatica-cond)] text-[var(--text-heading-lg)] font-normal uppercase leading-[var(--leading-heading-lg)] tracking-[var(--tracking-heading-lg)] text-[var(--text-primary)]">
        {title}
      </h2>
      <span className={cx("h-px w-[var(--spacing-100)] bg-[var(--color-ember-rust)]", align === "center" && "mx-auto")} aria-hidden="true" />
      {subtitle ? (
        <p className="font-[var(--font-pragmatica)] text-[15px] font-normal leading-[1.2] tracking-[-0.01em] text-[var(--text-muted)]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
