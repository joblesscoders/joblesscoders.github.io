import Hero from "@/components/homepage/hero";
import TechSection from "@/components/homepage/techSection";
import AboutSection from "@/components/homepage/aboutSection";
import TeamSection from "@/components/homepage/teamSection";
import ContactSection from "@/components/homepage/contactSection";

export default function Home() {
  return (
    <div className="mb-20">
      <Hero />
      <TechSection />
      <AboutSection />
      <TeamSection />
      <ContactSection />
    </div>
  );
}

