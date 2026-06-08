import Link from "next/link";

type GameButtonProps = { href: string; children: React.ReactNode; variant?: "primary" | "secondary" | "ghost" | "subtle" };

const styles: Record<NonNullable<GameButtonProps["variant"]>, string> = {
  primary: "border-cyan-200/65 bg-cyan-300/16 text-cyan-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_28px_rgba(17,91,116,0.2)] hover:border-cyan-100/80 hover:bg-cyan-300/24 hover:text-white hover:shadow-[0_0_22px_rgba(99,221,255,0.26)] active:border-cyan-100",
  secondary: "border-amber-200/55 bg-amber-300/10 text-amber-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-amber-100/70 hover:bg-amber-300/18 hover:text-white hover:shadow-[0_0_18px_rgba(209,168,93,0.22)] active:border-amber-100",
  ghost: "border-white/10 bg-white/[0.025] text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-cyan-200/25 hover:bg-cyan-300/8 hover:text-cyan-50",
  subtle: "border-cyan-200/20 bg-cyan-300/7 text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-cyan-200/38 hover:bg-cyan-300/12 hover:text-white"
};

export function GameButton({ href, children, variant = "primary" }: GameButtonProps) {
  return (
    <Link
      href={href}
      className={`tester-button inline-flex min-h-11 w-full items-center justify-center rounded-xl border px-5 py-2.5 text-center text-sm font-semibold tracking-wide disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}
