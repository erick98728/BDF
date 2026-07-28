import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";

type SystemTickerProps = HTMLAttributes<HTMLDivElement> & {
  items: ReactNode[];
  action?: ReactNode;
};

export function SystemTicker({ items, action, className, ...props }: SystemTickerProps) {
  return (
    <div className={cx("w-full border-b border-[var(--color-white-hairline)] bg-[var(--surface-abyss-bar)] text-[var(--text-primary)]", className)} {...props}>
      <div className="mx-auto flex min-h-9 max-w-[var(--page-max-width)] items-center justify-center gap-[var(--spacing-16)] px-[var(--spacing-16)] py-[var(--spacing-7)] font-[var(--font-roboto-mono)] text-[var(--text-caption)] font-normal uppercase leading-[var(--leading-caption)] tracking-[var(--tracking-caption)]">
        <div className="flex min-w-0 flex-wrap items-center justify-center gap-[var(--spacing-8)]">
          {items.map((item, index) => (
            <span key={index} className="inline-flex items-center gap-[var(--spacing-8)]">
              {index > 0 ? <span className="text-[var(--color-ember-rust)]" aria-hidden="true">•</span> : null}
              <span>{item}</span>
            </span>
          ))}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}
