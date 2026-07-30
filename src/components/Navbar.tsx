"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import { DockMenu } from "./DockMenu";
import { TesterMark } from "./TesterVisualSystem";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [logged, setLogged] = useState(false);
  const [adminAllowed, setAdminAllowed] = useState(false);

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

  async function handleSignOut() {
    if (!isSupabaseConfigured) return;
    await fetch("/api/auth/logout", { method: "POST" });
    setLogged(false);
    setAdminAllowed(false);
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="prototype-header">
      <div className="prototype-header__inner">
        <Link
          href="/"
          className="prototype-brand"
          aria-label="Protótipo — ir para o início"
        >
          <TesterMark compact className="prototype-brand__mark" />
          <span className="prototype-brand__name">PROTÓTIPO</span>
          <span className="prototype-brand__badge">
            <span aria-hidden="true" />
            Beta
          </span>
        </Link>

        <DockMenu
          pathname={pathname}
          logged={logged}
          adminAllowed={adminAllowed}
          onSignOut={handleSignOut}
        />

        <span className="prototype-header__spacer" aria-hidden="true" />
      </div>
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
