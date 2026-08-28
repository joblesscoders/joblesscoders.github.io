import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import Hero from "@/components/homepage/hero";
import { ProofSection } from "@/components/homepage/ProofSection";
import { WorkSection } from "@/components/homepage/WorkSection";
import { SolutionsOverviewSection } from "@/components/homepage/SolutionsOverviewSection";
import { ServicesSection } from "@/components/homepage/ServicesSection";
import { ProcessSection } from "@/components/homepage/ProcessSection";
import TechSection from "@/components/homepage/techSection";
import TeamSection from "@/components/homepage/teamSection";
import ContactSection from "@/components/homepage/contactSection";

export const metadata: Metadata = {
  title: "Senior Engineering Collective for High-Impact Software",
  description:
    "Partner with senior engineers to build production web platforms, cross-platform mobile apps, and custom AI workflows. Direct access to 6 senior builders with zero agency overhead.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Senior Engineering Collective for High-Impact Software | Jobless Coders",
    description:
      "Partner with senior engineers to build production web platforms, cross-platform mobile apps, and custom AI workflows. Direct access to 6 senior builders with zero agency overhead.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Senior Engineering Collective for High-Impact Software | Jobless Coders",
    description:
      "Partner with senior engineers to build production web platforms, cross-platform mobile apps, and custom AI workflows.",
  },
};

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {/* 1. Hero with Globe */}
      <Hero />

      {/* 2. Compact Trust / Proof Strip */}
      <ProofSection />

      {/* 3. Selected Work (Visually Prominent) */}
      <WorkSection />

      {/* 4. Solutions Overview */}
      <SolutionsOverviewSection />

      {/* 5. Capabilities / Disciplines */}
      <ServicesSection />

      {/* 6. Disciplined Engineering Process */}
      <ProcessSection />

      {/* 7. Technical Arsenal */}
      <TechSection />

      {/* 8. The Collective Team */}
      <TeamSection />

      {/* 9. Final Contact & Inquiry */}
      <ContactSection />
    </div>
  );
}
