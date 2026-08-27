import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPublishedProjects, getProjectBySlug } from "@/content";
import { siteConfig } from "@/lib/site-config";
import { ExternalLink, Github, ShieldCheck, AlertTriangle, Layers, Cpu, CheckCircle } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CtaSection from "@/components/layout/CtaSection";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getPublishedProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Case Study | ${siteConfig.name}`,
      description: project.summary,
      url: `${siteConfig.url}/work/${project.slug}`,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${siteConfig.name}`,
      description: project.summary,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${project.title} - Engineering Case Study`,
    description: project.summary,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/work/${project.slug}`,
    },
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
        name: "Work",
        item: `${siteConfig.url}/work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${siteConfig.url}/work/${project.slug}`,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Work", href: "/work" },
          { label: project.title },
        ]}
      />

      {/* Header */}
      <header className="mb-14">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono">
            {project.category}
          </span>
          {project.timeframe && (
            <span className="text-xs font-mono text-muted-foreground">
              Timeline: {project.timeframe}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          {project.title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          {project.summary}
        </p>

        {/* Action Links */}
        {(project.url || project.repoUrl) && (
          <div className="flex flex-wrap items-center gap-3 mt-6">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit live deployment for ${project.title} (opens in new tab)`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs sm:text-sm font-medium transition-colors shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
              >
                <span>Visit Live Platform</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code repository for ${project.title} on GitHub (opens in new tab)`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary/80 hover:bg-secondary text-secondary-foreground border border-border text-xs sm:text-sm font-mono transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </header>

      {/* Primary Visual Showcase */}
      {project.images && project.images.length > 0 && (
        <section aria-label="Project Visuals" className="mb-14">
          <figure className="rounded-2xl border border-border bg-neutral-950 overflow-hidden shadow-2xl p-6 sm:p-8">
            <div className="relative w-full h-64 sm:h-80 md:h-96 flex items-center justify-center">
              <Image
                src={project.images[0].src}
                alt={project.images[0].alt}
                fill
                className="object-contain"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>
            {project.images[0].caption && (
              <figcaption className="mt-4 pt-4 border-t border-neutral-800 text-center text-xs font-mono text-neutral-400">
                {project.images[0].caption}
              </figcaption>
            )}
          </figure>
        </section>
      )}

      {/* The Challenge & Constraints */}
      <section aria-labelledby="challenge-heading" className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-violet-400 font-semibold mb-2">
          <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{"// Problem Space"}</span>
        </div>
        <h2 id="challenge-heading" className="text-xl sm:text-2xl font-bold text-foreground mb-4">
          The Engineering Challenge & Constraints
        </h2>
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-4">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {project.problem}
          </p>
          {project.constraints && project.constraints.length > 0 && (
            <div className="pt-4 border-t border-border">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">
                Technical Constraints & Requirements
              </span>
              <ul className="space-y-2">
                {project.constraints.map((c, i) => (
                  <li key={i} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-violet-400 font-mono font-bold shrink-0">→</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Solution & Team Contribution */}
      <section aria-labelledby="solution-heading" className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-violet-400 font-semibold mb-2">
          <Layers className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{"// Implementation Architecture"}</span>
        </div>
        <h2 id="solution-heading" className="text-xl sm:text-2xl font-bold text-foreground mb-4">
          Engineering Solution & Team Contribution
        </h2>
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-6">
          <div>
            <h3 className="text-sm font-bold text-foreground mb-2">Architectural Approach</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {project.solution}
            </p>
          </div>
          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-bold text-foreground mb-2">Collective Contribution</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {project.teamContribution}
            </p>
          </div>
        </div>
      </section>

      {/* Verified Results & Metrics */}
      <section aria-labelledby="results-heading" className="mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold mb-2">
          <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{"// Measured Results"}</span>
        </div>
        <h2 id="results-heading" className="text-xl sm:text-2xl font-bold text-foreground mb-4">
          Verified Outcomes & Performance
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.verifiableOutcomes.map((outcome, i) => (
            <div key={i} className="p-4 sm:p-5 rounded-xl bg-card border border-border flex items-start gap-3">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-medium text-foreground leading-relaxed">{outcome}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section aria-labelledby="tech-heading" className="mb-16">
        <div className="flex items-center gap-2 text-xs font-mono text-violet-400 font-semibold mb-2">
          <Cpu className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{"// Technology Stack"}</span>
        </div>
        <h2 id="tech-heading" className="text-xl sm:text-2xl font-bold text-foreground mb-4">
          Technologies & Tools Used
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 text-xs font-mono bg-card text-foreground rounded-lg border border-border shadow-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Shared CTA */}
      <CtaSection
        title="Need similar engineering precision for your product?"
        description="We architect and build production-grade web platforms, APIs, mobile applications, and AI integrations."
        primaryButtonText="Start a Technical Consultation"
        primaryButtonHref="/contact"
      />
    </div>
  );
}
