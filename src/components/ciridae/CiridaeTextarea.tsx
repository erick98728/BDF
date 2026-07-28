import type { TextareaHTMLAttributes } from "react";
import { cx } from "./utils";

export function CiridaeTextarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cx(
        "min-h-[122px] w-full resize-y rounded-[var(--radius-card)] border border-[var(--color-ash-hairline)] bg-[var(--surface-field)] px-[var(--spacing-16)] py-[var(--spacing-10)] font-[var(--font-pragmatica)] text-[15px] font-normal leading-[1.2] tracking-[-0.01em] text-[var(--text-primary)] outline-none transition-[border-color,background-color,opacity] duration-[var(--motion-base)] ease-[var(--motion-ease)] placeholder:text-[var(--text-dim)] focus:border-[var(--color-ember-rust)] focus:shadow-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)]",
        className,
      )}
      {...props}
    />
  );
}
