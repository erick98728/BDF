"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const watchedSelector = "[data-fx-reveal], [data-fx-watch]";
const revealSelector = "[data-fx-reveal]";
const strategicSelector = "[data-fx-spotlight], [data-fx-magnetic]";

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function findClosest(
  target: EventTarget | null,
  selector: string,
): HTMLElement | null {
  return target instanceof Element
    ? target.closest<HTMLElement>(selector)
    : null;
}

function clearLocalLight(element: HTMLElement | null) {
  if (!element) return;

  delete element.dataset.fxPointer;
  element.style.removeProperty("--scene-light-x");
  element.style.removeProperty("--scene-light-y");
  element.style.removeProperty("--scene-light-opacity");
  element.style.removeProperty("--fx-pointer-x");
  element.style.removeProperty("--fx-pointer-y");
  element.style.removeProperty("--fx-rotate-x");
  element.style.removeProperty("--fx-rotate-y");
  element.style.removeProperty("--fx-button-x");
  element.style.removeProperty("--fx-button-y");
}

export function ImpactEffects() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;
    const progressElement: HTMLSpanElement = progress;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );
    const watchedElements = Array.from(
      document.querySelectorAll<HTMLElement>(watchedSelector),
    );
    const strategicElements = Array.from(
      document.querySelectorAll<HTMLElement>(strategicSelector),
    );
    const imageCleanups: Array<() => void> = [];

    let observer: IntersectionObserver | null = null;
    let animationFrame = 0;
    let scrollDirty = true;
    let pointerDirty = false;
    let pointerTarget: HTMLElement | null = null;
    let activeLightTarget: HTMLElement | null = null;
    let pointerX = 0;
    let pointerY = 0;

    strategicElements.forEach(clearLocalLight);

    function setStaggerIndex(element: HTMLElement) {
      if (!element.matches(revealSelector) || !element.parentElement) return;

      const siblings = Array.from(element.parentElement.children).filter(
        (sibling): sibling is HTMLElement =>
          sibling instanceof HTMLElement &&
          sibling.dataset.fxReveal === element.dataset.fxReveal,
      );
      const index = clamp(siblings.indexOf(element), 0, 4);

      element.style.setProperty("--fx-stagger-index", String(index));
    }

    function markVisible(element: HTMLElement) {
      element.dataset.fxState = "visible";
      observer?.unobserve(element);
    }

    if (!reducedMotion.matches && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              markVisible(entry.target as HTMLElement);
            }
          });
        },
        {
          rootMargin: "0px 0px 10% 0px",
          threshold: 0.04,
        },
      );
    }

    watchedElements.forEach(setStaggerIndex);

    watchedElements.forEach((element) => {
      const bounds = element.getBoundingClientRect();
      const initiallyVisible =
        bounds.bottom >= 0 && bounds.top <= window.innerHeight * 0.96;

      if (reducedMotion.matches || !observer || initiallyVisible) {
        markVisible(element);
        return;
      }

      element.dataset.fxState = "pending";
      observer.observe(element);
    });

    document
      .querySelectorAll<HTMLImageElement>("img[data-fx-image]")
      .forEach((image) => {
        const revealImage = () => {
          image.dataset.fxImageState = "loaded";
        };

        if (image.complete) {
          revealImage();
          return;
        }

        image.dataset.fxImageState = "loading";
        image.addEventListener("load", revealImage, { once: true });
        image.addEventListener("error", revealImage, { once: true });
        imageCleanups.push(() => {
          image.removeEventListener("load", revealImage);
          image.removeEventListener("error", revealImage);
        });
      });

    function updateScrollProgress() {
      const scrollRange =
        document.documentElement.scrollHeight - window.innerHeight;
      const value =
        scrollRange > 0
          ? clamp(window.scrollY / scrollRange, 0, 1)
          : 0;

      progressElement.style.setProperty(
        "--fx-scroll-progress",
        value.toFixed(4),
      );
    }

    function applyPointerLight() {
      pointerDirty = false;

      if (
        reducedMotion.matches ||
        !finePointer.matches ||
        !pointerTarget
      ) {
        clearLocalLight(activeLightTarget);
        activeLightTarget = null;
        return;
      }

      if (activeLightTarget !== pointerTarget) {
        clearLocalLight(activeLightTarget);
        activeLightTarget = pointerTarget;
      }

      const bounds = activeLightTarget.getBoundingClientRect();
      if (bounds.width <= 0 || bounds.height <= 0) return;

      activeLightTarget.dataset.fxPointer = "active";
      activeLightTarget.style.setProperty(
        "--scene-light-x",
        `${clamp(pointerX - bounds.left, 0, bounds.width).toFixed(1)}px`,
      );
      activeLightTarget.style.setProperty(
        "--scene-light-y",
        `${clamp(pointerY - bounds.top, 0, bounds.height).toFixed(1)}px`,
      );
      activeLightTarget.style.setProperty("--scene-light-opacity", "0.74");
    }

    function flushFrame() {
      animationFrame = 0;

      if (scrollDirty) {
        updateScrollProgress();
        scrollDirty = false;
      }

      if (pointerDirty) applyPointerLight();
    }

    function scheduleFrame() {
      if (!animationFrame && !document.hidden) {
        animationFrame = window.requestAnimationFrame(flushFrame);
      }
    }

    function handleScroll() {
      scrollDirty = true;
      scheduleFrame();
    }

    function handlePointerMove(event: PointerEvent) {
      if (
        reducedMotion.matches ||
        !finePointer.matches ||
        event.pointerType === "touch"
      ) {
        return;
      }

      const nextTarget = findClosest(event.target, strategicSelector);
      if (!nextTarget && !activeLightTarget) return;

      pointerTarget = nextTarget;
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerDirty = true;
      scheduleFrame();
    }

    function clearPointerLight() {
      pointerTarget = null;
      pointerDirty = true;
      scheduleFrame();
    }

    function handleWindowPointerOut(event: PointerEvent) {
      if (event.relatedTarget === null) clearPointerLight();
    }

    function handleCapabilityChange() {
      clearPointerLight();
      if (reducedMotion.matches) watchedElements.forEach(markVisible);
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
        }
        pointerTarget = null;
        clearLocalLight(activeLightTarget);
        activeLightTarget = null;
        return;
      }

      scrollDirty = true;
      scheduleFrame();
    }

    function handleResize() {
      scrollDirty = true;
      pointerDirty = true;
      scheduleFrame();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerout", handleWindowPointerOut);
    window.addEventListener("pointercancel", clearPointerLight);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    finePointer.addEventListener("change", handleCapabilityChange);
    reducedMotion.addEventListener("change", handleCapabilityChange);
    scheduleFrame();

    return () => {
      observer?.disconnect();
      imageCleanups.forEach((cleanup) => cleanup());
      clearLocalLight(activeLightTarget);
      strategicElements.forEach(clearLocalLight);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handleWindowPointerOut);
      window.removeEventListener("pointercancel", clearPointerLight);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
      finePointer.removeEventListener("change", handleCapabilityChange);
      reducedMotion.removeEventListener("change", handleCapabilityChange);
    };
  }, [pathname]);

  return (
    <div className="fx-scroll-progress" aria-hidden="true">
      <span ref={progressRef} />
    </div>
  );
}
