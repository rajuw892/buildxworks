"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Linkedin, Mail, Calendar } from "lucide-react";
import { MotionSection } from "@/components/motion";

const stats = [
  { value: "3", label: "Products shipped solo" },
  { value: "3,000+", label: "End users served" },
  { value: "9.6/10", label: "Verified NPS" },
];

export function Founder() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand/[0.03] blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-6">
        <MotionSection>
          <div className="rounded-3xl border border-surface-border bg-surface-raised/60 backdrop-blur-sm p-8 md:p-12">
            <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-center">
              {/* Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto md:mx-0"
              >
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-brand via-brand-violet to-pink-500 opacity-30 blur-xl" />
                <div className="relative h-32 w-32 rounded-full overflow-hidden border border-surface-border-light bg-gradient-to-br from-brand to-brand-violet">
                  {photoFailed ? (
                    <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-white">
                      RR
                    </div>
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src="/raju.jpg"
                      alt="Raju Raman, founder of BuildXWorks"
                      className="h-full w-full object-cover"
                      onError={() => setPhotoFailed(true)}
                    />
                  )}
                </div>
              </motion.div>

              {/* Content */}
              <div>
                <motion.p
                  className="text-xs font-medium uppercase tracking-wider text-brand-light mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  Built by
                </motion.p>
                <motion.h2
                  className="text-3xl font-bold text-white sm:text-4xl tracking-tight"
                  initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  Raju Raman
                </motion.h2>
                <motion.p
                  className="mt-3 text-sm sm:text-base leading-relaxed text-white/55 max-w-xl"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                >
                  Solo founder. Designer and engineer. Shipped three production
                  products end-to-end — a B2B SaaS, a consumer app, and a travel
                  e-commerce site — without a team. BuildXWorks is how I help other
                  founders do the same: faster, cleaner, and with someone who
                  actually ships.
                </motion.p>

                {/* Stats row */}
                <motion.div
                  className="mt-6 flex flex-wrap gap-x-8 gap-y-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25, duration: 0.7 }}
                >
                  {stats.map((s) => (
                    <div key={s.label}>
                      <div className="text-xl font-bold text-white">{s.value}</div>
                      <div className="text-[11px] text-white/35">{s.label}</div>
                    </div>
                  ))}
                </motion.div>

                {/* Contact links */}
                <motion.div
                  className="mt-7 flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <a
                    href="https://www.linkedin.com/in/rajuraman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-xl border border-surface-border bg-surface-overlay/40 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:border-brand/30 hover:bg-brand/5 transition-all"
                  >
                    <Linkedin className="h-4 w-4 text-brand-light/70 group-hover:text-brand-light" />
                    LinkedIn
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <a
                    href="mailto:raju.raman@ourworldenergy.com"
                    className="group inline-flex items-center gap-2 rounded-xl border border-surface-border bg-surface-overlay/40 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:border-brand/30 hover:bg-brand/5 transition-all"
                  >
                    <Mail className="h-4 w-4 text-brand-light/70 group-hover:text-brand-light" />
                    Email me directly
                  </a>
                  <button
                    data-cal-link="raju-raman/strategy-call"
                    data-cal-config='{"theme":"dark"}'
                    className="group inline-flex items-center gap-2 rounded-xl border border-brand/30 bg-brand/10 px-4 py-2.5 text-sm font-medium text-brand-light hover:bg-brand/20 hover:border-brand/50 transition-all cursor-pointer"
                  >
                    <Calendar className="h-4 w-4" />
                    Book a call
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
