"use client";

import { useEffect, useRef } from "react";

const interactiveSelector = "a, button, input, textarea, select, label, [role='button']";

export function CursorAura() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dotRef.current === null || ringRef.current === null) return;

    const dotElement: HTMLDivElement = dotRef.current;
    const ringElement: HTMLDivElement = ringRef.current;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let hovering = false;
    let visible = false;
    let enabled = finePointer.matches && !reducedMotion.matches;
    let animationFrame = 0;

    function setVisible(next: boolean) {
      visible = next;
      dotElement.dataset.visible = String(next);
      ringElement.dataset.visible = String(next);
    }

    function flushPointer() {
      animationFrame = 0;
      if (!enabled || !visible || document.hidden) return;

      const transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
      dotElement.style.transform = transform;
      ringElement.style.transform = transform;
      dotElement.dataset.hovering = String(hovering);
      ringElement.dataset.hovering = String(hovering);
    }

    function schedulePointer() {
      if (!animationFrame && enabled && !document.hidden) {
        animationFrame = window.requestAnimationFrame(flushPointer);
      }
    }

    function move(event: PointerEvent) {
      if (!enabled || event.pointerType === "touch") return;

      pointerX = event.clientX;
      pointerY = event.clientY;
      hovering = Boolean(
        (event.target as Element | null)?.closest?.(interactiveSelector),
      );

      if (!visible) setVisible(true);
      schedulePointer();
    }

    function hide() {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }

      hovering = false;
      setVisible(false);
      dotElement.dataset.hovering = "false";
      ringElement.dataset.hovering = "false";
    }

    function syncCapabilities() {
      enabled = finePointer.matches && !reducedMotion.matches;
      if (!enabled) hide();
    }

    function handleVisibilityChange() {
      if (document.hidden) hide();
    }

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", hide);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    finePointer.addEventListener("change", syncCapabilities);
    reducedMotion.addEventListener("change", syncCapabilities);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", hide);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      finePointer.removeEventListener("change", syncCapabilities);
      reducedMotion.removeEventListener("change", syncCapabilities);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="cursor-aura" aria-hidden="true">
      <div ref={ringRef} className="cursor-aura__ring" data-visible="false" data-hovering="false" />
      <div ref={dotRef} className="cursor-aura__dot" data-visible="false" data-hovering="false" />
    </div>
  );
}
