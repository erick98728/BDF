import Link from "next/link";

type GameButtonProps = { href: string; children: React.ReactNode; variant?: "primary" | "secondary" };

export function GameButton({ href, children, variant = "primary" }: GameButtonProps) {
  const style =
    variant === "primary"
      ? "border-cyan-300/70 bg-cyan-300/15 text-cyan-100 hover:bg-cyan-300/25 hover:shadow-[0_0_18px_rgba(99,221,255,0.26)]"
      : "border-amber-300/55 bg-amber-300/12 text-amber-100 hover:bg-amber-300/20 hover:shadow-[0_0_16px_rgba(184,146,73,0.24)]";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold tracking-wide transition duration-300 ${style}`}
    >
      {children}
    </Link>
  );
}
