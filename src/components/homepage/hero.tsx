"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import GlobeContainer from "./GlobeContainer";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.from(".hero-badge", {
          opacity: 0,
          y: 12,
          duration: 0.35,
        })
          .from(
            ".hero-title",
            {
              opacity: 0,
              y: 16,
              duration: 0.4,
            },
            "-=0.2"
          )
          .from(
            ".hero-desc",
            {
              opacity: 0,
              y: 12,
              duration: 0.35,
            },
            "-=0.2"
          )
          .from(
            ".hero-cta",
            {
              opacity: 0,
              y: 10,
              duration: 0.3,
            },
            "-=0.15"
          )
          .from(
            ".hero-globe",
            {
              opacity: 0,
              y: 10,
              duration: 0.4,
            },
            "-=0.15"
          )
          .from(
            ".hero-meta",
            {
              opacity: 0,
              duration: 0.3,
            },
            "-=0.15"
          );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [".hero-badge", ".hero-title", ".hero-desc", ".hero-cta", ".hero-globe", ".hero-meta"],
          {
            opacity: 1,
            y: 0,
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28"
    >
      {/* Subtle Static Background Grid / Gradient */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-30">
        <div className="w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Micro-Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border shadow-sm text-xs font-mono text-muted-foreground mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Available for Q3/Q4 Engagements</span>
          <span className="text-border">|</span>
          <span className="text-violet-400 font-semibold">GMT+6 Dhaka</span>
        </div>

        {/* Value Proposition Heading */}
        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-5xl mx-auto leading-[1.1] mb-6">
          Senior Engineering Collective for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400">
            High-Impact Software
          </span>
        </h1>

        {/* Support Copy */}
        <p className="hero-desc text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10">
          We partner with ambitious startups and technology teams to engineer production web platforms, cross-platform mobile apps, and custom AI workflows. Direct access to 6 senior builders with zero agency overhead.
        </p>

        {/* Dual Primary CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-all duration-150 shadow-lg shadow-violet-600/25 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 focus-visible:outline-offset-2"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/work"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-card hover:bg-muted text-foreground border border-border font-medium text-sm transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 focus-visible:outline-offset-2"
          >
            <span>View Our Work</span>
          </Link>
        </div>

        {/* Optional Ambient Globe Graphic (Static SVG first, Lazy WebGL enhancement on Desktop) */}
        <div className="hero-globe flex justify-center mb-8">
          <GlobeContainer />
        </div>

        {/* Micro-Brand Studio Detail */}
        <div className="hero-meta inline-flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Terminal className="w-3.5 h-3.5 text-violet-400" />
          <span>
            {"<"}Job<span className="text-red-400">less</span> Coders{"/>"} &mdash; Full-Stack, AI & Cloud Systems
          </span>
        </div>
      </div>
    </section>
  );
}
