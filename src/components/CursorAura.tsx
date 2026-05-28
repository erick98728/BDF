"use client";

import { useEffect, useRef } from "react";

const interactiveSelector = "a, button, input, textarea, select, label, [role='button']";

export function CursorAura() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsFinePointer || prefersReducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let animationFrame = 0;
    let visible = false;

    function setVisible(next: boolean) {
      visible = next;
      dot.dataset.visible = String(next);
      ring.dataset.visible = String(next);
    }

    function setHovering(next: boolean) {
      ring.dataset.hovering = String(next);
      dot.dataset.hovering = String(next);
    }

    function move(event: PointerEvent) {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!visible) setVisible(true);

      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      setHovering(Boolean((event.target as Element | null)?.closest?.(interactiveSelector)));
    }

    function animate() {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      animationFrame = window.requestAnimationFrame(animate);
    }

    function hide() {
      setVisible(false);
      setHovering(false);
    }

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", hide);
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", hide);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="cursor-aura" aria-hidden="true">
      <div ref={ringRef} className="cursor-aura__ring" data-visible="false" data-hovering="false" />
      <div ref={dotRef} className="cursor-aura__dot" data-visible="false" data-hovering="false" />
    </div>
  );
}
