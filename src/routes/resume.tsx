import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/resume")({
  component: ResumePage,
  head: () => ({
    meta: [
      { title: "Resume — Naman Soni" },
      { name: "description", content: "Naman Soni's resume — Backend / Full-Stack Developer" },
      { property: "og:title", content: "Resume — Naman Soni" },
      { property: "og:description", content: "Backend / Full-Stack Developer resume and qualifications." },
    ],
  }),
});

const resumeData = {
  summary:
    "Final-year engineering student focused on backend systems, APIs, and scalable application design. Skilled in building structured systems with clean architecture, handling state, and solving real-world problems with performance and reliability in mind.",
  education: {
    degree: "B.Tech — Mechanical Engineering",
    institution: "The LNM Institute of Information Technology, Rajasthan",
    period: "Oct 2022 — June 2026",
  },
  skills: {
    Languages: "C++, JavaScript, TypeScript, SQL, Java, C, HTML, CSS",
    Backend: "Node.js, Express, NestJS, REST APIs, JWT, OAuth",
    Frontend: "React, Next.js, Tailwind CSS",
    Databases: "PostgreSQL, MongoDB",
    Tools: "Git, GitHub, Docker, Linux, VS Code, Figma",
    "Core Concepts": "DBMS, Operating Systems, Computer Networks, DSA",
  },
  projects: [
    {
      name: "Life-OS",
      description:
        "Life operating system dashboard for habit tracking and self-assessment across days, weeks, and months.",
      stack: "TypeScript, React, Next.js",
    },
    {
      name: "Poker App",
      description:
        "Complete poker game engine with multiplayer chat, emoji sharing, betting rounds, and winner determination.",
      stack: "TypeScript, Node.js",
    },
    {
      name: "Voting System",
      description:
        "Secure backend voting system enforcing one-user-one-vote with user authentication and result aggregation.",
      stack: "TypeScript, Node.js, REST API",
    },
    {
      name: "Dark-Knight Agency",
      description:
        "3D animated pricing display for an AI agency with immersive visual design.",
      stack: "HTML, CSS, JavaScript, 3D Animation",
    },
  ],
  experience: [
    {
      title: "Art Club Coordinator & Mentor",
      org: "LNMIIT",
      period: "2023 — 2025",
      details: [
        "Managed events with 200+ participants",
        "Cross-team collaboration and real-time issue resolution",
        "Mentored junior members in planning and execution",
      ],
    },
  ],
};

function ResumePage() {
  return (
    <div className="relative min-h-screen">
      <div className="scanline-overlay" />

      {/* Nav bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="font-mono text-xs tracking-widest text-crimson hover:text-crimson-glow transition-colors">
            ← NS://DOSSIER
          </Link>
          <a
            href="/resume/Naman_Soni_Resume.pdf"
            download
            className="font-mono text-[10px] tracking-[0.2em] border border-crimson-dim text-crimson px-3 py-1.5 hover:bg-crimson/10 transition-colors"
          >
            DOWNLOAD PDF
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="dossier-panel p-6 mb-6">
            <div className="terminal-label mb-3">CLASSIFIED DOCUMENT // RESUME</div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-1">NAMAN SONI</h1>
            <p className="font-mono text-sm text-crimson tracking-wide">Backend / Full-Stack Developer</p>
            <div className="flex flex-wrap gap-4 mt-3 font-mono text-[10px] text-label tracking-wider">
              <span>namansoni272003@gmail.com</span>
              <span>+91-7597562205</span>
              <span>github.com/naman293</span>
            </div>
          </div>

          {/* Summary */}
          <ResumeSection label="PROFESSIONAL SUMMARY">
            <p className="font-body text-sm text-foreground/80 leading-relaxed">{resumeData.summary}</p>
          </ResumeSection>

          {/* Education */}
          <ResumeSection label="EDUCATION">
            <div className="flex items-baseline justify-between flex-wrap gap-2 mb-1">
              <h3 className="font-display text-sm font-semibold text-foreground">{resumeData.education.degree}</h3>
              <span className="font-mono text-[10px] text-crimson-dim tracking-wider">{resumeData.education.period}</span>
            </div>
            <p className="font-mono text-xs text-label">{resumeData.education.institution}</p>
          </ResumeSection>

          {/* Skills */}
          <ResumeSection label="TECHNICAL SKILLS">
            <div className="space-y-2">
              {Object.entries(resumeData.skills).map(([cat, val]) => (
                <div key={cat} className="flex items-baseline gap-3 text-xs font-mono">
                  <span className="text-label w-28 shrink-0 tracking-wider">{cat.toUpperCase()}</span>
                  <span className="text-foreground/80">{val}</span>
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* Projects */}
          <ResumeSection label="PROJECTS">
            <div className="space-y-4">
              {resumeData.projects.map((proj) => (
                <div key={proj.name} className="border-l-2 border-crimson-dim/30 pl-4">
                  <h3 className="font-display text-sm font-semibold text-foreground">{proj.name}</h3>
                  <p className="font-body text-xs text-muted-foreground mt-0.5 leading-relaxed">{proj.description}</p>
                  <p className="font-mono text-[10px] text-label mt-1 tracking-wider">STACK: {proj.stack}</p>
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* Experience */}
          <ResumeSection label="LEADERSHIP EXPERIENCE">
            {resumeData.experience.map((exp) => (
              <div key={exp.title}>
                <div className="flex items-baseline justify-between flex-wrap gap-2 mb-1">
                  <h3 className="font-display text-sm font-semibold text-foreground">{exp.title}</h3>
                  <span className="font-mono text-[10px] text-crimson-dim tracking-wider">{exp.period}</span>
                </div>
                <p className="font-mono text-xs text-label mb-2">{exp.org}</p>
                <ul className="space-y-1">
                  {exp.details.map((d, i) => (
                    <li key={i} className="font-body text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-crimson-dim mt-1 shrink-0">▸</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ResumeSection>
        </motion.div>
      </div>
    </div>
  );
}

function ResumeSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="dossier-panel p-5 mb-4">
      <div className="terminal-label mb-3 flex items-center gap-2">
        <span className="node-dot inline-block" />
        {label}
      </div>
      {children}
    </div>
  );
}
