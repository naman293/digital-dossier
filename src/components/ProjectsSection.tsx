import { motion } from "framer-motion";
import { SectionHeader } from "./AboutSection";

const projects = [
  {
    id: "PROJ-001",
    name: "Life-OS",
    summary: "Life operating system dashboard — habits, day/week/month tracking for self-assessment.",
    stack: ["TypeScript", "React", "Next.js"],
    role: "Full-Stack Developer",
    github: "https://github.com/naman293/Life-OS",
    live: null,
    status: "ACTIVE",
    year: "2024",
    type: "PERSONAL PROJECT",
    complexity: "HIGH",
  },
  {
    id: "PROJ-002",
    name: "Poker App",
    summary: "Multiplayer poker with real-time chat, emoji sharing, and complete game logic engine.",
    stack: ["TypeScript", "Node.js", "Game Logic"],
    role: "Architect & Developer",
    github: "https://github.com/naman293/Poker_app",
    live: null,
    status: "COMPLETE",
    year: "2024",
    type: "FULL-STACK",
    complexity: "HIGH",
  },
  {
    id: "PROJ-003",
    name: "Voting System",
    summary: "Secure backend voting system enforcing one-user-one-vote with auth and result aggregation.",
    stack: ["TypeScript", "Node.js", "REST API"],
    role: "Backend Developer",
    github: "https://github.com/naman293/voting-system",
    live: null,
    status: "COMPLETE",
    year: "2023",
    type: "BACKEND",
    complexity: "MEDIUM",
  },
  {
    id: "PROJ-004",
    name: "Dark-Knight Agency",
    summary: "3D animated pricing display for an AI agency — aesthetic, immersive, and functional.",
    stack: ["HTML", "CSS", "JavaScript", "3D Animation"],
    role: "Designer & Developer",
    github: "https://github.com/naman293/Dark-Knight-Agency",
    live: null,
    status: "SHIPPED",
    year: "2024",
    type: "FRONTEND",
    complexity: "MEDIUM",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="relative max-w-6xl mx-auto">
        <SectionHeader label="03" title="DEPLOYMENTS // CASE FILES" />

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover="hover"
              animate="rest"
              className="dossier-panel p-5 group cursor-default relative overflow-hidden flex flex-col"
              style={{ willChange: "transform" }}
            >
              {/* Animated border glow overlay */}
              <motion.div
                variants={{
                  rest: { opacity: 0 },
                  hover: { opacity: 1, transition: { duration: 0.2 } },
                }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  border: "1.5px solid oklch(0.50 0.18 18 / 40%)",
                  boxShadow: "0 0 20px 3px oklch(0.50 0.18 18 / 12%), inset 0 0 20px 0px oklch(0.50 0.18 18 / 5%)",
                }}
              />

              {/* Sweep shine on hover */}
              <motion.div
                variants={{
                  rest: { x: "-120%", opacity: 0 },
                  hover: {
                    x: "220%",
                    opacity: 1,
                    transition: { duration: 0.55, ease: "easeInOut" },
                  },
                }}
                className="absolute inset-y-0 w-1/2 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 0%, oklch(0.55 0.22 18 / 6%) 50%, transparent 100%)",
                }}
              />

              {/* ── Card body (flex-col layout, fills height) ── */}
              <div className="flex flex-col flex-1 relative z-10">

                {/* Header row */}
                <div className="flex items-center justify-between mb-3">
                  <span className="terminal-label">{project.id}</span>
                  <span
                    className={`font-mono text-[9px] tracking-wider px-2 py-0.5 border ${
                      project.status === "ACTIVE"
                        ? "text-crimson border-crimson/30 bg-crimson/5"
                        : "text-label border-border"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-base font-semibold text-foreground mb-2 group-hover:text-crimson transition-colors duration-200">
                  {project.name}
                </h3>

                {/* Summary */}
                <p className="font-body text-sm text-foreground/75 mb-4 leading-relaxed">
                  {project.summary}
                </p>

                {/* Stack tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] tracking-wider text-foreground/60 border border-border px-2 py-0.5 group-hover:border-crimson-dim/60 group-hover:text-foreground/80 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Hidden metadata revealed on hover */}
                <motion.div
                  variants={{
                    rest: { opacity: 0, height: 0, marginBottom: 0 },
                    hover: {
                      opacity: 1,
                      height: "auto",
                      marginBottom: 12,
                      transition: { duration: 0.22, ease: "easeOut" },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-5 pt-1 pb-1">
                    {[
                      { label: "YEAR", val: project.year },
                      { label: "TYPE", val: project.type },
                      { label: "COMPLEXITY", val: project.complexity },
                    ].map(({ label, val }) => (
                      <div key={label} className="flex flex-col gap-0.5">
                        <span className="font-mono text-[8px] text-foreground/40 tracking-widest">{label}</span>
                        <span className="font-mono text-[10px] text-crimson tracking-wider font-medium">{val}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Meta row — pushed to bottom with mt-auto */}
                <div className="flex items-center justify-between border-t border-border pt-3 mt-auto">
                  <span className="font-mono text-[10px] text-foreground/55 tracking-wider">
                    ROLE: {project.role}
                  </span>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] text-crimson-dim hover:text-crimson tracking-wider transition-colors"
                    >
                      GITHUB ↗
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] text-crimson-dim hover:text-crimson tracking-wider transition-colors"
                      >
                        LIVE ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
