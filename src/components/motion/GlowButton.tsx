"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  href?: string;
}

export function GlowButton({
  children,
  className,
  variant = "primary",
  onClick,
  href,
}: GlowButtonProps) {
  const prefersReduced = useReducedMotion();

  const baseStyles =
    "group relative inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm font-semibold transition-all duration-500 cursor-pointer overflow-hidden";

  const variants = {
    primary:
      "bg-brand text-white hover:bg-brand-light shadow-lg shadow-brand/25 hover:shadow-brand/50 hover:shadow-2xl",
    secondary:
      "border border-surface-border-light text-white/80 hover:text-white hover:border-brand/40 hover:bg-white/[0.03]",
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className)}
      whileHover={prefersReduced ? {} : { scale: 1.04, y: -1 }}
      whileTap={prefersReduced ? {} : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Glow pulse behind primary */}
      {variant === "primary" && !prefersReduced && (
        <span className="absolute -inset-1 rounded-xl bg-brand/15 blur-2xl animate-glow-pulse" />
      )}
      {/* Shine sweep on hover */}
      {variant === "primary" && !prefersReduced && (
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      )}
      {/* Gap expands on hover — breathing effect */}
      <span className="relative z-10 flex items-center gap-2 group-hover:gap-3.5 transition-all duration-500 ease-out">
        {children}
      </span>
    </Component>
  );
}
