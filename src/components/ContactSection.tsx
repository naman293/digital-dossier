import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { soundEngine } from "@/lib/audio";
import { SectionHeader } from "./AboutSection";

type FormState = "idle" | "sending" | "sent" | "error";

/* ── Matrix Contact: SSH-style terminal ── */
function MatrixContact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [logs, setLogs] = useState<string[]>([
    "$ ssh contact@naman.dev",
    "Connecting to 192.168.1.293:22...",
    "Connection established. Secure channel open.",
    "",
    "Type your message below. Press [TRANSMIT] to send.",
    "",
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setFormState("sending");
    setLogs((prev) => [...prev, `> Encrypting payload from ${form.name}...`]);

    const templateParams = {
      from_name: form.name,
      subject: `[MATRIX] Message from ${form.name}`,
      message: form.message,
      reply_to: form.email,
    };

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
          setLogs((prev) => [
            ...prev,
            "> Packet transmitted successfully.",
            "> ACK received from naman@reality.",
            "> Connection will remain open.",
          ]);
        },
        () => {
          setFormState("error");
          setLogs((prev) => [...prev, "> ERR: Transmission failed. Retry."]);
        }
      );
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-6">
      <div className="max-w-4xl mx-auto font-mono text-xs">
        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-4 md:p-6"
          style={{
            background: "rgba(0,5,0,0.6)",
            border: "1px solid rgba(0,255,65,0.12)",
          }}
        >
          {/* Terminal chrome */}
          <div
            className="flex items-center gap-2 mb-4 pb-2"
            style={{ borderBottom: "1px solid rgba(0,255,65,0.08)" }}
          >
            <span style={{ color: "rgba(0,255,65,0.3)" }}>● ○ ○</span>
            <span style={{ color: "rgba(0,255,65,0.4)" }}>ssh — contact@naman.dev — 80×24</span>
          </div>

          {/* Log output */}
          <div className="space-y-0.5 mb-4" style={{ color: "rgba(0,255,65,0.5)" }}>
            {logs.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>

          {/* Input form */}
          {formState !== "sent" ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex items-center gap-2">
                <span style={{ color: "rgba(0,255,65,0.4)" }}>{">"} agent_name:</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  required
                  placeholder="your handle..."
                  className="flex-1 bg-transparent outline-none border-none"
                  style={{
                    color: "#00ff41",
                    caretColor: "#00ff41",
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <span style={{ color: "rgba(0,255,65,0.4)" }}>{">"} reply_addr:</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  required
                  placeholder="your@email.com..."
                  className="flex-1 bg-transparent outline-none border-none"
                  style={{
                    color: "#00ff41",
                    caretColor: "#00ff41",
                  }}
                />
              </div>
              <div>
                <div style={{ color: "rgba(0,255,65,0.4)" }}>{">"} payload:</div>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  required
                  rows={4}
                  placeholder="type your message..."
                  className="w-full bg-transparent outline-none border-none resize-none mt-1 pl-4"
                  style={{
                    color: "#00ff41",
                    caretColor: "#00ff41",
                    borderLeft: "1px solid rgba(0,255,65,0.1)",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={formState === "sending"}
                onClick={() => soundEngine.playClick()}
                className="text-[10px] tracking-wider px-4 py-2 cursor-pointer transition-all disabled:opacity-50"
                style={{
                  color: "#00ff41",
                  border: "1px solid rgba(0,255,65,0.25)",
                  background: "rgba(0,255,65,0.05)",
                }}
              >
                {formState === "sending" ? "● TRANSMITTING..." : "$ TRANSMIT --encrypted"}
              </button>
            </form>
          ) : (
            <div className="mt-4" style={{ color: "rgba(0,255,65,0.6)" }}>
              <div>{">"} Session logged. Response ETA {"<"} 24h.</div>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setForm({ name: "", email: "", message: "" });
                  setFormState("idle");
                  setLogs((prev) => [...prev, "", "> New session initialized."]);
                }}
                className="mt-2 text-[10px] cursor-pointer"
                style={{ color: "#00ff41" }}
              >
                [NEW SESSION]
              </button>
            </div>
          )}
        </motion.div>

        {/* Status info below */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 flex flex-wrap gap-x-6 gap-y-1"
          style={{ color: "rgba(0,255,65,0.3)" }}
        >
          <span>PROTOCOL: TLS 1.3</span>
          <span>CIPHER: AES-256-GCM</span>
          <span>LATENCY: {"<"}24h</span>
          <span>LOCATION: IST (UTC+5:30)</span>
        </motion.div>

        {/* Alt channels */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-4 flex flex-wrap gap-4"
        >
          {[
            { label: "github", href: "https://github.com/naman293" },
            { label: "linkedin", href: "https://www.linkedin.com/in/naman-soni-828158262/" },
            { label: "email", href: "mailto:namansoni272003@gmail.com" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-wider transition-all"
              style={{ color: "rgba(0,255,65,0.45)" }}
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => soundEngine.playClick()}
            >
              $ open {link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Normal Dossier Contact (unchanged) ── */
function DossierContact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setFormState("sending");

    const templateParams = {
      from_name: form.name,
      subject: form.subject || `[DOSSIER] Message from ${form.name}`,
      message: form.message,
      reply_to: form.email,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_placeholder",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_placeholder",
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "public_key_placeholder"
      )
      .then(
        () => setFormState("sent"),
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
        <SectionHeader label="06" title="ESTABLISH CONTACT" isMatrixMode={false} />

        <div className="grid md:grid-cols-[1fr_340px] gap-8 mt-10">
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
                    onClick={() => soundEngine.playClick()}
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

export default function ContactSection({ isMatrixMode = false }: { isMatrixMode?: boolean }) {
  if (isMatrixMode) return <MatrixContact />;
  return <DossierContact />;
}
