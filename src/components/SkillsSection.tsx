import { motion } from "framer-motion";
import { SectionHeader } from "./AboutSection";
import MatrixFragment from "./MatrixFragment";

const skillGroups = [
  {
    category: "LANGUAGES",
    items: ["C++", "C", "Java", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
  },
  {
    category: "BACKEND",
    items: ["Node.js", "Express", "NestJS", "REST APIs", "JWT", "OAuth"],
  },
  {
    category: "FRONTEND",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "DATABASES",
    items: ["PostgreSQL", "MongoDB"],
  },
  {
    category: "TOOLS & WORKFLOW",
    items: ["Git", "GitHub", "VS Code", "Docker", "Linux", "Figma", "Framer"],
  },
  {
    category: "KNOWLEDGE SYSTEMS",
    items: ["Obsidian", "Notion", "Eraser.io"],
  },
  {
    category: "CORE CONCEPTS",
    items: ["DBMS", "Operating Systems", "Computer Networks", "DSA"],
  },
];

/* ── Matrix Skills: package.json style ── */
function MatrixSkills() {
  return (
    <section id="skills" className="py-16 md:py-24 px-6">
      <div className="max-w-4xl mx-auto font-mono text-xs">
        {/* File header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4"
          style={{ color: "rgba(0,255,65,0.5)" }}
        >
          <div><span style={{ color: "#00ff41" }}>naman@reality</span>:~$ cat package.json</div>
        </motion.div>

        {/* package.json structure */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-4"
          style={{
            background: "rgba(0,5,0,0.5)",
            border: "1px solid rgba(0,255,65,0.1)",
          }}
        >
          <div style={{ color: "rgba(0,255,65,0.5)" }}>{"{"}</div>
          <div className="pl-4">
            <div style={{ color: "rgba(0,255,65,0.4)" }}>
              <span style={{ color: "#00ff41" }}>"name"</span>: <span style={{ color: "rgba(0,255,65,0.7)" }}>"@naman/developer-toolkit"</span>,
            </div>
            <div style={{ color: "rgba(0,255,65,0.4)" }}>
              <span style={{ color: "#00ff41" }}>"version"</span>: <span style={{ color: "rgba(0,255,65,0.7)" }}>"22.0.0"</span>,
            </div>
            <div className="mt-3" style={{ color: "rgba(0,255,65,0.4)" }}>
              <span style={{ color: "#00ff41" }}>"dependencies"</span>: {"{"}
            </div>

            {/* Dependency groups */}
            <div className="pl-4 space-y-4 mt-2">
              {skillGroups.map((group, gi) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, x: -5 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.05 }}
                >
                  <div style={{ color: "rgba(0,255,65,0.3)" }}>
                    {"// "}{group.category}
                  </div>
                  {group.items.map((item, ii) => (
                    <MatrixFragment key={item} isMatrixMode={true}>
                      <div
                        className="pl-2 py-0.5 hover:bg-[rgba(0,255,65,0.03)] transition-colors"
                        style={{ color: "rgba(0,255,65,0.6)" }}
                      >
                        <span style={{ color: "#00ff41" }}>"{item.toLowerCase().replace(/\s+/g, "-")}"</span>
                        :{" "}
                        <span style={{ color: "rgba(0,255,65,0.4)" }}>
                          "^{(Math.random() * 5 + 1).toFixed(1)}.{Math.floor(Math.random() * 10)}.0"
                        </span>
                        {ii < group.items.length - 1 || gi < skillGroups.length - 1 ? "," : ""}
                      </div>
                    </MatrixFragment>
                  ))}
                </motion.div>
              ))}
            </div>

            <div className="mt-2" style={{ color: "rgba(0,255,65,0.4)" }}>{"}"}</div>
          </div>
          <div style={{ color: "rgba(0,255,65,0.5)" }}>{"}"}</div>
        </motion.div>

        {/* npm install output */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-4"
          style={{ color: "rgba(0,255,65,0.3)" }}
        >
          <div>added {skillGroups.reduce((a, g) => a + g.items.length, 0)} packages in 22.0s</div>
          <div>0 vulnerabilities</div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Normal Dossier Skills (unchanged) ── */
function DossierSkills() {
  return (
    <section id="skills" className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="04" title="SYSTEM CAPABILITIES" isMatrixMode={false} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="dossier-panel p-4"
            >
              <div className="terminal-label flex items-center gap-2 mb-3">
                <span className="node-dot inline-block" />
                {group.category}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[10px] text-foreground/70 bg-surface-raised border border-border px-2 py-1 tracking-wide block"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SkillsSection({ isMatrixMode = false }: { isMatrixMode?: boolean }) {
  if (isMatrixMode) return <MatrixSkills />;
  return <DossierSkills />;
}
