"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { MotionSection, GlowButton } from "@/components/motion";
import { useRequestForm } from "@/components/sections/RequestForm";

export function FinalCTA() {
  const { openForm } = useRequestForm();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  // Second orbital
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.85]);

  // Third orbital
  const rotate3 = useTransform(scrollYProgress, [0, 1], [30, 210]);
  const scale3 = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.85]);

  return (
    <section id="cta" ref={ref} className="relative py-40 overflow-hidden">
      {/* Layered cinematic background */}
      <div className="absolute inset-0">
        {/* Primary breathing glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary offset glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* 3D Orbital ring — tilted in perspective */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ perspective: 1200 }}
        >
          <motion.div
            className="w-[500px] h-[500px] rounded-full border border-brand/[0.08]"
            style={{
              rotate,
              scale,
              rotateX: 60,
              transformStyle: "preserve-3d",
            }}
          />
        </div>

        {/* Second 3D orbital ring — counter-tilted */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ perspective: 1200 }}
        >
          <motion.div
            className="w-[700px] h-[700px] rounded-full border border-brand-violet/[0.06]"
            style={{
              rotate: rotate2,
              scale: scale2,
              rotateX: 55,
              transformStyle: "preserve-3d",
            }}
          />
        </div>

        {/* Third orbital — opposite tilt for depth */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ perspective: 1200 }}
        >
          <motion.div
            className="w-[400px] h-[400px] rounded-full border border-brand-accent/[0.04]"
            style={{
              rotate: rotate3,
              scale: scale3,
              rotateX: -50,
              rotateY: 20,
              transformStyle: "preserve-3d",
            }}
          />
        </div>

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <MotionSection>
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Have an Idea{" "}
            <span className="bg-gradient-to-r from-brand-light to-brand-violet bg-clip-text text-transparent">
              Worth Building?
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/40 sm:text-lg">
            Tell us what you&apos;re working on. If there&apos;s a strong fit,
            we&apos;ll schedule a strategy call within minutes to map out your build.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlowButton className="text-base px-9 py-4" onClick={openForm}>
              Submit Your Request
              <ArrowRight className="h-5 w-5" />
            </GlowButton>
            <button
              data-cal-link="raju-raman/strategy-call"
              data-cal-config='{"theme":"dark"}'
              className="inline-flex items-center gap-2 rounded-xl border border-surface-border bg-surface-raised/60 px-6 py-4 text-base font-medium text-white/70 hover:text-white hover:border-brand/30 hover:bg-brand/5 transition-all duration-300 cursor-pointer backdrop-blur-sm"
            >
              <Calendar className="h-5 w-5 text-brand-light" />
              Book a Call Directly
            </button>
          </div>
          <p className="mt-4 text-xs text-white/25">
            No commitment required. Typical response within 10 minutes.
          </p>
        </MotionSection>
      </div>
    </section>
  );
}
