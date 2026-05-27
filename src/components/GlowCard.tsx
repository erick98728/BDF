import { RuneBorder } from "./RuneBorder";

type GlowCardProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: "default" | "narrative" | "functional" | "status" | "character" | "gallery";
};

const variantClass: Record<NonNullable<GlowCardProps["variant"]>, string> = {
  default: "surface-glass soft-cyan-glow",
  narrative: "surface-glass soft-cyan-glow bg-[radial-gradient(circle_at_10%_0%,rgba(99,221,255,0.08),transparent_30%)]",
  functional: "surface-glass soft-cyan-glow border-cyan-200/18",
  status: "surface-glass soft-cyan-glow border-amber-200/18",
  character: "surface-glass soft-cyan-glow border-purple-200/16",
  gallery: "surface-glass soft-cyan-glow border-cyan-200/16"
};

export function GlowCard({ children, className = "", contentClassName = "", variant = "default" }: GlowCardProps) {
  return (
    <RuneBorder className={`h-full ${className}`.trim()}>
      <div className={`${variantClass[variant]} h-full rounded-lg p-5 text-slate-200 sm:p-6 ${contentClassName}`.trim()}>
        {children}
      </div>
    </RuneBorder>
  );
}
