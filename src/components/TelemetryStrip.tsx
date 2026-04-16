import { motion } from "framer-motion";

interface TelemetryStripProps {
  variant?: "wave" | "pulse" | "scan";
  className?: string;
}

export default function TelemetryStrip({
  variant = "wave",
  className = "",
}: TelemetryStripProps) {
  // viewBox is "0 0 1280 40" — ALL y values kept strictly between 8 and 32
  // so peaks never escape the container and bleed into sections.
  const wavePath =
    "M0,20 C20,10 40,30 60,20 C80,10 100,30 120,20 C140,10 160,30 180,20 C200,10 220,30 240,20 C260,10 280,30 300,20 C320,10 340,30 360,20 C380,10 400,30 420,20 C440,10 460,30 480,20 C500,10 520,30 540,20 C560,10 580,30 600,20 C620,10 640,30 660,20 C680,10 700,30 720,20 C740,10 760,30 780,20 C800,10 820,30 840,20 C860,10 880,30 900,20 C920,10 940,30 960,20 C980,10 1000,30 1020,20 C1040,10 1060,30 1080,20 C1100,10 1120,30 1140,20 C1160,10 1180,30 1200,20 C1220,10 1250,30 1280,20";

  const pulsePath =
    "M0,20 L100,20 L110,10 L118,30 L126,20 L240,20 L250,12 L258,28 L266,20 L380,20 L388,9 L398,31 L408,20 L520,20 L528,11 L538,29 L548,20 L660,20 L670,10 L680,30 L690,20 L800,20 L812,9 L824,31 L836,20 L960,20 L968,12 L978,28 L988,20 L1100,20 L1110,10 L1120,30 L1130,20 L1280,20";

  const scanPath =
    "M0,20 L60,20 L65,14 L70,26 L75,20 L180,20 L185,11 L195,29 L205,20 L320,20 L322,18 L326,22 L330,20 L440,20 L445,12 L455,28 L465,20 L580,20 L586,10 L596,30 L606,20 L720,20 L722,18 L726,22 L730,20 L840,20 L848,11 L858,29 L868,20 L980,20 L982,18 L986,22 L990,20 L1100,20 L1108,12 L1118,28 L1128,20 L1280,20";

  const paths = { wave: wavePath, pulse: pulsePath, scan: scanPath };
  const selectedPath = paths[variant];

  // Unique IDs per instance — prevents SVG gradient/filter id collisions
  // when multiple strips render on the same page.
  const uid = `${variant}-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <div
      className={`relative w-full ${className}`}
      style={{
        height: "48px",
        // Solid background — same as page bg — creates a hard boundary
        // so adjacent section content never shows through
        background: "oklch(0.13 0.005 260)",
        borderTop: "1px solid oklch(0.25 0.005 260)",
        borderBottom: "1px solid oklch(0.25 0.005 260)",
        // overflow hidden ensures glow blur can't escape vertically
        overflow: "hidden",
      }}
    >
      {/* Subtle depth gradient inside the strip */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.11 0.004 260) 0%, oklch(0.15 0.004 260) 50%, oklch(0.11 0.004 260) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* SVG telemetry line — fills the strip exactly, no offset */}
      <motion.svg
        width="100%"
        height="48"
        // viewBox tightly wraps y=8..32, giving 4px safety margin top & bottom
        viewBox="0 0 1280 40"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <defs>
          {/* Horizontal gradient: fades at both ends so it blends into page */}
          <linearGradient id={`tgr-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="oklch(0.50 0.18 18)" stopOpacity="0" />
            <stop offset="10%"  stopColor="oklch(0.50 0.18 18)" stopOpacity="0.55" />
            <stop offset="50%"  stopColor="oklch(0.55 0.22 18)" stopOpacity="1" />
            <stop offset="90%"  stopColor="oklch(0.50 0.18 18)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="oklch(0.50 0.18 18)" stopOpacity="0" />
          </linearGradient>

          {/* Glow filter — clamped vertically so it can't paint outside the SVG */}
          <filter id={`tgl-${uid}`} x="0%" y="0%" width="100%" height="100%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background glow pass — thick, soft, low opacity */}
        <path
          d={selectedPath}
          fill="none"
          stroke={`url(#tgr-${uid})`}
          strokeWidth="5"
          filter={`url(#tgl-${uid})`}
          opacity="0.25"
        />

        {/* Foreground sharp animated line */}
        <motion.path
          d={selectedPath}
          fill="none"
          stroke={`url(#tgr-${uid})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </motion.svg>

      {/* Left label */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-10 pointer-events-none">
        <span
          className="node-dot"
          style={{ opacity: 0.4, background: "oklch(0.50 0.18 18)" }}
        />
        <span
          className="terminal-label"
          style={{ opacity: 0.3, fontSize: "0.55rem" }}
        >
          SYS.TELEMETRY
        </span>
      </div>

      {/* Right label */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-10 pointer-events-none">
        <span
          className="terminal-label"
          style={{ opacity: 0.3, fontSize: "0.55rem" }}
        >
          NOMINAL
        </span>
        <span
          className="node-dot status-pulse"
          style={{ opacity: 0.5, background: "oklch(0.50 0.18 18)" }}
        />
      </div>
    </div>
  );
}
