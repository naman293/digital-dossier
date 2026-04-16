import { motion } from "framer-motion";
import portrait from "@/assets/portrait.png";

const metadata = [
  { label: "DESIGNATION", value: "Backend / Full-Stack Developer" },
  { label: "LOCATION", value: "Jaipur, Rajasthan, India" },
  { label: "INSTITUTION", value: "LNMIIT — B.Tech '26" },
  { label: "CLEARANCE", value: "Open to Full-Time Roles" },
];

export default function HeroSection() {
  return (
    <section className="min-h-screen relative flex items-center justify-center px-6 pt-20 pb-16 overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 grid-pattern opacity-30" />


      <div className="relative max-w-6xl w-full mx-auto">
        {/* Top decorative strip */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="data-strip mb-8 origin-left"
        />

        <div className="grid md:grid-cols-[1fr_360px] gap-12 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="terminal-label mb-4 flex items-center gap-2"
            >
              <span className="node-dot status-pulse inline-block" />
              SUBJECT FILE — ACTIVE
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-2"
            >
              NAMAN <span className="text-crimson text-glow">SONI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="font-mono text-sm text-muted-foreground max-w-lg mb-8 leading-relaxed"
            >
              Final-year software engineer building scalable, real-world systems.
              Strong in backend architecture, frontend craft, and AI-assisted engineering.
              Systems-first mindset. Long-term thinker.
            </motion.p>

            {/* Metadata grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="dossier-panel p-4 mb-8 max-w-md"
            >
              <div className="terminal-label mb-3">IDENTITY METADATA</div>
              <div className="space-y-2">
                {metadata.map((item) => (
                  <div key={item.label} className="flex items-baseline gap-3 text-xs font-mono">
                    <span className="text-label w-28 shrink-0 tracking-wider">{item.label}</span>
                    <span className="text-foreground/80">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA set */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="font-mono text-xs tracking-wider border border-crimson text-crimson px-5 py-2.5 hover:bg-crimson/10 transition-colors"
              >
                VIEW PROJECTS
              </a>
              <a
                href="/resume"
                className="font-mono text-xs tracking-wider border border-border text-muted-foreground px-5 py-2.5 hover:border-crimson-dim hover:text-foreground transition-colors"
              >
                RESUME
              </a>
              <a
                href="#contact"
                className="font-mono text-xs tracking-wider border border-border text-muted-foreground px-5 py-2.5 hover:border-crimson-dim hover:text-foreground transition-colors"
              >
                CONTACT
              </a>
            </motion.div>

            {/* Status badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex flex-wrap gap-2 mt-6"
            >
              {["AVAILABLE FOR OPPORTUNITIES", "BUILDING PRODUCTION SYSTEMS"].map((badge) => (
                <span
                  key={badge}
                  className="font-mono text-[9px] tracking-wider text-crimson-dim border border-crimson-dim/30 px-2 py-1 bg-crimson/5"
                >
                  ● {badge}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right portrait */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hidden md:flex flex-col"
          >
            {/* Frame wrapper — fixed tall height so portrait fills it */}
            <div
              className="portrait-frame relative overflow-hidden"
              style={{ height: "520px" }}
            >
              <img
                src={portrait}
                alt="Naman Soni — Portrait"
                className="w-full h-full object-cover object-center block"
                style={{
                  filter: "grayscale(70%) contrast(1.08) brightness(1.06) sepia(12%)",
                }}
              />
              {/* Subtle crimson vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 30%, transparent 50%, oklch(0.50 0.18 18 / 10%) 100%)",
                }}
              />
              {/* Bottom gradient fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.13 0.005 260 / 70%), transparent)",
                }}
              />
              {/* Scanline overlay on image only */}
              <div
                className="absolute inset-0 pointer-events-none scanline-overlay"
                style={{ opacity: 0.04 }}
              />
            </div>

            {/* Caption row */}
            <div className="flex items-center justify-between mt-3 px-1">
              <div>
                <div className="terminal-label">SBJ-0293 // NAMAN.SONI</div>
                <div className="font-mono text-[8px] tracking-widest mt-0.5" style={{ color: "oklch(0.45 0.01 260)" }}>
                  IMG.PROC: CLASSIFIED
                </div>
              </div>
              <span
                className="font-mono text-[9px] tracking-wider border px-2 py-0.5"
                style={{
                  color: "oklch(0.50 0.18 18)",
                  borderColor: "oklch(0.50 0.18 18 / 30%)",
                  background: "oklch(0.50 0.18 18 / 5%)",
                }}
              >
                ● ACTIVE
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="data-strip mt-10 origin-right"
        />
      </div>
    </section>
  );
}
