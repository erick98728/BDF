"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const watchedSelector = "[data-fx-reveal], [data-fx-watch]";
const revealSelector = "[data-fx-reveal]";
const spotlightSelector = "[data-fx-spotlight]";
const magneticSelector = "[data-fx-magnetic]";

type PointerState = {
  card: HTMLElement | null;
  button: HTMLElement | null;
  clientX: number;
  clientY: number;
  dirty: boolean;
};

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
    const pointer: PointerState = {
      card: null,
      button: null,
      clientX: 0,
      clientY: 0,
      dirty: false,
    };
    const imageCleanups: Array<() => void> = [];
    let observer: IntersectionObserver | null = null;
    let animationFrame = 0;
    let scrollDirty = true;

    function setStaggerIndex(element: HTMLElement) {
      if (!element.matches(revealSelector) || !element.parentElement) return;

      const siblings = Array.from(element.parentElement.children).filter(
        (sibling): sibling is HTMLElement =>
          sibling instanceof HTMLElement &&
          sibling.dataset.fxReveal === element.dataset.fxReveal,
      );
      const index = clamp(siblings.indexOf(element), 0, 5);

      element.style.setProperty("--fx-stagger-index", String(index));
    }

    function markVisible(element: HTMLElement) {
      element.dataset.fxState = "visible";
      observer?.unobserve(element);
    }

    const watchedElements = Array.from(
      document.querySelectorAll<HTMLElement>(watchedSelector),
    );

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
          rootMargin: "0px 0px -8% 0px",
          threshold: 0.08,
        },
      );
    }

    watchedElements.forEach(setStaggerIndex);

    const initialVisibility = watchedElements.map((element) => {
      const bounds = element.getBoundingClientRect();

      return {
        element,
        isVisible:
          bounds.bottom >= 0 && bounds.top <= window.innerHeight * 0.94,
      };
    });

    initialVisibility.forEach(({ element, isVisible }) => {
      if (reducedMotion.matches || !observer || isVisible) {
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

    function resetCard(card: HTMLElement | null) {
      if (!card) return;

      delete card.dataset.fxPointer;
      card.style.removeProperty("--fx-pointer-x");
      card.style.removeProperty("--fx-pointer-y");
      card.style.removeProperty("--fx-rotate-x");
      card.style.removeProperty("--fx-rotate-y");
    }

    function resetButton(button: HTMLElement | null) {
      if (!button) return;

      delete button.dataset.fxPointer;
      button.style.removeProperty("--fx-pointer-x");
      button.style.removeProperty("--fx-pointer-y");
      button.style.removeProperty("--fx-button-x");
      button.style.removeProperty("--fx-button-y");
    }

    function resetPointerEffects() {
      resetCard(pointer.card);
      resetButton(pointer.button);
      pointer.card = null;
      pointer.button = null;
      pointer.dirty = false;
    }

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

    function updateCard() {
      const card = pointer.card;
      if (!card) return;

      const bounds = card.getBoundingClientRect();
      if (bounds.width === 0 || bounds.height === 0) return;

      const x = clamp((pointer.clientX - bounds.left) / bounds.width, 0, 1);
      const y = clamp((pointer.clientY - bounds.top) / bounds.height, 0, 1);
      const rotateX = (0.5 - y) * 2.4;
      const rotateY = (x - 0.5) * 2.4;

      card.dataset.fxPointer = "active";
      card.style.setProperty("--fx-pointer-x", `${(x * 100).toFixed(2)}%`);
      card.style.setProperty("--fx-pointer-y", `${(y * 100).toFixed(2)}%`);
      card.style.setProperty("--fx-rotate-x", `${rotateX.toFixed(3)}deg`);
      card.style.setProperty("--fx-rotate-y", `${rotateY.toFixed(3)}deg`);
    }

    function updateButton() {
      const button = pointer.button;
      if (!button) return;

      const bounds = button.getBoundingClientRect();
      if (bounds.width === 0 || bounds.height === 0) return;

      const x = clamp((pointer.clientX - bounds.left) / bounds.width, 0, 1);
      const y = clamp((pointer.clientY - bounds.top) / bounds.height, 0, 1);

      button.dataset.fxPointer = "active";
      button.style.setProperty("--fx-pointer-x", `${(x * 100).toFixed(2)}%`);
      button.style.setProperty("--fx-pointer-y", `${(y * 100).toFixed(2)}%`);
      button.style.setProperty(
        "--fx-button-x",
        `${((x - 0.5) * 7).toFixed(2)}px`,
      );
      button.style.setProperty(
        "--fx-button-y",
        `${((y - 0.5) * 5).toFixed(2)}px`,
      );
    }

    function flushFrame() {
      animationFrame = 0;

      if (scrollDirty) {
        updateScrollProgress();
        scrollDirty = false;
      }

      if (pointer.dirty) {
        updateCard();
        updateButton();
        pointer.dirty = false;
      }
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

      const nextCard = findClosest(event.target, spotlightSelector);
      const nextButton = findClosest(event.target, magneticSelector);

      if (pointer.card !== nextCard) {
        resetCard(pointer.card);
        pointer.card = nextCard;
      }

      if (pointer.button !== nextButton) {
        resetButton(pointer.button);
        pointer.button = nextButton;
      }

      pointer.clientX = event.clientX;
      pointer.clientY = event.clientY;
      pointer.dirty = true;
      scheduleFrame();
    }

    function handleWindowPointerOut(event: PointerEvent) {
      if (event.relatedTarget === null) {
        resetPointerEffects();
      }
    }

    function handleCapabilityChange() {
      if (reducedMotion.matches || !finePointer.matches) {
        resetPointerEffects();
      }

      if (reducedMotion.matches) {
        watchedElements.forEach(markVisible);
      }
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
        }
        resetPointerEffects();
        return;
      }

      scrollDirty = true;
      scheduleFrame();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerout", handleWindowPointerOut);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    finePointer.addEventListener("change", handleCapabilityChange);
    reducedMotion.addEventListener("change", handleCapabilityChange);
    scheduleFrame();

    return () => {
      observer?.disconnect();
      imageCleanups.forEach((cleanup) => cleanup());
      resetPointerEffects();

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handleWindowPointerOut);
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
