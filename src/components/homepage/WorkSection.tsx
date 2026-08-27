import React from "react";
import Link from "next/link";
import { getPublishedProjects } from "@/content";
import { ArrowRight, ShieldCheck, ExternalLink, Github, Lock } from "lucide-react";

export function WorkSection() {
  const projects = getPublishedProjects();

  return (
    <section id="work" className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-3">
              <span>{"// Selected Work"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Production Proof & Real Outcomes
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl">
              We engineer scalable software solutions backed by verified performance metrics and transparent source code.
            </p>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded"
          >
            <span>View all work & proof</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-violet-500/30 transition-all duration-200 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-xs font-mono text-violet-400 font-semibold uppercase tracking-wider">
                    {project.category}
                  </span>
                  {project.timeframe && (
                    <span className="text-xs font-mono text-muted-foreground">
                      {project.timeframe}
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                  <Link
                    href={`/work/${project.slug}`}
                    className="hover:text-violet-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded"
                  >
                    {project.title}
                  </Link>
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {project.summary}
                </p>

                {/* Outcomes */}
                <div className="space-y-2 mb-6">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">
                    Verified Outcomes
                  </span>
                  {project.verifiableOutcomes.map((outcome, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-foreground">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-0.5 text-[11px] font-mono bg-muted text-muted-foreground rounded-md border border-border"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
                >
                  <span>Read Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center gap-2">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}

          {/* Truthful NDA Architecture Card */}
          <div className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-card border border-border/80 border-dashed">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-3">
                <Lock className="w-3.5 h-3.5 text-violet-400" />
                <span>NDA & Enterprise Systems</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                Custom Client Deployments
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Active client projects operate under mutual non-disclosure agreements. We share architecture walkthroughs, benchmark numbers, and sanitized code repositories during technical consultations.
              </p>
              <div className="space-y-2 mb-6">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">
                  Available Walkthroughs
                </span>
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="text-violet-400 font-mono">-</span>
                  <span>Enterprise RAG document search pipeline with pgvector</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="text-violet-400 font-mono">-</span>
                  <span>Cross-platform mobile offline data sync architecture</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="text-violet-400 font-mono">-</span>
                  <span>Multi-environment AWS ECS CI/CD infrastructure with Terraform</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
              >
                <span>Request Architecture Review</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
