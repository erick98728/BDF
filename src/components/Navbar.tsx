"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { navLinks } from "@/data/site";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [logged, setLogged] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getSession() {
      if (!isSupabaseConfigured) return;
      const { data } = await supabase.auth.getSession();
      setLogged(Boolean(data.session));
    }
    getSession();
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => setLogged(Boolean(session)));
    return () => subscription.subscription.unsubscribe();
  }, []);

  const baseLinks = useMemo(() => navLinks.filter((l) => l.href !== "/login"), []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-200/10 bg-slate-950/72 backdrop-blur-xl">
      <nav className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-[0.18em] text-cyan-100">TESTER</Link>
          <button aria-label="Abrir menu" onClick={() => setOpen((v) => !v)} className="rounded-lg border border-cyan-200/20 px-3 py-2 text-xs text-slate-200 md:hidden">Menu</button>
        </div>

        <div className={`${open ? "mt-3 flex" : "hidden"} flex-col gap-2 md:hidden`}>
          {baseLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5">{link.label}</Link>)}
          {logged ? <><Link href="/dashboard" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-slate-300">Dashboard</Link><button onClick={handleSignOut} className="rounded-lg px-3 py-2 text-left text-sm text-slate-300">Sair</button></> : <Link href="/login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-slate-300">Login</Link>}
        </div>

        <div className="hidden gap-2 md:mt-3 md:flex md:flex-wrap md:justify-end">
          {baseLinks.map((link) => {
            const active = pathname === link.href;
            return <Link key={link.href} href={link.href} className={`rounded-lg px-3 py-1.5 text-sm transition ${active ? "bg-cyan-300/15 text-cyan-100" : "text-slate-300 hover:bg-white/5 hover:text-cyan-100"}`}>{link.label}</Link>;
          })}
          {logged ? (
            <>
              <Link href="/dashboard" className="rounded-lg px-3 py-1.5 text-sm text-slate-300 hover:bg-white/5 hover:text-cyan-100">Dashboard</Link>
              <button onClick={handleSignOut} className="rounded-lg px-3 py-1.5 text-sm text-slate-300 hover:bg-white/5 hover:text-cyan-100">Sair</button>
            </>
          ) : <Link href="/login" className="rounded-lg px-3 py-1.5 text-sm text-slate-300 hover:bg-white/5 hover:text-cyan-100">Login</Link>}
        </div>
      </nav>
    </header>
  );
}
