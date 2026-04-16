import { motion } from "framer-motion";
import { SectionHeader } from "./AboutSection";

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

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative max-w-6xl mx-auto">
        <SectionHeader label="05" title="MISSION LOG // TIMELINE" />

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
              {/* Timeline node */}
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
                    <li key={j} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "oklch(0.82 0.009 80)" }}>
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
