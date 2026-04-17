import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "@/lib/audio";

interface CommandItem {
  id: string;
  label: string;
  icon: string;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const commands: CommandItem[] = [
    {
      id: "home",
      label: "INITIALIZE :: RETURN TO TOP",
      icon: "↑",
      action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
    {
      id: "about",
      label: "VIEW :: SUBJECT PROFILE",
      icon: "○",
      action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "projects",
      label: "VIEW :: DEPLOYMENTS / ARCHIVES",
      icon: "□",
      action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "experience",
      label: "VIEW :: MISSION LOG",
      icon: "△",
      action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "skills",
      label: "VIEW :: SYSTEM CAPABILITIES",
      icon: "◇",
      action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "contact",
      label: "EXECUTE :: ESTABLISH SECURE CONTACT",
      icon: "✉",
      action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "resume",
      label: "DOWNLOAD :: FULL DOSSIER (PDF)",
      icon: "↓",
      action: () => window.open("/resume", "_blank"),
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            soundEngine.unlock();
            soundEngine.playClick();
          }
          return !prev;
        });
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        soundEngine.playHover();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const executeCommand = (cmd: CommandItem) => {
    soundEngine.playClick();
    cmd.action();
    setIsOpen(false);
    setSearch("");
  };

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-xl px-4"
          >
            <div className="dossier-panel bg-surface shadow-2xl flex flex-col overflow-hidden border-crimson/30">
              {/* Header Input */}
              <div className="flex items-center px-4 py-3 border-b border-dashed border-border/50">
                <span className="text-crimson mr-3 font-mono text-sm">{">"}</span>
                <input
                  type="text"
                  autoFocus
                  placeholder="ENTER COMMAND OR SEARCH DATA..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-foreground placeholder:text-foreground/30"
                />
                <span className="font-mono text-[9px] text-foreground/40 border border-border px-1.5 py-0.5 rounded-sm">
                  ESC
                </span>
              </div>

              {/* Command List */}
              <div className="max-h-[60vh] overflow-y-auto py-2">
                {filteredCommands.length === 0 ? (
                  <div className="py-8 text-center font-mono text-xs text-foreground/40">
                    ERR :: COMMAND NOT FOUND
                  </div>
                ) : (
                  filteredCommands.map((cmd) => (
                    <button
                      key={cmd.id}
                      onMouseEnter={() => soundEngine.playHover()}
                      onClick={() => executeCommand(cmd)}
                      className="w-full text-left px-4 py-3 flex items-center gap-4 hover:bg-crimson/10 border-l-2 border-transparent hover:border-crimson group transition-colors"
                    >
                      <span className="font-mono text-xs text-crimson group-hoverX-glow">
                        {cmd.icon}
                      </span>
                      <span className="font-mono text-xs tracking-wider text-foreground/80 group-hover:text-foreground transition-colors">
                        {cmd.label}
                      </span>
                    </button>
                  ))
                )}
              </div>
              
              {/* Footer */}
              <div className="px-4 py-2 border-t border-dashed border-border/50 flex justify-between bg-black/20">
                <span className="font-mono text-[8px] text-foreground/40">DIGITAL DOSSIER OS v2.0</span>
                <span className="font-mono text-[8px] text-crimson">TERMINAL ACTIVE</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
