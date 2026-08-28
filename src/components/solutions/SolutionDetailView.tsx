"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle } from "lucide-react";
import { SolutionItem } from "@/content/solutions";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CtaSection from "@/components/layout/CtaSection";
import AnimatedFaq from "@/components/ui/AnimatedFaq";
import { useGSAPReveal } from "@/lib/reveal";

export function SolutionDetailView({ solution }: { solution: SolutionItem }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: solution.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  useGSAPReveal(containerRef, [
    { selector: ".solution-hero", y: 20, duration: 0.5, start: "top 90%" },
    { selector: ".solution-card", y: 24, stagger: 0.06, duration: 0.5, start: "top 88%" },
  ]);

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Solutions", href: "/solutions" },
          { label: solution.shortTitle },
        ]}
      />

      {/* Outcome-Led Hero */}
      <header className="solution-hero max-w-4xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-4">
          <span>{"// Solution Specification"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15] mb-5">
          {solution.title}
        </h1>
        <p className="text-base sm:text-xl text-muted-foreground leading-relaxed mb-6">
          {solution.tagline}
        </p>
        <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 text-sm font-mono text-violet-300 inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-violet-400" />
          <span>Core Outcome: {solution.outcome}</span>
        </div>
      </header>

      {/* Who This Is For (Client Profile) */}
      <section aria-labelledby="client-profile-heading" className="mb-20">
        <div className="p-8 rounded-2xl bg-card border border-border">
          <h2 id="client-profile-heading" className="text-xl sm:text-2xl font-bold text-foreground mb-4">
            Ideal Client & Project Profile
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            This solution architecture is specifically engineered for teams facing these operational parameters:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {solution.clientProfile.map((profile, i) => (
              <div key={i} className="solution-card p-4 rounded-xl bg-muted/40 border border-border/80 text-xs leading-relaxed text-foreground flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <span>{profile}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem vs Capability Grid */}
      <section aria-labelledby="problems-capabilities-heading" className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: Typical Obstacles */}
          <div className="p-8 rounded-2xl bg-card border border-border">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-rose-400 mb-3">
              <AlertTriangle className="w-4 h-4" />
              <span>Typical Bottlenecks & Pitfalls</span>
            </div>
            <h2 id="problems-capabilities-heading" className="text-xl sm:text-2xl font-bold text-foreground mb-6">
              Challenges We Solve
            </h2>
            <div className="space-y-4">
              {solution.problems.map((prob, i) => (
                <div key={i} className="solution-card p-4 rounded-xl bg-rose-500/5 border border-rose-500/15">
                  <h3 className="text-sm font-bold text-foreground mb-1">{prob.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{prob.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Architectural Capabilities */}
          <div className="p-8 rounded-2xl bg-card border border-border">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 mb-3">
              <CheckCircle2 className="w-4 h-4" />
              <span>Architectural Deliverables</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
              What We Deliver
            </h2>
            <div className="space-y-4">
              {solution.capabilities.map((cap, i) => (
                <div key={i} className="solution-card p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                  <h3 className="text-sm font-bold text-foreground mb-1">{cap.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{cap.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Delivery Process */}
      <section aria-labelledby="process-heading" className="mb-20">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-3">
            <span>{"// Execution"}</span>
          </div>
          <h2 id="process-heading" className="text-2xl sm:text-3xl font-bold text-foreground">
            3-Step Delivery Roadmap
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {solution.process.map((step) => (
            <div key={step.step} className="solution-card p-6 rounded-2xl bg-card border border-border">
              <span className="text-xs font-mono text-violet-400 font-bold px-2 py-0.5 bg-violet-500/10 rounded mb-3 inline-block">
                STEP {step.step}
              </span>
              <h3 className="text-base font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Relevant Technologies & Architecture Proof */}
      <section aria-labelledby="tech-proof-heading" className="mb-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Technologies */}
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border flex flex-col justify-between">
          <div>
            <h2 id="tech-proof-heading" className="text-lg font-bold text-foreground mb-2">
              Technology Arsenal
            </h2>
            <p className="text-xs text-muted-foreground mb-6">
              Battle-tested tools selected for runtime speed and maintainability:
            </p>
            <div className="flex flex-wrap gap-2">
              {solution.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono bg-muted text-foreground rounded-lg border border-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Truthful Walkthrough Proof Card */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-card border border-dashed border-border/90 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Available Architecture Walkthrough</span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {solution.walkthroughProof.title}
            </h3>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{solution.walkthroughProof.outcome}</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
              {solution.walkthroughProof.detail}
            </p>
          </div>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
            >
              <span>Schedule Architecture Review Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section aria-labelledby="faqs-heading" className="mb-20">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{"// FAQs"}</span>
          </div>
          <h2 id="faqs-heading" className="text-2xl sm:text-3xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
        </div>
        <AnimatedFaq items={solution.faqs} className="max-w-4xl" />
      </section>

      {/* Final CTA */}
      <CtaSection
        title={`Ready to build your ${solution.shortTitle}?`}
        description="Book a direct technical session with our senior engineers to spec out your project architecture, milestones, and timeline."
        primaryButtonText="Start a Technical Conversation"
        primaryButtonHref="/contact"
      />
    </div>
  );
}

export default SolutionDetailView;
