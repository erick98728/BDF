import { GameGlyph, type GameGlyphName } from "./GameGlyph";

export type TesterTone = "cyan" | "purple" | "gold" | "emerald" | "neutral";
export type TesterStatus = "beta" | "ready" | "locked" | "warning" | "planned" | "live";

const toneStyles: Record<TesterTone, string> = {
  cyan: "border-cyan-200/25 bg-cyan-300/10 text-cyan-100",
  purple: "border-purple-200/25 bg-purple-300/10 text-purple-100",
  gold: "border-amber-200/25 bg-amber-300/10 text-amber-100",
  emerald: "border-emerald-200/25 bg-emerald-300/10 text-emerald-100",
  neutral: "border-slate-200/15 bg-white/[0.045] text-slate-200"
};

const statusTone: Record<TesterStatus, TesterTone> = {
  beta: "gold",
  ready: "emerald",
  locked: "purple",
  warning: "gold",
  planned: "neutral",
  live: "cyan"
};

const statusLabel: Record<TesterStatus, string> = {
  beta: "Beta",
  ready: "Pronto",
  locked: "Bloqueado",
  warning: "Atenção",
  planned: "Planejado",
  live: "Ativo"
};

export function TesterMark({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  const size = compact ? "h-9 w-9" : "h-12 w-12";

  return (
    <span className={`relative inline-flex ${size} shrink-0 items-center justify-center rounded-2xl border border-cyan-200/25 bg-cyan-300/10 text-cyan-100 shadow-[0_0_24px_rgba(99,221,255,0.14),inset_0_1px_0_rgba(255,255,255,0.10)] ${className}`.trim()} aria-hidden="true">
      <span className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(99,221,255,0.22),transparent_44%),radial-gradient(circle_at_70%_78%,rgba(209,168,93,0.12),transparent_42%)]" />
      <svg viewBox="0 0 48 48" className="relative h-3/4 w-3/4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 5 39 15v18L24 43 9 33V15L24 5Z" strokeWidth="1.6" opacity="0.72" />
        <path d="M24 11v26" strokeWidth="1.7" opacity="0.82" />
        <path d="M15 18 24 12l9 6" strokeWidth="1.5" opacity="0.62" />
        <path d="M15 30 24 36l9-6" strokeWidth="1.5" opacity="0.62" />
        <path d="M17 24h14" strokeWidth="1.8" opacity="0.85" />
        <path d="M13 13 8 9M35 13l5-4M13 35l-5 4M35 35l5 4" strokeWidth="1.1" opacity="0.44" />
      </svg>
    </span>
  );
}

export function RunePattern({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute inset-0 opacity-[0.18] bg-[linear-gradient(rgba(99,221,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(209,168,93,0.06)_1px,transparent_1px)] bg-[size:38px_38px]" />
      <svg viewBox="0 0 600 220" className="absolute inset-0 h-full w-full text-cyan-100" fill="none">
        <path d="M54 42h96M82 62h42M438 156h110M464 176h46" stroke="currentColor" strokeWidth="1" opacity="0.18" strokeLinecap="round" />
        <path d="M284 28 320 52 284 76 248 52 284 28ZM112 142 142 162 112 182 82 162 112 142ZM488 48 516 68 488 88 460 68 488 48Z" stroke="currentColor" strokeWidth="1" opacity="0.16" />
        <path d="M198 184c32-38 66-38 98 0M344 92c28-26 60-26 88 0" stroke="currentColor" strokeWidth="1" opacity="0.13" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function BetaBadge({ children = "Beta em desenvolvimento" }: { children?: React.ReactNode }) {
  return (
    <span className="status-chip inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-100">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-200 shadow-[0_0_10px_rgba(209,168,93,0.75)]" />
      {children}
    </span>
  );
}

export function StatusBadge({ status, children, className = "" }: { status: TesterStatus; children?: React.ReactNode; className?: string }) {
  const tone = statusTone[status];
  return (
    <span className={`status-chip inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.13em] ${toneStyles[tone]} ${className}`.trim()}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {children ?? statusLabel[status]}
    </span>
  );
}

export function VisualPanel({
  title,
  eyebrow,
  description,
  icon = "beta",
  tone = "cyan",
  children,
  className = ""
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  icon?: GameGlyphName;
  tone?: TesterTone;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-cyan-200/14 bg-black/20 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${className}`.trim()}>
      <RunePattern className="opacity-70" />
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start">
        <GameGlyph name={icon} className={toneStyles[tone]} />
        <div className="min-w-0">
          {eyebrow ? <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/75">{eyebrow}</p> : null}
          <h3 className="mt-1 text-xl font-semibold text-white">{title}</h3>
          {description ? <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p> : null}
          {children ? <div className="mt-4">{children}</div> : null}
        </div>
      </div>
    </div>
  );
}

export function SectionFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-cyan-200/10 bg-black/[0.08] p-1 ${className}`.trim()}>
      <RunePattern className="opacity-45" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
