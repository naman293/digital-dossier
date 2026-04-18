import { useState, useEffect, useRef } from 'react';

export function useMultiSequenceCode(
  sequences: Record<string, () => void>,
  enabled: boolean = true
) {
  const [buffer, setBuffer] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const char = e.key.toLowerCase();
      if (char.length !== 1) return;

      setBuffer((prev) => {
        const newBuffer = prev + char;
        
        // Check for matches
        Object.entries(sequences).forEach(([seq, callback]) => {
          if (newBuffer.endsWith(seq)) {
            callback();
          }
        });

        // Reset timeout
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setBuffer(''), 2000);

        return newBuffer.slice(-20); // Keep buffer manageable
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [sequences, enabled]);

  return buffer;
}
