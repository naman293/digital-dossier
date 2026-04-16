import { createFileRoute } from "@tanstack/react-router";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import TelemetryStrip from "@/components/TelemetryStrip";

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
  return (
    <div className="relative">
      <div className="scanline-overlay" />
      <Navigation />
      <HeroSection />
      <TelemetryStrip variant="wave" />
      <AboutSection />
      <TelemetryStrip variant="pulse" />
      <ProjectsSection />
      <TelemetryStrip variant="scan" />
      <SkillsSection />
      <TelemetryStrip variant="wave" />
      <ExperienceSection />
      <TelemetryStrip variant="pulse" />
      <ContactSection />
      <Footer />
    </div>
  );
}
