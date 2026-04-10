"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { MotionSection } from "@/components/motion";

const testimonials = [
  {
    quote:
      "BuildX took our rough product idea and turned it into a polished SaaS platform in 5 weeks. The quality of the design and code was genuinely impressive — it felt like working with a senior in-house team.",
    name: "Sarah Chen",
    role: "Co-founder, NovaPay",
    initials: "SC",
    metric: "5 weeks to launch",
  },
  {
    quote:
      "We had tried two agencies before finding BuildX. The difference was night and day. They actually understood our product, moved fast, and delivered something that our investors immediately noticed. Highly recommend.",
    name: "Marcus Williams",
    role: "CEO, HealthSync",
    initials: "MW",
    metric: "Impressed investors",
  },
  {
    quote:
      "The AI-powered workflow they use is legit. What would have taken months was done in weeks. They handled everything — design, frontend, backend, deployment. We just focused on our business.",
    name: "Priya Sharma",
    role: "Founder, Axiom AI",
    initials: "PS",
    metric: "Months saved",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const prefersReduced = useReducedMotion();

  const next = useCallback(
    () => setActive((p) => (p + 1) % testimonials.length),
    []
  );
  const prev = useCallback(
    () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length),
    []
  );

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const t = testimonials[active];

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-violet/[0.03] blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6">
        <MotionSection className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-light mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Founders Love Working With Us
          </h2>
        </MotionSection>

        {/* Testimonial card */}
        <MotionSection>
          <div className="relative rounded-2xl border border-surface-border bg-surface-raised/80 backdrop-blur-sm p-8 md:p-12">
            {/* Quote icon */}
            <div className="absolute top-6 right-6 md:top-8 md:right-8">
              <Quote className="h-8 w-8 text-brand/10" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={prefersReduced ? {} : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReduced ? {} : { opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-brand-light text-brand-light"
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-lg leading-relaxed text-white/60 md:text-xl md:leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand-light border border-brand/10">
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {t.name}
                      </div>
                      <div className="text-xs text-white/40">{t.role}</div>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/5 border border-brand/10 px-3 py-1.5 text-xs text-brand-light">
                      {t.metric}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between border-t border-surface-border pt-6">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                      i === active
                        ? "w-8 bg-brand-light"
                        : "w-1.5 bg-white/15 hover:bg-white/25"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border text-white/30 hover:text-white/60 hover:border-surface-border-light transition-colors cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={next}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border text-white/30 hover:text-white/60 hover:border-surface-border-light transition-colors cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
