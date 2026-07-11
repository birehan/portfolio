"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds of delay before the reveal begins. */
  delay?: number;
  /** Distance (px) the content travels up as it fades in. */
  y?: number;
  className?: string;
  /** Animate every time it enters the viewport (default: only once). */
  repeat?: boolean;
};

/**
 * A gentle "fade + rise" reveal that plays when the element scrolls into view.
 * Used throughout every variant to give sections an elegant, intentional entrance.
 */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
  repeat = false,
}: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, amount: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
