"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Terminal, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import GlobeContainer from "./GlobeContainer";

const ROTATING_PHRASES = [
  "Web platforms",
  "Mobile products",
  "AI automation",
  "Cloud systems",
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check reduced motion once on mount and manage rotating microcopy
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      setActivePhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const revealTargets = [
          ".hero-badge",
          ".hero-line",
          ".hero-line-accent",
          ".hero-rotating",
          ".hero-desc",
          ".hero-cta-btn",
          ".hero-meta",
          ".hero-globe-wrapper",
        ];

        const showEverything = () => {
          gsap.set(revealTargets, {
            clearProps: "transform,opacity,visibility",
          });
        };

        // Essential content must never remain hidden if animation setup is
        // interrupted by hydration, font loading, or a backgrounded tab.
        const visibilityFallback = window.setTimeout(showEverything, 1400);

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            window.clearTimeout(visibilityFallback);
            showEverything();
          },
          onInterrupt: showEverything,
        });

        tl.fromTo(
          ".hero-badge",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.28 }
        )
          .fromTo(
            ".hero-line",
            { yPercent: 110 },
            { yPercent: 0, duration: 0.5, stagger: 0.05 },
            "-=0.18"
          )
          .fromTo(
            ".hero-line-accent",
            { yPercent: 110 },
            { yPercent: 0, duration: 0.45 },
            "-=0.35"
          )
          .fromTo(
            [".hero-rotating", ".hero-desc"],
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.05 },
            "-=0.25"
          )
          .fromTo(
            ".hero-cta-btn",
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.05 },
            "-=0.2"
          )
          .fromTo(
            ".hero-meta",
            { autoAlpha: 0, y: 8 },
            { autoAlpha: 1, y: 0, duration: 0.25 },
            "-=0.18"
          )
          .fromTo(
            ".hero-globe-wrapper",
            { autoAlpha: 0, scale: 0.95 },
            { autoAlpha: 1, scale: 1, duration: 0.45, ease: "power2.out" },
            "<"
          );

        return () => window.clearTimeout(visibilityFallback);
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      aria-label="Studio Hero"
      className="relative overflow-x-clip pt-4 pb-10 sm:pt-6 sm:pb-12 lg:pt-8 lg:pb-12 flex items-center min-h-[calc(100svh-4rem)]"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-35 pointer-events-none" aria-hidden="true">
        <div className="w-[540px] h-[540px] lg:w-[680px] lg:h-[680px] rounded-full bg-violet-600/15 blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Responsive 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: 1–7 (Desktop) / 100% (Mobile) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Availability Badge */}
            <div className="hero-badge inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border shadow-sm text-[11px] sm:text-xs font-mono text-muted-foreground mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span className="font-medium text-foreground">Available for select engagements</span>
              <span className="text-border" aria-hidden="true">|</span>
              <span className="text-violet-400 font-semibold">GMT+6 Dhaka</span>
            </div>

            {/* SEO-Friendly Semantic H1 with Masked Line Wrappers */}
            <h1 className="hero-title text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-bold tracking-tight text-foreground leading-[1.04] mb-4">
              <span className="block overflow-hidden">
                <span className="hero-line block">Senior Engineers.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line block">High-Impact Software.</span>
              </span>
              <span className="block overflow-hidden mt-1">
                <span className="hero-line-accent block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400">
                  Built to Scale.
                </span>
              </span>
            </h1>

            {/* Fixed-Height Rotating Phrase Subheading */}
            <div className="hero-rotating flex items-center gap-2.5 h-8 sm:h-9 mb-4 text-xs sm:text-sm font-mono text-muted-foreground">
              <Sparkles className="w-4 h-4 text-violet-400 shrink-0" aria-hidden="true" />
              <span>We architect & deploy:</span>
              <div className="relative h-7 sm:h-8 overflow-hidden inline-flex items-center min-w-[170px]">
                {/* Complete SEO Text for crawlers & screen readers */}
                <span className="sr-only">
                  Specializing in Web platforms, Mobile products, AI automation, and Cloud systems.
                </span>

                {/* Visual animated rotating phrase */}
                {ROTATING_PHRASES.map((phrase, idx) => {
                  const isActive = isReducedMotion ? idx === 0 : idx === activePhraseIndex;
                  return (
                    <span
                      key={phrase}
                      aria-hidden={!isActive}
                      className={`absolute left-0 top-0 h-full flex items-center font-semibold text-violet-400 transition-all duration-300 transform ${
                        isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 -translate-y-3 pointer-events-none"
                      }`}
                    >
                      {phrase}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Concise Supporting Copy */}
            <p className="hero-desc text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed mb-6">
              Six senior engineers building production-ready web, mobile, AI, and cloud systems—without agency layers or junior handoffs.
            </p>

            {/* Dual CTAs */}
            <div className="hero-cta flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-6">
              <Link
                href="/contact"
                className="hero-cta-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-colors duration-150 shadow-lg shadow-violet-600/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 focus-visible:outline-offset-2 min-h-[44px]"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/work"
                className="hero-cta-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-card hover:bg-muted text-foreground border border-border font-medium text-sm transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 focus-visible:outline-offset-2 min-h-[44px]"
              >
                <span>View Our Work</span>
              </Link>
            </div>

            {/* Micro-Brand Studio Detail */}
            <div className="hero-meta hidden sm:inline-flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
              <Terminal className="w-3.5 h-3.5 text-violet-400 shrink-0" aria-hidden="true" />
              <span>
                {"<"}Job<span className="text-red-400">less</span> Coders{"/>"} &mdash; Full-Stack, Mobile, AI & Cloud Systems
              </span>
            </div>
          </div>

          {/* Right Column: 8–12 (Desktop) / Bottom Visual (Mobile) */}
          <div className="lg:col-span-5 flex justify-center items-center relative mt-2 lg:mt-0">
            <div className="hero-globe-wrapper w-full flex justify-center items-center">
              <GlobeContainer className="w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[500px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
