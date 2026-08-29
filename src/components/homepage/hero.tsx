"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { HeroCodePreviewWidget } from "@/components/homepage/HeroCodePreviewWidget";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const revealTargets = [
          ".hero-badge",
          ".hero-title-line",
          ".hero-desc",
          ".hero-pills",
          ".hero-cta-group",
          ".hero-card-wrapper",
        ];

        const showEverything = () => {
          gsap.set(revealTargets, {
            clearProps: "transform,opacity,visibility,willChange",
          });
        };

        const visibilityFallback = window.setTimeout(showEverything, 1200);

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: () => {
            window.clearTimeout(visibilityFallback);
            showEverything();
          },
          onInterrupt: showEverything,
        });

        tl.fromTo(
          ".hero-badge",
          { autoAlpha: 0, y: 14, willChange: "transform, opacity" },
          { autoAlpha: 1, y: 0, duration: 0.4 }
        )
          .fromTo(
            ".hero-title-line",
            { autoAlpha: 0, y: 20, willChange: "transform, opacity" },
            { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08 },
            "-=0.2"
          )
          .fromTo(
            ".hero-desc",
            { autoAlpha: 0, y: 16, willChange: "transform, opacity" },
            { autoAlpha: 1, y: 0, duration: 0.45 },
            "-=0.3"
          )
          .fromTo(
            ".hero-pills",
            { autoAlpha: 0, y: 12, willChange: "transform, opacity" },
            { autoAlpha: 1, y: 0, duration: 0.4 },
            "-=0.25"
          )
          .fromTo(
            ".hero-cta-group",
            { autoAlpha: 0, y: 12, willChange: "transform, opacity" },
            { autoAlpha: 1, y: 0, duration: 0.4 },
            "-=0.25"
          )
          .fromTo(
            ".hero-card-wrapper",
            { autoAlpha: 0, y: 24, scale: 0.98, willChange: "transform, opacity" },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" },
            "-=0.35"
          );

        return () => window.clearTimeout(visibilityFallback);
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      aria-label="Jobless Coders Hero"
      className="relative overflow-hidden py-6 sm:py-8 lg:py-10 flex items-center min-h-[calc(100svh-4.5rem)] lg:max-h-[calc(100vh-70px)]"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute inset-0 -z-10 flex items-center justify-center opacity-30 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-[600px] h-[600px] lg:w-[750px] lg:h-[750px] rounded-full bg-violet-600/15 blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* 12-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: 1–7 (Desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Super-title Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/90 border border-violet-500/30 shadow-xs text-xs font-mono mb-4 text-violet-600 dark:text-violet-400">
              <span className="w-2 h-2 rounded-full bg-violet-600 dark:bg-violet-400 animate-pulse" aria-hidden="true" />
              <span className="font-semibold text-foreground">✦ Modern Full-Stack & AI Solutions</span>
            </div>

            {/* Semantic H1 (Max 8 words) */}
            <h1 className="hero-title text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-bold tracking-tight text-foreground leading-[1.08] mb-4">
              <span className="hero-title-line block">
                Engineering high-scale software
              </span>
              <span className="hero-title-line block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600 dark:from-violet-400 dark:via-purple-300 dark:to-indigo-400">
                for ambitious teams.
              </span>
            </h1>

            {/* Subtitle: Max 2 concise sentences */}
            <p className="hero-desc text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed mb-5">
              Senior-only engineering squad building production web platforms, distributed AI workflows, and cloud systems. Direct builder access with zero agency bloat or junior handoffs.
            </p>

            {/* Metric Pills */}
            <div className="hero-pills flex flex-wrap items-center gap-2 sm:gap-2.5 mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 text-[11px] sm:text-xs font-mono text-neutral-700 dark:text-neutral-300 shadow-xs">
                <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" aria-hidden="true" />
                <span>⚡ 48h Sprint Kickoff</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 text-[11px] sm:text-xs font-mono text-neutral-700 dark:text-neutral-300 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                <span>🛡️ Production-Grade Security</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 text-[11px] sm:text-xs font-mono text-neutral-700 dark:text-neutral-300 shadow-xs">
                <TrendingUp className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 shrink-0" aria-hidden="true" />
                <span>📈 99.9% Uptime</span>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="hero-cta-group flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all duration-150 shadow-lg shadow-violet-600/25 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 focus-visible:outline-offset-2 min-h-[46px]"
              >
                <span>Book a Discovery Call</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-card hover:bg-muted text-foreground border border-border font-medium text-sm transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 focus-visible:outline-offset-2 min-h-[46px]"
              >
                <span>Explore Work</span>
              </Link>
            </div>
          </div>

          {/* Right Column: 8–12 (Desktop) — Dual-Mode Interactive Code & Live Preview Widget */}
          <div className="lg:col-span-5 flex justify-center items-center relative mt-4 lg:mt-0">
            <HeroCodePreviewWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
