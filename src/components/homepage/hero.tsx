import React from "react";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
      {/* Subtle Static Background Grid / Gradient (No eager WebGL) */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-30">
        <div className="w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Playful Micro-Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border shadow-sm text-xs font-mono text-muted-foreground mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available for Q3/Q4 Engagements</span>
          <span className="text-border">|</span>
          <span className="text-violet-400 font-semibold">GMT+6 Dhaka</span>
        </div>

        {/* Value Proposition Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-5xl mx-auto leading-[1.1] mb-6">
          Senior Engineering Collective for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400">
            High-Impact Software
          </span>
        </h1>

        {/* Support Copy */}
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10">
          We partner with ambitious startups and technology teams to engineer production web platforms, cross-platform mobile apps, and custom AI workflows. Direct access to 6 senior builders with zero agency overhead.
        </p>

        {/* Dual Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-14">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-colors shadow-lg shadow-violet-600/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 focus-visible:outline-offset-2"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/work"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-card hover:bg-muted text-foreground border border-border font-medium text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 focus-visible:outline-offset-2"
          >
            <span>View Our Work</span>
          </Link>
        </div>

        {/* Micro-Brand Studio Detail */}
        <div className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Terminal className="w-3.5 h-3.5 text-violet-400" />
          <span>
            {"<"}Job<span className="text-red-400">less</span> Coders{"/>"} &mdash; Full-Stack, AI & Cloud Systems
          </span>
        </div>
      </div>
    </section>
  );
}
