import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedProjects, getProjectBySlug } from "@/content";
import { siteConfig } from "@/lib/site-config";
import { ArrowLeft, ExternalLink, Github, ShieldCheck } from "lucide-react";

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
    title: `${project.title} | Case Study | ${siteConfig.name}`,
    description: project.summary,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.summary,
      url: `${siteConfig.url}/work/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <Link
          href="/work"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Work</span>
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-14">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono">
            {project.category}
          </span>
          {project.timeframe && (
            <span className="text-xs font-mono text-muted-foreground">
              {project.timeframe}
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors"
              >
                <span>Visit Live Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground border border-border text-xs font-mono transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Repository</span>
              </a>
            )}
          </div>
        )}
      </header>

      {/* Problem & Constraints */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-4">The Challenge & Constraints</h2>
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.problem}
          </p>
          {project.constraints && project.constraints.length > 0 && (
            <div className="pt-3 border-t border-border">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">
                Key Technical Constraints
              </span>
              <ul className="space-y-1.5">
                {project.constraints.map((c, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-violet-400 font-mono">-</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Solution & Architecture */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-4">Engineering Solution & Architecture</h2>
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.solution}
          </p>
          <div className="pt-3 border-t border-border">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">
              Team Contribution
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {project.teamContribution}
            </p>
          </div>
        </div>
      </section>

      {/* Verified Outcomes */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-foreground mb-4">Verified Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.verifiableOutcomes.map((outcome, i) => (
            <div key={i} className="p-4 rounded-xl bg-card border border-border flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              <span className="text-xs sm:text-sm font-medium text-foreground">{outcome}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-foreground mb-4">Technology Stack Used</h2>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 text-xs font-mono bg-card text-foreground rounded-lg border border-border"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-card border border-border text-center">
        <h3 className="text-xl font-bold text-foreground mb-2">
          Need similar engineering outcomes?
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Let’s discuss your platform architecture, performance goals, and sprint roadmap.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors"
        >
          Schedule a Technical Call
        </Link>
      </div>
    </div>
  );
}
