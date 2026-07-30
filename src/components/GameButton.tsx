import Link from "next/link";

type GameButtonProps = { href: string; children: React.ReactNode; variant?: "primary" | "secondary" | "ghost" | "subtle" };

const styles: Record<NonNullable<GameButtonProps["variant"]>, string> = {
  primary: "border-white/80 bg-transparent text-white hover:border-white hover:bg-white/[0.04] active:border-white",
  secondary: "border-[#cc6437]/80 bg-transparent text-white hover:border-[#cc6437] hover:bg-white/[0.04] active:border-[#cc6437]",
  ghost: "border-[#cecece]/60 bg-transparent text-white hover:border-white hover:bg-white/[0.035]",
  subtle: "border-white/45 bg-transparent text-white hover:border-white/80 hover:bg-white/[0.035]"
};

export function GameButton({ href, children, variant = "primary" }: GameButtonProps) {
  return (
    <Link
      href={href}
      className={`fx-button tester-button inline-flex min-h-11 w-full items-center justify-center rounded-[1440px] border px-5 py-2.5 text-center text-sm font-normal uppercase tracking-[-0.02em] disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto ${styles[variant]}`}
      data-fx-magnetic="true"
    >
      {children}
    </Link>
  );
}
