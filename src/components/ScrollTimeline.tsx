"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type TimelineMetric = {
  element: HTMLElement;
  top: number;
  height: number;
  nodes: Array<{ element: HTMLElement; top: number }>;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function ScrollTimelineEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timelines: HTMLElement[] = [];
    let metrics: TimelineMetric[] = [];
    let metricsDirty = true;
    let animationFrame = 0;
    let setupFrame = 0;
    let resizeObserver: ResizeObserver | null = null;
    let contentObserver: MutationObserver | null = null;

    function collectTimelines() {
      const nextTimelines = Array.from(
        document.querySelectorAll<HTMLElement>("[data-fx-timeline]"),
      );
      const changed =
        nextTimelines.length !== timelines.length ||
        nextTimelines.some((timeline, index) => timeline !== timelines[index]);

      if (!changed && timelines.length > 0) return;

      timelines = nextTimelines;
      metricsDirty = true;
      resizeObserver?.disconnect();

      if ("ResizeObserver" in window) {
        resizeObserver = new ResizeObserver(() => {
          metricsDirty = true;
          scheduleUpdate();
        });
        timelines.forEach((timeline) => resizeObserver?.observe(timeline));
      }
    }

    function measure() {
      const pageTop = window.scrollY;
      metrics = timelines.map((element) => {
        const bounds = element.getBoundingClientRect();
        return {
          element,
          top: bounds.top + pageTop,
          height: Math.max(bounds.height, 1),
          nodes: Array.from(
            element.querySelectorAll<HTMLElement>("[data-fx-timeline-node]"),
          ).map((node) => ({
            element: node,
            top: node.getBoundingClientRect().top + pageTop,
          })),
        };
      });
      metricsDirty = false;
    }

    function completeTimelines() {
      timelines.forEach((timeline) => {
        timeline.style.setProperty("--fx-timeline-progress", "1");
        timeline
          .querySelectorAll<HTMLElement>("[data-fx-timeline-node]")
          .forEach((node) => {
            node.dataset.fxActive = "true";
          });
      });
    }

    function update() {
      animationFrame = 0;
      collectTimelines();

      if (reducedMotion.matches) {
        completeTimelines();
        return;
      }

      if (metricsDirty) measure();

      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;

      metrics.forEach((timeline) => {
        const progress = clamp(
          (scrollTop + viewportHeight * 0.78 - timeline.top) / timeline.height,
          0,
          1,
        );
        timeline.element.style.setProperty(
          "--fx-timeline-progress",
          progress.toFixed(4),
        );
        timeline.nodes.forEach((node) => {
          if (
            node.element.dataset.fxActive === "true" ||
            node.top <= scrollTop + viewportHeight * 0.64
          ) {
            node.element.dataset.fxActive = "true";
          }
        });
      });
    }

    function scheduleUpdate() {
      if (!animationFrame && !document.hidden) {
        animationFrame = window.requestAnimationFrame(update);
      }
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

    const contentRoot = document.getElementById("conteudo");
    if (contentRoot && "MutationObserver" in window) {
      contentObserver = new MutationObserver(() => {
        collectTimelines();
        scheduleUpdate();
      });
      contentObserver.observe(contentRoot, { childList: true, subtree: true });
    }

    setupFrame = window.requestAnimationFrame(() => {
      collectTimelines();
      scheduleUpdate();
    });

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener("change", handleResize);

    return () => {
      resizeObserver?.disconnect();
      contentObserver?.disconnect();
      if (setupFrame) window.cancelAnimationFrame(setupFrame);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotion.removeEventListener("change", handleResize);
    };
  }, [pathname]);

  return null;
}
