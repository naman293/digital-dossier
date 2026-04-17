import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=";

interface MatrixScrambleTextProps {
  text: string;
  trigger: boolean;
  className?: string;
  duration?: number;
}

export default function MatrixScrambleText({ 
  text, 
  trigger, 
  className = "", 
  duration = 800 
}: MatrixScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    // Whenever trigger changes, run the scramble if trigger is true
    // Or run it both ways? The user says when entering ASCII mode.
    // Let's run it any time trigger toggles, to show the translation phase.
    
    let frameId: number;
    const startTime = Date.now();
    const length = text.length;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = elapsed / duration;

      if (progress >= 1) {
        setDisplayText(text);
        return;
      }

      // Calculate how many characters should be "resolved" to the final text
      const resolvedChars = Math.floor(progress * length);
      
      let scrambled = "";
      for (let i = 0; i < length; i++) {
        if (i < resolvedChars) {
          scrambled += text[i];
        } else {
          // Keep spaces as spaces to prevent word shifting
          if (text[i] === " ") {
            scrambled += " ";
          } else {
            scrambled += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
      }
      
      setDisplayText(scrambled);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [text, trigger, duration]);

  return (
    <span className={className}>
      {displayText}
    </span>
  );
}
