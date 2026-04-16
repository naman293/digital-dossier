export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
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
