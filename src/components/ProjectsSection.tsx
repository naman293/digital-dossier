import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SectionHeader } from "./AboutSection";
import HoverDecryptText from "./HoverDecryptText";
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
    // Parallax mouse binding
    batmanRef.current.rotation.y = THREE.MathUtils.lerp(
      batmanRef.current.rotation.y,
      (mouse.x * Math.PI) / 4,
      0.1
    );
  }
});`
  },
];

function ProjectCard({ 
  project, 
  index, 
  zIndex, 
  onLift 
}: { 
  project: typeof projects[0]; 
  index: number; 
  zIndex: number;
  onLift: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch] = useState(() => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover="hover"
      animate="rest"
      onMouseMove={isTouch ? undefined : handleMouseMove}
      onMouseLeave={isTouch ? undefined : handleMouseLeave}
      onMouseDown={onLift}
      drag={isTouch ? false : true}
      dragConstraints={isTouch ? undefined : { left: -300, right: 300, top: -300, bottom: 300 }}
      dragElastic={0.2}
      whileDrag={{ scale: 1.02, cursor: "grabbing" }}
      style={isTouch ? {} : {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        zIndex,
      }}
      className="group dossier-panel p-5 md:p-8 flex flex-col h-full perspective-1000 relative overflow-hidden bg-surface cursor-default md:cursor-grab"
    >
      {/* Animated subtle elevation glow */}
      <motion.div
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1, transition: { duration: 0.2 } },
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "0 0 24px 4px oklch(0.50 0.18 18 / 10%)",
        }}
      />

      {/* Sweep shine on hover */}
      <motion.div
        variants={{
          rest: { x: "-120%", opacity: 0 },
          hover: {
            x: "220%",
            opacity: 1,
            transition: { duration: 1.2, ease: "easeInOut" },
          },
        }}
        className="absolute inset-y-0 w-1/2 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, transparent 0%, oklch(0.55 0.22 18 / 6%) 50%, transparent 100%)",
        }}
      />

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
      <p
        className="font-mono text-xs leading-relaxed mb-8 flex-grow relative z-10"
        style={{ color: "oklch(0.72 0.01 260)" }}
      >
        <HoverDecryptText text={project.summary} />
      </p>

      <div className="flex flex-wrap gap-1.5 mb-8 relative z-10">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[10px] tracking-wider border border-border px-2 py-1 text-foreground/70"
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

export default function ProjectsSection() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);

  return (
    <section id="projects" className="py-16 md:py-24 px-6 relative z-10 w-full overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-center gap-4 mb-2">
          <button 
            onClick={() => {
              setResetKey(prev => prev + 1);
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
            <SectionHeader label="03" title="DEPLOYMENTS // CASE FILES" />
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
