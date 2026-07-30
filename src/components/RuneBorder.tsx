import type { HTMLAttributes } from "react";

type RuneBorderProps = HTMLAttributes<HTMLDivElement>;

export function RuneBorder({
  children,
  className = "",
  ...props
}: RuneBorderProps) {
  return (
    <div
      className={`rune-border tester-card ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
