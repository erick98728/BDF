import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "./utils";

type CiridaeButtonVariant = "primary" | "accent" | "muted";
type CiridaeButtonSize = "sm" | "md";

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: CiridaeButtonVariant;
  size?: CiridaeButtonSize;
};

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

const variantClass: Record<CiridaeButtonVariant, string> = {
  primary: "border-[var(--color-pure-white)] text-[var(--text-primary)] hover:border-[var(--color-ash)]",
  accent: "border-[var(--color-ember-rust)] text-[var(--text-primary)] hover:border-[var(--color-ember-rust-soft)]",
  muted: "border-[var(--color-ash)] text-[var(--text-muted)] hover:border-[var(--color-pure-white)] hover:text-[var(--text-primary)]",
};

const sizeClass: Record<CiridaeButtonSize, string> = {
  sm: "min-h-9 px-[var(--spacing-18)] py-[var(--spacing-8)] text-[var(--text-caption)] leading-[var(--leading-caption)] tracking-[var(--tracking-caption)]",
  md: "min-h-11 px-[var(--spacing-20)] py-[var(--spacing-10)] text-[var(--text-body-sm)] leading-[var(--leading-body-sm)] tracking-[var(--tracking-body-sm)]",
};

const baseClass =
  "fx-button inline-flex items-center justify-center rounded-[var(--radius-pill)] border bg-transparent font-[var(--font-pragmatica-cond)] font-normal uppercase transition-[border-color,color,opacity,transform] duration-[var(--motion-base)] ease-[var(--motion-ease)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] disabled:pointer-events-none disabled:opacity-[var(--opacity-disabled)]";

export function CiridaeButton({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = cx(baseClass, variantClass[variant], sizeClass[size], className);

  if (href) {
    return (
      <Link href={href} className={classes} data-fx-magnetic="true" {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} data-fx-magnetic="true" {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
