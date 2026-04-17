import { useEffect, useState } from "react";
import { soundEngine } from "@/lib/audio";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", 
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"
];

export function useKonamiCode() {
  const [success, setSuccess] = useState(false);
  const [inputIndex, setInputIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only care before sequence completes
      if (success) return;

      const expectedKey = KONAMI_CODE[inputIndex];
      // We do a loose match or exact depending on capital letters.
      // 'b' and 'a' should be case insensitive
      const key = e.key.toLowerCase();
      const expected = expectedKey.toLowerCase();

      if (key === expected) {
        if (inputIndex === KONAMI_CODE.length - 1) {
          setSuccess(true);
          // Optional Easter Egg success sound or heavy crunch
          soundEngine.playClick();
        } else {
          setInputIndex(inputIndex + 1);
        }
      } else {
        if (key === KONAMI_CODE[0].toLowerCase()) {
          setInputIndex(1);
        } else {
          setInputIndex(0);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputIndex, success]);

  const reset = () => {
    setSuccess(false);
    setInputIndex(0);
  };

  return { success, reset };
}
