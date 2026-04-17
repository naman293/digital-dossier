import { useState, useRef, useEffect } from "react";

const CHARS = "!<>-_\\\\/[]{}—=+*^?#________";

interface HoverDecryptTextProps {
  text: string;
  duration?: number;
  className?: string;
  as?: React.ElementType;
}

export default function HoverDecryptText({
  text,
  duration = 600,
  className = "",
  as: Component = "span",
}: HoverDecryptTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // If external text prop changes, reset to it directly.
    setDisplayText(text);
  }, [text]);

  const handleMouseEnter = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    startTimeRef.current = performance.now();

    const animate = (time: number) => {
      const elapsed = time - (startTimeRef.current || time);
      const progress = Math.min(elapsed / duration, 1);

      // Decryption progress from beginning to end
      const revealedLength = Math.floor(progress * text.length);

      let scrambled = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          scrambled += " ";
        } else if (i < revealedLength) {
          scrambled += text[i];
        } else {
          scrambled += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(scrambled);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        setIsScrambling(false);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  };

  const handleMouseLeave = () => {
    // Optional: Cancel scramble if they leave, or let it finish. 
    // Letting it finish is usually smoother.
  };

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <Component
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      data-text={text}
    >
      {displayText}
    </Component>
  );
}
