import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MatrixFragmentProps {
  children: React.ReactNode;
  isMatrixMode?: boolean;
  className?: string;
  disablePhasing?: boolean;
}

export default function MatrixFragment({
  children,
  isMatrixMode = false,
  className = "",
  disablePhasing = false,
}: MatrixFragmentProps) {
  const [isPhased, setIsPhased] = useState(false);

  // Reset if matrix mode is toggled off
  useEffect(() => {
    if (!isMatrixMode) setIsPhased(false);
  }, [isMatrixMode]);

  const togglePhase = (e: React.MouseEvent) => {
    if (!isMatrixMode || disablePhasing) return;

    const target = e.target as HTMLElement;
    if (target.closest(".section-header-label")) return;

    e.stopPropagation();
    setIsPhased(!isPhased);
  };

  // Generate a fake memory address for the phased overlay
  const fakeAddr =
    "0x" +
    Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");

  return (
    <div
      onClick={togglePhase}
      className={`relative transition-all duration-300 ${isMatrixMode ? "cursor-crosshair" : ""} ${isPhased ? "matrix-phased" : ""} ${className}`}
    >
      <div
        className={`relative z-10 ${isPhased ? "opacity-0 scale-95" : "opacity-100 scale-100"} transition-all duration-500`}
      >
        {children}
      </div>

      <AnimatePresence>
        {isPhased && isMatrixMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none"
          >
            {/* Binary Bit Grid Overlay */}
            <div
              className="absolute inset-0 text-[8px] font-mono leading-none break-all p-2 select-none"
              style={{ color: "rgba(0, 255, 65, 0.15)" }}
            >
              {Array.from({ length: 400 })
                .map(() => Math.round(Math.random()))
                .join("")}
            </div>

            {/* Tag overlay — looks like a decompiled fragment */}
            <div
              className="text-[10px] font-mono tracking-widest px-2 py-1 backdrop-blur-sm"
              style={{
                color: "#00ff41",
                border: "1px solid rgba(0, 255, 65, 0.25)",
                background: "rgba(0, 10, 0, 0.7)",
              }}
            >
              /* {fakeAddr} :: REDACTED */
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover hint — green glow border on hover */}
      {isMatrixMode && !isPhased && !disablePhasing && (
        <div
          className="absolute inset-0 transition-colors pointer-events-none rounded"
          style={{
            border: "1px solid transparent",
          }}
        />
      )}
    </div>
  );
}
