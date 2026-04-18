import { soundEngine } from "@/lib/audio";

/* ── Matrix Footer: htop-style process bar ── */
function MatrixFooter() {
  return (
    <footer
      className="pt-6 pb-20 px-6 font-mono text-[10px]"
      style={{ borderTop: "1px solid rgba(0,255,65,0.08)" }}
    >
      <div className="max-w-4xl mx-auto space-y-3">
        {/* Process table */}
        <div style={{ color: "rgba(0,255,65,0.3)" }}>
          <div className="flex justify-between flex-wrap gap-2">
            <span>PID 293 │ naman_soni.exe │ STATUS: RUNNING</span>
            <span>MEM: 42% │ CPU: 3.2GHz │ THREADS: ∞</span>
          </div>
        </div>

        {/* Links as kill commands */}
        <div className="flex flex-wrap gap-4" style={{ color: "rgba(0,255,65,0.4)" }}>
          {[
            { label: "$ open github", href: "https://github.com/naman293" },
            { label: "$ open linkedin", href: "https://www.linkedin.com/in/naman-soni-828158262/" },
            { label: "$ mail naman", href: "mailto:namansoni272003@gmail.com" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => soundEngine.playClick()}
              className="transition-all hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Exit message */}
        <div style={{ color: "rgba(0,255,65,0.2)" }}>
          © {new Date().getFullYear()} — SIMULATION.RENDER.COMPLETE │ type "escape" to exit
        </div>
      </div>
    </footer>
  );
}

/* ── Normal Dossier Footer (unchanged) ── */
function DossierFooter() {
  return (
    <footer className="border-t border-border pt-8 pb-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-[10px] text-label tracking-wider">
          NS://DOSSIER — © {new Date().getFullYear()} NAMAN SONI
        </div>

        <div className="flex items-center gap-4">
          {[
            { label: "GITHUB", href: "https://github.com/naman293" },
            { label: "LINKEDIN", href: "https://www.linkedin.com/in/naman-soni-828158262/" },
            { label: "EMAIL", href: "mailto:namansoni272003@gmail.com" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[9px] tracking-[0.2em] text-label hover:text-crimson transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="font-mono text-[9px] text-label/50 tracking-wider">
          SYS.BUILD.2026.04 // ALL SYSTEMS NOMINAL
        </div>
      </div>
    </footer>
  );
}

export default function Footer({ isMatrixMode = false }: { isMatrixMode?: boolean }) {
  if (isMatrixMode) return <MatrixFooter />;
  return <DossierFooter />;
}
