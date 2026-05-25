"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/site";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-200/10 bg-slate-950/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold tracking-wide text-cyan-100">Tester</Link>
        <div className="hidden gap-4 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`text-sm ${pathname === link.href ? "text-cyan-200" : "text-slate-300 hover:text-cyan-100"}`}>
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
