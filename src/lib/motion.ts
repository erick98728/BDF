import type { Transition, Variants } from "framer-motion";

export const motionDurations = Object.freeze({
  instant: 0.16,
  feedback: 0.2,
  route: 0.34,
  enter: 0.44,
  gallery: 0.38,
  cinematic: 0.82,
  stagger: 0.045,
});

export const motionEasings = Object.freeze({
  enter: [0.22, 1, 0.36, 1] as [number, number, number, number],
  standard: [0.2, 0.8, 0.2, 1] as [number, number, number, number],
  exit: [0.4, 0, 1, 1] as [number, number, number, number],
});

export const pageTransition: Variants = {
  initial: {
    opacity: 0.94,
    y: 6,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDurations.route,
      ease: motionEasings.enter,
    },
  },
  exit: {
    opacity: 0.98,
    y: -2,
    transition: {
      duration: motionDurations.instant,
      ease: motionEasings.exit,
    },
  },
};

export const cinematicContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0,
      staggerChildren: motionDurations.stagger,
    },
  },
};

export const cinematicItem: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDurations.enter,
      ease: motionEasings.enter,
    },
  },
};

export const cinematicVisual: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.99,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: motionDurations.cinematic,
      ease: motionEasings.enter,
    },
  },
};

export const quickFade: Transition = {
  duration: motionDurations.feedback,
  ease: motionEasings.standard,
};
