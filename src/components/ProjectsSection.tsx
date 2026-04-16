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
              className="dossier-panel p-5 group hover:border-crimson-dim/50 transition-colors"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="terminal-label">{project.id}</span>
                <span className={`font-mono text-[9px] tracking-wider px-2 py-0.5 border ${
                  project.status === "ACTIVE"
                    ? "text-crimson border-crimson/30 bg-crimson/5"
                    : "text-label border-border"
                }`}>
                  {project.status}
                </span>
              </div>

              <h3 className="font-display text-base font-semibold text-foreground mb-1 group-hover:text-crimson transition-colors">
                {project.name}
              </h3>
              <p className="font-body text-xs text-muted-foreground mb-4 leading-relaxed">
                {project.summary}
              </p>

              {/* Stack */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[9px] tracking-wider text-label border border-border px-1.5 py-0.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Meta row */}
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="font-mono text-[10px] text-label tracking-wider">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
