"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { pageTransition } from "@/lib/motion";

const NAVIGATION_FALLBACK_MS = 8000;

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

function getInternalDestination(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0 || isModifiedClick(event)) {
    return null;
  }

  const target = event.target;
  if (!(target instanceof Element)) return null;

  const anchor = target.closest("a[href]");
  if (!(anchor instanceof HTMLAnchorElement)) return null;
  if (anchor.hasAttribute("download") || anchor.target === "_blank") return null;
  if (anchor.dataset.noRouteTransition === "true") return null;

  const destination = new URL(anchor.href, window.location.href);
  if (destination.origin !== window.location.origin) return null;

  const current = new URL(window.location.href);
  const sameDocument =
    destination.pathname === current.pathname &&
    destination.search === current.search;

  if (sameDocument) return null;

  return destination;
}

export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();
  const [pending, setPending] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const routeKey = useMemo(
    () => `${pathname}?${searchParams.toString()}`,
    [pathname, searchParams],
  );

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setPending(false);
    delete document.documentElement.dataset.routeTransition;
  }, [routeKey]);

  useEffect(() => {
    function beginNavigation() {
      setPending(true);
      document.documentElement.dataset.routeTransition = "pending";

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setPending(false);
        delete document.documentElement.dataset.routeTransition;
        timeoutRef.current = null;
      }, NAVIGATION_FALLBACK_MS);
    }

    function handleDocumentClick(event: MouseEvent) {
      if (getInternalDestination(event)) beginNavigation();
    }

    function handlePopState() {
      beginNavigation();
    }

    document.addEventListener("click", handleDocumentClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      window.removeEventListener("popstate", handlePopState);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  return (
    <div className="route-transition-shell" aria-busy={pending}>
      <div
        className={`route-transition-progress${pending ? " is-active" : ""}`}
        aria-hidden="true"
      >
        <span />
      </div>

      <span className="sr-only" role="status" aria-live="polite">
        {pending ? "Carregando nova página" : ""}
      </span>

      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={routeKey}
          className="route-transition-page"
          variants={pageTransition}
          initial={reduceMotion ? false : "initial"}
          animate="enter"
          exit={reduceMotion ? undefined : "exit"}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
