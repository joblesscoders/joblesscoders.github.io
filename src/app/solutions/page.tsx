import React from "react";
import type { Metadata } from "next";
import { SolutionsOverviewSection } from "@/components/homepage/SolutionsOverviewSection";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Software Solutions for Product and Business Growth",
  description:
    "Explore Jobless Coders solutions for e-commerce, portfolio websites, SaaS products, business platforms, AI automation, and mobile applications.",
  alternates: {
    canonical: "/solutions",
  },
  openGraph: {
    title: `Software Solutions for Product and Business Growth | ${siteConfig.name}`,
    description:
      "Production-ready web, mobile, AI, SaaS, e-commerce, and internal platform solutions built by senior engineers.",
    url: `${siteConfig.url}/solutions`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function SolutionsPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Jobless Coders Solutions",
    description:
      "Software solutions for product launches, commerce, internal operations, automation, and mobile delivery.",
    url: `${siteConfig.url}/solutions`,
  };
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
        item: `${siteConfig.url}/solutions`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <Breadcrumbs items={[{ label: "Solutions" }]} className="mb-0" />
      </div>
      <SolutionsOverviewSection asPage />
    </>
  );
}
