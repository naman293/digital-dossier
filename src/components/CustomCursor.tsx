import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 500, damping: 28, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("glitch-hover") ||
        target.closest(".dossier-panel")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHoverStart);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHoverStart);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference hidden lg:block"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
    >
      {/* Outer Scanner Ring */}
      <motion.div
        animate={{
          width: isHovering ? 48 : 24,
          height: isHovering ? 48 : 24,
          borderColor: isHovering ? "oklch(0.55 0.22 18)" : "oklch(0.50 0.18 18)",
          rotate: isHovering ? 90 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative flex items-center justify-center border rounded-full opacity-60"
      >
        {/* Crosshair Lines */}
        <div className="absolute w-full h-[1px] bg-current opacity-20 scale-x-50" />
        <div className="absolute h-full w-[1px] bg-current opacity-20 scale-y-50" />
        
        {/* Internal technical "ticks" */}
        <div className="absolute inset-0 rounded-full border border-dashed border-current opacity-10" />
      </motion.div>

      {/* Center Focus Dot */}
      <motion.div
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "oklch(0.55 0.22 18)" : "oklch(0.50 0.18 18)",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]"
      />

      {/* Connection label on hover */}
      <motion.div
        animate={{ 
          opacity: isHovering ? 0.4 : 0, 
          x: 32, 
          scale: isHovering ? 0.6 : 0.4 
        }}
        className="absolute top-0 font-mono text-[8px] tracking-[0.3em] text-white whitespace-nowrap origin-left"
      >
        [LNK_LCKD]
      </motion.div>
    </motion.div>
  );
}
