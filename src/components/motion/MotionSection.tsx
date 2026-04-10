"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { fadeUp, motionConfig } from "@/lib/motion-config";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export function MotionSection({
  children,
  className,
  delay = 0,
  id,
}: MotionSectionProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={prefersReduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={motionConfig.viewport}
      variants={{
        hidden: { ...fadeUp.hidden },
        visible: {
          ...fadeUp.visible,
          transition: {
            duration: motionConfig.duration.xslow,
            ease: motionConfig.ease.smooth,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.section>
  );
}
