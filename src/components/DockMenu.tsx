"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import type { CSSProperties } from "react";
import {
  BookOpen,
  Download as DownloadIcon,
  Home,
  Images,
  LayoutDashboard,
  LogIn,
  LogOut,
  Map as MapIcon,
  Palette,
  ScrollText,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { navLinks } from "@/data/site";

type DockMenuProps = {
  pathname: string;
  logged: boolean;
  adminAllowed: boolean;
  onSignOut: () => Promise<void>;
};

type DockEntry =
  | {
      kind: "link";
      id: string;
      label: string;
      href: string;
      icon: LucideIcon;
    }
  | {
      kind: "action";
      id: string;
      label: string;
      action: "sign-out";
      icon: LucideIcon;
    };

type AnimatedDockItem = {
  element: HTMLElement;
  center: number;
  scale: number;
  targetScale: number;
  scaleVelocity: number;
  lift: number;
  targetLift: number;
  liftVelocity: number;
};

const SPRING = Object.freeze({
  influenceRadius: 132,
  strength: 0.14,
  friction: 0.72,
  restThreshold: 0.001,
});

const publicIcons: Record<string, LucideIcon> = {
  "/": Home,
  "/download": DownloadIcon,
  "/lore": BookOpen,
  "/personagens": Users,
  "/studio": Palette,
  "/devlog": ScrollText,
  "/roadmap": MapIcon,
  "/galeria": Images,
  "/login": LogIn,
};

export function DockMenu({
  pathname,
  logged,
  adminAllowed,
  onSignOut,
}: DockMenuProps) {
  const dockRef = useRef<HTMLElement>(null);

  const entries = useMemo<DockEntry[]>(() => {
    const publicEntries = navLinks
      .filter(({ href }) => href !== "/login")
      .map(({ href, label }) => ({
        kind: "link" as const,
        id: href === "/" ? "inicio" : href.slice(1),
        href,
        icon: publicIcons[href],
        label,
      }));

    if (!logged) {
      return [
        ...publicEntries,
        {
          kind: "link",
          id: "login",
          href: "/login",
          icon: LogIn,
          label: "Login",
        },
      ];
    }

    return [
      ...publicEntries,
      {
        kind: "link",
        id: "dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        label: "Dashboard",
      },
      ...(adminAllowed
        ? [
            {
              kind: "link" as const,
              id: "admin",
              href: "/admin",
              icon: ShieldCheck,
              label: "Admin",
            },
          ]
        : []),
      {
        kind: "action",
        id: "sair",
        label: "Sair",
        action: "sign-out",
        icon: LogOut,
      },
    ];
  }, [adminAllowed, logged]);

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;
    const dockElement = dock;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const items = [
      ...dock.querySelectorAll<HTMLElement>(".dock-menu__item"),
    ].map<AnimatedDockItem>((element) => ({
      element,
      center: 0,
      scale: 1,
      targetScale: 1,
      scaleVelocity: 0,
      lift: 0,
      targetLift: 0,
      liftVelocity: 0,
    }));

    const pointer = {
      clientX: 0,
      inside: false,
    };

    let animationFrame = 0;
    let metricsDirty = true;

    function readNumberProperty(name: string, fallback: number) {
      const value = Number.parseFloat(
        getComputedStyle(dockElement).getPropertyValue(name),
      );

      return Number.isFinite(value) ? value : fallback;
    }

    function measureItems() {
      items.forEach((item) => {
        const bounds = item.element.getBoundingClientRect();
        item.center = bounds.left + bounds.width / 2;
      });
      metricsDirty = false;
    }

    function setRestTargets() {
      items.forEach((item) => {
        item.targetScale = 1;
        item.targetLift = 0;
      });
    }

    function updateTargetsFromPointer() {
      if (
        !pointer.inside ||
        !finePointer.matches ||
        reducedMotion.matches ||
        document.hidden
      ) {
        setRestTargets();
        return;
      }

      if (metricsDirty) measureItems();

      const maximumScale = readNumberProperty(
        "--dock-menu-maximum-scale",
        1.28,
      );
      const maximumLift = readNumberProperty(
        "--dock-menu-maximum-lift",
        10,
      );

      items.forEach((item) => {
        const distance = Math.abs(pointer.clientX - item.center);
        const influence = clamp(
          1 - distance / SPRING.influenceRadius,
          0,
          1,
        );
        const easedInfluence = influence * influence * (3 - 2 * influence);

        item.targetScale = 1 + (maximumScale - 1) * easedInfluence;
        item.targetLift = maximumLift * easedInfluence;
      });
    }

    function renderItem(item: AnimatedDockItem) {
      item.element.style.setProperty(
        "--dock-menu-scale",
        item.scale.toFixed(4),
      );
      item.element.style.setProperty(
        "--dock-menu-lift",
        item.lift.toFixed(3),
      );
    }

    function renderRestState() {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }

      items.forEach((item) => {
        item.scale = 1;
        item.targetScale = 1;
        item.scaleVelocity = 0;
        item.lift = 0;
        item.targetLift = 0;
        item.liftVelocity = 0;
        renderItem(item);
      });
    }

    function animate() {
      animationFrame = 0;
      updateTargetsFromPointer();

      let shouldContinue = false;

      items.forEach((item) => {
        const scaleDisplacement = item.targetScale - item.scale;
        const liftDisplacement = item.targetLift - item.lift;

        item.scaleVelocity =
          (item.scaleVelocity + scaleDisplacement * SPRING.strength) *
          SPRING.friction;
        item.liftVelocity =
          (item.liftVelocity + liftDisplacement * SPRING.strength) *
          SPRING.friction;
        item.scale += item.scaleVelocity;
        item.lift += item.liftVelocity;

        const scaleAtRest =
          Math.abs(scaleDisplacement) < SPRING.restThreshold &&
          Math.abs(item.scaleVelocity) < SPRING.restThreshold;
        const liftAtRest =
          Math.abs(liftDisplacement) < SPRING.restThreshold &&
          Math.abs(item.liftVelocity) < SPRING.restThreshold;

        if (scaleAtRest) {
          item.scale = item.targetScale;
          item.scaleVelocity = 0;
        }

        if (liftAtRest) {
          item.lift = item.targetLift;
          item.liftVelocity = 0;
        }

        if (!scaleAtRest || !liftAtRest) shouldContinue = true;
        renderItem(item);
      });

      if (shouldContinue && !document.hidden) {
        animationFrame = requestAnimationFrame(animate);
      }
    }

    function startAnimation() {
      if (reducedMotion.matches || !finePointer.matches || document.hidden) {
        renderRestState();
        return;
      }

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(animate);
      }
    }

    function handlePointerMove(event: PointerEvent) {
      if (!finePointer.matches || event.pointerType === "touch") return;

      pointer.clientX = event.clientX;
      pointer.inside = true;
      startAnimation();
    }

    function resetMagnification() {
      pointer.inside = false;
      setRestTargets();
      startAnimation();
    }

    function handleResize() {
      metricsDirty = true;
      resetMagnification();
    }

    function handleCapabilityChange() {
      metricsDirty = true;
      resetMagnification();
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        pointer.inside = false;
        renderRestState();
        return;
      }

      metricsDirty = true;
    }

    dock.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    dock.addEventListener("pointerleave", resetMagnification);
    dock.addEventListener("pointercancel", resetMagnification);
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    finePointer.addEventListener("change", handleCapabilityChange);
    reducedMotion.addEventListener("change", handleCapabilityChange);

    renderRestState();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);

      dock.removeEventListener("pointermove", handlePointerMove);
      dock.removeEventListener("pointerleave", resetMagnification);
      dock.removeEventListener("pointercancel", resetMagnification);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
      finePointer.removeEventListener("change", handleCapabilityChange);
      reducedMotion.removeEventListener("change", handleCapabilityChange);
      renderRestState();
    };
  }, [entries, pathname]);

  return (
    <div className="dock-menu-viewport">
      <nav
        className="dock-menu"
        aria-label="Navegação principal"
        ref={dockRef}
      >
        <ul className="dock-menu__list" role="list">
          {entries.map((entry, index) => {
            const active =
              entry.kind === "link" && routeMatches(pathname, entry.href);
            const tooltipId = `dock-menu-tooltip-${entry.id}`;
            const Icon = entry.icon;
            const content = (
              <>
                <span className="dock-menu__tile" aria-hidden="true">
                  <Icon
                    className="dock-menu__symbol"
                    size={23}
                    strokeWidth={1.8}
                  />
                  <span
                    className="dock-menu__highlight"
                    aria-hidden="true"
                  />
                </span>
                <span
                  className="dock-menu__tooltip"
                  id={tooltipId}
                  role="tooltip"
                >
                  {entry.label}
                </span>
                <span
                  className="dock-menu__indicator"
                  aria-hidden="true"
                />
              </>
            );

            return (
              <li
                className={`dock-menu__item${active ? " is-active" : ""}`}
                key={entry.id}
                style={{ "--dock-menu-entry-index": index } as CSSProperties}
              >
                {entry.kind === "link" ? (
                  <Link
                    className="dock-menu__control"
                    href={entry.href}
                    aria-label={`Ir para ${entry.label}`}
                    aria-describedby={tooltipId}
                    aria-current={active ? "page" : undefined}
                  >
                    {content}
                  </Link>
                ) : (
                  <button
                    className="dock-menu__control"
                    type="button"
                    aria-label="Sair da conta"
                    aria-describedby={tooltipId}
                    onClick={() => void onSignOut()}
                  >
                    {content}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function routeMatches(pathname: string, href: string) {
  if (href === "/") return pathname === "/";

  return pathname === href || pathname.startsWith(`${href}/`);
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}
