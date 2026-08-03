import type { Transition, Variants } from "framer-motion";

export const motionDurations = Object.freeze({
  instant: 0.14,
  feedback: 0.22,
  enter: 0.56,
  cinematic: 0.86,
  stagger: 0.065,
});

export const motionEasings = Object.freeze({
  enter: [0.22, 1, 0.36, 1] as [number, number, number, number],
  standard: [0.2, 0.8, 0.2, 1] as [number, number, number, number],
  exit: [0.4, 0, 1, 1] as [number, number, number, number],
});

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDurations.enter,
      ease: motionEasings.enter,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
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
      delayChildren: 0.06,
      staggerChildren: motionDurations.stagger,
    },
  },
};

export const cinematicItem: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
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
    scale: 0.975,
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
