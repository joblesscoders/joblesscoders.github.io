import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { SOLUTIONS } from "@/content/solutions";
import SolutionDetailView from "@/components/solutions/SolutionDetailView";

const solution = SOLUTIONS["saas-mvp"];

export const metadata: Metadata = {
  title: solution.metaTitle,
  description: solution.metaDescription,
  alternates: {
    canonical: "/solutions/saas-mvp",
  },
  openGraph: {
    title: solution.metaTitle,
    description: solution.metaDescription,
    url: `${siteConfig.url}/solutions/saas-mvp`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function SaasMvpSolutionPage() {
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
        item: `${siteConfig.url}/solutions/saas-mvp`,
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
