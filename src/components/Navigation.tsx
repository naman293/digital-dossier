import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { soundEngine } from "@/lib/audio";

const navLinks = [
  { label: "ABOUT", href: "#about", id: "about" },
  { label: "PROJECTS", href: "#projects", id: "projects" },
  { label: "SKILLS", href: "#skills", id: "skills" },
  { label: "EXPERIENCE", href: "#experience", id: "experience" },
  { label: "CONTACT", href: "#contact", id: "contact" },
];

export default function Navigation({ isMatrixMode = false }: { isMatrixMode?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : ""
      } ${isMatrixMode ? "matrix-nav" : ""}`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="font-mono text-xs font-semibold tracking-widest text-crimson">
          NS://DOSSIER
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative font-mono text-[10px] tracking-[0.2em] transition-colors ${
                  isActive
                    ? "text-crimson"
                    : "text-muted-foreground hover:text-crimson"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-crimson"
                  />
                )}
              </a>
            );
          })}
          <button
            onClick={(e) => {
              e.preventDefault();
              soundEngine.playClick();
              window.dispatchEvent(new CustomEvent("trigger-resume"));
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="font-mono text-[10px] tracking-[0.2em] border border-crimson-dim text-crimson px-3 py-1.5 hover:bg-crimson/10 transition-colors cursor-pointer"
          >
            RESUME
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => {
            soundEngine.playClick();
            setMobileOpen(!mobileOpen);
          }}
          onMouseEnter={() => soundEngine.playHover()}
          className="md:hidden font-mono text-[10px] tracking-[0.2em] text-muted-foreground"
        >
          {mobileOpen ? "[CLOSE]" : "[MENU]"}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-md border-b border-border px-6 pb-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => soundEngine.playHover()}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`block py-2 font-mono text-xs tracking-[0.2em] transition-colors ${
                activeSection === link.id
                  ? "text-crimson"
                  : "text-muted-foreground hover:text-crimson"
              }`}
            >
              {activeSection === link.id ? "▸ " : ""}{link.label}
            </a>
          ))}
          <button
            onMouseEnter={() => soundEngine.playHover()}
            onClick={(e) => {
              e.preventDefault();
              soundEngine.playClick();
              setMobileOpen(false);
              window.dispatchEvent(new CustomEvent("trigger-resume"));
            }}
            className="block w-full text-left py-2 font-mono text-xs tracking-[0.2em] text-crimson cursor-pointer"
          >
            RESUME
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}
