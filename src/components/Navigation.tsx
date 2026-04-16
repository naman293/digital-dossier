import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="font-mono text-xs font-semibold tracking-widest text-crimson">
          NS://DOSSIER
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground hover:text-crimson transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/resume"
            className="font-mono text-[10px] tracking-[0.2em] border border-crimson-dim text-crimson px-3 py-1.5 hover:bg-crimson/10 transition-colors"
          >
            RESUME
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
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
              onClick={() => setMobileOpen(false)}
              className="block py-2 font-mono text-xs tracking-[0.2em] text-muted-foreground hover:text-crimson transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/resume"
            onClick={() => setMobileOpen(false)}
            className="block py-2 font-mono text-xs tracking-[0.2em] text-crimson"
          >
            RESUME ↗
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
