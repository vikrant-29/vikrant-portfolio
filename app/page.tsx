import HeroSection from "@/components/HeroSection";
import FeaturedApps from "@/components/FeaturedApps";
import SkillsSection from "@/components/SkillsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedApps />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
