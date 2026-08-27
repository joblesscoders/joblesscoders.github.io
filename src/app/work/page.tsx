import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPublishedProjects } from "@/content";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight, Code2, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CtaSection from "@/components/layout/CtaSection";

export const metadata: Metadata = {
  title: "Selected Work & Engineering Proof",
  description:
    "Explore case studies, open architectures, and verified engineering results from the Jobless Coders collective.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Selected Work & Engineering Proof | Jobless Coders",
    description:
      "Real technical work, open-source repositories, and verified engineering case studies from Jobless Coders.",
    url: `${siteConfig.url}/work`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function WorkPage() {
  const projects = getPublishedProjects();

  const workSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Selected Work & Engineering Proof",
    description: "Explore case studies and verified engineering results.",
    url: `${siteConfig.url}/work`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((p, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: p.title,
        url: `${siteConfig.url}/work/${p.slug}`,
        description: p.summary,
      })),
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workSchema) }}
      />
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Work" }]} />

      {/* Header */}
      <header className="max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-4">
          <span>{"// Engineering Proof & Case Studies"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Real Systems Built for Real Performance
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          We believe engineering capability should be demonstrated through verifiable architecture, clean code, and measured outcomes—not vanity claims. Below are approved public case studies.
        </p>
      </header>

      {/* Projects List */}
      <section aria-labelledby="projects-list-heading" className="mb-16">
        <h2 id="projects-list-heading" className="sr-only">
          Published Engineering Projects
        </h2>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-violet-500/30 transition-all duration-200 shadow-sm overflow-hidden"
              >
                <div>
                  {/* Category & Timeframe */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs font-mono text-violet-400 font-semibold uppercase tracking-wider">
                      {project.category}
                    </span>
                    {project.timeframe && (
                      <span className="text-xs font-mono text-muted-foreground">
                        {project.timeframe}
                      </span>
                    )}
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                    <Link
                      href={`/work/${project.slug}`}
                      className="hover:text-violet-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                    {project.summary}
                  </p>

                  {/* Screenshot Thumbnail (if available) */}
                  {project.images && project.images.length > 0 && (
                    <div className="mb-6 rounded-xl border border-border bg-neutral-950 p-4 flex items-center justify-center">
                      <div className="relative w-full h-40 sm:h-48 flex items-center justify-center">
                        <Image
                          src={project.images[0].src}
                          alt={project.images[0].alt}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      {project.images[0].caption && (
                        <p className="sr-only">{project.images[0].caption}</p>
                      )}
                    </div>
                  )}

                  {/* Verified Outcomes */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
                      Verified Engineering Outcomes
                    </span>
                    {project.verifiableOutcomes.map((outcome, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-foreground">
                        <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" aria-hidden="true" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 text-[10px] font-mono bg-muted text-muted-foreground rounded-md border border-border"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href={`/work/${project.slug}`}
                    aria-label={`Read full case study for ${project.title}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded py-1"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>

                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Truthful Proof / Capabilities Alternative if no public projects */
          <div className="p-8 sm:p-12 rounded-2xl bg-card border border-border text-center max-w-2xl mx-auto">
            <Code2 className="w-10 h-10 text-violet-400 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-foreground mb-2">
              Client Engagements Under Non-Disclosure Agreements
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Our active enterprise projects operate under mutual non-disclosure agreements. We are happy to share sanitized code samples, architecture walkthroughs, and repository references during an introductory technical call.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Request Sanitized Architecture Walkthrough</span>
            </Link>
          </div>
        )}
      </section>

      {/* Engineering Principles Bar */}
      <section aria-labelledby="principles-heading" className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        <h2 id="principles-heading" className="sr-only">
          Engineering Standards
        </h2>
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="text-xs font-mono text-violet-400 font-semibold mb-2">01 / INTEGRITY</div>
          <h3 className="text-base font-bold text-foreground mb-1">No Ghostwritten Work</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Every case study and code artifact represents direct engineering done by our 6 core engineers.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="text-xs font-mono text-violet-400 font-semibold mb-2">02 / RIGOR</div>
          <h3 className="text-base font-bold text-foreground mb-1">Automated Verification</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All code shipped to production is guarded by strict TypeScript types, lint suites, and CI workflows.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="text-xs font-mono text-violet-400 font-semibold mb-2">03 / VELOCITY</div>
          <h3 className="text-base font-bold text-foreground mb-1">Direct Developer Access</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Work directly with technical leads across GMT+6 and global timezones with zero account-manager delay.
          </p>
        </div>
      </section>

      {/* Shared CTA */}
      <CtaSection
        title="Ready to build a reliable platform together?"
        description="Whether starting from scratch or re-architecting an existing system, our engineering collective is ready to deliver."
        primaryButtonText="Start a Project Discussion"
        primaryButtonHref="/contact"
      />
    </div>
  );
}
