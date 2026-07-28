"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { navLinks } from "@/data/site";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import { BetaBadge, TesterMark } from "./TesterVisualSystem";

const focusClass =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cc6437]";
const navLinkBase = `nav-link-fx rounded-[1440px] border border-white/20 px-4 py-2 text-sm font-normal uppercase tracking-[-0.02em] ${focusClass}`;

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [logged, setLogged] = useState(false);
  const [adminAllowed, setAdminAllowed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let active = true;

    if (!isSupabaseConfigured) {
      setLogged(false);
      setAdminAllowed(false);
      return () => {
        active = false;
      };
    }

    async function syncSession() {
      const [session, adminSession] = await Promise.all([
        getServerSession(),
        getAdminSession(),
      ]);
      if (!active) return;

      setLogged(session.authenticated);
      setAdminAllowed(session.authenticated && adminSession.allowed);
    }

    syncSession();
    return () => {
      active = false;
    };
  }, [pathname]);

  const baseLinks = useMemo(
    () => navLinks.filter((l) => l.href !== "/login"),
    [],
  );

  async function handleSignOut() {
    if (!isSupabaseConfigured) return;
    await fetch("/api/auth/logout", { method: "POST" });
    setLogged(false);
    setAdminAllowed(false);
    setOpen(false);
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/95">
      <nav
        className="mx-auto max-w-[1400px] px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Navegação principal"
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={`group nav-link-fx inline-flex items-center gap-3 rounded-[1440px] ${focusClass}`}
          >
            <TesterMark compact />
            <span className="text-base font-normal uppercase tracking-[-0.02em] text-white transition group-hover:text-white sm:text-lg">
              TESTER
            </span>
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
                <Link
                  href="/dashboard"
                  aria-current={pathname === "/dashboard" ? "page" : undefined}
                  className={`${navLinkBase} ${pathname === "/dashboard" ? "border border-cyan-200/35 bg-cyan-300/14 text-cyan-50" : "text-slate-300 hover:bg-white/5 hover:text-cyan-50"}`}
                >
                  Dashboard
                </Link>
                {adminAllowed ? (
                  <Link
                    href="/admin"
                    aria-current={
                      pathname.startsWith("/admin") ? "page" : undefined
                    }
                    className={`${navLinkBase} ${pathname.startsWith("/admin") ? "border border-amber-200/35 bg-amber-300/14 text-amber-50" : "text-amber-100 hover:bg-amber-300/10 hover:text-white"}`}
                  >
                    Admin
                  </Link>
                ) : null}
                <button
                  onClick={handleSignOut}
                  className={`tester-button rounded-[1440px] border border-purple-200/20 bg-purple-300/8 px-3 py-2 text-sm font-normal text-purple-100 hover:bg-purple-300/14 hover:text-white ${focusClass}`}
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                href="/login"
                aria-current={pathname === "/login" ? "page" : undefined}
                className={`tester-button rounded-[1440px] border px-3 py-2 text-sm font-normal ${focusClass} ${pathname === "/login" ? "border-amber-200/45 bg-amber-300/14 text-amber-50" : "border-amber-200/25 bg-amber-300/8 text-amber-100 hover:bg-amber-300/14 hover:text-white"}`}
              >
                Login
              </Link>
            )}
          </div>

          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
            className={`tester-button inline-flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-[1440px] border border-white/80 bg-transparent text-white hover:border-[#cc6437] md:hidden ${focusClass}`}
          >
            <span
              className={`h-px w-4 bg-current transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              className={`h-px w-4 bg-current transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-px w-4 bg-current transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </button>
        </div>

        <div
          id="menu-mobile"
          className={`grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-200 md:hidden ${open ? "mt-3 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"}`}
        >
          <div className="min-h-0 max-h-[calc(100vh-5rem)] overflow-y-auto rounded-[10px] border border-white/15 bg-[#272a2a] p-2">
            <div className="flex w-full flex-col gap-1">
              <p className="px-3 pb-1 pt-2 text-[10px] font-normal uppercase tracking-[0.16em] text-slate-500">
                Páginas públicas
              </p>
              {baseLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`nav-link-fx rounded-[1440px] px-3 py-3 text-sm font-normal ${focusClass} ${active ? "border border-cyan-200/25 bg-cyan-300/14 text-cyan-50" : "text-slate-200 hover:bg-white/5 hover:text-cyan-50"}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {logged ? (
                <>
                  <p className="mt-2 border-t border-white/10 px-3 pb-1 pt-3 text-[10px] font-normal uppercase tracking-[0.16em] text-slate-500">
                    Área do tester
                  </p>
                  <Link
                    href="/dashboard"
                    aria-current={
                      pathname === "/dashboard" ? "page" : undefined
                    }
                    onClick={() => setOpen(false)}
                    className={`nav-link-fx rounded-[1440px] px-3 py-3 text-sm font-normal ${focusClass} ${pathname === "/dashboard" ? "border border-cyan-200/20 bg-cyan-300/14 text-cyan-50" : "text-slate-200 hover:bg-white/5 hover:text-cyan-50"}`}
                  >
                    Dashboard
                  </Link>
                  {adminAllowed ? (
                    <Link
                      href="/admin"
                      aria-current={
                        pathname.startsWith("/admin") ? "page" : undefined
                      }
                      onClick={() => setOpen(false)}
                      className={`nav-link-fx rounded-[1440px] px-3 py-3 text-sm font-normal ${focusClass} ${pathname.startsWith("/admin") ? "border border-amber-200/20 bg-amber-300/14 text-amber-50" : "text-amber-100 hover:bg-amber-300/10 hover:text-white"}`}
                    >
                      Admin
                    </Link>
                  ) : null}
                  <button
                    onClick={handleSignOut}
                    className={`tester-button rounded-[1440px] px-3 py-3 text-left text-sm font-normal text-purple-100 hover:bg-purple-300/10 hover:text-white ${focusClass}`}
                  >
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <p className="mt-2 border-t border-white/10 px-3 pb-1 pt-3 text-[10px] font-normal uppercase tracking-[0.16em] text-slate-500">
                    Área do tester
                  </p>
                  <Link
                    href="/login"
                    aria-current={pathname === "/login" ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`nav-link-fx rounded-[1440px] px-3 py-3 text-sm font-normal ${focusClass} ${pathname === "/login" ? "border border-amber-200/20 bg-amber-300/14 text-amber-50" : "text-amber-100 hover:bg-amber-300/10 hover:text-white"}`}
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

type ServerSession = {
  authenticated: boolean;
  user: { id: string; email: string | null } | null;
};

type AdminSession = {
  authenticated: boolean;
  allowed: boolean;
};

async function getServerSession(): Promise<ServerSession> {
  try {
    const response = await fetch("/api/auth/me", {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return { authenticated: false, user: null };
    return (await response.json()) as ServerSession;
  } catch {
    return { authenticated: false, user: null };
  }
}

async function getAdminSession(): Promise<AdminSession> {
  try {
    const response = await fetch("/api/admin/me", {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return { authenticated: false, allowed: false };
    return (await response.json()) as AdminSession;
  } catch {
    return { authenticated: false, allowed: false };
  }
}
