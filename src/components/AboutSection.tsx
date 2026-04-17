import { motion } from "framer-motion";
import HoverDecryptText from "./HoverDecryptText";

const tags = [
  "SYSTEMS ARCHITECTURE",
  "BACKEND ENGINEERING",
  "FRONTEND CRAFT",
  "AI-ASSISTED WORKFLOWS",
  "PRODUCT THINKING",
  "CLEAN CODE",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="02" title="PROFILE // ABOUT" />

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="dossier-panel p-6 md:p-8 h-full"
          >
            <div className="terminal-label mb-6">SUBJECT BRIEF</div>
            <p className="font-body text-sm leading-relaxed mb-4" style={{ color: "oklch(0.84 0.009 80)" }}>
              <HoverDecryptText text="I'm a final-year software engineer at The LNM Institute of Information Technology, Rajasthan. I focus on backend systems, APIs, and scalable application design — building structured systems with clean architecture, handling state, and solving real-world problems with performance and reliability in mind." />
            </p>
            <p className="font-body text-sm leading-relaxed" style={{ color: "oklch(0.84 0.009 80)" }}>
              <HoverDecryptText text="I use AI as a practical tool to enhance engineering workflows and system capabilities. My interests lie at the intersection of system architecture and product experience. I think in systems, build with intention, and ship things that work." />
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="dossier-panel p-6"
          >
            <div className="terminal-label mb-4">CAPABILITY TAGS</div>
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] tracking-wider border px-2.5 py-1 transition-colors hover:border-crimson-dim"
                  style={{
                    color: "oklch(0.72 0.01 260)",
                    borderColor: "oklch(0.30 0.006 260)",
                  }}
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
                <div key={item.label} className="flex items-center justify-between text-xs font-mono">
                  <span className="text-label tracking-wider">{item.label}</span>
                  <span style={{ color: "oklch(0.86 0.009 80)" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4"
    >
      <span className="font-mono text-xs font-medium" style={{ color: "oklch(0.60 0.18 18)" }}>[{label}]</span>
      <h2 className="font-display text-lg md:text-xl font-semibold tracking-wider text-foreground">
        {title}
      </h2>
      <div className="flex-1 circuit-line" />
    </motion.div>
  );
}
