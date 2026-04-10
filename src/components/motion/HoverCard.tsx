"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function HoverCard({
  children,
  className,
  glowColor = "rgba(99,102,241,0.15)",
}: HoverCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || prefersReduced) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Subtle 3D tilt based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      x: ((y - centerY) / centerY) * -3,
      y: ((x - centerX) / centerX) * 3,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-surface-border bg-surface-raised p-6 transition-all duration-500",
        isHovered && "border-surface-border-light shadow-lg shadow-brand/[0.04]",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={
        prefersReduced
          ? {}
          : {
              y: isHovered ? -6 : 0,
              rotateX: tilt.x,
              rotateY: tilt.y,
            }
      }
      transition={{ type: "spring", stiffness: 200, damping: 24, mass: 0.8 }}
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
    >
      {/* Glow follow effect */}
      {isHovered && !prefersReduced && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 50%)`,
          }}
        />
      )}
      {/* Subtle edge glow on hover */}
      {isHovered && !prefersReduced && (
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-40"
          style={{
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99,102,241,0.12), transparent 60%)`,
            filter: "blur(1px)",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
