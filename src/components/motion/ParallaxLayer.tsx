"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  speed?: number; // negative = slower, positive = faster
  offset?: [string, string];
}

export function ParallaxLayer({
  children,
  className,
  speed = 0.5,
  offset,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset
      ? (offset as ["start end", "end start"])
      : ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 120, speed * -120]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
