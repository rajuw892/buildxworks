"use client";

import { motion } from "framer-motion";
import { MotionSection } from "@/components/motion";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Services", href: "#services" },
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#cta" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-surface-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <MotionSection>
          <div className="grid gap-12 md:grid-cols-4">
            {/* Brand */}
            <div>
              <div className="text-lg font-bold text-white">
                BuildX<span className="text-brand-light">Works</span>
              </div>
              <p className="mt-3 text-sm text-white/30 leading-relaxed">
                AI-powered design & development studio for startups that want to
                build faster and launch smarter.
              </p>
            </div>

            {/* Links */}
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="text-sm font-semibold text-white/60 mb-4">
                  {group.title}
                </h4>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <motion.a
                        href={link.href}
                        className="text-sm text-white/30 hover:text-white/60 transition-colors"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-surface-border pt-8 md:flex-row">
            <p className="text-xs text-white/20">
              &copy; {new Date().getFullYear()} BuildXWorks. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-xs text-white/20 hover:text-white/40 transition-colors"
                  whileHover={{ y: -1 }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>
        </MotionSection>
      </div>
    </footer>
  );
}
