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

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let animationFrame = 0;
    let visible = false;
    let enabled = finePointer.matches && !reducedMotion.matches;

    function setVisible(next: boolean) {
      visible = next;
      dotElement.dataset.visible = String(next);
      ringElement.dataset.visible = String(next);
    }

    function setHovering(next: boolean) {
      ringElement.dataset.hovering = String(next);
      dotElement.dataset.hovering = String(next);
    }

    function cancelAnimation() {
      if (!animationFrame) return;

      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }

    function animate() {
      animationFrame = 0;
      if (!enabled || !visible || document.hidden) return;

      const deltaX = targetX - ringX;
      const deltaY = targetY - ringY;
      ringX += deltaX * 0.18;
      ringY += deltaY * 0.18;
      ringElement.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      if (Math.abs(deltaX) > 0.1 || Math.abs(deltaY) > 0.1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    }

    function scheduleAnimation() {
      if (!animationFrame && enabled && visible && !document.hidden) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    }

    function move(event: PointerEvent) {
      if (!enabled || event.pointerType === "touch") return;

      targetX = event.clientX;
      targetY = event.clientY;

      if (!visible) {
        ringX = targetX;
        ringY = targetY;
        ringElement.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        setVisible(true);
      }

      dotElement.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      setHovering(Boolean((event.target as Element | null)?.closest?.(interactiveSelector)));
      scheduleAnimation();
    }

    function hide() {
      cancelAnimation();
      setVisible(false);
      setHovering(false);
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
      cancelAnimation();
    };
  }, []);

  return (
    <div className="cursor-aura" aria-hidden="true">
      <div ref={ringRef} className="cursor-aura__ring" data-visible="false" data-hovering="false" />
      <div ref={dotRef} className="cursor-aura__dot" data-visible="false" data-hovering="false" />
    </div>
  );
}
