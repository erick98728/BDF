type GlowCardVariant = "default" | "narrative" | "functional" | "status" | "character" | "gallery" | "quiet" | "flat" | "panel" | "highlight";

type GlowCardProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: GlowCardVariant;
};

const variantClass: Record<GlowCardVariant, string> = {
  default: "surface-glass surface-card--default",
  narrative: "surface-glass surface-card--narrative",
  functional: "surface-glass surface-card--functional",
  status: "surface-glass surface-card--status",
  character: "surface-glass surface-card--character",
  gallery: "surface-glass surface-card--gallery",
  quiet: "surface-glass surface-card--quiet",
  flat: "surface-card--flat",
  panel: "surface-glass surface-card--panel",
  highlight: "surface-glass surface-card--highlight"
};

export function GlowCard({ children, className = "", contentClassName = "", variant = "default" }: GlowCardProps) {
  const hasSpotlight = ["highlight", "panel", "status", "narrative"].includes(
    variant,
  );
  const canElevate = variant === "highlight";

  return (
    <div
      className={`fx-card tester-card h-full ${hasSpotlight ? "fx-card--interactive" : ""} ${className}`.trim()}
      data-fx-reveal="card"
      data-fx-spotlight={hasSpotlight ? "true" : undefined}
      data-fx-tilt={canElevate ? "true" : undefined}
      data-fx-elevate={canElevate ? "true" : undefined}
    >
      <div className={`surface-card ${variantClass[variant]} ${contentClassName}`.trim()}>
        {children}
      </div>
    </div>
  );
}
