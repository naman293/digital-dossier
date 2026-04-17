import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { soundEngine } from "@/lib/audio";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when user scrolls down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          onMouseEnter={() => soundEngine.playHover()}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center bg-background border border-border dossier-panel cursor-none md:cursor-pointer transition-colors hover:border-crimson hover:bg-crimson/5 group overflow-hidden"
          aria-label="Back to top"
        >
          {/* Circuit node styling */}
          <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
          <div className="node-dot status-pulse group-hover:bg-crimson group-hover:shadow-[0_0_8px_rgba(255,0,0,0.5)] transition-all" style={{ background: "oklch(0.50 0.18 18)" }} />
          
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute text-foreground group-hover:text-crimson transition-colors -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5"
          >
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
