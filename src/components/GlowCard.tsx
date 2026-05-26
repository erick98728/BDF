import { RuneBorder } from "./RuneBorder";

type GlowCardProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export function GlowCard({ children, className = "", contentClassName = "" }: GlowCardProps) {
  return (
    <RuneBorder className={`h-full ${className}`.trim()}>
      <div className={`surface-glass soft-cyan-glow h-full rounded-lg p-5 text-slate-200 sm:p-6 ${contentClassName}`.trim()}>
        {children}
      </div>
    </RuneBorder>
  );
}
