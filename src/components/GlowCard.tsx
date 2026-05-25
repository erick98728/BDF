import { RuneBorder } from "./RuneBorder";

export function GlowCard({ children }: { children: React.ReactNode }) {
  return (
    <RuneBorder>
      <div className="surface-glass soft-cyan-glow rounded-lg p-5 text-slate-200 sm:p-6">{children}</div>
    </RuneBorder>
  );
}
