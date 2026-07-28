import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";

type CiridaeRadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
  description?: ReactNode;
};

export function CiridaeRadio({ label, description, className, ...props }: CiridaeRadioProps) {
  return (
    <label
      className={cx(
        "group flex cursor-pointer items-start gap-[var(--spacing-11)] rounded-[var(--radius-card)] border border-[var(--color-ash-hairline)] bg-transparent p-[var(--spacing-16)] transition-[border-color,background-color,opacity] duration-[var(--motion-base)] ease-[var(--motion-ease)] has-[:checked]:border-[var(--color-ember-rust)] has-[:checked]:bg-[var(--surface-accent-subtle)] has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-[var(--opacity-disabled)]",
        className,
      )}
    >
      <input
        type="radio"
        className="peer mt-[3px] h-[14px] w-[14px] appearance-none rounded-[var(--radius-pill)] border border-[var(--color-ash)] bg-transparent transition-[border-color,background-color] duration-[var(--motion-base)] ease-[var(--motion-ease)] checked:border-[var(--color-ember-rust)] checked:bg-[radial-gradient(circle,var(--color-ember-rust)_0_38%,transparent_42%)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]"
        {...props}
      />
      <span className="grid gap-[var(--spacing-5)]">
        <span className="font-[var(--font-pragmatica-cond)] text-[var(--text-body-sm)] font-normal uppercase leading-[var(--leading-body-sm)] tracking-[var(--tracking-body-sm)] text-[var(--text-primary)]">
          {label}
        </span>
        {description ? (
          <span className="font-[var(--font-pragmatica)] text-[15px] font-normal leading-[1.2] tracking-[-0.01em] text-[var(--text-muted)]">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}
