import Link from "next/link";

type GameButtonProps = { href: string; children: React.ReactNode; variant?: "primary" | "secondary" | "ghost" | "subtle" };

const styles: Record<NonNullable<GameButtonProps["variant"]>, string> = {
  primary: "game-button--primary",
  secondary: "game-button--secondary",
  ghost: "game-button--ghost",
  subtle: "game-button--subtle"
};

export function GameButton({ href, children, variant = "primary" }: GameButtonProps) {
  return (
    <Link
      href={href}
      className={`game-button fx-button tester-button ${styles[variant]}`}
      data-fx-magnetic="true"
    >
      {children}
    </Link>
  );
}
