// src/components/PageTransition.tsx
import { motion } from "motion/react";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
  },
};

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ ease: [0, 0.71, 0.2, 1.01], duration: 0.35 }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
}
