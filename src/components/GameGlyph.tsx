export type GameGlyphName =
  | "katana"
  | "fog"
  | "ruin"
  | "map"
  | "dash"
  | "boss"
  | "feedback"
  | "download"
  | "beta"
  | "platform"
  | "status"
  | "user"
  | "checklist"
  | "lore"
  | "gallery"
  | "studio"
  | "enemy"
  | "future"
  | "build"
  | "requirement"
  | "content"
  | "tool";

type GameGlyphProps = {
  name: GameGlyphName;
  className?: string;
  label?: string;
  variant?: "tile" | "plain";
};

export function GameGlyph({ name, className = "", label, variant = "tile" }: GameGlyphProps) {
  const tileClass =
    variant === "tile"
      ? "relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_20px_rgba(99,221,255,0.1)]"
      : "inline-flex shrink-0 items-center justify-center text-cyan-100";

  return (
    <span
      className={`${tileClass} ${className}`.trim()}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {variant === "tile" ? (
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,221,255,0.2),transparent_45%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_40%)]" />
      ) : null}
      <svg
        viewBox="0 0 32 32"
        className={variant === "tile" ? "relative h-6 w-6" : "h-full w-full"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      >
        {renderGlyph(name)}
      </svg>
    </span>
  );
}

function renderGlyph(name: GameGlyphName) {
  switch (name) {
    case "katana":
      return (
        <>
          <path d="M23.5 5.5 9.5 19.5" />
          <path d="M7.5 21.5 4.5 24.5" />
          <path d="M10.5 22.5 7.5 19.5" />
          <path d="M19.5 6.5 25.5 4.5" />
        </>
      );
    case "fog":
      return (
        <>
          <path d="M5 11c4-3 8 3 12 0 3-2 5-2 10 0" />
          <path d="M4 17c5-3 9 3 14 0 3-2 5-1 9 1" />
          <path d="M7 23c3-2 6 1 10 0 3-1 5-1 8 0" />
        </>
      );
    case "ruin":
      return (
        <>
          <path d="M7 25h18" />
          <path d="M9 11h14" />
          <path d="M11 11v14" />
          <path d="M16 11v14" />
          <path d="M21 11v14" />
          <path d="M8 8 16 4l8 4" />
        </>
      );
    case "map":
      return (
        <>
          <path d="M6 8v18l7-3 6 3 7-3V5l-7 3-6-3-7 3Z" />
          <path d="M13 5v18" />
          <path d="M19 8v18" />
        </>
      );
    case "dash":
      return (
        <>
          <path d="M5 16h17" />
          <path d="m17 10 6 6-6 6" />
          <path d="M4 10h6" opacity="0.65" />
          <path d="M4 22h8" opacity="0.65" />
        </>
      );
    case "boss":
      return (
        <>
          <path d="M16 4 26 14 16 28 6 14 16 4Z" />
          <path d="M11 14h10" />
          <path d="M12 19c2-2 6-2 8 0" />
          <path d="M8 9 4 7" />
          <path d="m24 9 4-2" />
        </>
      );
    case "feedback":
      return (
        <>
          <path d="M6 7h20v13H12l-6 5V7Z" />
          <path d="M11 13h10" />
          <path d="M11 17h6" />
        </>
      );
    case "download":
      return (
        <>
          <path d="M16 5v14" />
          <path d="m10 14 6 6 6-6" />
          <path d="M7 25h18" />
        </>
      );
    case "beta":
      return (
        <>
          <path d="M12 5v7l-5 10c-1 2 .3 4 2.5 4h13c2.2 0 3.5-2 2.5-4l-5-10V5" />
          <path d="M11 5h10" />
          <path d="M10 21h12" />
        </>
      );
    case "platform":
      return (
        <>
          <rect x="5" y="7" width="22" height="15" rx="2" />
          <path d="M12 26h8" />
          <path d="M16 22v4" />
        </>
      );
    case "status":
      return (
        <>
          <circle cx="16" cy="16" r="10" />
          <path d="M11 16.5 14.5 20 22 12" />
        </>
      );
    case "user":
      return (
        <>
          <circle cx="16" cy="11" r="4" />
          <path d="M8 26c1.2-5 4-8 8-8s6.8 3 8 8" />
        </>
      );
    case "checklist":
      return (
        <>
          <path d="M9 8h17" />
          <path d="M9 16h17" />
          <path d="M9 24h17" />
          <path d="m4 8 1.5 1.5L8 6" />
          <path d="m4 16 1.5 1.5L8 14" />
          <path d="m4 24 1.5 1.5L8 22" />
        </>
      );
    case "lore":
      return (
        <>
          <path d="M7 6h12a4 4 0 0 1 4 4v16H11a4 4 0 0 0-4 0V6Z" />
          <path d="M11 11h8" />
          <path d="M11 16h6" />
        </>
      );
    case "gallery":
      return (
        <>
          <rect x="5" y="7" width="22" height="18" rx="2" />
          <circle cx="12" cy="13" r="2" />
          <path d="m7 23 7-7 5 5 3-3 5 5" />
        </>
      );
    case "studio":
      return (
        <>
          <path d="M8 24 24 8" />
          <path d="M6 20l6 6" />
          <path d="M19 7l6 6" />
          <path d="M11 11l10 10" opacity="0.55" />
        </>
      );
    case "enemy":
      return (
        <>
          <path d="M8 19c2-7 14-7 16 0" />
          <path d="M10 22c4 3 8 3 12 0" />
          <path d="M11 14 7 9" />
          <path d="m21 14 4-5" />
          <path d="M13 18h.1" />
          <path d="M19 18h.1" />
        </>
      );
    case "future":
      return (
        <>
          <path d="M16 5v6" />
          <path d="M16 21v6" />
          <path d="M5 16h6" />
          <path d="M21 16h6" />
          <path d="m9 9 4 4" />
          <path d="m19 19 4 4" />
          <path d="m23 9-4 4" />
          <path d="m13 19-4 4" />
        </>
      );
    case "build":
      return (
        <>
          <path d="M16 4 26 9v14l-10 5-10-5V9l10-5Z" />
          <path d="M6 9l10 5 10-5" />
          <path d="M16 14v14" />
        </>
      );
    case "requirement":
      return (
        <>
          <rect x="8" y="8" width="16" height="16" rx="2" />
          <path d="M12 4v4" />
          <path d="M20 4v4" />
          <path d="M12 24v4" />
          <path d="M20 24v4" />
          <path d="M4 12h4" />
          <path d="M4 20h4" />
          <path d="M24 12h4" />
          <path d="M24 20h4" />
        </>
      );
    case "content":
      return (
        <>
          <path d="M8 9h16" />
          <path d="M8 16h16" />
          <path d="M8 23h16" />
          <path d="M5 7v4" />
          <path d="M5 14v4" />
          <path d="M5 21v4" />
        </>
      );
    case "tool":
      return (
        <>
          <path d="M20 5 27 12 23 16 16 9l4-4Z" />
          <path d="M14 11 5 20v7h7l9-9" />
          <path d="M7 25l5-5" />
        </>
      );
  }
}
