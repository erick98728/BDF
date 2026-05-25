import Link from "next/link";

type GameButtonProps = { href: string; children: React.ReactNode; variant?: "primary" | "secondary" };

export function GameButton({ href, children, variant = "primary" }: GameButtonProps) {
  const style =
    variant === "primary"
      ? "border-cyan-200/65 bg-cyan-300/16 text-cyan-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_28px_rgba(17,91,116,0.2)] hover:border-cyan-100/80 hover:bg-cyan-300/24 hover:text-white hover:shadow-[0_0_22px_rgba(99,221,255,0.26)]"
      : "border-amber-200/55 bg-amber-300/10 text-amber-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-amber-100/70 hover:bg-amber-300/18 hover:text-white hover:shadow-[0_0_18px_rgba(209,168,93,0.22)]";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-semibold tracking-wide transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 ${style}`}
    >
      {children}
    </Link>
  );
}
