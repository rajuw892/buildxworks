"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AccordionItemAnimatedProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function AccordionItemAnimated({
  question,
  answer,
  defaultOpen = false,
}: AccordionItemAnimatedProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const prefersReduced = useReducedMotion();

  return (
    <div className="border-b border-surface-border">
      <button
        className="flex w-full items-center justify-between py-5 text-left text-base font-medium text-white/90 hover:text-white transition-colors cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.3 }}
          className="ml-4 flex-shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-brand-light" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={prefersReduced ? { height: "auto" } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={prefersReduced ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-white/60">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
