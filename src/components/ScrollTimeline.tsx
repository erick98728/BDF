"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrollTimelineProps = {
  name: string;
  className: string;
  children: ReactNode;
};

type TimelineNodeMetric = {
  element: HTMLElement;
  top: number;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function ScrollTimeline({
  name,
  className,
  children,
}: ScrollTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const nodes = Array.from(
      timeline.querySelectorAll<HTMLElement>("[data-fx-timeline-node]"),
    );
    let timelineTop = 0;
    let timelineHeight = 1;
    let nodeMetrics: TimelineNodeMetric[] = [];
    let metricsDirty = true;
    let animationFrame = 0;
    let resizeObserver: ResizeObserver | null = null;

    function measure() {
      const pageTop = window.scrollY;
      const bounds = timeline.getBoundingClientRect();
      timelineTop = bounds.top + pageTop;
      timelineHeight = Math.max(bounds.height, 1);
      nodeMetrics = nodes.map((element) => ({
        element,
        top: element.getBoundingClientRect().top + pageTop,
      }));
      metricsDirty = false;
    }

    function completeTimeline() {
      timeline.style.setProperty("--fx-timeline-progress", "1");
      nodes.forEach((node) => {
        node.dataset.fxActive = "true";
      });
    }

    function update() {
      animationFrame = 0;

      if (reducedMotion.matches) {
        completeTimeline();
        return;
      }

      if (metricsDirty) measure();

      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const progress = clamp(
        (scrollTop + viewportHeight * 0.78 - timelineTop) /
          timelineHeight,
        0,
        1,
      );

      timeline.style.setProperty(
        "--fx-timeline-progress",
        progress.toFixed(4),
      );

      nodeMetrics.forEach((node) => {
        if (
          node.element.dataset.fxActive === "true" ||
          node.top <= scrollTop + viewportHeight * 0.64
        ) {
          node.element.dataset.fxActive = "true";
        }
      });
    }

    function scheduleUpdate() {
      if (!animationFrame && !document.hidden) {
        animationFrame = window.requestAnimationFrame(update);
      }
    }

    function handleScroll() {
      scheduleUpdate();
    }

    function handleResize() {
      metricsDirty = true;
      scheduleUpdate();
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
        }
        return;
      }

      metricsDirty = true;
      scheduleUpdate();
    }

    function handleMotionPreference() {
      metricsDirty = true;
      scheduleUpdate();
    }

    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(timeline);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener("change", handleMotionPreference);
    scheduleUpdate();

    return () => {
      resizeObserver?.disconnect();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
      reducedMotion.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return (
    <div
      ref={timelineRef}
      className={className}
      data-fx-timeline={name}
    >
      {children}
    </div>
  );
}
