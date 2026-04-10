"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { fadeUp, staggerContainer, motionConfig } from "@/lib/motion-config";

interface MotionStaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  as?: "div" | "ul" | "ol";
}

export function MotionStagger({
  children,
  className,
  staggerDelay = motionConfig.stagger.normal,
  as = "div",
}: MotionStaggerProps) {
  const prefersReduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={prefersReduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={motionConfig.viewport}
      variants={staggerContainer(staggerDelay)}
    >
      {children}
    </Component>
  );
}

export function MotionStaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
