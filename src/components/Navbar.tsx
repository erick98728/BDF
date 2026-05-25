"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/site";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-200/10 bg-slate-950/72 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold tracking-[0.18em] text-cyan-100">TESTER</Link>
        <div className="hidden gap-2 md:flex md:flex-wrap md:justify-end">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 text-sm transition ${active ? "bg-cyan-300/15 text-cyan-100" : "text-slate-300 hover:bg-white/5 hover:text-cyan-100"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
