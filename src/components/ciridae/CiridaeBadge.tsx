import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";

type CiridaeBadgeTone = "neutral" | "accent";

type CiridaeBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: CiridaeBadgeTone;
};

const toneClass: Record<CiridaeBadgeTone, string> = {
  neutral: "border-[var(--color-ash)] text-[var(--text-primary)]",
  accent: "border-[var(--color-ember-rust)] text-[var(--text-accent)]",
};

export function CiridaeBadge({ children, className, tone = "neutral", ...props }: CiridaeBadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-[var(--radius-pill)] border bg-transparent px-[var(--spacing-11)] py-[var(--spacing-5)] font-[var(--font-pragmatica-cond)] text-[var(--text-body-sm)] font-normal uppercase leading-[var(--leading-body-sm)] tracking-[var(--tracking-body-sm)]",
        toneClass[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
