"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { pageTransition } from "@/lib/motion";

const NAVIGATION_FALLBACK_MS = 1600;

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

function clearRouteState() {
  delete document.documentElement.dataset.routeTransition;
}

export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();
  const [pending, setPending] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingDestinationRef = useRef<string | null>(null);
  const search = searchParams.toString();
  const routeKey = search ? `${pathname}?${search}` : pathname;

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    pendingDestinationRef.current = null;
    setPending(false);
    clearRouteState();
  }, [routeKey]);

  useEffect(() => {
    function finishNavigation() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      pendingDestinationRef.current = null;
      setPending(false);
      clearRouteState();
    }

    function beginNavigation(destination?: URL) {
      const href = destination?.href ?? window.location.href;

      if (pendingDestinationRef.current === href) return;
      pendingDestinationRef.current = href;
      setPending(true);
      document.documentElement.dataset.routeTransition = "pending";

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(
        finishNavigation,
        NAVIGATION_FALLBACK_MS,
      );
    }

    function handleDocumentClick(event: MouseEvent) {
      const destination = getInternalDestination(event);
      if (destination) beginNavigation(destination);
    }

    function handlePopState() {
      beginNavigation(new URL(window.location.href));
    }

    document.addEventListener("click", handleDocumentClick, true);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("pageshow", finishNavigation);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("pageshow", finishNavigation);
      finishNavigation();
    };
  }, []);

  return (
    <div className="route-transition-shell" aria-busy={pending}>
      <span className="sr-only" role="status" aria-live="polite">
        {pending ? "Carregando nova página" : ""}
      </span>

      <AnimatePresence initial={false} mode="sync">
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
