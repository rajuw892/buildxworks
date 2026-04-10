"use client";

import {
  MotionSection,
  MotionStagger,
  MotionStaggerItem,
  AnimatedCounter,
  HoverCard,
} from "@/components/motion";

const stats = [
  { value: 30, suffix: "+", label: "Projects Delivered" },
  { value: 2, suffix: "–6 Weeks", label: "Avg Launch Time" },
  { value: 80, suffix: "%", label: "Repeat Clients" },
  { value: 5, suffix: "-Star", label: "Client Satisfaction" },
];

const logos = [
  "TechStart",
  "LaunchPad",
  "NovaSoft",
  "Elevate AI",
  "Nimbus",
  "StackForge",
  "PulseApp",
  "CloudNine",
  "Vertex",
  "Axiom",
];

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-container relative overflow-hidden py-2">
      <div
        className={`flex whitespace-nowrap ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((logo, i) => (
          <div
            key={i}
            className="mx-3 flex items-center rounded-lg border border-surface-border/50 bg-surface-raised/40 px-5 py-2.5 text-sm font-semibold text-white/12 hover:text-white/25 hover:border-surface-border-light transition-all duration-500 select-none"
          >
            {logo}
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface to-transparent z-10" />
    </div>
  );
}

export function SocialProof() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Marquee logos */}
      <div className="mb-16">
        <MotionSection className="text-center mb-8">
          <p className="text-sm text-white/40 tracking-wide uppercase">
            Trusted by founders, startups, and ambitious teams
          </p>
        </MotionSection>
        <MarqueeRow items={logos} />
        <MarqueeRow items={[...logos].reverse()} reverse />
      </div>

      {/* Stats */}
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
