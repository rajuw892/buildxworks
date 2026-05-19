"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { Check, ArrowRight, Minus } from "lucide-react";
import {
  MotionSection,
  MotionStagger,
  MotionStaggerItem,
  GlowButton,
} from "@/components/motion";
import { useRequestForm } from "@/components/sections/RequestForm";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "MVP Launchpad",
    price: "$4,999",
    period: "starting at",
    description:
      "For lean teams and startups needing a complete MVP — designed, built, and deployed fast with AI-powered workflows.",
    popular: false,
    delivery: "2–4 weeks",
    speedNote: "3x faster than typical agencies",
    features: [
      { text: "Complete MVP development", included: true },
      { text: "Full-stack development (frontend + backend)", included: true },
      { text: "Custom UI/UX design", included: true },
      { text: "Responsive across all devices", included: true },
      { text: "Deployment & launch support", included: true },
      { text: "14-day post-launch support", included: true },
      { text: "PRD-based revisions included", included: true },
      { text: "Analytics & monitoring setup", included: true },
    ],
  },
  {
    name: "Product Sprint+",
    price: "$8,999",
    period: "starting at",
    description:
      "For founders who want a production-ready product — not a prototype. End-to-end build with AI acceleration and premium polish.",
    popular: true,
    delivery: "3–5 weeks",
    speedNote: "5x faster than traditional teams",
    features: [
      { text: "End-to-end product development", included: true },
      { text: "Production-ready codebase & architecture", included: true },
      { text: "Polished core user flows & UX", included: true },
      { text: "Auth, billing & API integrations", included: true },
      { text: "AI-powered features available", included: true },
      { text: "CI/CD pipeline & cloud deployment", included: true },
      { text: "21-day post-launch support", included: true },
      { text: "Priority Slack + weekly syncs", included: true },
      { text: "Best for demos, users & early investors", included: true },
    ],
  },
  {
    name: "Growth Partner",
    price: "$14,999",
    period: "starting at",
    description:
      "A fully tailored design, development, and growth partnership — from strategy to deployment and beyond.",
    popular: false,
    delivery: "4–8 weeks",
    speedNote: "10x execution speed",
    features: [
      { text: "Dedicated product & engineering team", included: true },
      { text: "Custom UX, design system & architecture", included: true },
      { text: "Scalable cloud infrastructure", included: true },
      { text: "Enterprise-grade security & compliance", included: true },
      { text: "Priority support & SLA-backed delivery", included: true },
      { text: "Ongoing optimization & roadmap planning", included: true },
      { text: "AI integrations & automation", included: true },
      { text: "Investor-ready product & documentation", included: true },
    ],
  },
];

function PricingCard({
  plan,
  prefersReduced,
  children,
}: {
  plan: (typeof plans)[0];
  prefersReduced: boolean | null;
  children: React.ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || prefersReduced) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -8, y: (x - 0.5) * 8 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "group relative h-full flex flex-col rounded-2xl border p-px transition-shadow duration-500",
        plan.popular
          ? "border-transparent hover:shadow-2xl hover:shadow-brand/10"
          : "border-surface-border hover:border-surface-border-light hover:shadow-lg hover:shadow-brand/[0.03]"
      )}
      style={{
        perspective: 900,
        transformStyle: "preserve-3d" as const,
      }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{
        rotateX: { type: "spring", stiffness: 200, damping: 24 },
        rotateY: { type: "spring", stiffness: 200, damping: 24 },
      }}
      whileHover={
        prefersReduced
          ? {}
          : {
              y: -8,
              transition: { type: "spring", stiffness: 200, damping: 20 },
            }
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      {children}
    </motion.div>
  );
}

export function Pricing() {
  const { openForm } = useRequestForm();
  const prefersReduced = useReducedMotion();

  return (
    <section id="pricing" className="relative py-28">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand/[0.03] blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        <MotionSection className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-light mb-3">
            Pricing
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            10x Speed.{" "}
            <span className="bg-gradient-to-r from-brand-light to-brand-violet bg-clip-text text-transparent">
              Transparent Pricing.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/40">
            AI-accelerated delivery means you get premium results in a fraction of the
            time. All engagements begin with a fit conversation.
          </p>
        </MotionSection>

        <MotionStagger
          className="grid gap-6 lg:grid-cols-3 items-stretch"
          staggerDelay={0.15}
        >
          {plans.map((plan) => (
            <MotionStaggerItem key={plan.name}>
              <PricingCard plan={plan} prefersReduced={prefersReduced}>
                {/* Animated gradient border for popular plan */}
                {plan.popular && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-brand/40 via-brand-violet/20 to-brand/10 -z-10" />
                )}

                <div
                  className={cn(
                    "relative h-full flex flex-col rounded-[15px] p-7",
                    plan.popular
                      ? "bg-gradient-to-b from-brand/[0.08] via-surface-raised to-surface-raised"
                      : "bg-surface-raised"
                  )}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <motion.span
                        className="inline-flex items-center rounded-full bg-gradient-to-r from-brand to-brand-violet px-5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-brand/30"
                        animate={
                          prefersReduced
                            ? {}
                            : {
                                boxShadow: [
                                  "0 4px 20px rgba(99,102,241,0.3)",
                                  "0 4px 35px rgba(99,102,241,0.5)",
                                  "0 4px 20px rgba(99,102,241,0.3)",
                                ],
                              }
                        }
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        Most Popular
                      </motion.span>
                    </div>
                  )}

                  {/* Plan header */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-surface-border">
                    <span className="text-xs text-white/30 uppercase tracking-wide">
                      {plan.period}
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/5 border border-brand/10 px-3 py-1 text-[11px] text-brand-light">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-light animate-pulse" />
                        {plan.delivery}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-emerald-500/5 border border-emerald-500/10 px-3 py-1 text-[11px] text-emerald-400">
                        {plan.speedNote}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="mb-8 space-y-3 flex-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature.text}
                        className={cn(
                          "flex items-start gap-3 text-sm",
                          feature.included ? "text-white/55" : "text-white/20"
                        )}
                      >
                        {feature.included ? (
                          <Check className="h-4 w-4 text-brand-light mt-0.5 flex-shrink-0" />
                        ) : (
                          <Minus className="h-4 w-4 text-white/15 mt-0.5 flex-shrink-0" />
                        )}
                        {feature.text}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <GlowButton
                    variant={plan.popular ? "primary" : "secondary"}
                    className="w-full"
                    onClick={openForm}
                  >
                    Request Access <ArrowRight className="h-4 w-4" />
                  </GlowButton>
                </div>
              </PricingCard>
            </MotionStaggerItem>
          ))}
        </MotionStagger>

        {/* Bottom trust line */}
        <MotionSection delay={0.3} className="mt-12 text-center">
          <p className="text-sm text-white/25">
            All plans include a discovery call. Custom scoping available for larger projects.
          </p>
        </MotionSection>
      </div>
    </section>
  );
}
