"use client";

import { motion, useScroll, useTransform, useReducedMotion, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Sparkles, Zap, Star, Target, TrendingUp, Clock, Users, CheckCircle2, Calendar } from "lucide-react";
import { GlowButton } from "@/components/motion";
import { useRequestForm } from "@/components/sections/RequestForm";
import { staggerContainer, fadeUp } from "@/lib/motion-config";

const trustItems = [
  { icon: Sparkles, label: "End-to-end builds" },
  { icon: Zap, label: "Auth + Payments + AI" },
  { icon: Star, label: "Three live products" },
  { icon: Target, label: "Founder direct" },
];

// Floating UI card with 3D perspective tilt on hover
function FloatingCard({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || prefersReduced) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -15, y: (x - 0.5) * 15 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`absolute rounded-xl border border-surface-border bg-surface-raised/80 backdrop-blur-md p-4 shadow-2xl ${className}`}
      style={{ perspective: 800, transformStyle: "preserve-3d" as const }}
      initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(10px)", rotateX: 0, rotateY: 0 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{
        delay: 0.6 + delay,
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        rotateX: { type: "spring", stiffness: 150, damping: 20 },
        rotateY: { type: "spring", stiffness: 150, damping: 20 },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      whileHover={{ scale: 1.04, borderColor: "rgba(255,255,255,0.15)" }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { openForm } = useRequestForm();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Deeper parallax with spring smoothing
  const bgYRaw = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textYRaw = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleRaw = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);

  useEffect(() => {
    if (prefersReduced) return;
    const handler = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [prefersReduced]);

  // Smooth spring for mouse parallax
  const springConfig = { stiffness: 50, damping: 20, mass: 1 };
  const smoothX = useSpring(0, springConfig);
  const smoothY = useSpring(0, springConfig);

  useEffect(() => {
    smoothX.set(mousePos.x);
    smoothY.set(mousePos.y);
  }, [mousePos.x, mousePos.y, smoothX, smoothY]);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated gradient background — deeper parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={prefersReduced ? {} : { y: bgYRaw }}
      >
        {/* Primary glow — larger, more atmospheric */}
        <motion.div
          className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full bg-brand/8 blur-[160px]"
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Secondary glow */}
        <motion.div
          className="absolute top-[5%] right-[5%] w-[500px] h-[500px] rounded-full bg-brand-violet/6 blur-[130px]"
          animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* Tertiary ambient glow */}
        <motion.div
          className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-brand-blue/4 blur-[120px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-32"
        style={prefersReduced ? {} : { opacity: opacityRaw, scale: scaleRaw }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            style={prefersReduced ? {} : { y: textYRaw }}
            variants={staggerContainer(0.15)}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-xs font-medium text-brand-light">
                <Sparkles className="h-3 w-3" />
                Solo founder studio · AI-accelerated
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Idea to live product.{" "}
              <span className="bg-gradient-to-r from-brand-light via-brand-accent to-brand-violet bg-clip-text text-transparent">
                In weeks.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-lg text-base leading-relaxed text-white/50 sm:text-lg"
            >
              End-to-end product builds for founders — websites, apps, and SaaS.
              Three production products live, serving 3,000+ users. Auth, payments,
              AI, and dashboards included. You bring the idea, we ship it.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
              <GlowButton onClick={openForm}>
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </GlowButton>
              <button
                data-cal-link="raju-raman/strategy-call"
                data-cal-config='{"theme":"dark"}'
                className="inline-flex items-center gap-2 rounded-xl border border-surface-border bg-surface-raised/60 px-6 py-3 text-sm font-medium text-white/70 hover:text-white hover:border-brand/30 hover:bg-brand/5 transition-all duration-300 cursor-pointer backdrop-blur-sm"
              >
                <Calendar className="h-4 w-4 text-brand-light" />
                Book a Call
              </button>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              variants={fadeUp}
              className="mt-12 flex flex-wrap gap-6"
            >
              {trustItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-2 text-xs text-white/40"
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 1.4 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <item.icon className="h-3.5 w-3.5 text-brand-light/60" />
                  {item.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero visual - floating UI cards with spring parallax */}
          <div className="relative hidden lg:block h-[500px]">
            <motion.div
              className="relative w-full h-full"
              style={
                prefersReduced
                  ? {}
                  : {
                      x: smoothX,
                      y: smoothY,
                    }
              }
            >
              {/* Your idea → Live product card */}
              <FloatingCard className="top-4 left-0 w-[280px] animate-float" delay={0}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-brand/20 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-brand-light" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white/90">Your Product Build</div>
                    <div className="text-[10px] text-white/40">AI-accelerated delivery</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Strategy & Scoping", pct: "100%", done: true },
                    { label: "Design & Prototype", pct: "100%", done: true },
                    { label: "Development Sprint", pct: "87%", done: false },
                  ].map((item, i) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="text-white/50 flex items-center gap-1.5">
                          {item.done && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                          {item.label}
                        </span>
                        <span className={item.done ? "text-emerald-400" : "text-brand-light"}>
                          {item.pct}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-surface-overlay overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            item.done
                              ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                              : "bg-gradient-to-r from-brand to-brand-violet"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: item.pct }}
                          transition={{ delay: 1.3 + i * 0.2, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </FloatingCard>

              {/* Delivery speed card */}
              <FloatingCard className="top-0 right-0 w-52 animate-float-delayed" delay={0.2}>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-3.5 w-3.5 text-brand-light/60" />
                  <div className="text-[10px] text-white/40">Build cadence</div>
                </div>
                <div className="text-3xl font-bold text-white">Weeks<span className="text-lg text-white/40 font-normal ml-1">not months</span></div>
                <div className="flex items-center gap-1.5 mt-2">
                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                  <span className="text-[10px] text-emerald-400">AI-accelerated, solo founder</span>
                </div>
              </FloatingCard>

              {/* Live products card */}
              <FloatingCard className="bottom-24 left-8 w-56 animate-float-slow" delay={0.4}>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-3.5 w-3.5 text-brand-light/60" />
                  <div className="text-[10px] text-white/40">Live Products</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "3", label: "Shipped" },
                    { value: "3K+", label: "End users" },
                    { value: "9.6", label: "NPS" },
                    { value: "7", label: "AI platforms" },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="text-sm font-bold text-white">{stat.value}</div>
                      <div className="text-[9px] text-white/35">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </FloatingCard>

              {/* Live status badge */}
              <FloatingCard className="bottom-6 right-4 w-48" delay={0.6}>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-white/60">Accepting new projects</span>
                </div>
              </FloatingCard>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-surface to-transparent z-10" />
    </section>
  );
}
