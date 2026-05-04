"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Users, Star, Layers, Sparkles, MapPin, Zap } from "lucide-react";
import { MotionSection } from "@/components/motion";
import { useRef, useState } from "react";

type Project = {
  title: string;
  subtitle: string;
  url: string;
  displayUrl: string;
  description: string;
  tags: string[];
  gradient: string;
  color: string;
  metrics: { icon: typeof Users; value: string; label: string }[];
  screenshot: string;
  testimonial?: { quote: string; author: string; role: string };
};

const projects: Project[] = [
  {
    title: "AIExposureTool",
    subtitle: "B2B SaaS · AI Visibility Platform",
    url: "https://aiexposuretool.com",
    displayUrl: "aiexposuretool.com",
    description:
      "Full B2B SaaS shipped end-to-end — landing, freemium signup with Google auth, scan engine across 7 AI platforms, dashboard with 30-day visibility trends, competitor benchmarking, auto-generated fix files (llms.txt, JSON-LD, FAQ schema), public REST API, Slack + webhook integrations, 4-tier billing via Dodo Payments.",
    tags: ["B2B SaaS", "AI", "Dashboard", "Billing"],
    gradient: "from-brand via-brand-violet to-purple-600",
    color: "99,102,241",
    metrics: [
      { icon: Sparkles, value: "1,000+", label: "Sites scanned" },
      { icon: Layers, value: "7", label: "AI platforms" },
      { icon: Zap, value: "Live", label: "Paid tiers" },
    ],
    screenshot: "/work/aiexposuretool.png",
    testimonial: {
      quote: "Score improved 35 → 72 in two weeks.",
      author: "Matthew R.",
      role: "Founder, Revisionary",
    },
  },
  {
    title: "Bondlyfe",
    subtitle: "Consumer Product · Cinematic Web Experiences",
    url: "https://bondlyfe.com",
    displayUrl: "bondlyfe.com",
    description:
      "A live consumer product designed for moments people share. Ten premium proposal themes with animations, the now-iconic runaway 'NO' button, real-time response tracking, the Spark couple-voting game, an Apology Studio, mic-powered candle interactions, and dual-region payments via Stripe + Razorpay — link-shareable, no install required.",
    tags: ["Consumer", "Interactive UX", "Stripe + Razorpay"],
    gradient: "from-pink-500 via-rose-500 to-brand-violet",
    color: "236,72,153",
    metrics: [
      { icon: Users, value: "2,000+", label: "Couples" },
      { icon: Layers, value: "10", label: "Themes" },
      { icon: Zap, value: "2", label: "Payment regions" },
    ],
    screenshot: "/work/bondlyfe.png",
  },
  {
    title: "Chalo Folks",
    subtitle: "E-commerce · Founder-Led Travel",
    url: "https://www.chalofolks.com",
    displayUrl: "chalofolks.com",
    description:
      "A founder-led travel studio booking site that doesn't feel like a comparison site. Built on Next.js with Cloudinary image pipeline, Cal.com booking integration, deposit-based payment flow, traveler review system, multi-page trip itineraries, and confirmed departure scheduling through Sep 2026.",
    tags: ["E-commerce", "Travel", "Cal.com", "Payments"],
    gradient: "from-amber-400 via-orange-500 to-brand",
    color: "251,146,60",
    metrics: [
      { icon: Star, value: "9.6/10", label: "NPS" },
      { icon: Users, value: "29+", label: "Verified reviews" },
      { icon: MapPin, value: "8", label: "Trips delivered" },
    ],
    screenshot: "/work/chalofolks.png",
    testimonial: {
      quote:
        "Anima made India feel like home. Her stories brought every temple and street to life.",
      author: "Sarah Jenkins",
      role: "Traveler, UK",
    },
  },
];

const CARD_TOP_OFFSET = 100;
const STACK_OFFSET = 30;

function ScreenshotMockup({ project }: { project: Project }) {
  const prefersReduced = useReducedMotion();
  const mockupRef = useRef<HTMLAnchorElement>(null);

  const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mockupRef.current || prefersReduced) return;
    const rect = mockupRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rotateX.set((y - 0.5) * -8);
    rotateY.set((x - 0.5) * 8);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      ref={mockupRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={
        prefersReduced
          ? {}
          : {
              perspective: 1000,
              transformStyle: "preserve-3d" as const,
              rotateX,
              rotateY,
            }
      }
      className="group relative block"
    >
      {/* Mouse-reactive glow */}
      {isHovered && (
        <div
          className="absolute -inset-4 rounded-3xl pointer-events-none opacity-60 blur-xl"
          style={{
            background: `radial-gradient(400px circle at 50% 50%, rgba(${project.color},0.18), transparent 60%)`,
          }}
        />
      )}

      <div className="relative rounded-2xl border border-surface-border bg-surface-raised/90 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/40 group-hover:border-surface-border-light transition-colors">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-border bg-surface-overlay/40">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/40" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/40" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/40" />
          </div>
          <div className="flex-1 mx-6">
            <div className="h-5 rounded-md bg-surface-overlay border border-surface-border flex items-center px-3">
              <span className="text-[10px] text-white/40 truncate font-mono">
                {project.displayUrl}
              </span>
            </div>
          </div>
          <ArrowUpRight className="h-3.5 w-3.5 text-white/30 group-hover:text-white/70 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
        </div>

        {/* Screenshot */}
        <div
          className="relative aspect-[16/10] w-full overflow-hidden"
          style={{
            background: `linear-gradient(135deg, rgba(${project.color},0.12), rgba(${project.color},0.04))`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.screenshot}
            alt={`${project.title} live product screenshot`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          />
          {/* Subtle fade at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface-raised/40 to-transparent pointer-events-none" />
        </div>
      </div>
    </motion.a>
  );
}

function StickyProjectCard({
  project,
  index,
  totalCards,
}: {
  project: Project;
  index: number;
  totalCards: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0.92, 1, 1, 0.95 - index * 0.02]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [
      0,
      1,
      1,
      index === totalCards - 1 ? 1 : 0.6,
      index === totalCards - 1 ? 1 : 0.3,
    ]
  );

  const stickyTop = CARD_TOP_OFFSET + index * STACK_OFFSET;

  return (
    <div ref={cardRef} className="h-[80vh] lg:h-[90vh]">
      <motion.div
        className="sticky rounded-3xl border border-surface-border bg-surface/95 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/20"
        style={{
          top: `${stickyTop}px`,
          zIndex: index + 1,
          ...(prefersReduced ? {} : { scale, opacity }),
        }}
      >
        <div className={`h-px bg-gradient-to-r ${project.gradient} opacity-40`} />

        <div className="p-6 sm:p-8 lg:p-10">
          {/* Header row */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono text-white/15 tracking-widest">
              0{index + 1} / 0{totalCards}
            </span>
            <motion.div
              className="flex flex-wrap gap-1.5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {project.tags.map((tag) => (
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
            {/* Text */}
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
                className="mt-4 text-sm sm:text-base leading-relaxed text-white/50 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                {project.description}
              </motion.p>

              {/* Real metrics */}
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
                      <metric.icon className="h-3.5 w-3.5 text-brand-light/60" />
                      <span className="text-lg font-bold text-white">
                        {metric.value}
                      </span>
                    </div>
                    <span className="text-[11px] text-white/30">{metric.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Inline testimonial (only if real one exists) */}
              {project.testimonial && (
                <motion.blockquote
                  className="mt-6 border-l-2 pl-4 max-w-md"
                  style={{ borderColor: `rgba(${project.color},0.5)` }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45, duration: 0.6 }}
                >
                  <p className="text-sm italic text-white/55 leading-relaxed">
                    &ldquo;{project.testimonial.quote}&rdquo;
                  </p>
                  <footer className="mt-2 text-xs text-white/35">
                    — {project.testimonial.author},{" "}
                    <span className="text-white/30">{project.testimonial.role}</span>
                  </footer>
                </motion.blockquote>
              )}

              {/* Live link */}
              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <motion.a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 text-sm font-medium text-brand-light hover:text-brand-accent transition-colors cursor-pointer"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  Visit {project.displayUrl}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </motion.a>
              </motion.div>
            </div>

            {/* Screenshot mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <ScreenshotMockup project={project} />
            </motion.div>
          </div>
        </div>

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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand/[0.02] blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6">
        <MotionSection className="text-center mb-20">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-light mb-3">
            Featured Work
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Real products.{" "}
            <span className="bg-gradient-to-r from-brand-light to-brand-violet bg-clip-text text-transparent">
              Live in the wild.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/40">
            Three production products shipped end-to-end — B2B SaaS, consumer, and
            e-commerce. Click any to visit the live site.
          </p>
        </MotionSection>

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
