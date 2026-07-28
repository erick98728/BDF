import type { SVGAttributes } from "react";
import { cx } from "./utils";

type ConstellationMarkProps = SVGAttributes<SVGSVGElement> & {
  compact?: boolean;
};

export function ConstellationMark({ compact = false, className, ...props }: ConstellationMarkProps) {
  return (
    <svg
      viewBox="0 0 96 96"
      className={cx(compact ? "h-9 w-9" : "h-20 w-20", "text-[var(--text-primary)]", className)}
      fill="none"
      aria-hidden={props["aria-label"] ? undefined : true}
      {...props}
    >
      <path d="M48 13 61 35 83 48 61 61 48 83 35 61 13 48 35 35 48 13Z" stroke="currentColor" strokeWidth="1" />
      <path d="M48 31 65 48 48 65 31 48 48 31Z" stroke="currentColor" strokeWidth="1" />
      <path d="M48 13v18M48 65v18M13 48h18M65 48h18" stroke="currentColor" strokeWidth="1" opacity="0.72" />
      <path d="M34 34 22 22M62 34l12-12M34 62 22 74M62 62l12 12" stroke="var(--color-ember-rust)" strokeWidth="1" opacity="0.86" />
      <circle cx="48" cy="48" r="2" fill="var(--color-ember-rust)" />
    </svg>
  );
}
