"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { navLinks } from "@/data/site";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

const focusClass = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [logged, setLogged] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLogged(false);
      return;
    }

    async function getSession() {
      const { data } = await supabase.auth.getSession();
      setLogged(Boolean(data.session));
    }

    getSession();
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => setLogged(Boolean(session)));
    return () => subscription.subscription.unsubscribe();
  }, []);

  const baseLinks = useMemo(() => navLinks.filter((l) => l.href !== "/login"), []);

  async function handleSignOut() {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-200/15 bg-[#050914]/82 shadow-[0_14px_40px_rgba(0,0,0,0.32)] backdrop-blur-xl">
      <nav className="mx-auto max-w-6xl px-5 py-3 sm:px-6 lg:px-8" aria-label="Navegação principal">
        <div className="flex items-center justify-between">
          <Link href="/" className={`group inline-flex items-center gap-3 rounded-lg ${focusClass}`}>
            <span className="text-lg font-black tracking-[0.2em] text-cyan-50 transition group-hover:text-white">TESTER</span>
            <span className="hidden rounded border border-amber-200/30 bg-amber-300/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-100 sm:inline-flex">
              Beta
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {baseLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${focusClass} ${
                    active
                      ? "border border-cyan-200/25 bg-cyan-300/12 text-cyan-50 shadow-[0_0_18px_rgba(99,221,255,0.12)]"
                      : "text-slate-300 hover:bg-white/5 hover:text-cyan-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            {logged ? (
              <>
                <Link href="/dashboard" aria-current={pathname === "/dashboard" ? "page" : undefined} className={`rounded-lg px-3 py-2 text-sm font-medium transition ${focusClass} ${pathname === "/dashboard" ? "border border-cyan-200/25 bg-cyan-300/12 text-cyan-50" : "text-slate-300 hover:bg-white/5 hover:text-cyan-50"}`}>Dashboard</Link>
                <button onClick={handleSignOut} className={`rounded-lg border border-purple-200/20 bg-purple-300/8 px-3 py-2 text-sm font-medium text-purple-100 transition hover:bg-purple-300/14 hover:text-white ${focusClass}`}>Sair</button>
              </>
            ) : (
              <Link href="/login" aria-current={pathname === "/login" ? "page" : undefined} className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${focusClass} ${pathname === "/login" ? "border-amber-200/45 bg-amber-300/14 text-amber-50" : "border-amber-200/25 bg-amber-300/8 text-amber-100 hover:bg-amber-300/14 hover:text-white"}`}>Login</Link>
            )}
          </div>

          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-lg border border-cyan-200/20 bg-white/5 text-slate-100 transition hover:border-cyan-100/40 hover:bg-cyan-300/10 md:hidden ${focusClass}`}
          >
            <span className="h-px w-4 bg-current" />
            <span className="h-px w-4 bg-current" />
            <span className="h-px w-4 bg-current" />
          </button>
        </div>

        <div id="menu-mobile" className={`${open ? "mt-3 flex" : "hidden"} rounded-lg border border-cyan-200/12 bg-black/30 p-2 shadow-2xl md:hidden`}>
          <div className="flex w-full flex-col gap-1">
            {baseLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-3 text-sm font-medium transition ${focusClass} ${active ? "bg-cyan-300/12 text-cyan-50" : "text-slate-200 hover:bg-white/5 hover:text-cyan-50"}`}
                >
                  {link.label}
                </Link>
              );
            })}
            {logged ? (
              <>
                <Link href="/dashboard" aria-current={pathname === "/dashboard" ? "page" : undefined} onClick={() => setOpen(false)} className={`rounded-lg px-3 py-3 text-sm font-medium transition ${focusClass} ${pathname === "/dashboard" ? "bg-cyan-300/12 text-cyan-50" : "text-slate-200 hover:bg-white/5 hover:text-cyan-50"}`}>Dashboard</Link>
                <button onClick={handleSignOut} className={`rounded-lg px-3 py-3 text-left text-sm font-medium text-purple-100 hover:bg-purple-300/10 hover:text-white ${focusClass}`}>Sair</button>
              </>
            ) : (
              <Link href="/login" aria-current={pathname === "/login" ? "page" : undefined} onClick={() => setOpen(false)} className={`rounded-lg px-3 py-3 text-sm font-semibold transition ${focusClass} ${pathname === "/login" ? "bg-amber-300/14 text-amber-50" : "text-amber-100 hover:bg-amber-300/10 hover:text-white"}`}>Login</Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
