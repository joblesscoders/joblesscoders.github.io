import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { SOLUTIONS } from "@/content/solutions";
import SolutionDetailView from "@/components/solutions/SolutionDetailView";

const solution = SOLUTIONS["ai-automation"];

export const metadata: Metadata = {
  title: solution.metaTitle,
  description: solution.metaDescription,
  alternates: {
    canonical: "/solutions/ai-automation",
  },
  openGraph: {
    title: solution.metaTitle,
    description: solution.metaDescription,
    url: `${siteConfig.url}/solutions/ai-automation`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function AiAutomationSolutionPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Solutions",
        item: `${siteConfig.url}/#solutions`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: solution.shortTitle,
        item: `${siteConfig.url}/solutions/ai-automation`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SolutionDetailView solution={solution} />
    </>
  );
}
