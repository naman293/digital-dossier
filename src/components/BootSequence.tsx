import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { soundEngine } from "@/lib/audio";

const BOOT_LOGS = [
  "INITIALIZING NEURAL LINK...",
  "BYPASSING SECURITY PROTOCOLS...",
  "LOADING CORE MODULES...",
  "DECRYPTING DOSSIER DATA...",
  "ESTABLISHING SECURE CONNECTION...",
  "ACCESS GRANTED."
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < BOOT_LOGS.length) {
      const timeout = setTimeout(() => {
        setLogs(prev => [...prev, BOOT_LOGS[currentIndex]]);
        soundEngine.playTypingKeystroke();
        setCurrentIndex(c => c + 1);
      }, Math.random() * 300 + 200); // 200ms - 500ms intermediate speed
      return () => clearTimeout(timeout);
    } else {
      const finishTimeout = setTimeout(() => {
        onComplete();
      }, 900);
      return () => clearTimeout(finishTimeout);
    }
  }, [currentIndex, onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-surface flex flex-col justify-end p-8 md:p-24 font-mono text-sm"
    >
      <div className="flex flex-col gap-3 max-w-2xl text-crimson mb-[10vh] min-h-[160px]">
        {logs.map((log, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-4"
          >
            <span className="opacity-50 select-none text-crimson-dim">{">"}</span>
            <span 
              className={log.includes("ACCESS GRANTED.") ? "text-crimson font-bold drop-shadow-[0_0_10px_oklch(0.55_0.22_18)]" : "text-crimson"}
            >
              {log}
            </span>
          </motion.div>
        ))}
        {currentIndex < BOOT_LOGS.length && (
          <motion.div 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-3 h-5 bg-crimson mt-1 shadow-[0_0_10px_oklch(0.55_0.22_18)]"
          />
        )}
      </div>
    </motion.div>

  );
}
