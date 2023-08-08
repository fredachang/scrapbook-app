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

export const fadeXY = {
  hidden: {
    opacity: 0,
    // x: -50,
    // y: -50,
  },
  visible: {
    // x: 0,
    // y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
