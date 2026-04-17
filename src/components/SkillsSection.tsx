import { motion } from "framer-motion";
import { SectionHeader } from "./AboutSection";

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

export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="04" title="SYSTEM CAPABILITIES" />

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
              <div className="terminal-label mb-3 flex items-center gap-2">
                <span className="node-dot inline-block" />
                {group.category}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[10px] text-foreground/70 bg-surface-raised border border-border px-2 py-1 tracking-wide"
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
