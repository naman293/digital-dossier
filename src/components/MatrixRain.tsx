import { useEffect, useRef } from "react";

/**
 * MatrixRain — Enhanced canvas-based digital rain.
 * Uses a mix of katakana, latin, and binary chars for authentic aesthetics.
 */
export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = new Array(columns).fill(0).map(() => Math.random() * -100);
    const speeds: number[] = new Array(columns).fill(0).map(() => 0.5 + Math.random() * 1.5);

    // Mix of katakana, binary, and latin for authentic matrix feel
    const charSets = [
      "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロワヲンヴ",
      "01",
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      "$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~",
    ];
    const allChars = charSets.join("");

    let animationId: number;

    const draw = () => {
      // Trail effect — slightly transparent black overlay
      ctx.fillStyle = "rgba(0, 3, 0, 0.06)";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < drops.length; i++) {
        const char = allChars[Math.floor(Math.random() * allChars.length)];
        const y = drops[i] * fontSize;

        // Head of the drop is brighter
        if (Math.random() > 0.5) {
          ctx.fillStyle = "rgba(0, 255, 65, 0.9)";
          ctx.font = `bold ${fontSize}px monospace`;
        } else {
          ctx.fillStyle = `rgba(0, 255, 65, ${0.15 + Math.random() * 0.35})`;
          ctx.font = `${fontSize}px monospace`;
        }

        ctx.fillText(char, i * fontSize, y);

        if (y > height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i] += speeds[i];
      }
      animationId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.2 }}
    />
  );
}
