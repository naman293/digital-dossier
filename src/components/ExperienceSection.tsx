import { motion } from "framer-motion";
import { SectionHeader } from "./AboutSection";
import MatrixFragment from "./MatrixFragment";

const timeline = [
  {
    id: "EXP-001",
    title: "B.Tech — Mechanical Engineering",
    org: "The LNM Institute of Information Technology, Rajasthan",
    period: "Oct 2022 — June 2026",
    type: "EDUCATION",
    details: [
      "Self-taught software engineering alongside core curriculum",
      "Built production-grade full-stack and backend projects",
    ],
  },
  {
    id: "EXP-002",
    title: "Art Club Coordinator & Mentor",
    org: "The LNM Institute of Information Technology",
    period: "2023 — 2025",
    type: "LEADERSHIP",
    details: [
      "Managed events with 200+ participants under tight timelines",
      "Collaborated across teams, resolved real-time issues",
      "Mentored junior members in planning and execution",
    ],
  },
  {
    id: "EXP-003",
    title: "Freelance — 3D Landing Pages",
    org: "Local Business Brands",
    period: "2025 — Present",
    type: "FREELANCE",
    details: [
      "Created immersive 3D landing pages for local businesses",
      "End-to-end design and development delivery",
    ],
  },
];

/* ── Matrix Experience: git log style ── */
function MatrixExperience() {
  // Generate fake commit hashes
  const hash = () =>
    Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");

  return (
    <section id="experience" className="py-16 md:py-24 px-6 relative">
      <div className="max-w-4xl mx-auto font-mono text-xs">
        {/* Terminal header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4"
          style={{ color: "rgba(0,255,65,0.5)" }}
        >
          <div>
            <span style={{ color: "#00ff41" }}>naman@reality</span>:~$ git log --oneline --graph
          </div>
        </motion.div>

        {/* Git log entries */}
        <div className="space-y-2">
          {timeline.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Commit line */}
              <div className="flex items-start gap-2">
                {/* Graph line */}
                <div className="flex flex-col items-center shrink-0" style={{ width: "20px" }}>
                  <span style={{ color: "#00ff41", fontSize: "10px" }}>●</span>
                  {i < timeline.length - 1 && (
                    <div
                      className="w-px flex-1 min-h-[60px]"
                      style={{ background: "rgba(0,255,65,0.15)" }}
                    />
                  )}
                </div>

                {/* Commit content */}
                <div className="flex-1 pb-4">
                  <MatrixFragment isMatrixMode={true}>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span style={{ color: "rgba(0,255,65,0.4)" }}>{hash()}</span>
                      <span
                        className="text-[9px] px-1.5 py-0.5"
                        style={{
                          color: "#00ff41",
                          border: "1px solid rgba(0,255,65,0.2)",
                          background: "rgba(0,255,65,0.05)",
                        }}
                      >
                        {entry.type}
                      </span>
                      <span style={{ color: "rgba(0,255,65,0.3)" }}>{entry.period}</span>
                    </div>
                  </MatrixFragment>

                  <MatrixFragment isMatrixMode={true}>
                    <div style={{ color: "#00ff41" }} className="mb-1">
                      {entry.title}
                    </div>
                  </MatrixFragment>

                  <MatrixFragment isMatrixMode={true}>
                    <div style={{ color: "rgba(0,255,65,0.4)" }} className="text-[10px] mb-2">
                      {entry.org}
                    </div>
                  </MatrixFragment>

                  {/* Diff-style details */}
                  <div
                    className="text-[10px] pl-3 space-y-0.5"
                    style={{ borderLeft: "1px solid rgba(0,255,65,0.08)" }}
                  >
                    {entry.details.map((detail, j) => (
                      <MatrixFragment key={j} isMatrixMode={true}>
                        <div style={{ color: "rgba(0,255,65,0.55)" }}>
                          <span style={{ color: "rgba(0,255,65,0.3)" }}>+</span> {detail}
                        </div>
                      </MatrixFragment>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Log footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-2"
          style={{ color: "rgba(0,255,65,0.25)" }}
        >
          (END) — {timeline.length} commits, 0 merges
        </motion.div>
      </div>
    </section>
  );
}

/* ── Normal Dossier Experience (unchanged timeline) ── */
function DossierExperience() {
  return (
    <section id="experience" className="py-16 md:py-24 px-6 relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative max-w-6xl mx-auto">
        <SectionHeader label="05" title="MISSION LOG // TIMELINE" isMatrixMode={false} />

        <div className="mt-10 space-y-4">
          {timeline.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-8 pb-8 border-l border-border last:pb-0"
            >
              <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 border border-crimson-dim bg-background" />

              <div className="dossier-panel p-5">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <span className="terminal-label">{entry.id}</span>
                  <span className="font-mono text-[9px] tracking-wider text-crimson-dim border border-crimson-dim/30 px-2 py-0.5">
                    {entry.type}
                  </span>
                </div>

                <h3 className="font-display text-base font-semibold text-foreground mb-1">
                  {entry.title}
                </h3>

                <p className="font-mono text-xs tracking-wider mb-1" style={{ color: "oklch(0.70 0.01 260)" }}>
                  {entry.org}
                </p>

                <p className="font-mono text-xs tracking-wider mb-4" style={{ color: "oklch(0.55 0.16 18)" }}>
                  {entry.period}
                </p>

                <ul className="space-y-2">
                  {entry.details.map((detail, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm leading-relaxed"
                      style={{ color: "oklch(0.82 0.009 80)" }}
                    >
                      <span className="shrink-0 mt-1" style={{ color: "oklch(0.55 0.18 18)" }}>▸</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ExperienceSection({ isMatrixMode = false }: { isMatrixMode?: boolean }) {
  if (isMatrixMode) return <MatrixExperience />;
  return <DossierExperience />;
}
