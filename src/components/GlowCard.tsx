import { RuneBorder } from "./RuneBorder";

type GlowCardVariant = "default" | "narrative" | "functional" | "status" | "character" | "gallery" | "quiet" | "flat" | "panel" | "highlight";

type GlowCardProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: GlowCardVariant;
};

const variantClass: Record<GlowCardVariant, string> = {
  default: "surface-glass soft-cyan-glow",
  narrative: "surface-glass soft-cyan-glow bg-[radial-gradient(circle_at_10%_0%,rgba(99,221,255,0.06),transparent_30%)]",
  functional: "surface-glass soft-cyan-glow border-cyan-200/16",
  status: "surface-glass soft-cyan-glow border-amber-200/16",
  character: "surface-glass soft-cyan-glow border-purple-200/14",
  gallery: "surface-glass soft-cyan-glow border-cyan-200/14",
  quiet: "surface-glass border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.045)]",
  flat: "border border-white/8 bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur-sm",
  panel: "surface-glass border-cyan-200/12 shadow-[0_12px_32px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.05)]",
  highlight: "surface-glass soft-cyan-glow border-cyan-100/22 bg-[radial-gradient(circle_at_12%_0%,rgba(99,221,255,0.11),transparent_32%),linear-gradient(145deg,rgba(14,24,48,0.92),rgba(16,13,32,0.76))]"
};

export function GlowCard({ children, className = "", contentClassName = "", variant = "default" }: GlowCardProps) {
  const content = (
    <div className={`${variantClass[variant]} h-full rounded-lg p-5 text-slate-200 sm:p-6 ${contentClassName}`.trim()}>
      {children}
    </div>
  );

  if (variant === "flat") {
    return <div className={`h-full rounded-xl ${className}`.trim()}>{content}</div>;
  }

  return (
    <RuneBorder className={`h-full ${className}`.trim()}>
      {content}
    </RuneBorder>
  );
}
