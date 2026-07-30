import { RuneBorder } from "./RuneBorder";

type GlowCardVariant = "default" | "narrative" | "functional" | "status" | "character" | "gallery" | "quiet" | "flat" | "panel" | "highlight";

type GlowCardProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: GlowCardVariant;
};

const variantClass: Record<GlowCardVariant, string> = {
  default: "surface-glass",
  narrative: "surface-glass",
  functional: "surface-glass",
  status: "surface-glass border-[#cc6437]/35",
  character: "surface-glass",
  gallery: "surface-glass",
  quiet: "surface-glass border-[#cecece]/20",
  flat: "border border-white/10 bg-[#272a2a] shadow-none",
  panel: "surface-glass border-[#cecece]/18",
  highlight: "surface-glass border-[#cc6437]/45"
};

export function GlowCard({ children, className = "", contentClassName = "", variant = "default" }: GlowCardProps) {
  const isInteractive = ["highlight", "panel", "status", "narrative"].includes(
    variant,
  );
  const shouldTilt = variant === "highlight";
  const content = (
    <div className={`${variantClass[variant]} h-full rounded-[10px] p-5 text-slate-200 shadow-none sm:p-6 ${contentClassName}`.trim()}>
      {children}
    </div>
  );

  if (variant === "flat") {
    return (
      <div className={`fx-card h-full rounded-[10px] ${className}`.trim()}>
        {content}
      </div>
    );
  }

  return (
    <RuneBorder
      className={`fx-card h-full ${isInteractive ? "fx-card--interactive" : ""} ${className}`.trim()}
      data-fx-reveal="card"
      data-fx-spotlight={isInteractive ? "true" : undefined}
      data-fx-tilt={shouldTilt ? "true" : undefined}
    >
      {content}
    </RuneBorder>
  );
}
