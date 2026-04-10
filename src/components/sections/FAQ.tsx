"use client";

import { MotionSection } from "@/components/motion";
import { AccordionItemAnimated } from "@/components/motion/AccordionItemAnimated";

const faqs = [
  {
    question: "How fast can you deliver?",
    answer:
      "Most projects launch in 2–6 weeks depending on scope. Landing pages typically ship in 1–2 weeks, MVPs in 3–6 weeks. We use AI-powered workflows to accelerate every stage without cutting corners.",
  },
  {
    question: "Do you handle both design and development?",
    answer:
      "Yes — we're a full-stack product studio. We handle everything from initial UX strategy and high-fidelity design to frontend, backend, and deployment. You get one team, one workflow, and zero handoff friction.",
  },
  {
    question: "Can you build SaaS and AI products?",
    answer:
      "Absolutely. SaaS and AI-powered products are our sweet spot. We build with modern stacks (Next.js, React, Node, Python) and integrate AI capabilities like LLMs, embeddings, and automation directly into products.",
  },
  {
    question: "What makes BuildX different from a typical agency?",
    answer:
      "Speed, quality, and product thinking. We operate like a senior in-house team — developer-led, design-obsessed, and deeply product-focused. Our AI-augmented workflow means you get agency-quality at startup speed.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Yes. All MVP builds include 2 weeks of post-launch support. For ongoing needs, our Product Partner plan provides continuous design, development, and scaling support on a monthly retainer.",
  },
  {
    question: "What do you need to get started?",
    answer:
      "Just a clear idea of what you want to build. Book a strategy call and we'll help you refine scope, define priorities, and create a delivery plan. No lengthy RFPs required — we move fast.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto max-w-3xl px-6">
        <MotionSection className="text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-wider text-brand-light mb-3">
            FAQ
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Common Questions
          </h2>
        </MotionSection>

        <MotionSection delay={0.2}>
          <div className="rounded-2xl border border-surface-border bg-surface-raised p-6 md:p-8">
            {faqs.map((faq, i) => (
              <AccordionItemAnimated
                key={i}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
