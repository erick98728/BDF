"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { navLinks } from "@/data/site";
import { canAccessAdmin } from "@/lib/adminTypes";
import { getCurrentProfile } from "@/lib/adminApi";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { BetaBadge, TesterMark } from "./TesterVisualSystem";

const focusClass = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200";
const navLinkBase = `nav-link-fx rounded-lg px-3 py-2 text-sm font-medium ${focusClass}`;

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [logged, setLogged] = useState(false);
  const [adminAllowed, setAdminAllowed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLogged(false);
      return;
    }

    async function syncSession() {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setLogged(true);
        const profile = await getCurrentProfile();
        setAdminAllowed(canAccessAdmin(profile));
        return;
      }

      const serverSession = await getServerSession();
      setLogged(Boolean(serverSession?.user));
      setAdminAllowed(canAccessAdmin(serverSession?.profile));
    }

    syncSession();
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setLogged(Boolean(session));
      if (session) {
        getCurrentProfile().then((profile) => setAdminAllowed(canAccessAdmin(profile)));
      } else {
        getServerSession().then((serverSession) => {
          setLogged(Boolean(serverSession?.user));
          setAdminAllowed(canAccessAdmin(serverSession?.profile));
        });
      }
    });
    return () => subscription.subscription.unsubscribe();
  }, []);

  const baseLinks = useMemo(() => navLinks.filter((l) => l.href !== "/login"), []);

  async function handleSignOut() {
    if (!isSupabaseConfigured) return;
    await fetch("/api/auth/logout", { method: "POST" });
    await supabase.auth.signOut();
    setLogged(false);
    setAdminAllowed(false);
    setOpen(false);
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-200/15 bg-[#050914]/88 shadow-[0_14px_40px_rgba(0,0,0,0.32)] backdrop-blur-xl">
      <nav className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8" aria-label="Navegação principal">
        <div className="flex items-center justify-between">
          <Link href="/" className={`group nav-link-fx inline-flex items-center gap-3 rounded-lg ${focusClass}`}>
            <TesterMark compact />
            <span className="text-base font-black tracking-[0.2em] text-cyan-50 transition group-hover:text-white sm:text-lg">TESTER</span>
            <span className="hidden sm:inline-flex">
              <BetaBadge>Beta</BetaBadge>
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
                  className={`${navLinkBase} ${
                    active
                      ? "border border-cyan-200/35 bg-cyan-300/14 text-cyan-50 shadow-[0_0_18px_rgba(99,221,255,0.14)]"
                      : "text-slate-300 hover:bg-white/5 hover:text-cyan-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            {logged ? (
              <>
                <Link href="/dashboard" aria-current={pathname === "/dashboard" ? "page" : undefined} className={`${navLinkBase} ${pathname === "/dashboard" ? "border border-cyan-200/35 bg-cyan-300/14 text-cyan-50" : "text-slate-300 hover:bg-white/5 hover:text-cyan-50"}`}>Dashboard</Link>
                {adminAllowed ? (
                  <Link href="/admin" aria-current={pathname.startsWith("/admin") ? "page" : undefined} className={`${navLinkBase} ${pathname.startsWith("/admin") ? "border border-amber-200/35 bg-amber-300/14 text-amber-50" : "text-amber-100 hover:bg-amber-300/10 hover:text-white"}`}>Admin</Link>
                ) : null}
                <button onClick={handleSignOut} className={`tester-button rounded-lg border border-purple-200/20 bg-purple-300/8 px-3 py-2 text-sm font-medium text-purple-100 hover:bg-purple-300/14 hover:text-white ${focusClass}`}>Sair</button>
              </>
            ) : (
              <Link href="/login" aria-current={pathname === "/login" ? "page" : undefined} className={`tester-button rounded-lg border px-3 py-2 text-sm font-semibold ${focusClass} ${pathname === "/login" ? "border-amber-200/45 bg-amber-300/14 text-amber-50" : "border-amber-200/25 bg-amber-300/8 text-amber-100 hover:bg-amber-300/14 hover:text-white"}`}>Login</Link>
            )}
          </div>

          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
            className={`tester-button inline-flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl border border-cyan-200/20 bg-white/5 text-slate-100 hover:border-cyan-100/40 hover:bg-cyan-300/10 md:hidden ${focusClass}`}
          >
            <span className={`h-px w-4 bg-current transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`h-px w-4 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-4 bg-current transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </button>
        </div>

        <div
          id="menu-mobile"
          className={`grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-200 md:hidden ${open ? "mt-3 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"}`}
        >
          <div className="min-h-0 overflow-hidden rounded-xl border border-cyan-200/12 bg-black/45 p-2 shadow-2xl backdrop-blur-md">
            <div className="flex w-full flex-col gap-1">
              {baseLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  className={`nav-link-fx rounded-lg px-3 py-3 text-sm font-medium ${focusClass} ${active ? "border border-cyan-200/25 bg-cyan-300/14 text-cyan-50" : "text-slate-200 hover:bg-white/5 hover:text-cyan-50"}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {logged ? (
                <>
                  <Link href="/dashboard" aria-current={pathname === "/dashboard" ? "page" : undefined} onClick={() => setOpen(false)} className={`nav-link-fx rounded-lg px-3 py-3 text-sm font-medium ${focusClass} ${pathname === "/dashboard" ? "border border-cyan-200/20 bg-cyan-300/14 text-cyan-50" : "text-slate-200 hover:bg-white/5 hover:text-cyan-50"}`}>Dashboard</Link>
                  {adminAllowed ? (
                    <Link href="/admin" aria-current={pathname.startsWith("/admin") ? "page" : undefined} onClick={() => setOpen(false)} className={`nav-link-fx rounded-lg px-3 py-3 text-sm font-medium ${focusClass} ${pathname.startsWith("/admin") ? "border border-amber-200/20 bg-amber-300/14 text-amber-50" : "text-amber-100 hover:bg-amber-300/10 hover:text-white"}`}>Admin</Link>
                  ) : null}
                  <button onClick={handleSignOut} className={`tester-button rounded-lg px-3 py-3 text-left text-sm font-medium text-purple-100 hover:bg-purple-300/10 hover:text-white ${focusClass}`}>Sair</button>
                </>
              ) : (
                <Link href="/login" aria-current={pathname === "/login" ? "page" : undefined} onClick={() => setOpen(false)} className={`nav-link-fx rounded-lg px-3 py-3 text-sm font-semibold ${focusClass} ${pathname === "/login" ? "border border-amber-200/20 bg-amber-300/14 text-amber-50" : "text-amber-100 hover:bg-amber-300/10 hover:text-white"}`}>Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}


type ServerSession = {
  user: { id: string; email: string | null } | null;
  profile: { role: "user" | "admin" | "super_admin"; permissions: ("view_admin" | "manage_content" | "manage_users")[]; active: boolean } | null;
};

async function getServerSession(): Promise<ServerSession | null> {
  try {
    const response = await fetch("/api/auth/me", { headers: { Accept: "application/json" } });
    if (!response.ok) return null;
    return (await response.json()) as ServerSession;
  } catch {
    return null;
  }
}
