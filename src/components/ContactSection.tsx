import { motion } from "framer-motion";
import { SectionHeader } from "./AboutSection";

const contacts = [
  { label: "EMAIL", value: "namansoni272003@gmail.com", href: "mailto:namansoni272003@gmail.com" },
  { label: "GITHUB", value: "github.com/naman293", href: "https://github.com/naman293" },
  { label: "LINKEDIN", value: "linkedin.com/in/naman-soni-828158262", href: "https://www.linkedin.com/in/naman-soni-828158262/" },
  { label: "PHONE", value: "+91-7597562205", href: "tel:+917597562205" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="06" title="ESTABLISH CONTACT" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="dossier-panel p-6 md:p-8 mt-10 max-w-2xl"
        >
          <div className="terminal-label mb-6">SECURE CHANNELS</div>

          <div className="space-y-4">
            {contacts.map((contact) => (
              <div key={contact.label} className="flex items-baseline gap-4 group">
                <span className="font-mono text-[10px] text-label tracking-wider w-20 shrink-0">
                  {contact.label}
                </span>
                <a
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-foreground/80 hover:text-crimson transition-colors break-all"
                >
                  {contact.value}
                </a>
              </div>
            ))}
          </div>

          <div className="data-strip mt-8" />

          <p className="font-mono text-[10px] text-label tracking-wider mt-4">
            PREFERRED METHOD: EMAIL // RESPONSE TIME: &lt;24H
          </p>
        </motion.div>
      </div>
    </section>
  );
}
