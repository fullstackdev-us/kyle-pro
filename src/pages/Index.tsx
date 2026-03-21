import { ThemeToggle } from "@/components/ThemeToggle";
import { HeroSection } from "@/components/HeroSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { EducationSection } from "@/components/EducationSection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <header className="fixed top-0 right-0 p-4 z-50">
      <ThemeToggle />
    </header>
    <main className="max-w-3xl mx-auto px-6 pb-20">
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </main>
    <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} Kyle V. Dunbar
    </footer>
  </div>
);

export default Index;
