import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "@/lib/audio";

import { useNavigate } from "@tanstack/react-router";

const BUILD_LOGS = [
  "[  OK  ] Initializing gcc v14.0.2... ",
  "[  OK  ] Allocating memory core buffers...",
  "[ INFO ] Fetching src/Naman_Soni_Experience.o",
  "[ INFO ] Fetching src/Education_Data.o",
  "[ WARN ] Experience metrics exceed standard container size. Resizing...",
  "[  OK  ] Dependency graph resolved.",
  "[  OK  ] Linking node structures into PDF binary...",
  "[ INFO ] Finalizing encryption layers...",
  "BUILD SUCCESS: Naman_Soni_Resume.pdf generated."
];

export default function ResumeCompiler({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentIndex < BUILD_LOGS.length) {
      const timeout = setTimeout(() => {
        setLogs(prev => [...prev, BUILD_LOGS[currentIndex]]);
        soundEngine.playTypingKeystroke();
        setCurrentIndex(c => c + 1);
      }, Math.random() * 200 + 100); // Fast compilation
      
      return () => clearTimeout(timeout);
    } else {
      // Once build is complete, wait 1 second, then trigger download and redirect
      const finishTimeout = setTimeout(() => {
        
        // Native browser trick to force file download programmatically 
        const a = document.createElement("a");
        a.href = "/resume/Naman_Soni_Resume.pdf";
        a.download = "Naman_Soni_Resume.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Tell parent to close modal
        onComplete();
        // Redirect to the resume page
        navigate({ to: "/resume" });
      }, 1000);
      return () => clearTimeout(finishTimeout);
    }
  }, [currentIndex, onComplete, navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-surface flex flex-col justify-end p-8 md:p-24 font-mono text-sm shadow-[inset_0_0_100px_oklch(0.1_0.02_20)]"
    >
      {/* Absolute scanning line for extra flair */}
      <div className="pointer-events-none absolute inset-0 scanline-overlay opacity-30" />

      <div className="flex flex-col gap-3 max-w-2xl min-h-[240px] mb-[10vh] z-10 w-full relative">
        {logs.map((log, i) => {
          const isWarn = log.includes("[ WARN ]");
          const isOk = log.includes("[  OK  ]");
          const isSuccess = log.includes("BUILD SUCCESS");
          
          let colorClass = "text-crimson";
          if (isWarn) colorClass = "text-yellow-500 drop-shadow-[0_0_5px_oklch(0.8_0.15_90)]";
          if (isOk) colorClass = "text-crimson drop-shadow-[0_0_5px_oklch(0.55_0.22_18)]";
          if (isSuccess) colorClass = "text-white font-bold drop-shadow-[0_0_10px_white] mt-4";

          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex gap-4 ${colorClass}`}
            >
              <span className="opacity-50 select-none text-crimson-dim">{">"}</span>
              <span>{log}</span>
            </motion.div>
          );
        })}
        
        {currentIndex < BUILD_LOGS.length && (
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
