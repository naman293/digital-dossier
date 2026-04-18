import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import TelemetryStrip from "@/components/TelemetryStrip";
import BootSequence from "@/components/BootSequence";
import ResumeCompiler from "@/components/ResumeCompiler";
import DossierInvaders from "@/components/DossierInvaders";
import GridBackground from "@/components/GridBackground";
import ScrollProgress from "@/components/ScrollProgress";
import NoiseToggle from "@/components/NoiseToggle";
import CustomCursor from "@/components/CustomCursor";
import CommandPalette from "@/components/CommandPalette";
import BackToTop from "@/components/BackToTop";
import { soundEngine } from "@/lib/audio";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { useMultiSequenceCode } from "@/hooks/useSequenceCode";
import MatrixRain from "@/components/MatrixRain";
import MatrixFragment from "@/components/MatrixFragment";
import MatrixHUD from "@/components/MatrixHUD";

export const Route = createFileRoute("/")(
  {
    component: Index,
    head: () => ({
      meta: [
        { title: "Naman Soni — Backend / Full-Stack Developer" },
        {
          name: "description",
          content:
            "Final-year software engineer building scalable systems. Backend architecture, frontend craft, and AI-assisted engineering.",
        },
        { property: "og:title", content: "Naman Soni — Developer Dossier" },
        {
          property: "og:description",
          content: "Backend / Full-Stack Developer. Systems-first mindset.",
        },
      ],
    }),
  }
);

function Index() {
  const [booting, setBooting] = useState(true);
  const [compilerOpen, setCompilerOpen] = useState(false);
  const [showMinigame, setShowMinigame] = useState(false);
  const [isHackerElite, setIsHackerElite] = useState(false);
  const [heavyNoise, setHeavyNoise] = useState(false);
  const [backgroundMode, setBackgroundMode] = useState<"grid" | "matrix">("grid");
  const isMatrixMode = backgroundMode === "matrix";
  const { success: konamiSuccess, reset: resetKonami } = useKonamiCode();

  // Watch for Konami trigger
  useEffect(() => {
    if (konamiSuccess) {
      setShowMinigame(true);
      resetKonami(); // Reset so it can be entered again later
    }
  }, [konamiSuccess, resetKonami]);

  // Prevent scrolling while major overlays are active
  useEffect(() => {
    if (booting || showMinigame || compilerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [booting, showMinigame, compilerOpen]);

  // Global typing sound listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't play if they hold down the key endlessly to avoid audio explosion
      if (e.repeat) return;
      // We don't play for modifier keys alone to prevent weird phantom clicks when just holding Shift
      if (["Shift", "Control", "Alt", "Meta", "CapsLock"].includes(e.key)) return;
      
      soundEngine.playTypingKeystroke();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Matrix Reality Triggers
  useMultiSequenceCode({
    "reality": () => {
      setBackgroundMode("matrix");
      soundEngine.playClick();
    },
    "escape": () => {
      setBackgroundMode("grid");
      soundEngine.playClick();
    }
  });

  // Global trigger for resume compile
  useEffect(() => {
    const handleTrigger = () => setCompilerOpen(true);
    window.addEventListener("trigger-resume", handleTrigger);
    return () => window.removeEventListener("trigger-resume", handleTrigger);
  }, []);

  return (
    <div 
      className={`relative lg:cursor-none ${heavyNoise ? 'heavy-noise-mode' : ''}`}
      data-matrix-mode={isMatrixMode}
    >
      <CustomCursor />
      
      <AnimatePresence>
        {booting && <BootSequence onComplete={() => setBooting(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {compilerOpen && <ResumeCompiler onComplete={() => setCompilerOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {showMinigame && (
          <DossierInvaders 
            onClose={() => setShowMinigame(false)}
            onWin={() => setIsHackerElite(true)}
          />
        )}
      </AnimatePresence>
      
      <CommandPalette />
      <BackToTop />
      
      {backgroundMode === "grid" ? <GridBackground /> : <MatrixRain />}
      {isMatrixMode && <MatrixHUD />}
      
      {heavyNoise && (
        <>
          <div className="scanline-overlay pointer-events-none" />
          <div className="grain-overlay pointer-events-none" style={{ opacity: 0.8 }} />
        </>
      )}

      <NoiseToggle enabled={heavyNoise} onToggle={() => setHeavyNoise(!heavyNoise)} />
      <ScrollProgress />

      <Navigation isMatrixMode={isMatrixMode} />
      
      <HeroSection isHackerElite={isHackerElite} isMatrixMode={isMatrixMode} />

      <TelemetryStrip variant="wave" isMatrixMode={isMatrixMode} />

      <AboutSection isMatrixMode={isMatrixMode} />

      <TelemetryStrip variant="pulse" isMatrixMode={isMatrixMode} />

      <ProjectsSection isMatrixMode={isMatrixMode} />

      <TelemetryStrip variant="scan" isMatrixMode={isMatrixMode} />

      <SkillsSection isMatrixMode={isMatrixMode} />

      <TelemetryStrip variant="wave" isMatrixMode={isMatrixMode} />

      <ExperienceSection isMatrixMode={isMatrixMode} />

      <TelemetryStrip variant="pulse" isMatrixMode={isMatrixMode} />

      <ContactSection isMatrixMode={isMatrixMode} />

      <Footer isMatrixMode={isMatrixMode} />
    </div>
  );
}
