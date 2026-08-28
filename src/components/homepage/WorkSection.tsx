"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { getPublishedProjects } from "@/content";
import { ArrowRight, ShieldCheck, ExternalLink, Github, Lock } from "lucide-react";
import { useGSAPReveal } from "@/lib/reveal";

export function WorkSection() {
  const containerRef = useRef<HTMLElement>(null);
  const projects = getPublishedProjects();

  useGSAPReveal(containerRef, [
    { selector: ".work-header", y: 20, duration: 0.6, start: "top 85%" },
    { selector: ".work-card", y: 20, stagger: 0.08, duration: 0.6, start: "top 85%" },
  ]);

  return (
    <section id="work" ref={containerRef} className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="work-header flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-mono mb-3">
              <span>03 / SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Production Proof & Real Outcomes
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl">
              Production systems engineered for scale, backed by verified benchmarks, transparent architectures, and measurable outcomes.
            </p>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded"
          >
            <span>View all work & proof</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Project Cards */}
        <div className="work-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="work-card flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-violet-500/30 transition-[border-color,box-shadow,transform] duration-200 shadow-sm hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-xs font-mono text-violet-600 dark:text-violet-400 font-semibold uppercase tracking-wider">
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
                    className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded"
                  >
                    {project.title}
                  </Link>
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {project.summary}
                </p>

                {/* Challenge & Contribution Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/80 text-xs mb-5">
                  <div>
                    <span className="font-mono font-semibold text-foreground uppercase tracking-wider text-[10px] block mb-1">
                      The Challenge
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                  <div>
                    <span className="font-mono font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider text-[10px] block mb-1">
                      Our Contribution
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.teamContribution}
                    </p>
                  </div>
                </div>

                {/* Outcomes */}
                <div className="space-y-2 mb-6">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">
                    Verified Production Outcomes
                  </span>
                  {project.verifiableOutcomes.map((outcome, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-foreground">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-500 dark:text-emerald-400" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-6">
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
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-colors"
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
          <div className="work-card flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-card border border-border/80 border-dashed">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-3">
                <Lock className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                <span>NDA & Enterprise Systems</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                Custom Client Deployments
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Active client projects operate under mutual non-disclosure agreements. We share architecture walkthroughs, benchmark numbers, and sanitized code repositories during technical consultations.
              </p>
              <div className="space-y-2 mb-6">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">
                  Available Walkthroughs
                </span>
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="text-violet-600 dark:text-violet-400 font-mono">-</span>
                  <span>Enterprise RAG document search pipeline with pgvector</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="text-violet-600 dark:text-violet-400 font-mono">-</span>
                  <span>Cross-platform mobile offline data sync architecture</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="text-violet-600 dark:text-violet-400 font-mono">-</span>
                  <span>Multi-environment AWS ECS CI/CD infrastructure with Terraform</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-colors"
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
