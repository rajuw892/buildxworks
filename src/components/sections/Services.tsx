"use client";

import { Globe, Smartphone, Layers, Bot, Palette, BrainCircuit, Workflow } from "lucide-react";
import {
  MotionSection,
  MotionStagger,
  MotionStaggerItem,
  HoverCard,
} from "@/components/motion";

const services = [
  {
    icon: Globe,
    title: "Startup Websites",
    description:
      "High-converting marketing sites and landing pages built with modern frameworks, optimized for speed and SEO.",
  },
  {
    icon: Smartphone,
    title: "Web & Mobile Apps",
    description:
      "Cross-platform applications with polished UX, scalable architecture, and rapid iteration cycles.",
  },
  {
    icon: Layers,
    title: "SaaS Product Development",
    description:
      "End-to-end SaaS builds from auth to billing — scalable, secure, and ready for growth.",
  },
  {
    icon: BrainCircuit,
    title: "AI Agents & Copilots",
    description:
      "Custom AI agents that handle complex workflows autonomously — from customer support bots to internal copilots that 10x your team's output.",
  },
  {
    icon: Bot,
    title: "AI-Powered Products",
    description:
      "Ship products with AI at the core — intelligent search, content generation, recommendations, and LLM-powered features built into your product.",
  },
  {
    icon: Workflow,
    title: "AI Automation & Pipelines",
    description:
      "Automate repetitive business workflows with AI — data extraction, document processing, smart routing, and custom AI toolchains.",
  },
  {
    icon: Palette,
    title: "UI/UX Product Design",
    description:
      "Research-driven design systems, prototyping, and user experience strategy that converts and delights.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <MotionSection className="text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-light mb-3">
            What We Build
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Full-Spectrum Digital Product Studio
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/40">
            From concept to launch, we design and build the digital products that
            power ambitious startups — including AI-native solutions.
          </p>
        </MotionSection>

        {/* Top row: 4 cards */}
        <MotionStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-5" staggerDelay={0.1}>
          {services.slice(0, 4).map((service) => (
            <MotionStaggerItem key={service.title}>
              <HoverCard className="h-full">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand-light">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/40">
                  {service.description}
                </p>
              </HoverCard>
            </MotionStaggerItem>
          ))}
        </MotionStagger>

        {/* Bottom row: 3 cards */}
        <MotionStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {services.slice(4).map((service) => (
            <MotionStaggerItem key={service.title}>
              <HoverCard className="h-full">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand-light">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/40">
                  {service.description}
                </p>
              </HoverCard>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
