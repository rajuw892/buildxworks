"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  MotionSection,
  MotionStagger,
  MotionStaggerItem,
  AnimatedCounter,
  HoverCard,
} from "@/components/motion";

const stats = [
  { value: 3, suffix: "", label: "Live products shipped" },
  { value: 3000, suffix: "+", label: "End users served" },
  { value: 9.6, suffix: "/10", label: "Verified NPS (Chalo Folks)" },
  { value: 7, suffix: "", label: "AI platforms integrated" },
];

const liveProducts = [
  {
    name: "AIExposureTool",
    tagline: "AI visibility platform",
    url: "https://aiexposuretool.com",
    accent: "from-brand to-brand-violet",
  },
  {
    name: "Bondlyfe",
    tagline: "Cinematic proposal pages",
    url: "https://bondlyfe.com",
    accent: "from-pink-500 to-rose-500",
  },
  {
    name: "Chalo Folks",
    tagline: "Founder-led travel booking",
    url: "https://www.chalofolks.com",
    accent: "from-amber-400 to-orange-500",
  },
];

export function SocialProof() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Live products row */}
      <div className="mx-auto max-w-6xl px-6 mb-20">
        <MotionSection className="text-center mb-10">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-light mb-3">
            Live in the wild
          </p>
          <h3 className="text-2xl font-bold text-white sm:text-3xl">
            Products built end-to-end. Click to visit.
          </h3>
        </MotionSection>

        <MotionStagger
          className="grid gap-4 sm:grid-cols-3"
          staggerDelay={0.1}
        >
          {liveProducts.map((product) => (
            <MotionStaggerItem key={product.name}>
              <motion.a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative block rounded-2xl border border-surface-border bg-surface-raised/60 backdrop-blur-sm p-6 hover:border-surface-border-light transition-colors"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${product.accent} opacity-30 group-hover:opacity-70 transition-opacity`}
                />
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-lg font-bold text-white">
                      {product.name}
                    </div>
                    <div className="mt-1 text-xs text-white/40">
                      {product.tagline}
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-white/80 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="mt-6 text-[11px] font-mono text-white/25 group-hover:text-brand-light/70 transition-colors">
                  {product.url.replace(/^https?:\/\//, "")}
                </div>
              </motion.a>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </div>

      {/* Real stats */}
      <div className="mx-auto max-w-5xl px-6">
        <MotionStagger
          className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
          staggerDelay={0.08}
        >
          {stats.map((stat) => (
            <MotionStaggerItem key={stat.label}>
              <HoverCard className="text-center py-8">
                <div className="text-3xl font-bold text-white md:text-4xl">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={2}
                  />
                </div>
                <p className="mt-2 text-sm text-white/40">{stat.label}</p>
              </HoverCard>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
