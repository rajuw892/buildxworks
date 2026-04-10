"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Search, Target, Palette, Code2, Rocket } from "lucide-react";
import { MotionSection } from "@/components/motion";
import { fadeUp } from "@/lib/motion-config";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discover",
    description: "Deep-dive into your vision, market, users, and goals to build a clear product brief.",
    accent: "from-brand/20 to-brand-violet/10",
  },
  {
    icon: Target,
    number: "02",
    title: "Scope",
    description: "Define the MVP, prioritize features, and create a technical roadmap with delivery milestones.",
    accent: "from-brand-violet/20 to-purple-500/10",
  },
  {
    icon: Palette,
    number: "03",
    title: "Design",
    description: "Craft high-fidelity designs and interactive prototypes that look premium and convert.",
    accent: "from-brand-accent/20 to-brand/10",
  },
  {
    icon: Code2,
    number: "04",
    title: "Build",
    description: "AI-accelerated development with modern stack, continuous integration, and rapid iteration.",
    accent: "from-brand-blue/20 to-brand/10",
  },
  {
    icon: Rocket,
    number: "05",
    title: "Launch",
    description: "Production deployment, performance optimization, and post-launch support to ensure success.",
    accent: "from-emerald-500/15 to-brand/10",
  },
];

function ProcessStep({
  step,
  index,
  isLast,
  total,
}: {
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
  total: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReduced = useReducedMotion();
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="relative"
      variants={fadeUp}
    >
      {/* Desktop: alternating left-right cards */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] gap-8 items-start">
        {/* Left side content */}
        <div className={isEven ? "text-right pr-4" : ""}>
          {isEven && (
            <motion.div
              className="group relative rounded-2xl border border-surface-border bg-surface-raised/80 p-6 transition-all duration-500 hover:border-surface-border-light hover:shadow-lg hover:shadow-brand/[0.04]"
              animate={
                isInView && !prefersReduced
                  ? { opacity: 1, x: 0, filter: "blur(0px)" }
                  : { opacity: 0, x: -30, filter: "blur(6px)" }
              }
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Gradient accent bar */}
              <div className={`absolute top-0 right-0 w-24 h-px bg-gradient-to-l ${step.accent}`} />
              <span className="text-xs font-mono text-brand-light/40 block mb-2">
                Step {step.number}
              </span>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm leading-relaxed text-white/40">
                {step.description}
              </p>
            </motion.div>
          )}
        </div>

        {/* Center timeline */}
        <div className="flex flex-col items-center">
          <motion.div
            className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-surface-border bg-surface-raised"
            animate={
              isInView
                ? {
                    borderColor: "rgba(99,102,241,0.3)",
                    backgroundColor: "rgba(99,102,241,0.06)",
                    boxShadow: "0 0 30px rgba(99,102,241,0.08), 0 0 60px rgba(99,102,241,0.04)",
                  }
                : {}
            }
            transition={{
              duration: 1,
              delay: 0.15 + index * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              animate={
                isInView && !prefersReduced
                  ? { scale: [0.6, 1], opacity: [0, 1] }
                  : {}
              }
              transition={{
                duration: 0.6,
                delay: 0.25 + index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <step.icon className="h-5 w-5 text-brand-light" />
            </motion.div>
          </motion.div>
          {!isLast && (
            <div className="relative w-px flex-1 min-h-[40px] bg-surface-border">
              <motion.div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-brand/30 via-brand/15 to-transparent"
                initial={{ height: 0, opacity: 0 }}
                animate={isInView ? { height: "100%", opacity: 1 } : {}}
                transition={{
                  duration: 1.4,
                  delay: 0.4 + index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          )}
        </div>

        {/* Right side content */}
        <div className={!isEven ? "pl-4" : ""}>
          {!isEven && (
            <motion.div
              className="group relative rounded-2xl border border-surface-border bg-surface-raised/80 p-6 transition-all duration-500 hover:border-surface-border-light hover:shadow-lg hover:shadow-brand/[0.04]"
              animate={
                isInView && !prefersReduced
                  ? { opacity: 1, x: 0, filter: "blur(0px)" }
                  : { opacity: 0, x: 30, filter: "blur(6px)" }
              }
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Gradient accent bar */}
              <div className={`absolute top-0 left-0 w-24 h-px bg-gradient-to-r ${step.accent}`} />
              <span className="text-xs font-mono text-brand-light/40 block mb-2">
                Step {step.number}
              </span>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm leading-relaxed text-white/40">
                {step.description}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile: linear layout */}
      <div className="md:hidden flex gap-5">
        <div className="flex flex-col items-center">
          <motion.div
            className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-surface-border bg-surface-raised"
            animate={
              isInView
                ? {
                    borderColor: "rgba(99,102,241,0.3)",
                    backgroundColor: "rgba(99,102,241,0.06)",
                    boxShadow: "0 0 20px rgba(99,102,241,0.08)",
                  }
                : {}
            }
            transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
          >
            <step.icon className="h-5 w-5 text-brand-light" />
          </motion.div>
          {!isLast && (
            <div className="relative w-px flex-1 bg-surface-border">
              <motion.div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-brand/30 to-transparent"
                initial={{ height: 0 }}
                animate={isInView ? { height: "100%" } : {}}
                transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
              />
            </div>
          )}
        </div>
        <div className="pb-10">
          <span className="text-xs font-mono text-brand-light/40">Step {step.number}</span>
          <h3 className="text-lg font-semibold text-white mt-1">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/40 max-w-md">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Process() {
  return (
    <section id="process" className="relative py-28 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand/[0.03] blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6">
        <MotionSection className="text-center mb-20">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-light mb-3">
            Our Process
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            From Idea to Launch{" "}
            <span className="bg-gradient-to-r from-brand-light to-brand-violet bg-clip-text text-transparent">
              in Weeks
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/40">
            A proven, streamlined process that keeps your project on track and on budget.
          </p>
        </MotionSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {steps.map((step, i) => (
            <ProcessStep
              key={step.title}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
              total={steps.length}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
