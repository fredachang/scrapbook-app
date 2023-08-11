export const easeSettings = {
  linear: "linear",
  easeIn: "easeIn",
  easeOut: "easeOut",
  easeInOut: "easeInOut",
};

export const durationSettings = {
  superFast: 0.1,
  fast: 0.3,
  medium: 0.5,
  slow: 0.8,
};

export const staggerParentContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      // delayChildren: 0.2,
    },
  },
};

export const fade = (duration: number, ease: string) => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: duration,
      ease: ease,
    },
  },
});

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};
