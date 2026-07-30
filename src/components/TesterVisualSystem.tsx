import { GameGlyph, type GameGlyphName } from "./GameGlyph";

export type TesterTone = "cyan" | "purple" | "gold" | "emerald" | "neutral";
export type TesterStatus = "beta" | "ready" | "locked" | "warning" | "planned" | "live";

const toneStyles: Record<TesterTone, string> = {
  cyan: "visual-tone visual-tone--accent",
  purple: "visual-tone visual-tone--neutral",
  gold: "visual-tone visual-tone--warning",
  emerald: "visual-tone visual-tone--success",
  neutral: "visual-tone visual-tone--neutral"
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
    <span className={`tester-mark ${size} ${className}`.trim()} aria-hidden="true">
      <span className="tester-mark__light" />
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
    <div className={`rune-pattern ${className}`} aria-hidden="true">
      <div className="rune-pattern__grid" />
      <svg viewBox="0 0 600 220" className="rune-pattern__lines" fill="none">
        <path d="M54 42h96M82 62h42M438 156h110M464 176h46" stroke="currentColor" strokeWidth="1" opacity="0.18" strokeLinecap="round" />
        <path d="M284 28 320 52 284 76 248 52 284 28ZM112 142 142 162 112 182 82 162 112 142ZM488 48 516 68 488 88 460 68 488 48Z" stroke="currentColor" strokeWidth="1" opacity="0.16" />
        <path d="M198 184c32-38 66-38 98 0M344 92c28-26 60-26 88 0" stroke="currentColor" strokeWidth="1" opacity="0.13" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function BetaBadge({ children = "Beta em desenvolvimento" }: { children?: React.ReactNode }) {
  return (
    <span className="status-chip beta-badge">
      <span className="status-chip__dot" />
      {children}
    </span>
  );
}

export function StatusBadge({ status, children, className = "" }: { status: TesterStatus; children?: React.ReactNode; className?: string }) {
  const tone = statusTone[status];
  return (
    <span className={`status-chip ${toneStyles[tone]} ${className}`.trim()}>
      <span className="status-chip__dot" />
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
    <div className={`visual-panel ${className}`.trim()}>
      <RunePattern className="opacity-70" />
      <div className="visual-panel__content">
        <GameGlyph name={icon} className={toneStyles[tone]} />
        <div className="min-w-0">
          {eyebrow ? <p className="visual-panel__eyebrow">{eyebrow}</p> : null}
          <h3 className="visual-panel__title">{title}</h3>
          {description ? <p className="visual-panel__description">{description}</p> : null}
          {children ? <div className="mt-4">{children}</div> : null}
        </div>
      </div>
    </div>
  );
}

export function SectionFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`section-frame ${className}`.trim()}>
      <RunePattern className="opacity-45" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
