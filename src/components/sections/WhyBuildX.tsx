"use client";

import { Zap, Award, Code2, Building2, MessageCircle, Rocket } from "lucide-react";
import {
  MotionSection,
  MotionStagger,
  MotionStaggerItem,
} from "@/components/motion";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Zap,
    title: "Faster Execution with AI",
    description: "AI-powered workflows cut development time dramatically without compromising quality.",
  },
  {
    icon: Award,
    title: "Premium Design & Dev Quality",
    description: "Every pixel and every line of code meets the highest standards of modern craftsmanship.",
  },
  {
    icon: Code2,
    title: "Developer-Led Product Thinking",
    description: "Engineering-first approach ensures your product is built right from the architecture up.",
  },
  {
    icon: Building2,
    title: "Scalable Modern Architecture",
    description: "Built on proven frameworks and patterns that grow seamlessly with your user base.",
  },
  {
    icon: MessageCircle,
    title: "Startup-Friendly Communication",
    description: "Transparent updates, fast responses, and a workflow that matches startup speed.",
  },
  {
    icon: Rocket,
    title: "End-to-End Delivery",
    description: "From strategy session to production launch — everything handled under one roof.",
  },
];

export function WhyBuildX() {
  return (
    <section className="relative py-24">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-violet/5 blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        <MotionSection className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-light mb-3">
            Why BuildX Studio
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Built Different. Built Better.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/40">
            We combine AI-powered speed with premium execution to deliver digital
            products that startups actually need.
          </p>
        </MotionSection>

        <MotionStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {benefits.map((benefit) => (
            <MotionStaggerItem key={benefit.title}>
              <motion.div
                className="group flex gap-4 rounded-xl p-5 transition-all duration-500 hover:bg-white/[0.02] border border-transparent hover:border-surface-border"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="flex-shrink-0 mt-1">
                  <motion.div
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand-light transition-shadow duration-500 group-hover:shadow-md group-hover:shadow-brand/10"
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <benefit.icon className="h-5 w-5" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1 group-hover:text-brand-light transition-colors duration-500">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/40">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
