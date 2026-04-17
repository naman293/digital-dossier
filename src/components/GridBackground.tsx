import { motion, useScroll, useTransform } from "framer-motion";

export default function GridBackground() {
  const { scrollY } = useScroll();
  
  // Parallax shift - slow descent of grid as user scrolls down
  const y = useTransform(scrollY, [0, 3000], [0, 800]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-surface">
      <motion.div
        style={{ y }}
        className="absolute inset-[-100%] w-[300%] h-[300%]"
      >
        <div 
          className="w-full h-full opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, oklch(0.55 0.22 18) 1px, transparent 1px),
              linear-gradient(to bottom, oklch(0.55 0.22 18) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px"
          }}
        />
      </motion.div>
      
      {/* Deep vignette shadow mask */}
      <div 
        className="absolute inset-0 opacity-100 mix-blend-multiply pointer-events-none" 
        style={{ background: 'radial-gradient(circle at center, transparent 0%, oklch(0.12 0.02 260) 100%)' }}
      />
    </div>
  );
}
