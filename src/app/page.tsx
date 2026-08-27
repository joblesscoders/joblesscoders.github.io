import React from "react";
import Hero from "@/components/homepage/hero";
import { ProofSection } from "@/components/homepage/ProofSection";
import { WorkSection } from "@/components/homepage/WorkSection";
import { ServicesSection } from "@/components/homepage/ServicesSection";
import { ProcessSection } from "@/components/homepage/ProcessSection";
import TechSection from "@/components/homepage/techSection";
import TeamSection from "@/components/homepage/teamSection";
import ContactSection from "@/components/homepage/contactSection";

export default function Home() {
  return (
    <div className="w-full">
      {/* 2. Hero */}
      <Hero />

      {/* 3. Proof Section */}
      <ProofSection />

      {/* 4. Selected Work */}
      <WorkSection />

      {/* 5. Services Summaries */}
      <ServicesSection />

      {/* 6. Process */}
      <ProcessSection />

      {/* 7. Compact Tech Grid */}
      <TechSection />

      {/* 8. Team Preview */}
      <TeamSection />

      {/* 9. Contact CTA */}
      <ContactSection />
    </div>
  );
}
