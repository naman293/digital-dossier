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
    "Results-driven Software Development Engineer (SDE) with 2+ years of contract experience building scalable, production-grade REST APIs, real-time WebSocket systems, and AI-driven automation pipelines. Delivered 5–10 client engagements using object-oriented design principles, Agile/Scrum workflows, and event-driven microservices architecture. Skilled in system design, data structures, and CI/CD-aligned delivery; currently extending a distributed chat platform with Redis pub/sub and Apache Kafka for horizontal scalability and fault-tolerant message processing.",
  education: {
    degree: "B.Tech — Mechanical Engineering",
    institution: "LNM Institute of Information Technology (LNMIIT), Jaipur, Rajasthan",
    period: "Expected June 2026",
  },
  skills: [
    { category: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "C++", "SQL"] },
    { category: "Backend", items: ["Node.js", "Express.js", "NestJS", "REST APIs", "WebSocket (Socket.io)", "JWT", "PASETO", "Microservices"] },
    { category: "Databases", items: ["MongoDB", "PostgreSQL", "Redis (caching & pub/sub)", "VectorDB (planned)"] },
    { category: "AI & Automation", items: ["n8n", "Zapier", "OpenAI API", "NVIDIA AI APIs", "Prompt Engineering", "LLM Agents"] },
    { category: "DevOps & Tools", items: ["Docker", "Git", "GitHub", "Apache Kafka", "Postman", "CI/CD Pipelines"] },
    { category: "Concepts", items: ["DBMS", "OOPs", "System Design (HLD)", "RESTful API Design", "DSA"] },
  ],
  projects: [
    {
      name: "Chatify",
      subtitle: "Scalable Real-Time Chat Platform",
      github: "https://github.com/naman293/Chatify",
      stack: ["Socket.io", "Redis", "Apache Kafka", "PostgreSQL", "Node.js"],
      details: [
        "Engineered a WebSocket-based chat system using Node.js and Socket.io supporting 100–500 concurrent users with sub-100ms message delivery latency; applied system design principles for horizontal scalability.",
        "Designed normalized PostgreSQL schema managing users, conversation threads, and session state, ensuring consistency between real-time events and persistent storage with performance-optimized queries.",
        "Integrating Redis pub/sub for horizontal WebSocket scaling across multiple server instances, eliminating single-node bottlenecks and enabling stateless horizontal scaling of real-time message broadcasting.",
        "Implementing Apache Kafka as a fault-tolerant event queue, decoupling message producers from consumers to guarantee reliable delivery and support high-throughput burst-traffic scenarios.",
      ],
    },
    {
      name: "AI Job Search Automation",
      subtitle: "AI-Powered End-to-End Hiring Pipeline",
      github: null,
      stack: ["n8n", "NVIDIA AI APIs", "MongoDB", "Node.js", "SMTP"],
      details: [
        "Built an end-to-end 4-stage automated pipeline (scrape listings → LLM relevance scoring → generate tailored PDF/DOCX resume & cover letter → SMTP delivery), reducing per-application manual effort to near zero.",
        "Designed MongoDB schema optimized for fast document retrieval and n8n workflow state management; architected modular pipeline nodes for future VectorDB semantic job-to-profile matching integration.",
        "Orchestrated multi-step LLM agent workflows using NVIDIA AI APIs and n8n, coordinating scraping, scoring, document generation, and automated email delivery as a single observable, debuggable pipeline.",
      ],
    },
  ],
  experience: [
    {
      title: "Software Engineer",
      type: "Contract & Freelance",
      org: "Independent Contractor — Remote",
      meta: "5–10 Client Engagements · E-commerce, SaaS, Services",
      period: "2023 — 2025",
      link: "https://dk-agency.netlify.app/",
      details: [
        "Architected and deployed 5+ scalable full-stack web applications for e-commerce and SaaS clients using Node.js, Express.js, PostgreSQL, and MongoDB, following object-oriented design principles.",
        "Engineered n8n and Zapier automation workflows integrating CRM platforms, third-party APIs, and SMTP pipelines, improving customer retention by automating re-engagement sequences and reducing manual follow-up by ~70%.",
        "Designed behavioral-event-triggered communication pipelines that increased repeat engagement for 3+ clients, reducing reported churn through timely, personalized automated touchpoints and data-driven segmentation.",
        "Implemented JWT/OAuth 2.0 authentication, RESTful API backends, and version-controlled codebases (Git) across client projects; conducted code reviews to maintain consistent quality and security standards.",
        "Applied systematic debugging to resolve production incidents including API integration failures and CI/CD deployment breakages, restoring system uptime and minimizing client-facing downtime across all active engagements.",
      ],
    },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function ResumePage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="scanline-overlay" />

      {/* Nav bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="font-mono text-xs tracking-widest text-crimson hover:text-crimson-glow transition-colors flex items-center gap-2">
            <span className="opacity-60">←</span> NS://DOSSIER
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] tracking-[0.25em] text-label hidden sm:block">CLASSIFIED DOCUMENT</span>
            <a
              href="/resume/resume.pdf"
              download
              className="font-mono text-[10px] tracking-[0.2em] border border-crimson text-crimson px-4 py-2 hover:bg-crimson hover:text-background transition-all duration-200 flex items-center gap-2"
            >
              <span>↓</span> DOWNLOAD PDF
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">

          {/* ── HEADER ─────────────────────────────────────────── */}
          <motion.div variants={sectionVariants} className="dossier-panel p-8 mb-6 relative overflow-hidden">
            {/* Decorative background text */}
            <div className="absolute right-6 top-4 font-mono text-[80px] font-black text-crimson/5 select-none leading-none pointer-events-none">
              SDE
            </div>
            <div className="terminal-label mb-4 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
              CLASSIFIED DOCUMENT // RESUME
              <span className="opacity-40">·</span>
              <span className="opacity-40">REV 2025.1</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-black text-foreground mb-2 tracking-tight">
              NAMAN SONI
            </h1>
            <p className="font-mono text-base text-crimson tracking-[0.15em] mb-5">
              Backend / Full-Stack Developer · SDE
            </p>
            <div className="h-px bg-border mb-5" />
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] text-label tracking-wider">
              <a href="mailto:namansoni272003@gmail.com" className="hover:text-crimson transition-colors flex items-center gap-1.5">
                <span className="text-crimson/60">✉</span> namansoni272003@gmail.com
              </a>
              <span className="flex items-center gap-1.5">
                <span className="text-crimson/60">☎</span> +91-7597562205
              </span>
              <a href="https://github.com/naman293" target="_blank" rel="noopener noreferrer" className="hover:text-crimson transition-colors flex items-center gap-1.5">
                <span className="text-crimson/60">⌥</span> github.com/naman293
              </a>
              <a href="https://www.linkedin.com/in/namansoni-dev/" target="_blank" rel="noopener noreferrer" className="hover:text-crimson transition-colors flex items-center gap-1.5">
                <span className="text-crimson/60">⌘</span> linkedin.com/in/namansoni-dev
              </a>
              <a href="https://digital-dossier-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-crimson transition-colors flex items-center gap-1.5">
                <span className="text-crimson/60">◉</span> digital-dossier-portfolio.netlify.app
              </a>
            </div>
          </motion.div>

          {/* ── PROFESSIONAL SUMMARY ───────────────────────────── */}
          <motion.div variants={sectionVariants}>
            <ResumeSection label="PROFESSIONAL SUMMARY" index="01">
              <p className="font-body text-sm sm:text-[15px] text-foreground/85 leading-[1.85] tracking-[0.01em]">
                {resumeData.summary}
              </p>
            </ResumeSection>
          </motion.div>

          {/* ── EDUCATION ──────────────────────────────────────── */}
          <motion.div variants={sectionVariants}>
            <ResumeSection label="EDUCATION" index="02">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-display text-base font-bold text-foreground mb-1">
                    {resumeData.education.degree}
                  </h3>
                  <p className="font-mono text-xs text-label tracking-wider">
                    {resumeData.education.institution}
                  </p>
                </div>
                <span className="font-mono text-[11px] text-crimson border border-crimson/30 bg-crimson/5 px-3 py-1 tracking-wider whitespace-nowrap self-start">
                  {resumeData.education.period}
                </span>
              </div>
            </ResumeSection>
          </motion.div>

          {/* ── TECHNICAL SKILLS ───────────────────────────────── */}
          <motion.div variants={sectionVariants}>
            <ResumeSection label="TECHNICAL SKILLS" index="03">
              <div className="grid gap-3">
                {resumeData.skills.map(({ category, items }) => (
                  <div key={category} className="flex items-start gap-4">
                    <span className="font-mono text-[10px] text-label tracking-[0.15em] w-32 shrink-0 pt-0.5 uppercase">
                      {category}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((item) => (
                        <span
                          key={item}
                          className="font-mono text-[10px] tracking-wider text-foreground/80 bg-surface border border-border px-2 py-0.5"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ResumeSection>
          </motion.div>

          {/* ── PROFESSIONAL EXPERIENCE ────────────────────────── */}
          <motion.div variants={sectionVariants}>
            <ResumeSection label="PROFESSIONAL EXPERIENCE" index="04">
              <div className="space-y-0">
                {resumeData.experience.map((exp, expIdx) => (
                  <div key={exp.title}>
                    {/* Entry header */}
                    <div className="flex items-start justify-between flex-wrap gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display text-base font-bold text-foreground">
                            {exp.title}
                          </h3>
                          <span className="font-mono text-[10px] text-crimson border border-crimson/40 bg-crimson/5 px-2 py-0.5 tracking-wider">
                            {exp.type}
                          </span>
                        </div>
                        <p className="font-mono text-xs text-label mt-1 tracking-wider">{exp.org}</p>
                        <p className="font-mono text-[10px] text-label/60 mt-0.5 tracking-wider">{exp.meta}</p>
                      </div>
                      <span className="font-mono text-[11px] text-crimson border border-crimson/30 bg-crimson/5 px-3 py-1 tracking-wider whitespace-nowrap self-start">
                        {exp.period}
                      </span>
                    </div>

                    {/* Separator line */}
                    <div className="h-px bg-border mb-5" />

                    {/* Bullet points */}
                    <ul className="space-y-3.5">
                      {exp.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-crimson shrink-0 mt-[3px] text-xs leading-none">▸</span>
                          <p className="font-body text-sm text-foreground/80 leading-relaxed">
                            {detail}
                          </p>
                        </li>
                      ))}
                    </ul>

                    {expIdx < resumeData.experience.length - 1 && (
                      <div className="mt-8 border-t border-border/50" />
                    )}
                  </div>
                ))}
              </div>
            </ResumeSection>
          </motion.div>

          {/* ── PROJECTS ───────────────────────────────────────── */}
          <motion.div variants={sectionVariants}>
            <ResumeSection label="PROJECTS" index="05">
              <div className="space-y-8">
                {resumeData.projects.map((proj, projIdx) => (
                  <div key={proj.name}>
                    {/* Project header */}
                    <div className="flex items-start justify-between flex-wrap gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-display text-base font-bold text-foreground">
                            {proj.name}
                          </h3>
                          {proj.github && (
                            <a
                              href={proj.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-[10px] text-crimson/70 hover:text-crimson border border-crimson/30 bg-crimson/5 px-2 py-0.5 tracking-wider transition-colors"
                            >
                              GITHUB →
                            </a>
                          )}
                        </div>
                        <p className="font-mono text-xs text-label mt-1 tracking-wider">
                          {proj.subtitle}
                        </p>
                      </div>
                      {/* Stack tags */}
                      <div className="flex flex-wrap gap-1.5 max-w-xs justify-end">
                        {proj.stack.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[9px] tracking-wider text-crimson/80 bg-crimson/5 border border-crimson/20 px-2 py-0.5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Separator line */}
                    <div className="h-px bg-border mb-5" />

                    {/* Bullet points */}
                    <ul className="space-y-3.5">
                      {proj.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-crimson shrink-0 mt-[3px] text-xs leading-none">▸</span>
                          <p className="font-body text-sm text-foreground/80 leading-relaxed">
                            {detail}
                          </p>
                        </li>
                      ))}
                    </ul>

                    {projIdx < resumeData.projects.length - 1 && (
                      <div className="mt-8 border-t border-border/50" />
                    )}
                  </div>
                ))}
              </div>
            </ResumeSection>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}

function ResumeSection({
  label,
  index,
  children,
}: {
  label: string;
  index: string;
  children: React.ReactNode;
}) {
  return (
    <div className="dossier-panel p-6 sm:p-8 mb-5 relative overflow-hidden">
      {/* Section index watermark */}
      <div className="absolute right-5 top-4 font-mono text-[40px] font-black text-foreground/[0.03] select-none leading-none pointer-events-none">
        {index}
      </div>
      {/* Label */}
      <div className="terminal-label mb-6 flex items-center gap-3">
        <span className="node-dot inline-block" />
        {label}
        <div className="flex-1 h-px bg-border/60 max-w-[80px]" />
      </div>
      {children}
    </div>
  );
}
