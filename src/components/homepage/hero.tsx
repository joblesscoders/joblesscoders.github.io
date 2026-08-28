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
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            // Clean up inline styles so CSS hover states work seamlessly
            gsap.set(
              [
                ".hero-badge",
                ".hero-line",
                ".hero-line-accent",
                ".hero-rotating",
                ".hero-desc",
                ".hero-cta-btn",
                ".hero-meta",
                ".hero-globe-wrapper",
              ],
              { clearProps: "transform,opacity,visibility" }
            );
          },
        });

        tl.fromTo(
          ".hero-badge",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.4 }
        )
          .fromTo(
            ".hero-line",
            { yPercent: 105 },
            { yPercent: 0, duration: 0.72, stagger: 0.08 },
            "-=0.25"
          )
          .fromTo(
            ".hero-line-accent",
            { yPercent: 105 },
            { yPercent: 0, duration: 0.68 },
            "-=0.4"
          )
          .fromTo(
            ".hero-rotating",
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.4 },
            "-=0.3"
          )
          .fromTo(
            ".hero-desc",
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.45 },
            "-=0.25"
          )
          .fromTo(
            ".hero-cta-btn",
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.08 },
            "-=0.25"
          )
          .fromTo(
            ".hero-meta",
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.35 },
            "-=0.2"
          )
          .fromTo(
            ".hero-globe-wrapper",
            { autoAlpha: 0, scale: 0.95 },
            { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power2.out" },
            "-=0.5"
          );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      aria-label="Studio Hero"
      className="relative overflow-x-clip pt-6 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24 flex items-center min-h-[calc(100svh-5.5rem)]"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-35 pointer-events-none" aria-hidden="true">
        <div className="w-[540px] h-[540px] lg:w-[680px] lg:h-[680px] rounded-full bg-violet-600/15 blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Responsive 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 1–7 (Desktop) / 100% (Mobile) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Availability Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border shadow-sm text-xs font-mono text-muted-foreground mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span className="font-medium text-foreground">Available for Q3/Q4 Engagements</span>
              <span className="text-border" aria-hidden="true">|</span>
              <span className="text-violet-400 font-semibold">GMT+6 Dhaka</span>
            </div>

            {/* SEO-Friendly Semantic H1 with Masked Line Wrappers */}
            <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] font-bold tracking-tight text-foreground leading-[1.1] mb-5">
              <span className="block overflow-hidden">
                <span className="hero-line block">Senior Engineering Collective</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line block">for High-Impact Software</span>
              </span>
              <span className="block overflow-hidden mt-1">
                <span className="hero-line-accent block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400">
                  Built for Production Scale.
                </span>
              </span>
            </h1>

            {/* Fixed-Height Rotating Phrase Subheading */}
            <div className="hero-rotating flex items-center gap-2.5 h-9 sm:h-10 mb-5 text-sm sm:text-base font-mono text-muted-foreground">
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
            <p className="hero-desc text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8">
              We partner with high-growth startups and enterprise teams to engineer reliable Next.js web applications, React Native mobile apps, and LLM automation pipelines. Direct access to 6 senior leads with zero middle-management overhead.
            </p>

            {/* Dual CTAs */}
            <div className="hero-cta flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-8">
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
            <div className="hero-meta inline-flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <Terminal className="w-3.5 h-3.5 text-violet-400 shrink-0" aria-hidden="true" />
              <span>
                {"<"}Job<span className="text-red-400">less</span> Coders{"/>"} &mdash; Full-Stack, Mobile, AI & Cloud Systems
              </span>
            </div>
          </div>

          {/* Right Column: 8–12 (Desktop) / Bottom Visual (Mobile) */}
          <div className="lg:col-span-5 flex justify-center items-center relative mt-6 lg:mt-0">
            <div className="hero-globe-wrapper w-full flex justify-center items-center">
              <GlobeContainer className="w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[500px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
