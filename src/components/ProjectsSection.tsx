import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./AboutSection";
import HoverDecryptText from "./HoverDecryptText";
import MatrixFragment from "./MatrixFragment";
import { soundEngine } from "@/lib/audio";

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
    snippet: `// Life-OS Engine
export function calculateHabitScore(log: HabitLog[]) {
  return log.reduce((acc, entry) => {
    const streakMult = Math.min(entry.streak / 7, 2.0);
    return acc + (entry.completed ? 10 * streakMult : 0);
  }, 0);
}`
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
    snippet: `// Poker Engine WebSocket Handler
socket.on('playerAction', (msg: ActionMsg) => {
  const table = tables.get(msg.tableId);
  const result = table.processAction(msg.playerId, msg.action);
  io.to(table.id).emit('tableStateUpdate', table.serialize());
});`
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
    snippet: `// Voting Aggregator Middleware
app.post('/api/vote', async (req, res) => {
  const { userId, candidateId } = req.body;
  if(await blockChainDB.hasVoted(userId)) {
    return res.status(403).send("DUPLICATE_VOTE");
  }
  await blockChainDB.record(userId, candidateId);
});`
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
    snippet: `// 3D Canvas Rigging
useFrame((state) => {
  if (batmanRef.current) {
    batmanRef.current.rotation.y = THREE.MathUtils.lerp(
      batmanRef.current.rotation.y,
      (mouse.x * Math.PI) / 4,
      0.1
    );
  }
});`
  },
];

/* ── Matrix Projects: ls -la style file catalog ── */
function MatrixProjects() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="projects" className="py-16 md:py-24 px-6 relative z-10 w-full overflow-hidden">
      <div className="max-w-4xl mx-auto font-mono text-xs">
        {/* Terminal header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4"
          style={{ color: "rgba(0,255,65,0.5)" }}
        >
          <div><span style={{ color: "#00ff41" }}>naman@reality</span>:~/projects$ ls -la</div>
        </motion.div>

        {/* Column headers — like ls output */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-2 pb-2"
          style={{
            color: "rgba(0,255,65,0.35)",
            borderBottom: "1px solid rgba(0,255,65,0.1)",
          }}
        >
          <div className="hidden md:grid grid-cols-[80px_80px_60px_1fr_100px]  gap-3">
            <span>STATUS</span>
            <span>TYPE</span>
            <span>YEAR</span>
            <span>NAME</span>
            <span className="text-right">ACTIONS</span>
          </div>
        </motion.div>

        {/* Project rows */}
        <div className="space-y-1">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              {/* Main row */}
              <div
                onClick={() => {
                  soundEngine.playClick();
                  setExpandedId(expandedId === project.id ? null : project.id);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className="cursor-pointer py-2 px-2 transition-all hover:bg-[rgba(0,255,65,0.05)]"
                style={{
                  borderLeft: expandedId === project.id
                    ? "2px solid #00ff41"
                    : "2px solid transparent",
                }}
              >
                {/* Desktop grid */}
                <div className="hidden md:grid grid-cols-[80px_80px_60px_1fr_100px] gap-3 items-center">
                  <span
                    className="text-[9px] tracking-wider"
                    style={{
                      color: project.status === "ACTIVE" ? "#00ff41" : "rgba(0,255,65,0.4)",
                    }}
                  >
                    ● {project.status}
                  </span>
                  <span style={{ color: "rgba(0,255,65,0.4)" }}>{project.type}</span>
                  <span style={{ color: "rgba(0,255,65,0.3)" }}>{project.year}</span>
                  <span style={{ color: "#00ff41" }}>
                    {project.name}/<span style={{ color: "rgba(0,255,65,0.5)" }}> — {project.summary.slice(0, 60)}...</span>
                  </span>
                  <span className="text-right">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ color: "rgba(0,255,65,0.5)" }}
                      className="hover:underline"
                    >
                      [source]
                    </a>
                  </span>
                </div>

                {/* Mobile view */}
                <div className="md:hidden">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[9px]"
                      style={{
                        color: project.status === "ACTIVE" ? "#00ff41" : "rgba(0,255,65,0.4)",
                      }}
                    >●</span>
                    <span style={{ color: "#00ff41" }}>{project.name}/</span>
                    <span style={{ color: "rgba(0,255,65,0.3)" }}>({project.year})</span>
                  </div>
                </div>
              </div>

              {/* Expanded: shows code snippet */}
              {expandedId === project.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-4 mb-4 overflow-hidden"
                  style={{
                    borderLeft: "1px solid rgba(0,255,65,0.1)",
                    paddingLeft: "12px",
                  }}
                >
                  <div className="mt-2 space-y-2">
                    <div style={{ color: "rgba(0,255,65,0.4)" }}>
                      {"// "}{project.summary}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] px-1.5 py-0.5"
                          style={{
                            color: "#00ff41",
                            border: "1px solid rgba(0,255,65,0.15)",
                            background: "rgba(0,255,65,0.03)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {/* Code snippet */}
                    <pre
                      className="text-[10px] leading-relaxed mt-2 p-3 overflow-x-auto"
                      style={{
                        color: "rgba(0,255,65,0.6)",
                        background: "rgba(0,5,0,0.5)",
                        border: "1px solid rgba(0,255,65,0.08)",
                      }}
                    >
                      {project.snippet}
                    </pre>
                    <div className="flex gap-3 mt-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundEngine.playClick()}
                        className="text-[10px] tracking-wider"
                        style={{ color: "#00ff41" }}
                      >
                        $ git clone {project.github.replace("https://github.com/", "")}
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-4 pt-2"
          style={{
            color: "rgba(0,255,65,0.35)",
            borderTop: "1px solid rgba(0,255,65,0.08)",
          }}
        >
          total {projects.length} — click to expand source
        </motion.div>
      </div>
    </section>
  );
}

/* ── Normal Dossier Projects (original card layout) ── */
function ProjectCard({
  project,
  index,
  zIndex,
  onLift,
  activeCard,
}: {
  project: typeof projects[0];
  index: number;
  zIndex: number;
  onLift: () => void;
  activeCard: string | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch] = useState(() => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches);

  const cardVariants = {
    rest: { rotateX: 0, rotateY: 0, scale: 1 },
    hover: {
      rotateX: isTouch ? 0 : 5,
      rotateY: isTouch ? 0 : 5,
      scale: 1.01,
      transition: { duration: 0.3, ease: [0, 0, 0.58, 1] as const },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover="hover"
      animate={activeCard === project.id ? "hover" : "rest"}
      onMouseDown={onLift}
      variants={cardVariants}
      style={{ transformStyle: "preserve-3d", zIndex }}
      className="group dossier-panel p-5 md:p-8 flex flex-col h-full relative overflow-hidden bg-surface cursor-default"
    >
      <div className="absolute inset-0 pointer-events-none project-card-glare" />

      <div className="flex flex-col mb-4 bg-transparent border-none relative z-10">
        <div className="flex justify-between items-start mb-2">
          <div className="terminal-label flex items-center gap-2">
            <span className="node-dot inline-block" />
            {project.name}
          </div>
          <span className="font-mono text-[10px] text-foreground/50 tracking-wider">
            {project.year}
          </span>
        </div>
      </div>

      <div className="flex-grow">
        <p
          className="font-mono text-xs leading-relaxed mb-8"
          style={{ color: "oklch(0.72 0.01 260)" }}
        >
          <HoverDecryptText text={project.summary} />
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-8 relative z-10">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[10px] tracking-wider border border-border px-2 py-1 text-foreground/70 block"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-auto border-t border-dashed border-border pt-4 relative z-10">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => soundEngine.playHover()}
            onClick={() => soundEngine.playClick()}
            className="font-mono text-xs tracking-wider border border-crimson py-2 px-4 text-crimson hover:bg-crimson/10 transition-colors"
          >
            LIVE_LINK ↗
          </a>
        )}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => soundEngine.playHover()}
          onClick={() => soundEngine.playClick()}
          className="font-mono text-xs tracking-wider border border-border py-2 px-4 hover:border-crimson hover:text-crimson transition-colors"
        >
          SOURCE // GIT
        </a>
      </div>
    </motion.div>
  );
}

function DossierProjects() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);

  return (
    <section id="projects" className="py-16 md:py-24 px-6 relative z-10 w-full overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => {
              setResetKey((prev) => prev + 1);
              soundEngine.playClick();
            }}
            aria-label="Restore Grid"
            title="Restore Grid"
            className="flex-shrink-0 border border-border/50 p-1 hover:border-crimson hover:text-crimson transition-colors cursor-pointer flex items-center justify-center opacity-40 hover:opacity-100 rounded-sm"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M21 2v6h-6M3 12a9 9 0 102.3-6.4L21 8" />
            </svg>
          </button>
          <div className="flex-grow">
            <SectionHeader label="03" title="DEPLOYMENTS // CASE FILES" isMatrixMode={false} />
          </div>
        </div>

        <div key={resetKey} className="grid md:grid-cols-2 gap-6 mt-10">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              zIndex={activeCard === project.id ? 50 : 1}
              onLift={() => setActiveCard(project.id)}
              activeCard={activeCard}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ProjectsSection({ isMatrixMode = false }: { isMatrixMode?: boolean }) {
  if (isMatrixMode) return <MatrixProjects />;
  return <DossierProjects />;
}
