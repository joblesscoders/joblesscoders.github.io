import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/content";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CtaSection from "@/components/layout/CtaSection";

export const metadata: Metadata = {
  title: "Engineering Services & Disciplines",
  description:
    "Explore Jobless Coders engineering disciplines: full-stack web platforms, cross-platform mobile apps, custom AI/LLM pipelines, design systems, and cloud infrastructure.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Engineering Services & Disciplines | Jobless Coders",
    description:
      "Explore Jobless Coders engineering disciplines: full-stack web platforms, cross-platform mobile apps, custom AI/LLM pipelines, design systems, and cloud infrastructure.",
    url: `${siteConfig.url}/services`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

const PROBLEMS_SOLVED = [
  {
    title: "Sluggish & Fragile Web Frontends",
    description:
      "Bloated bundles, slow initial page loads, and fragile client state hurting user conversion and search rankings.",
  },
  {
    title: "Dual-Stack Mobile Cost Overhead",
    description:
      "Doubled engineering overhead and mismatched feature releases maintaining separate iOS and Android native apps.",
  },
  {
    title: "Unpredictable AI & LLM Prototypes",
    description:
      "Hallucinating models, sluggish vector retrieval, and lack of deterministic function calling in production AI.",
  },
  {
    title: "Manual & Risky Deployment Cycles",
    description:
      "Unreliable release workflows, missing automated rollback triggers, and unmonitored infrastructure downtime.",
  },
];

export default function ServicesPage() {
  const services = getAllServices();

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Engineering Services & Disciplines",
    description: "Explore Jobless Coders engineering disciplines.",
    url: `${siteConfig.url}/services`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: services.map((s, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: s.title,
        url: `${siteConfig.url}/services/${s.slug}`,
        description: s.summary,
      })),
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Services" }]} />

      {/* Header */}
      <header className="max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-4">
          <span>{"// Disciplines & Capabilities"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Engineering Disciplines Built for Measurable Impact
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          We operate as an embedded senior engineering collective. We partner with startups and scaleups to solve hard technical bottlenecks, replace brittle legacy architectures, and deliver production software without agency overhead.
        </p>
      </header>

      {/* Problems We Solve Grid */}
      <section aria-labelledby="problems-heading" className="mb-16">
        <div className="p-6 sm:p-8 rounded-2xl bg-card/60 border border-border">
          <div className="flex items-center gap-2 text-xs font-mono text-violet-400 font-semibold mb-3">
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            <h2 id="problems-heading" className="uppercase tracking-wider">
              The Engineering Challenges We Eliminate
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
            Too many teams struggle with slow delivery, recurring regressions, and disjointed vendor handoffs. We target the core technical friction points:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROBLEMS_SOLVED.map((prob, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-background/50 border border-border/80">
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{prob.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{prob.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section aria-labelledby="services-grid-heading">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h2 id="services-grid-heading" className="text-2xl sm:text-3xl font-bold text-foreground">
              Core Service Offerings
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Select a discipline below to inspect our architecture specifications, sprint process, and code patterns.
            </p>
          </div>
          <span className="text-xs font-mono text-muted-foreground hidden sm:block">
            {services.length} Active Disciplines
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <article
              key={service.slug}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-card border border-border hover:border-violet-500/30 transition-all duration-200 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-xs font-mono text-violet-400 font-semibold uppercase tracking-wider">
                    {service.shortName}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-violet-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded"
                  >
                    {service.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                  {service.summary}
                </p>

                {/* Differentiating Outcomes */}
                <div className="space-y-2 mb-6">
                  <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
                    Key Differentiating Outcomes
                  </span>
                  {service.outcomes.slice(0, 3).map((outcome, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-violet-400" aria-hidden="true" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {service.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono bg-muted text-muted-foreground rounded-md border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Descriptive Link */}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Link
                  href={`/services/${service.slug}`}
                  aria-label={`Explore ${service.title} specifications and architecture`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded py-1"
                >
                  <span>Explore {service.shortName} Specifications</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Shared CTA */}
      <CtaSection
        title="Need senior engineers to build your next milestone?"
        description="We offer direct access to senior engineers with no agency overhead, rapid turnaround, and transparent async communication."
        primaryButtonText="Discuss Your Technical Requirements"
        primaryButtonHref="/contact"
      />
    </div>
  );
}