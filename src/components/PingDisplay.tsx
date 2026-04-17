import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PingDisplay() {
  const [pings, setPings] = useState<number[]>([24, 28, 22, 25, 30, 27]);
  const [currentPing, setCurrentPing] = useState(25);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPing = Math.floor(Math.random() * 40) + 15; // Random 15-55ms
      setCurrentPing(newPing);
      setPings(prev => [...prev.slice(-9), newPing]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 font-mono" style={{ color: "oklch(0.55 0.22 18 / 80%)" }}>
      <div 
        className="flex items-end gap-0.5 h-4 w-12 border-l border-b pb-[1px] pl-[1px]"
        style={{ borderColor: "oklch(0.55 0.22 18 / 40%)" }}
      >
        {pings.map((p, i) => {
          const height = Math.min((p / 60) * 100, 100); 
          return (
            <motion.div
              key={i}
              className="w-1"
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.3 }}
              style={{ 
                backgroundColor: "oklch(0.55 0.22 18)",
                opacity: 0.6 + (i / pings.length) * 0.4 
              }}
            />
          );
        })}
      </div>
      <div className="flex flex-col tabular-nums min-w-[32px]">
        <span className="text-[8px] leading-tight opacity-60 tracking-tighter">LATENCY</span>
        <span className="text-[10px] leading-none font-bold" style={{ color: "oklch(0.70 0.25 18)" }}>{currentPing}MS</span>
      </div>
    </div>
  );
}
