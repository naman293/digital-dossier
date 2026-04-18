import { motion } from "framer-motion";
import { soundEngine } from "@/lib/audio";
import portrait from "@/assets/portrait.png";
import MatrixScrambleText from "./MatrixScrambleText";
import MatrixFragment from "./MatrixFragment";

const metadata = [
  { label: "DESIGNATION", value: "Backend / Full-Stack Developer" },
  { label: "LOCATION", value: "Jaipur, Rajasthan, India" },
  { label: "INSTITUTION", value: "LNMIIT — B.Tech '26" },
  { label: "CLEARANCE", value: "Open to Full-Time Roles" },
];

/* ── Matrix-mode Hero: Terminal login / SSH splash ── */
function MatrixHero({ isHackerElite }: { isHackerElite: boolean }) {
  const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);

  return (
    <section className="min-h-screen relative flex items-center justify-center px-6 pt-20 pb-16 overflow-hidden">
      <div className="relative max-w-4xl w-full mx-auto font-mono">
        {/* SSH-style login banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-1 text-xs mb-8"
          style={{ color: "rgba(0, 255, 65, 0.5)" }}
        >
          <div>Last login: {timestamp} on ttys001</div>
          <div>Connection to 192.168.1.293 established.</div>
          <div>Authorized access only. All activity is logged.</div>
        </motion.div>

        {/* ASCII art name */}
        <motion.pre
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[8px] sm:text-[10px] md:text-xs leading-tight mb-6 select-none"
          style={{ color: "#00ff41", textShadow: "0 0 8px rgba(0,255,65,0.3)" }}
        >
{`
 ███╗   ██╗ █████╗ ███╗   ███╗ █████╗ ███╗   ██╗
 ████╗  ██║██╔══██╗████╗ ████║██╔══██╗████╗  ██║
 ██╔██╗ ██║███████║██╔████╔██║███████║██╔██╗ ██║
 ██║╚██╗██║██╔══██║██║╚██╔╝██║██╔══██║██║╚██╗██║
 ██║ ╚████║██║  ██║██║ ╚═╝ ██║██║  ██║██║ ╚████║
 ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝`}
        </motion.pre>

        {/* Subtitle as code comment */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs mb-8 leading-relaxed"
          style={{ color: "rgba(0, 255, 65, 0.6)" }}
        >
          <div>{"/**"}</div>
          <div>{" * @author  Naman Soni"}</div>
          <div>{" * @role    Backend / Full-Stack Developer"}</div>
          <div>{" * @status  Seeking full-time opportunities"}</div>
          <div>{" * @desc    Final-year engineer building scalable, real-world systems."}</div>
          <div>{" *          Strong in backend architecture, frontend craft, and"}</div>
          <div>{" *          AI-assisted engineering. Systems-first mindset."}</div>
          <div>{" */"}</div>
        </motion.div>

        {/* System info — like neofetch */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 mb-8"
        >
          {/* Left: portrait with green filter */}
          <MatrixFragment isMatrixMode={true}>
            <div
              className="portrait-frame relative overflow-hidden"
              style={{ height: "320px", border: "1px solid rgba(0,255,65,0.15)" }}
            >
              <img
                src={portrait}
                alt="naman_soni.jpg"
                className="w-full h-full object-cover object-center block"
                style={{
                  filter: "grayscale(100%) brightness(0.7) contrast(1.3) sepia(100%) hue-rotate(90deg) saturate(5)",
                }}
              />
              {/* scanlines on portrait */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
                }}
              />
              <div
                className="absolute bottom-1 left-2 font-mono text-[8px]"
                style={{ color: "rgba(0,255,65,0.4)" }}
              >
                // render.subject(0x293)
              </div>
            </div>
          </MatrixFragment>

          {/* Right: neofetch-style sys info */}
          <div className="text-xs space-y-1.5" style={{ color: "rgba(0,255,65,0.7)" }}>
            <div><span style={{ color: "#00ff41" }}>naman@reality</span><span style={{ color: "rgba(0,255,65,0.4)" }}>:~$</span> neofetch</div>
            <div className="mt-2" style={{ color: "rgba(0,255,65,0.35)" }}>────────────────────────</div>
            {[
              ["OS", "Human v22.0 (Jaipur/IN)"],
              ["Host", "LNMIIT — Mech → SWE"],
              ["Kernel", "Backend-First Architecture"],
              ["Uptime", "22 years, 3 months"],
              ["Shell", "TypeScript / Node.js"],
              ["Terminal", "VS Code + Neovim"],
              ["CPU", "Problem Solving @ 3.2GHz"],
              ["Memory", "Always Learning / 99%"],
              ["GPU", "React + Next.js Renderer"],
              ["Disk", "4+ Production Projects"],
            ].map(([key, val]) => (
              <MatrixFragment key={key} isMatrixMode={true}>
                <div className="flex gap-3">
                  <span style={{ color: "#00ff41", minWidth: "100px" }}>{key}</span>
                  <span style={{ color: "rgba(0,255,65,0.6)" }}>{val}</span>
                </div>
              </MatrixFragment>
            ))}

            {isHackerElite && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 text-[10px]"
                style={{ color: "#00ff41", textShadow: "0 0 10px rgba(0,255,65,0.5)" }}
              >
                ★ CLEARANCE: HACKER_ELITE — Konami verified
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Terminal prompt CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="space-y-2 text-xs"
        >
          <div style={{ color: "rgba(0,255,65,0.4)" }}>
            {">"} Available commands:
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              onClick={() => soundEngine.playClick()}
              onMouseEnter={() => soundEngine.playHover()}
              className="font-mono text-[10px] tracking-wider px-4 py-2 transition-all"
              style={{
                color: "#00ff41",
                border: "1px solid rgba(0,255,65,0.25)",
                background: "rgba(0,255,65,0.05)",
              }}
            >
              $ ls ./projects
            </a>
            <button
              onClick={() => {
                soundEngine.playClick();
                window.dispatchEvent(new CustomEvent("trigger-resume"));
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className="font-mono text-[10px] tracking-wider px-4 py-2 transition-all cursor-pointer"
              style={{
                color: "#00ff41",
                border: "1px solid rgba(0,255,65,0.25)",
                background: "rgba(0,255,65,0.05)",
              }}
            >
              $ cat resume.pdf
            </button>
            <a
              href="#contact"
              onClick={() => soundEngine.playClick()}
              onMouseEnter={() => soundEngine.playHover()}
              className="font-mono text-[10px] tracking-wider px-4 py-2 transition-all"
              style={{
                color: "rgba(0,255,65,0.6)",
                border: "1px solid rgba(0,255,65,0.12)",
              }}
            >
              $ ssh contact@naman
            </a>
          </div>
        </motion.div>

        {/* Status badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-wrap gap-2 mt-6 text-[9px]"
          style={{ color: "rgba(0,255,65,0.45)" }}
        >
          <span>● pid:293 ACTIVE</span>
          <span>│</span>
          <span>● OPEN_TO_WORK</span>
          <span>│</span>
          <span>● BUILDING_PRODUCTION_SYSTEMS</span>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Normal Dossier Hero (unchanged) ── */
function DossierHero({ isHackerElite }: { isHackerElite: boolean }) {
  return (
    <section className="min-h-screen relative flex items-center justify-center px-6 pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative max-w-6xl w-full mx-auto">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="data-strip mb-8 origin-left"
        />

        <div className="grid md:grid-cols-[1fr_360px] gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="terminal-label mb-4 flex items-center gap-2"
            >
              <span className="node-dot status-pulse inline-block" />
              SUBJECT FILE — ACTIVE
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="font-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-2"
            >
              NAMAN <span className="text-crimson text-glow">SONI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="font-mono text-sm text-muted-foreground max-w-lg mb-8 leading-relaxed"
            >
              Final-year software engineer building scalable, real-world systems.
              Strong in backend architecture, frontend craft, and AI-assisted engineering.
              Systems-first mindset. Long-term thinker.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="dossier-panel p-4 mb-8 max-w-md"
            >
              <div className="terminal-label mb-3">IDENTITY METADATA</div>
              <div className="space-y-2">
                {metadata.map((item) => (
                  <div key={item.label} className="flex items-baseline gap-3 text-xs font-mono">
                    <span className="text-label w-28 shrink-0 tracking-wider">{item.label}</span>
                    <span className="text-foreground/80">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3"
            >
              <a
                href="#projects"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => soundEngine.playClick()}
                className="font-mono text-xs font-semibold tracking-widest border border-crimson text-crimson px-6 py-3 hover:bg-crimson hover:text-background transition-colors text-center"
              >
                VIEW DEPLOYMENTS
              </a>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  soundEngine.playClick();
                  window.dispatchEvent(new CustomEvent("trigger-resume"));
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className="group relative inline-flex items-center justify-center gap-3 border border-border px-6 py-3 font-mono text-xs font-semibold tracking-widest text-foreground transition-all hover:border-crimson hover:text-crimson"
              >
                RESUME
              </button>
              <a
                href="#contact"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => soundEngine.playClick()}
                className="font-mono text-xs tracking-wider border border-border text-muted-foreground px-5 py-2.5 hover:border-crimson-dim hover:text-foreground transition-colors text-center"
              >
                CONTACT
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex flex-wrap gap-2 mt-6"
            >
              {isHackerElite && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-mono text-[9px] font-bold tracking-widest text-white border border-white px-2 py-1 bg-white/10 shadow-[0_0_10px_white]"
                >
                  [ ★ HACKER ELITE ]
                </motion.span>
              )}
              {["AVAILABLE FOR OPPORTUNITIES", "BUILDING PRODUCTION SYSTEMS"].map((badge) => (
                <span
                  key={badge}
                  className="font-mono text-[9px] tracking-wider text-crimson-dim border border-crimson-dim/30 px-2 py-1 bg-crimson/5 block"
                >
                  ● {badge}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right portrait */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hidden md:flex flex-col"
          >
            <div
              className="portrait-frame relative overflow-hidden"
              style={{ height: "520px" }}
            >
              <img
                src={portrait}
                alt="Naman Soni — Portrait"
                className="w-full h-full object-cover object-center block"
                style={{
                  filter: "grayscale(70%) contrast(1.08) brightness(1.06) sepia(12%)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 30%, transparent 50%, oklch(0.50 0.18 18 / 10%) 100%)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, oklch(0.13 0.005 260 / 70%), transparent)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none scanline-overlay"
                style={{ opacity: 0.04 }}
              />
            </div>

            <div className="flex items-center justify-between mt-3 px-1">
              <div>
                <div className="terminal-label">SBJ-0293 // NAMAN.SONI</div>
                <div className="font-mono text-[8px] tracking-widest mt-0.5" style={{ color: "oklch(0.45 0.01 260)" }}>
                  IMG.PROC: CLASSIFIED
                </div>
              </div>
              <span
                className="font-mono text-[9px] tracking-wider border px-2 py-0.5"
                style={{
                  color: "oklch(0.50 0.18 18)",
                  borderColor: "oklch(0.50 0.18 18 / 30%)",
                  background: "oklch(0.50 0.18 18 / 5%)",
                }}
              >
                ● ACTIVE
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="data-strip mt-10 origin-right"
        />
      </div>
    </section>
  );
}

/* ── Exported component: switches layout based on mode ── */
export default function HeroSection({
  isHackerElite = false,
  isMatrixMode = false,
}: {
  isHackerElite?: boolean;
  isMatrixMode?: boolean;
}) {
  if (isMatrixMode) {
    return <MatrixHero isHackerElite={isHackerElite} />;
  }
  return <DossierHero isHackerElite={isHackerElite} />;
}
