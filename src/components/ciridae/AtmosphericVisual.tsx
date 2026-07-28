import type { HTMLAttributes } from "react";
import { cx } from "./utils";

type AtmosphericVisualProps = HTMLAttributes<HTMLDivElement> & {
  intensity?: "soft" | "medium";
};

export function AtmosphericVisual({ className, intensity = "medium", ...props }: AtmosphericVisualProps) {
  return (
    <div
      className={cx(
        "pointer-events-none absolute inset-0 overflow-hidden bg-[var(--surface-void-canvas)]",
        intensity === "soft" ? "opacity-60" : "opacity-100",
        className,
      )}
      aria-hidden="true"
      {...props}
    >
      <div className="absolute inset-[-12%] bg-[radial-gradient(circle_at_22%_18%,var(--surface-atmosphere-ember),transparent_24%),radial-gradient(circle_at_76%_64%,var(--surface-atmosphere-white),transparent_28%),radial-gradient(circle_at_48%_86%,var(--surface-atmosphere-ember-soft),transparent_22%)] blur-[42px]" />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(var(--surface-grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--surface-grid-line-soft)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-[var(--color-ember-rust)] opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_42%,var(--surface-vignette)_100%)]" />
    </div>
  );
}
