import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "@/lib/audio";

type TreeNode = {
  name: string;
  type: "folder" | "file";
  id?: string;
  children?: TreeNode[];
  isSecret?: boolean;
};

const FILE_TREE: TreeNode[] = [
  {
    name: "dossier_root",
    type: "folder",
    children: [
      { name: "01_about.md", type: "file", id: "about" },
      { name: "02_skills.json", type: "file", id: "skills" },
      {
        name: "03_deployments",
        type: "folder",
        children: [
          { name: "projects_list.tsx", type: "file", id: "projects" },
          { name: "black_site.enc", type: "file", isSecret: true },
        ],
      },
      { name: "04_experience.log", type: "file", id: "experience" },
      { name: "contact.sh", type: "file", id: "contact" },
      { name: "build_resume.exe", type: "file", id: "resume_trigger" },
    ],
  },
];

function FileNode({ 
  node, 
  depth = 0, 
  activeSection, 
  onTriggerResume 
}: { 
  node: TreeNode; 
  depth?: number; 
  activeSection: string;
  onTriggerResume: () => void;
}) {
  const [isOpen, setIsOpen] = useState(depth === 0); // Root open by default
  const [secretError, setSecretError] = useState(false);

  const isFolder = node.type === "folder";
  const isActive = node.id && activeSection === node.id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isFolder) {
      soundEngine.playClick();
      setIsOpen(!isOpen);
      return;
    }

    if (node.isSecret) {
      // Play error sound and flash red
      soundEngine.playClick(); // Mocking error with click for now
      setSecretError(true);
      setTimeout(() => setSecretError(false), 500);
      return;
    }

    if (node.id === "resume_trigger") {
      soundEngine.playClick();
      onTriggerResume();
      return;
    }

    if (node.id) {
      soundEngine.playHover();
      const target = document.getElementById(node.id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div
        onClick={handleClick}
        onMouseEnter={() => soundEngine.playHover()}
        className={`flex items-center gap-2 py-1.5 px-2 cursor-pointer transition-colors relative
          ${isActive ? "text-crimson bg-crimson/10" : "text-muted-foreground hover:bg-surface/50 hover:text-foreground"}
          ${secretError ? "text-red-500 bg-red-500/20" : ""}
        `}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {isFolder ? (
          <span className="opacity-50 text-[10px] w-3 flex justify-center">
            {isOpen ? "▼" : "▶"}
          </span>
        ) : (
          <span className="opacity-30 text-[10px] w-3 flex justify-center">
            {node.isSecret ? "✘" : "▪"}
          </span>
        )}
        <span className="font-mono text-xs tracking-wider">
          {secretError ? "ACCESS_DENIED" : node.name}
        </span>
      </div>

      <AnimatePresence initial={false}>
        {isFolder && isOpen && node.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {node.children.map((child, i) => (
              <FileNode 
                key={i} 
                node={child} 
                depth={depth + 1} 
                activeSection={activeSection}
                onTriggerResume={onTriggerResume}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SidebarNav({ onTriggerResume }: { onTriggerResume: () => void }) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    // Extract route IDs
    const sectionIds = ["about", "skills", "projects", "experience", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-background border-r border-border z-40 hidden lg:flex flex-col shadow-[10px_0_30px_oklch(0.12_0.02_20)]">
      <div className="h-14 flex items-center px-4 border-b border-border">
        <span className="font-mono text-xs font-semibold tracking-widest text-crimson">
          NS://DOSSIER
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 select-none custom-scrollbar">
        <div className="px-4 mb-2 opacity-50 font-mono text-[10px] tracking-widest">
          EXPLORER
        </div>
        {FILE_TREE.map((node, i) => (
          <FileNode 
            key={i} 
            node={node} 
            activeSection={activeSection}
            onTriggerResume={onTriggerResume}
          />
        ))}
      </div>
      
      <div className="h-14 border-t border-border flex items-center px-4">
        <span className="font-mono text-[10px] opacity-30 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
          SYSTEM_ONLINE
        </span>
      </div>
    </div>
  );
}
