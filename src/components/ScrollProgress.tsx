import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // Smooth the scroll progress so it doesn't jitter
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      // Convert 0-1 to 0-100 percentage
      setPercentage(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div 
      className="fixed right-8 top-32 bottom-32 w-px z-40 hidden xl:flex flex-col items-center pointer-events-none" 
      style={{ background: "var(--border)" }}
    >
      {/* The filled progress line */}
      <motion.div 
        className="w-full origin-top" 
        style={{ scaleY, height: "100%", background: "var(--crimson)" }} 
      />
      
      {/* The percentage indicator positioned at the bottom of the line */}
      <div 
        className="absolute bottom-0 left-3 font-mono text-[8px] tracking-[0.2em] whitespace-nowrap"
        style={{ color: "var(--crimson)" }}
      >
        [{percentage.toString().padStart(3, "0")}%]
      </div>
      
      {/* Top label just for aesthetic */}
      <div 
        className="absolute top-0 left-3 font-mono text-[8px] tracking-[0.2em] opacity-50 whitespace-nowrap"
        style={{ color: "var(--label)" }}
      >
        SYS.SCROLL
      </div>
    </div>
  );
}
