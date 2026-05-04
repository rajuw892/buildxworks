"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ArrowRight, Send, Calendar } from "lucide-react";
import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { GlowButton } from "@/components/motion";

// Context to share form open/close across components
interface FormContextType {
  isOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
}

const FormContext = createContext<FormContextType>({
  isOpen: false,
  openForm: () => {},
  closeForm: () => {},
});

export function useRequestForm() {
  return useContext(FormContext);
}

export function RequestFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openForm = useCallback(() => setIsOpen(true), []);
  const closeForm = useCallback(() => setIsOpen(false), []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <FormContext.Provider value={{ isOpen, openForm, closeForm }}>
      {children}
      <RequestFormModal />
    </FormContext.Provider>
  );
}

const budgetOptions = [
  "Under $2,500",
  "$2,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
];

const projectTypes = [
  "Landing Page / Marketing Site",
  "Web Application",
  "Mobile App",
  "SaaS Product",
  "AI Integration",
  "Other",
];

function RequestFormModal() {
  const { isOpen, closeForm } = useRequestForm();
  const prefersReduced = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    projectTypeOther: "",
    budget: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    closeForm();
    // Reset after animation completes
    setTimeout(() => {
      setSubmitted(false);
      setError(null);
      setSubmitting(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        projectTypeOther: "",
        budget: "",
        description: "",
      });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-surface-border-light bg-surface-raised shadow-2xl shadow-black/50"
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReduced ? {} : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors cursor-pointer z-10"
              aria-label="Close form"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-8">
              {!submitted ? (
                <>
                  {/* Header */}
                  <div className="mb-8">
                    <p className="text-xs font-medium uppercase tracking-wider text-brand-light mb-2">
                      Start a Partnership
                    </p>
                    <h3 className="text-2xl font-bold text-white">
                      Tell us about your project
                    </h3>
                    <p className="mt-2 text-sm text-white/40">
                      Share your vision and we&apos;ll get back to you within 10 minutes
                      to discuss the next steps.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name & Email row */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-white/50 mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full rounded-xl border border-surface-border bg-surface-overlay px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-brand/40 focus:ring-1 focus:ring-brand/20"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white/50 mb-1.5">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full rounded-xl border border-surface-border bg-surface-overlay px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-brand/40 focus:ring-1 focus:ring-brand/20"
                          placeholder="john@startup.com"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs font-medium text-white/50 mb-1.5">
                        Company / Startup Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className="w-full rounded-xl border border-surface-border bg-surface-overlay px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-brand/40 focus:ring-1 focus:ring-brand/20"
                        placeholder="Acme Inc."
                      />
                    </div>

                    {/* Project Type */}
                    <div>
                      <label className="block text-xs font-medium text-white/50 mb-1.5">
                        Project Type *
                      </label>
                      <select
                        required
                        value={formData.projectType}
                        onChange={(e) =>
                          setFormData({ ...formData, projectType: e.target.value })
                        }
                        className="w-full rounded-xl border border-surface-border bg-surface-overlay px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand/40 focus:ring-1 focus:ring-brand/20 appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-surface-raised text-white/40">
                          Select project type
                        </option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type} className="bg-surface-raised">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Other project type input */}
                    <AnimatePresence>
                      {formData.projectType === "Other" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <label className="block text-xs font-medium text-white/50 mb-1.5">
                            Please specify *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.projectTypeOther}
                            onChange={(e) =>
                              setFormData({ ...formData, projectTypeOther: e.target.value })
                            }
                            className="w-full rounded-xl border border-surface-border bg-surface-overlay px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-brand/40 focus:ring-1 focus:ring-brand/20"
                            placeholder="e.g. Chrome Extension, AI Chatbot, E-commerce Store..."
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Budget */}
                    <div>
                      <label className="block text-xs font-medium text-white/50 mb-1.5">
                        Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                        className="w-full rounded-xl border border-surface-border bg-surface-overlay px-4 py-3 text-sm text-white outline-none transition-colors focus:border-brand/40 focus:ring-1 focus:ring-brand/20 appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-surface-raised text-white/40">
                          Select budget range
                        </option>
                        {budgetOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-surface-raised">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-medium text-white/50 mb-1.5">
                        Tell us about your idea *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        className="w-full rounded-xl border border-surface-border bg-surface-overlay px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-brand/40 focus:ring-1 focus:ring-brand/20 resize-none"
                        placeholder="What are you building? What problem does it solve? Where are you in the process?"
                      />
                    </div>

                    {/* Error */}
                    {error && (
                      <div
                        role="alert"
                        className="rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-xs text-red-200"
                      >
                        {error}
                      </div>
                    )}

                    {/* Submit */}
                    <GlowButton className="w-full" disabled={submitting}>
                      {submitting ? "Sending…" : "Submit Your Request"}
                      <Send className="h-4 w-4" />
                    </GlowButton>

                    <p className="text-center text-[11px] text-white/20">
                      We review every request personally. No spam, no auto-replies.
                      Or email{" "}
                      <a
                        href="mailto:raju.raman@ourworldenergy.com"
                        className="text-white/40 underline-offset-2 hover:text-white/70 hover:underline"
                      >
                        raju.raman@ourworldenergy.com
                      </a>{" "}
                      directly.
                    </p>
                  </form>
                </>
              ) : (
                /* Success state */
                <motion.div
                  className="py-12 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand/10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <ArrowRight className="h-7 w-7 text-brand-light" />
                    </motion.div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Request Received
                  </h3>
                  <p className="text-sm text-white/40 max-w-sm mx-auto">
                    Thanks, {formData.name.split(" ")[0]}. We&apos;re reviewing your
                    project now and will reach out within 10 minutes.
                  </p>
                  <p className="mt-4 text-sm text-white/30 max-w-sm mx-auto">
                    Want to skip the wait? Book a strategy call directly.
                  </p>
                  <button
                    data-cal-link="raju-raman/strategy-call"
                    data-cal-config='{"theme":"dark"}'
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand/10 border border-brand/20 px-5 py-2.5 text-sm font-medium text-brand-light hover:bg-brand/20 transition-colors cursor-pointer"
                  >
                    <Calendar className="h-4 w-4" />
                    Book a Strategy Call
                  </button>
                  <div className="mt-4">
                    <button
                      onClick={handleClose}
                      className="text-sm text-white/30 hover:text-white/50 transition-colors cursor-pointer"
                    >
                      Close this window
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
