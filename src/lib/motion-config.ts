/**
 * Central motion configuration for BuildX
 * Premium motion system — smooth, cinematic, tasteful.
 */

export const motionConfig = {
  // Durations (seconds) — slightly slower for premium feel
  duration: {
    fast: 0.25,
    normal: 0.6,
    slow: 0.9,
    xslow: 1.4,
  },

  // Premium easing curves
  ease: {
    // Apple-style smooth ease
    default: [0.25, 0.1, 0.25, 1] as const,
    // Cinematic reveal — slow start, smooth land
    smooth: [0.22, 1, 0.36, 1] as const,
    // Gentle overshoot for UI elements
    overshoot: [0.34, 1.4, 0.64, 1] as const,
    // Premium exit curve
    exit: [0.4, 0, 1, 1] as const,
    // Spring configs
    spring: { type: "spring" as const, stiffness: 80, damping: 18, mass: 1 },
    springTight: { type: "spring" as const, stiffness: 180, damping: 22, mass: 0.8 },
    springGentle: { type: "spring" as const, stiffness: 50, damping: 14, mass: 1.2 },
  },

  // Stagger delay between children — wider for readability
  stagger: {
    fast: 0.06,
    normal: 0.12,
    slow: 0.18,
    dramatic: 0.25,
  },

  // Scroll trigger settings
  viewport: {
    once: true,
    amount: 0.15 as const,
    margin: "-80px" as string,
  },

  // Reduced motion: all animations collapse to instant
  reducedMotion: {
    duration: 0,
    delay: 0,
  },
} as const;

// ── Reusable animation variants (all include blur-to-clear for premium feel) ──

export const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: motionConfig.duration.slow,
      ease: motionConfig.ease.smooth,
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 0, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: motionConfig.duration.normal,
      ease: motionConfig.ease.smooth,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: motionConfig.duration.slow,
      ease: motionConfig.ease.smooth,
    },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -50, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: motionConfig.duration.slow,
      ease: motionConfig.ease.smooth,
    },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 50, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: motionConfig.duration.slow,
      ease: motionConfig.ease.smooth,
    },
  },
};

export const staggerContainer = (staggerDelay: number = motionConfig.stagger.normal) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  },
});
