import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * MatrixHUD — Persistent heads-up display frame that wraps the entire viewport
 * when Matrix Reality mode is active. Displays simulated telemetry, uptime,
 * and system status bars along all four edges.
 */
export default function MatrixHUD() {
  const [uptime, setUptime] = useState(0);
  const [memUsage, setMemUsage] = useState(42);
  const [packets, setPackets] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime((prev) => prev + 1);
      setMemUsage(Math.floor(Math.random() * 30) + 40);
      setPackets((prev) => prev + Math.floor(Math.random() * 50));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const hexAddr = () =>
    "0x" +
    Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");

  return (
    <div className="fixed inset-0 z-30 pointer-events-none font-mono select-none">
      {/* ── TOP BAR ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-0 left-0 right-0 h-6 flex items-center justify-between px-4 text-[9px] tracking-widest border-b"
        style={{
          background: "rgba(0, 10, 0, 0.85)",
          borderColor: "rgba(0, 255, 65, 0.15)",
          color: "rgba(0, 255, 65, 0.7)",
        }}
      >
        <span>
          ┌─ REALITY.SIM v3.1.4 ── pid:{Math.floor(Math.random() * 9999)} ──
          tty/pts0
        </span>
        <span className="hidden sm:inline">
          UPTIME {formatUptime(uptime)} │ MEM {memUsage}% │ PKT{" "}
          {packets.toLocaleString()}
        </span>
        <span>
          {hexAddr()} ─┐
        </span>
      </motion.div>

      {/* ── BOTTOM BAR ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-6 flex items-center justify-between px-4 text-[9px] tracking-widest border-t"
        style={{
          background: "rgba(0, 10, 0, 0.85)",
          borderColor: "rgba(0, 255, 65, 0.15)",
          color: "rgba(0, 255, 65, 0.5)",
        }}
      >
        <span>└─ type "escape" to return to surface ─┘</span>
        <span className="hidden sm:inline">
          TCP/IP ● ENCRYPTED │ TLS 1.3 │ AES-256-GCM
        </span>
        <span style={{ color: "rgba(0, 255, 65, 0.9)" }}>
          ● SIMULATION ACTIVE
        </span>
      </motion.div>

      {/* ── LEFT EDGE ── */}
      <div
        className="absolute top-6 left-0 bottom-6 w-px"
        style={{ background: "rgba(0, 255, 65, 0.08)" }}
      />

      {/* ── RIGHT EDGE ── */}
      <div
        className="absolute top-6 right-0 bottom-6 w-px"
        style={{ background: "rgba(0, 255, 65, 0.08)" }}
      />

      {/* ── CORNER BRACKETS ── */}
      {/* Top-left */}
      <div
        className="absolute top-6 left-0 w-4 h-4 border-l border-t"
        style={{ borderColor: "rgba(0, 255, 65, 0.25)" }}
      />
      {/* Top-right */}
      <div
        className="absolute top-6 right-0 w-4 h-4 border-r border-t"
        style={{ borderColor: "rgba(0, 255, 65, 0.25)" }}
      />
      {/* Bottom-left */}
      <div
        className="absolute bottom-6 left-0 w-4 h-4 border-l border-b"
        style={{ borderColor: "rgba(0, 255, 65, 0.25)" }}
      />
      {/* Bottom-right */}
      <div
        className="absolute bottom-6 right-0 w-4 h-4 border-r border-b"
        style={{ borderColor: "rgba(0, 255, 65, 0.25)" }}
      />

      {/* ── SCANLINE OVERLAY ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.015) 2px, rgba(0,255,65,0.015) 4px)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
