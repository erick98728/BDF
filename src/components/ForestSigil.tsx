type ForestSigilProps = {
  className?: string;
  compact?: boolean;
};

export function ForestSigil({ className = "", compact = false }: ForestSigilProps) {
  const sizeClass = compact ? "h-20 w-20" : "h-48 w-48 sm:h-64 sm:w-64";

  return (
    <div className={`pointer-events-none relative ${sizeClass} ${className}`.trim()} aria-hidden="true">
      <div className="absolute inset-0 rounded-full bg-amber-300/10 blur-2xl" />
      <svg viewBox="0 0 220 220" className="fx-sigil relative h-full w-full drop-shadow-[0_0_28px_rgba(204,100,55,0.14)]">
        <defs>
          <linearGradient id="forest-sigil-main" x1="26" y1="18" x2="190" y2="205" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f5f2ed" stopOpacity="0.84" />
            <stop offset="0.48" stopColor="#e4a080" stopOpacity="0.76" />
            <stop offset="1" stopColor="#cc6437" stopOpacity="0.64" />
          </linearGradient>
          <radialGradient id="forest-sigil-core" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(110 108) rotate(90) scale(76)">
            <stop stopColor="#cc6437" stopOpacity="0.28" />
            <stop offset="1" stopColor="#080908" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="110" cy="110" r="82" fill="url(#forest-sigil-core)" />
        <path d="M110 18L183 110L110 202L37 110L110 18Z" fill="none" stroke="url(#forest-sigil-main)" strokeWidth="2.2" strokeLinejoin="round" opacity="0.82" />
        <path d="M110 45L158 110L110 175L62 110L110 45Z" fill="none" stroke="url(#forest-sigil-main)" strokeWidth="1.4" strokeLinejoin="round" opacity="0.58" />
        <path d="M110 42V178" stroke="#f5f2ed" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <path d="M56 110H164" stroke="#e4a080" strokeWidth="1.2" strokeLinecap="round" opacity="0.46" />
        <path d="M82 78C96 94 99 126 82 143" fill="none" stroke="#f5f2ed" strokeWidth="1.2" strokeLinecap="round" opacity="0.52" />
        <path d="M138 78C124 94 121 126 138 143" fill="none" stroke="#f5f2ed" strokeWidth="1.2" strokeLinecap="round" opacity="0.52" />
        <path d="M92 137C104 127 116 127 128 137" fill="none" stroke="#cc6437" strokeWidth="1.5" strokeLinecap="round" opacity="0.78" />
        <circle cx="110" cy="110" r="5" fill="#e4a080" opacity="0.78" />
        <circle cx="110" cy="18" r="3" fill="#cc6437" opacity="0.75" />
        <circle cx="183" cy="110" r="3" fill="#f5f2ed" opacity="0.68" />
        <circle cx="110" cy="202" r="3" fill="#cc6437" opacity="0.75" />
        <circle cx="37" cy="110" r="3" fill="#f5f2ed" opacity="0.68" />
      </svg>
    </div>
  );
}
