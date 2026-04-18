import { motion } from "framer-motion";
import HoverDecryptText from "./HoverDecryptText";
import MatrixFragment from "./MatrixFragment";
import MatrixScrambleText from "./MatrixScrambleText";

const tags = [
  "SYSTEMS ARCHITECTURE",
  "BACKEND ENGINEERING",
  "FRONTEND CRAFT",
  "AI-ASSISTED WORKFLOWS",
  "PRODUCT THINKING",
  "CLEAN CODE",
];

/* ── Matrix About: reads like source code documentation ── */
function MatrixAbout() {
  return (
    <section id="about" className="py-16 md:py-24 px-6 relative">
      <div className="max-w-4xl mx-auto font-mono text-xs">
        {/* File header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6"
          style={{ color: "rgba(0,255,65,0.35)" }}
        >
          <div>{"// ─────────────────────────────────────────────"}</div>
          <div>{"// File: about.ts"}</div>
          <div>{"// Author: naman@reality:~$"}</div>
          <div>{"// Last modified: " + new Date().toISOString().slice(0, 10)}</div>
          <div>{"// ─────────────────────────────────────────────"}</div>
        </motion.div>

        {/* Interface definition */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div style={{ color: "rgba(0,255,65,0.5)" }}>
            <span style={{ color: "#00ff41" }}>interface</span> Developer {"{"}
          </div>
          <div className="pl-6 space-y-1 mt-1" style={{ color: "rgba(0,255,65,0.65)" }}>
            <MatrixFragment isMatrixMode={true}>
              <div>
                <span style={{ color: "rgba(0,255,65,0.4)" }}>name:</span>{" "}
                <span style={{ color: "#00ff41" }}>"Naman Soni"</span>;
              </div>
            </MatrixFragment>
            <MatrixFragment isMatrixMode={true}>
              <div>
                <span style={{ color: "rgba(0,255,65,0.4)" }}>education:</span>{" "}
                <span style={{ color: "#00ff41" }}>"LNMIIT — B.Tech Mechanical → Software"</span>;
              </div>
            </MatrixFragment>
            <MatrixFragment isMatrixMode={true}>
              <div>
                <span style={{ color: "rgba(0,255,65,0.4)" }}>focus:</span>{" "}
                <span style={{ color: "#00ff41" }}>"Backend Systems + Scalable Architecture"</span>;
              </div>
            </MatrixFragment>
            <MatrixFragment isMatrixMode={true}>
              <div>
                <span style={{ color: "rgba(0,255,65,0.4)" }}>approach:</span>{" "}
                <span style={{ color: "#00ff41" }}>"Systems-first. Ship things that work."</span>;
              </div>
            </MatrixFragment>
            <MatrixFragment isMatrixMode={true}>
              <div>
                <span style={{ color: "rgba(0,255,65,0.4)" }}>ai_usage:</span>{" "}
                <span style={{ color: "#00ff41" }}>"Practical tool, not a crutch"</span>;
              </div>
            </MatrixFragment>
          </div>
          <div style={{ color: "rgba(0,255,65,0.5)" }}>{"}"}</div>
        </motion.div>

        {/* Capabilities as const array */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div style={{ color: "rgba(0,255,65,0.5)" }}>
            <span style={{ color: "#00ff41" }}>const</span> capabilities = [
          </div>
          <div className="pl-6 space-y-0.5 mt-1">
            {tags.map((tag) => (
              <MatrixFragment key={tag} isMatrixMode={true}>
                <div style={{ color: "rgba(0,255,65,0.6)" }}>
                  "<span style={{ color: "#00ff41" }}>{tag}</span>",
                </div>
              </MatrixFragment>
            ))}
          </div>
          <div style={{ color: "rgba(0,255,65,0.5)" }}>] <span style={{ color: "rgba(0,255,65,0.3)" }}>as const;</span></div>
        </motion.div>

        {/* Operational metrics as key-value */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div style={{ color: "rgba(0,255,65,0.35)" }}>{"// Runtime diagnostics"}</div>
          <div style={{ color: "rgba(0,255,65,0.5)" }}>
            <span style={{ color: "#00ff41" }}>const</span> metrics = {"{"}
          </div>
          <div className="pl-6 space-y-0.5 mt-1">
            {[
              ["problemSolving", "Analytical"],
              ["communication", "Structured"],
              ["environment", "Fast-paced / Ambiguous"],
              ["approach", "Systems-first"],
            ].map(([key, val]) => (
              <MatrixFragment key={key} isMatrixMode={true}>
                <div style={{ color: "rgba(0,255,65,0.6)" }}>
                  <span style={{ color: "rgba(0,255,65,0.4)" }}>{key}:</span>{" "}
                  "<span style={{ color: "#00ff41" }}>{val}</span>",
                </div>
              </MatrixFragment>
            ))}
          </div>
          <div style={{ color: "rgba(0,255,65,0.5)" }}>{"}"}</div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Normal About (unchanged) ── */
function DossierAbout() {
  return (
    <section id="about" className="py-16 md:py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="02" title="PROFILE // ABOUT" isMatrixMode={false} />

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-full"
          >
            <div className="dossier-panel p-6 md:p-8 h-full">
              <div className="terminal-label mb-6">SUBJECT BRIEF</div>
              <div className="mb-4">
                <p className="font-body text-sm leading-relaxed text-body">
                  <HoverDecryptText text="I'm a final-year software engineer at The LNM Institute of Information Technology, Rajasthan. I focus on backend systems, APIs, and scalable application design — building structured systems with clean architecture, handling state, and solving real-world problems with performance and reliability in mind." />
                </p>
              </div>
              <div>
                <p className="font-body text-sm leading-relaxed text-body">
                  <HoverDecryptText text="I use AI as a practical tool to enhance engineering workflows and system capabilities. My interests lie at the intersection of system architecture and product experience. I think in systems, build with intention, and ship things that work." />
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-full"
          >
            <div className="dossier-panel p-6">
              <div className="terminal-label mb-4">CAPABILITY TAGS</div>
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-wider border border-border text-meta px-2.5 py-1 transition-colors hover:border-crimson-dim block"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="terminal-label mb-3 mt-6">OPERATIONAL METRICS</div>
              <div className="space-y-3">
                {[
                  { label: "PROBLEM SOLVING", value: "ANALYTICAL" },
                  { label: "COMMUNICATION", value: "STRUCTURED" },
                  { label: "ENVIRONMENT", value: "FAST-PACED / AMBIGUOUS" },
                  { label: "APPROACH", value: "SYSTEMS-FIRST" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-2 text-xs font-mono flex-wrap p-1">
                    <span className="text-label tracking-wider shrink-0">{item.label}</span>
                    <span className="text-right text-foreground/85">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function AboutSection({ isMatrixMode = false }: { isMatrixMode?: boolean }) {
  if (isMatrixMode) return <MatrixAbout />;
  return <DossierAbout />;
}

export function SectionHeader({
  label,
  title,
  isMatrixMode = false,
}: {
  label: string;
  title: string;
  isMatrixMode?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4"
    >
      <span
        className="font-mono text-xs font-medium section-header-label"
        style={{ color: isMatrixMode ? "#00ff41" : "oklch(0.60 0.18 18)" }}
      >
        [{label}]
      </span>
      <h2 className="font-display text-lg md:text-xl font-semibold tracking-wider text-foreground">
        {isMatrixMode ? <MatrixScrambleText text={title} trigger={isMatrixMode} /> : title}
      </h2>
      <div className="flex-1 circuit-line" />
    </motion.div>
  );
}
