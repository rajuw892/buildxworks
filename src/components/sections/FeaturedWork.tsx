"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { ArrowUpRight, Zap, Users, Clock, TrendingUp } from "lucide-react";
import { MotionSection } from "@/components/motion";
import { useRef, useState } from "react";

const projects = [
  {
    title: "NovaPay",
    subtitle: "Fintech SaaS Platform",
    description:
      "Built a complete payment analytics dashboard and billing infrastructure for a Series A fintech startup. Delivered MVP in 4 weeks with AI-powered fraud detection integration.",
    tags: ["SaaS", "Fintech", "AI Integration", "React"],
    gradient: "from-brand via-brand-violet to-purple-600",
    color: "99,102,241",
    metrics: [
      { icon: Clock, value: "4 weeks", label: "Delivery" },
      { icon: Users, value: "12K+", label: "Users" },
      { icon: TrendingUp, value: "3.8x", label: "ROI" },
    ],
    mockup: {
      bars: [72, 45, 88, 34, 92, 67, 55, 80, 43, 76],
      stat: "$2.4M",
      statLabel: "Revenue tracked",
    },
  },
  {
    title: "HealthSync",
    subtitle: "Telehealth Mobile App",
    description:
      "Designed and developed a cross-platform telehealth application with real-time video, scheduling, and EHR integration. Launched to 5,000+ users in the first month.",
    tags: ["Mobile App", "Healthcare", "Real-Time", "React Native"],
    gradient: "from-brand-violet via-purple-500 to-pink-500",
    color: "139,92,246",
    metrics: [
      { icon: Clock, value: "5 weeks", label: "Delivery" },
      { icon: Users, value: "5K+", label: "Users" },
      { icon: Zap, value: "99.9%", label: "Uptime" },
    ],
    mockup: {
      bars: [60, 85, 40, 75, 90, 50, 70, 95, 55, 65],
      stat: "5,200+",
      statLabel: "Active patients",
    },
  },
  {
    title: "Axiom",
    subtitle: "AI Content Studio",
    description:
      "End-to-end product build for an AI-powered content generation platform. Included custom LLM pipeline, editor UI, team collaboration, and usage-based billing system.",
    tags: ["AI/ML", "SaaS", "Full-Stack", "Next.js"],
    gradient: "from-brand-blue via-brand to-brand-violet",
    color: "59,130,246",
    metrics: [
      { icon: Clock, value: "6 weeks", label: "Delivery" },
      { icon: Users, value: "8K+", label: "Users" },
      { icon: TrendingUp, value: "5.2x", label: "ROI" },
    ],
    mockup: {
      bars: [50, 70, 90, 60, 80, 45, 85, 55, 75, 95],
      stat: "1.2M+",
      statLabel: "Words generated",
    },
  },
];

const CARD_HEIGHT = 600; // approximate height of each card
const CARD_TOP_OFFSET = 100; // px from top where cards stick
const STACK_OFFSET = 30; // how much each subsequent card shifts down

// Mockup visual with 3D perspective tilt on hover
function MockupVisual({
  project,
}: {
  project: (typeof projects)[0];
}) {
  const prefersReduced = useReducedMotion();
  const mockupRef = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 });
  const glowX = useSpring(50, { stiffness: 100, damping: 20 });
  const glowY = useSpring(50, { stiffness: 100, damping: 20 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mockupRef.current || prefersReduced) return;
    const rect = mockupRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rotateX.set((y - 0.5) * -12);
    rotateY.set((x - 0.5) * 12);
    glowX.set(x * 100);
    glowY.set(y * 100);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <motion.div
      ref={mockupRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={prefersReduced ? {} : {
        perspective: 1000,
        transformStyle: "preserve-3d" as const,
        rotateX,
        rotateY,
      }}
      whileHover={prefersReduced ? {} : { borderColor: "rgba(255,255,255,0.12)" }}
      className="relative"
    >
      {/* Mouse-reactive ambient glow */}
      {isHovered && (
        <div
          className="absolute -inset-4 rounded-3xl pointer-events-none opacity-60 blur-xl"
          style={{
            background: `radial-gradient(400px circle at 50% 50%, rgba(${project.color},0.12), transparent 60%)`,
          }}
        />
      )}
    <div className="relative rounded-2xl border border-surface-border bg-surface-raised/90 backdrop-blur-sm overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-border">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/40" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/40" />
        </div>
        <div className="flex-1 mx-6">
          <div className="h-5 rounded-md bg-surface-overlay border border-surface-border flex items-center px-3">
            <span className="text-[9px] text-white/25 truncate">
              app.{project.title.toLowerCase()}.io/dashboard
            </span>
          </div>
        </div>
      </div>

      {/* App content */}
      <div className="p-5 min-h-[260px]">
        <div className="flex gap-4">
          {/* Mini sidebar */}
          <div className="hidden sm:flex flex-col gap-2.5 w-10">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`h-8 w-8 rounded-lg ${
                  i === 0
                    ? `bg-gradient-to-br ${project.gradient} opacity-80`
                    : "bg-surface-overlay"
                }`}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.4 + i * 0.1,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 space-y-4">
            {/* Stat header */}
            <div className="flex items-end justify-between">
              <div>
                <motion.div
                  className="text-[10px] text-white/30 mb-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  {project.mockup.statLabel}
                </motion.div>
                <motion.div
                  className="text-2xl font-bold text-white"
                  initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {project.mockup.stat}
                </motion.div>
              </div>
              <motion.div
                className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              >
                <TrendingUp className="h-3 w-3" />
                +24.5%
              </motion.div>
            </div>

            {/* Chart bars */}
            <div className="flex items-end gap-1.5 h-28">
              {project.mockup.bars.map((h, i) => (
                <motion.div
                  key={i}
                  className={`flex-1 rounded-t bg-gradient-to-t ${project.gradient}`}
                  initial={{ height: 0, opacity: 0 }}
                  whileInView={{ height: `${h}%`, opacity: 0.7 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.7 + i * 0.07,
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
            </div>

            {/* Data rows */}
            <div className="space-y-2.5 pt-2">
              {[
                { w: 0.88, label: "Enterprise Plan" },
                { w: 0.65, label: "Growth Tier" },
                { w: 0.42, label: "Starter" },
              ].map((row, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 1.1 + i * 0.12,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="h-1.5 rounded-full bg-surface-overlay overflow-hidden" style={{ width: `${row.w * 100}%` }}>
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${project.gradient} opacity-40`}
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.3 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <span className="text-[9px] text-white/20 whitespace-nowrap">{row.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
}

// Individual sticky card in the stack
function StickyProjectCard({
  project,
  index,
  totalCards,
}: {
  project: (typeof projects)[0];
  index: number;
  totalCards: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Scale down slightly as the card gets covered by the next one
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0.92, 1, 1, 0.95 - index * 0.02]
  );

  // Fade when being scrolled past
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [0, 1, 1, index === totalCards - 1 ? 1 : 0.6, index === totalCards - 1 ? 1 : 0.3]
  );

  const stickyTop = CARD_TOP_OFFSET + index * STACK_OFFSET;

  return (
    <div
      ref={cardRef}
      className="h-[80vh] lg:h-[90vh]"
    >
      <motion.div
        className="sticky rounded-3xl border border-surface-border bg-surface/95 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/20"
        style={{
          top: `${stickyTop}px`,
          zIndex: index + 1,
          ...(prefersReduced ? {} : { scale, opacity }),
        }}
      >
        {/* Gradient top border accent */}
        <div className={`h-px bg-gradient-to-r ${project.gradient} opacity-40`} />

        {/* Card inner content */}
        <div className="p-6 sm:p-8 lg:p-10">
          {/* Project counter */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono text-white/15 tracking-widest">
              0{index + 1} / 0{totalCards}
            </span>
            <motion.div
              className="flex gap-1.5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-overlay px-3 py-1 text-[10px] font-medium text-white/40 border border-surface-border"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                <h3 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl tracking-tight">
                  {project.title}
                </h3>
                <p
                  className={`text-base sm:text-lg mt-1 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent font-medium`}
                >
                  {project.subtitle}
                </p>
              </motion.div>

              <motion.p
                className="mt-4 text-sm sm:text-base leading-relaxed text-white/40 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                {project.description}
              </motion.p>

              {/* Metrics */}
              <motion.div
                className="mt-6 flex gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              >
                {project.metrics.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <metric.icon className="h-3.5 w-3.5 text-brand-light/50" />
                      <span className="text-lg font-bold text-white">{metric.value}</span>
                    </div>
                    <span className="text-[11px] text-white/25">{metric.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA link */}
              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <motion.span
                  className="group/link inline-flex items-center gap-2 text-sm font-medium text-brand-light cursor-pointer"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  View Case Study
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </motion.span>
              </motion.div>
            </div>

            {/* Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <MockupVisual project={project} />
            </motion.div>
          </div>
        </div>

        {/* Ambient glow */}
        <div
          className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.06] blur-[100px]"
          style={{ background: `rgb(${project.color})` }}
        />
      </motion.div>
    </div>
  );
}

export function FeaturedWork() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="work" ref={sectionRef} className="relative py-32 overflow-visible">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand/[0.02] blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6">
        <MotionSection className="text-center mb-20">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-light mb-3">
            Featured Work
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Real Products.{" "}
            <span className="bg-gradient-to-r from-brand-light to-brand-violet bg-clip-text text-transparent">
              Real Results.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/40">
            A look at recent projects built with startup speed and premium execution.
          </p>
        </MotionSection>

        {/* Sticky stacking cards */}
        <div className="relative">
          {projects.map((project, i) => (
            <StickyProjectCard
              key={project.title}
              project={project}
              index={i}
              totalCards={projects.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
