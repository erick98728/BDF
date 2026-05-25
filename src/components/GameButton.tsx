import Link from "next/link";

type GameButtonProps = { href: string; children: React.ReactNode; variant?: "primary" | "secondary" };

export function GameButton({ href, children, variant = "primary" }: GameButtonProps) {
  const style =
    variant === "primary"
      ? "bg-cyan-400/20 border-cyan-300/60 text-cyan-100 hover:bg-cyan-300/30"
      : "bg-amber-500/20 border-amber-300/50 text-amber-100 hover:bg-amber-300/30";

  return (
    <Link href={href} className={`inline-flex rounded-xl border px-5 py-3 text-sm font-semibold transition ${style}`}>
      {children}
    </Link>
  );
}
