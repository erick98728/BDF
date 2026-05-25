export function RuneBorder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rune-border ${className}`}>{children}</div>;
}
