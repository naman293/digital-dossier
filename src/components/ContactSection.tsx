import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { soundEngine } from "@/lib/audio";
import { SectionHeader } from "./AboutSection";

type FormState = "idle" | "sending" | "sent" | "error";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setFormState("sending");

    // Compose email metadata
    const templateParams = {
      from_name: form.name,
      subject: form.subject || `[DOSSIER] Message from ${form.name}`,
      message: form.message,
      reply_to: form.email,
    };

    // Use EmailJS to send the transmission
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_placeholder",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_placeholder",
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "public_key_placeholder"
      )
      .then(
        () => {
          setFormState("sent");
        },
        (error) => {
          console.error("Transmission failed:", error);
          setFormState("error");
        }
      );
  };

  const reset = () => {
    setForm({ name: "", email: "", subject: "", message: "" });
    setFormState("idle");
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="06" title="ESTABLISH CONTACT" />

        <div className="grid md:grid-cols-[1fr_340px] gap-8 mt-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="dossier-panel p-6 md:p-8"
          >
            <div className="terminal-label mb-6 flex items-center gap-2">
              <span className="node-dot status-pulse" style={{ background: "oklch(0.50 0.18 18)" }} />
              SECURE TRANSMISSION FORM
            </div>

            <AnimatePresence mode="wait">
              {formState !== "sent" ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] tracking-[0.2em] text-label">
                      SENDER IDENTIFICATION
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name..."
                      className="w-full bg-surface/80 border border-border focus:border-crimson-dim outline-none px-3 py-2.5 font-mono text-xs text-foreground/90 placeholder:text-label/50 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] tracking-[0.2em] text-label">
                      YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="Your email address..."
                      className="w-full bg-surface/80 border border-border focus:border-crimson-dim outline-none px-3 py-2.5 font-mono text-xs text-foreground/90 placeholder:text-label/50 transition-colors"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] tracking-[0.2em] text-label">
                      TRANSMISSION SUBJECT <span className="text-label/40">(OPTIONAL)</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Subject or inquiry type..."
                      className="w-full bg-surface/80 border border-border focus:border-crimson-dim outline-none px-3 py-2.5 font-mono text-xs text-foreground/90 placeholder:text-label/50 transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] tracking-[0.2em] text-label">
                      MESSAGE PAYLOAD
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Your message..."
                      className="w-full bg-surface/80 border border-border focus:border-crimson-dim outline-none px-3 py-2.5 font-mono text-xs text-foreground/90 placeholder:text-label/50 transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={formState === "sending"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={() => soundEngine.playHover()}
                    onClick={(e) => { soundEngine.playClick(); if(formState !== "sending") {} }}
                    className="w-full font-mono text-xs tracking-wider border border-crimson text-crimson py-3 hover:bg-crimson/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formState === "sending" ? (
                      <>
                        <span className="node-dot status-pulse" style={{ background: "oklch(0.50 0.18 18)" }} />
                        INITIALIZING TRANSMISSION...
                      </>
                    ) : (
                      "TRANSMIT MESSAGE ↗"
                    )}
                  </motion.button>

                  <p className="font-mono text-[9px] text-label/50 text-center tracking-wider">
                    ROUTES VIA ENCRYPTED EMAIL // RESPONSE &lt;24H
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-10 space-y-4"
                >
                  <div className="font-mono text-crimson text-2xl">✓</div>
                  <div className="font-display text-sm font-semibold tracking-widest text-foreground">
                    TRANSMISSION DISPATCHED
                  </div>
                  <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                    Your email client should have opened. If not, reach out
                    directly via the channels in the footer.
                  </p>
                  <div className="data-strip my-4" />
                  <button
                    onClick={() => { soundEngine.playClick(); reset(); }}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="font-mono text-[10px] tracking-[0.2em] text-label hover:text-crimson transition-colors"
                  >
                    [SEND NEW TRANSMISSION]
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: LinkedIn CTA + info panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-col gap-5"
          >
            {/* LinkedIn card */}
            <div className="dossier-panel p-5 flex flex-col gap-4">
              <div className="terminal-label">PROFESSIONAL NETWORK</div>
              <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                Prefer a more structured conversation? Reach via LinkedIn for
                professional inquiries, collaboration proposals, or
                full-time opportunities.
              </p>
              <a
                href="https://www.linkedin.com/in/naman-soni-828158262/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => soundEngine.playClick()}
                className="font-mono text-xs tracking-wider border border-crimson-dim text-crimson px-4 py-2.5 hover:bg-crimson/10 transition-colors text-center"
              >
                OPEN LINKEDIN PROFILE ↗
              </a>
            </div>

            {/* Status panel */}
            <div className="dossier-panel p-5 flex flex-col gap-3">
              <div className="terminal-label">CURRENT STATUS</div>
              {[
                { label: "AVAILABILITY", value: "OPEN TO ROLES" },
                { label: "PREFERRED CONTACT", value: "EMAIL / LINKEDIN" },
                { label: "RESPONSE TIME", value: "< 24 HOURS" },
                { label: "LOCATION", value: "JAIPUR, IN" },
                { label: "TIMEZONE", value: "IST (UTC+5:30)" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-2 text-xs font-mono flex-wrap"
                >
                  <span className="text-label tracking-wider shrink-0">{label}</span>
                  <span className="text-foreground/70 text-right">{value}</span>
                </div>
              ))}
              <div className="data-strip mt-2" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
