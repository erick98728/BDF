import { RuneBorder } from "./RuneBorder";

export function GlowCard({ children }: { children: React.ReactNode }) {
  return (
    <RuneBorder>
      <div className="surface-glass soft-cyan-glow rounded-2xl p-6">{children}</div>
    </RuneBorder>
  );
}
