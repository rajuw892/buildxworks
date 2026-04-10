"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Zap,
  Brain,
  Shield,
  Blocks,
  FileCode2,
  Handshake,
  ArrowRight,
  Check,
  X,
  Target,
  Star,
} from "lucide-react";
import {
  MotionSection,
  MotionStagger,
  MotionStaggerItem,
  HoverCard,
  GlowButton,
} from "@/components/motion";
import { useRequestForm } from "@/components/sections/RequestForm";
import { fadeUp } from "@/lib/motion-config";

const pillars = [
  {
    icon: Zap,
    title: "AI-Accelerated Delivery",
    description:
      "AI handles the repetitive lift so our engineers focus on architecture, logic, and craft — shipping weeks faster without cutting corners.",
  },
  {
    icon: Brain,
    title: "Human Product Judgment",
    description:
      "Every decision runs through experienced product thinkers who understand markets, users, and what actually converts.",
  },
  {
    icon: Blocks,
    title: "Built for Scale",
    description:
      "We design systems for what comes after launch — scalable data models, clean APIs, and architecture that grows with your user base.",
  },
  {
    icon: Shield,
    title: "Security-Minded Engineering",
    description:
      "Auth, data handling, and infrastructure are treated as first-class concerns from day one — not afterthoughts bolted on later.",
  },
  {
    icon: FileCode2,
    title: "Clean, Maintainable Code",
    description:
      "Readable, well-structured codebases your future team can extend confidently. No tangled abstractions, no tech debt traps.",
  },
  {
    icon: Handshake,
    title: "Founder-Level Collaboration",
    description:
      "Direct access to senior builders who think like co-founders — aligned on outcomes, not just deliverables.",
  },
];

const comparison = {
  others: [
    "Fast but fragile under real load",
    "Visually polished, poorly structured underneath",
    "Ships quickly, expensive to maintain",
    "Scattered teams, slow communication loops",
  ],
  buildx: [
    "10x faster delivery — without sacrificing architecture",
    "Premium design backed by production-grade engineering",
    "AI-powered speed with human-led quality at every layer",
    "End-to-end delivery with transparent, startup-speed comms",
  ],
};

const qualifications = [
  { icon: Target, label: "Clear product vision" },
  { icon: Zap, label: "Ready to move fast" },
  { icon: Star, label: "Committed to quality" },
];

export function HumanAI() {
  const prefersReduced = useReducedMotion();
  const { openForm } = useRequestForm();

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-brand/[0.04] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-violet/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section header */}
        <MotionSection className="text-center mb-20">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-light mb-4">
            How We Build
          </p>
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            10x Faster Execution.{" "}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-brand-light via-brand-accent to-brand-violet bg-clip-text text-transparent">
              Zero Compromises.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/45 sm:text-lg">
            We pair senior engineers with AI-accelerated workflows to deliver in days
            what traditional teams take months to build. The speed comes from tooling.
            The quality comes from judgment.
          </p>
        </MotionSection>

        {/* Pillar grid */}
        <MotionStagger
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-20"
          staggerDelay={0.12}
        >
          {pillars.map((pillar) => (
            <MotionStaggerItem key={pillar.title}>
              <HoverCard className="h-full">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand-light">
                  <pillar.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/40">
                  {pillar.description}
                </p>
              </HoverCard>
            </MotionStaggerItem>
          ))}
        </MotionStagger>

        {/* Comparison block */}
        <MotionSection delay={0.1}>
          <div className="rounded-2xl border border-surface-border bg-surface-raised/60 backdrop-blur-sm overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Others column */}
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-surface-border">
                <p className="text-xs font-medium uppercase tracking-wider text-white/25 mb-6">
                  The Typical Tradeoff
                </p>
                <ul className="space-y-4">
                  {comparison.others.map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-sm text-white/35"
                      variants={fadeUp}
                    >
                      <X className="h-4 w-4 mt-0.5 flex-shrink-0 text-white/15" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* BuildX column */}
              <div className="relative p-8 md:p-10">
                {!prefersReduced && (
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.03] to-transparent pointer-events-none" />
                )}
                <p className="relative text-xs font-medium uppercase tracking-wider text-brand-light/70 mb-6">
                  The BuildX Standard
                </p>
                <ul className="relative space-y-4">
                  {comparison.buildx.map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-sm text-white/70"
                      variants={fadeUp}
                    >
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-brand-light" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </MotionSection>

        {/* Selectivity callout */}
        <MotionSection delay={0.15} className="mt-16">
          <div className="rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/[0.04] via-surface-raised to-surface-raised p-8 md:p-12 text-center">
            <p className="text-xs font-medium uppercase tracking-wider text-brand-light/70 mb-4">
              Limited Partnerships
            </p>
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              We&apos;re selective about who we work with.
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/45">
              BuildX partners with a small number of founders each quarter. We look for
              strong product vision, real commitment, and ideas worth building well.
              If the fit is right, we move fast together.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
              {qualifications.map((q) => (
                <div key={q.label} className="flex items-center gap-2.5 text-sm text-white/50">
                  <q.icon className="h-4 w-4 text-brand-light/60" />
                  {q.label}
                </div>
              ))}
            </div>
          </div>
        </MotionSection>

        {/* Closing line + CTA */}
        <MotionSection delay={0.2} className="mt-16 text-center">
          <p className="text-base text-white/30 italic">
            If you&apos;re building something that matters, we&apos;d like to hear about it.
          </p>
          <div className="mt-8">
            <GlowButton onClick={openForm}>
              Submit Your Idea
              <ArrowRight className="h-4 w-4" />
            </GlowButton>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
