import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedProjects } from "@/content";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight, Code2, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Selected Work & Engineering Proof",
  description:
    "Explore case studies, open architectures, and engineering proof from the Jobless Coders collective.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Selected Work | Jobless Coders",
    description:
      "Real technical work, open-source repositories, and verified engineering case studies.",
    url: `${siteConfig.url}/work`,
  },
};

export default function WorkPage() {
  const projects = getPublishedProjects();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-4">
          <span>{"// Work & Engineering Proof"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Real Systems Built for Real Performance
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          We believe engineering capability should be demonstrated through verifiable architecture, clean code, and measured outcomes—not vanity claims.
        </p>
      </div>

      {/* Projects List */}
      {projects.length > 0 ? (
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

                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                  <Link
                    href={`/work/${project.slug}`}
                    className="hover:text-violet-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded"
                  >
                    {project.title}
                  </Link>
                </h2>

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

                {/* Stack Badges */}
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

              {/* View Case Study */}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded"
                >
                  <span>Read Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Truthful Proof / Capabilities Alternative if no public projects */
        <div className="p-8 sm:p-12 rounded-2xl bg-card border border-border text-center max-w-2xl mx-auto">
          <Code2 className="w-10 h-10 text-violet-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">
            Client Work Under NDA
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Our active client projects operate under mutual non-disclosure agreements. We are happy to share sanitized code samples, architecture walkthroughs, and repository references during an introductory call.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Request Architecture Walkthrough</span>
          </Link>
        </div>
      )}

      {/* Engineering Principles Bar */}
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
}
