import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import Hero from "@/components/homepage/hero";
import { ProofSection } from "@/components/homepage/ProofSection";
import { ServicesSection } from "@/components/homepage/ServicesSection";
import { ProcessSection } from "@/components/homepage/ProcessSection";
import { WorkSection } from "@/components/homepage/WorkSection";
import { SolutionsOverviewSection } from "@/components/homepage/SolutionsOverviewSection";
import { FaqSection } from "@/components/homepage/FaqSection";
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
      {/* 1. Hero with Interactive Code/Architecture Card */}
      <Hero />

      {/* 2. Compact Trust / Proof Strip */}
      <ProofSection />

      {/* 3. 01 / Capabilities */}
      <ServicesSection />

      {/* 4. 02 / Methodology */}
      <ProcessSection />

      {/* 5. 03 / Selected Work */}
      <WorkSection />

      {/* 6. Turnkey Solutions Overview */}
      <SolutionsOverviewSection />

      {/* 7. 04 / FAQ */}
      <FaqSection />

      {/* 8. Technical Arsenal */}
      <TechSection />

      {/* 9. The Collective Team */}
      <TeamSection />

      {/* 10. Final Contact & Inquiry */}
      <ContactSection />
    </div>
  );
}
