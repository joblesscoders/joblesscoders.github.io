import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/content";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Services & Capabilities",
  description:
    "Explore Jobless Coders engineering disciplines: full-stack web platforms, cross-platform mobile apps, AI/LLM integrations, design systems, and cloud infrastructure.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Engineering Services | Jobless Coders",
    description:
      "Full-stack web, mobile apps, AI/LLM integrations, design systems, and cloud infrastructure for ambitious companies.",
    url: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-4">
          <span>{"// Disciplines & Capabilities"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          What We Build & How We Engineer
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          We operate as an embedded senior engineering collective. We partner with startups and engineering teams to design, build, and deploy production software with minimal friction.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <article
            key={service.slug}
            className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-violet-500/30 transition-all duration-200 shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-xs font-mono text-violet-400 font-semibold uppercase tracking-wider">
                  {service.shortName}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  0{services.indexOf(service) + 1}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                <Link
                  href={`/services/${service.slug}`}
                  className="hover:text-violet-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded"
                >
                  {service.title}
                </Link>
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {service.summary}
              </p>

              {/* Key Deliverables */}
              <div className="space-y-2 mb-6">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block">
                  Key Deliverables
                </span>
                {service.capabilities.slice(0, 3).map((cap, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-violet-400" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {service.technologies.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[11px] font-mono bg-muted text-muted-foreground rounded-md border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Read More Link */}
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded"
              >
                <span>Explore {service.shortName} Specs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* CTA Box */}
      <div className="mt-20 p-8 sm:p-10 rounded-2xl bg-card border border-border text-center max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-foreground mb-3">
          Have an upcoming project or technical challenge?
        </h3>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
          Schedule a direct technical call with our engineering leads to review your requirements, architecture, and sprint timelines.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-colors shadow-lg shadow-violet-600/20"
        >
          Start a Technical Conversation
        </Link>
      </div>
    </div>
  );
}