"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { useGSAPReveal } from "@/lib/reveal";

interface CtaSectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  className?: string;
}

export default function CtaSection({
  title = "Have an upcoming project or technical challenge?",
  description = "Schedule a direct technical call with our engineering leads to review your requirements, architecture, and sprint timelines.",
  primaryButtonText = "Start a Technical Conversation",
  primaryButtonHref = "/contact",
  secondaryButtonText = "Direct Email",
  secondaryButtonHref = `mailto:${siteConfig.email}`,
  className = "",
}: CtaSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAPReveal(containerRef, [
    { selector: ".cta-box", y: 20, duration: 0.5, start: "top 90%" },
  ]);

  return (
    <section
      ref={containerRef}
      aria-labelledby="cta-heading"
      className={`relative mt-20 ${className}`}
    >
      <div className="cta-box relative rounded-2xl bg-card border border-border p-8 sm:p-12 overflow-hidden text-center max-w-4xl mx-auto shadow-sm">
        {/* Subtle glow background */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-4">
            <span>{"// Direct Senior Engineering"}</span>
          </div>

          <h2 id="cta-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href={primaryButtonHref}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-all duration-150 shadow-lg shadow-violet-600/20 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
            >
              <span>{primaryButtonText}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>

            {secondaryButtonHref && (
              <a
                href={secondaryButtonHref}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-secondary/80 hover:bg-secondary text-secondary-foreground text-sm font-mono border border-border transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
              >
                <Mail className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <span>{secondaryButtonText}</span>
              </a>
            )}
          </div>

          <p className="text-xs text-muted-foreground mt-6 font-mono">
            Direct access to builders • No sales intermediaries • Response within 24–48h
          </p>
        </div>
      </div>
    </section>
  );
}
