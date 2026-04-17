import { motion } from "framer-motion";
import { soundEngine } from "@/lib/audio";

export default function NoiseToggle({ 
  enabled, 
  onToggle 
}: { 
  enabled: boolean; 
  onToggle: () => void; 
}) {
  return (
    <motion.button 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5 }} // Wait for system boot
      onClick={() => {
        soundEngine.playClick();
        onToggle();
      }}
      onMouseEnter={() => soundEngine.playHover()}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 font-mono text-[9px] tracking-widest text-label hover:text-crimson transition-colors group"
    >
      <span className={`w-2 h-2 rounded-full transition-colors ${enabled ? 'bg-crimson status-pulse' : 'bg-surface border border-border group-hover:border-crimson'}`} />
      SYS.NOISE_GEN // {enabled ? "ON" : "OFF"}
    </motion.button>
  );
}
