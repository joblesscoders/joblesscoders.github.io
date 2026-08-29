"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Code2, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";

export function HeroCodePreviewWidget() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const { setTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const tabPreviewRef = useRef<HTMLButtonElement>(null);
  const tabCodeRef = useRef<HTMLButtonElement>(null);

  // Read URL search params on mount for deep linking and visual QA
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("tab") === "code") {
      setActiveTab("code");
    }
    const themeParam = params.get("theme");
    if (themeParam === "light" || themeParam === "dark") {
      setTheme(themeParam);
    }
  }, [setTheme]);

  // Desktop-only subtle cursor parallax bloom (disabled on coarse pointers & reduced motion)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 50, y: 50 });
  }, []);

  // Keyboard navigation for accessible tablist
  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    currentTab: "preview" | "code"
  ) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const nextTab = currentTab === "preview" ? "code" : "preview";
      setActiveTab(nextTab);
      if (nextTab === "preview") {
        tabPreviewRef.current?.focus();
      } else {
        tabCodeRef.current?.focus();
      }
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveTab("preview");
      tabPreviewRef.current?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveTab("code");
      tabCodeRef.current?.focus();
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hero-card-wrapper w-full max-w-[480px] lg:max-w-[490px] relative select-none mx-auto"
    >
      {/* Theme-aware layered ambient backlight glow */}
      <div
        className="absolute -inset-2 rounded-[32px] opacity-40 dark:opacity-30 blur-2xl pointer-events-none -z-10 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.25), rgba(56, 189, 248, 0.15) 50%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* Main Glassmorphic Intent Console */}
      <div className="relative rounded-[26px] border border-black/[0.07] dark:border-white/[0.08] bg-white/90 dark:bg-[#08090c]/90 backdrop-blur-2xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.03)] overflow-hidden transition-all duration-300">
        {/* Subtle Apple-style radial mesh highlights */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(168, 85, 247, 0.12), rgba(56, 189, 248, 0.08) 35%, transparent 65%)`,
          }}
          aria-hidden="true"
        />

        {/* Console Header Bar */}
        <div className="relative px-3 sm:px-5 py-2 sm:py-3 border-b border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between gap-2 z-10">
          {/* Decorative macOS window dots (hidden on tiny mobile, visible on tablet/desktop) */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/75 dark:bg-[#FF5F56]/60 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/75 dark:bg-[#FFBD2E]/60 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/75 dark:bg-[#27C93F]/60 inline-block" />
          </div>

          {/* Accessible Segmented Tab Switcher */}
          <div
            role="tablist"
            aria-label="Intent console display modes"
            className="w-full sm:w-auto grid grid-cols-2 sm:flex items-center p-0.5 sm:p-1 rounded-xl bg-neutral-100/90 dark:bg-white/[0.05] border border-black/[0.04] dark:border-white/[0.06]"
          >
            <button
              ref={tabPreviewRef}
              id="hero-tab-preview"
              type="button"
              role="tab"
              aria-selected={activeTab === "preview"}
              aria-controls="hero-panel-preview"
              tabIndex={activeTab === "preview" ? 0 : -1}
              onClick={() => setActiveTab("preview")}
              onKeyDown={(e) => handleTabKeyDown(e, "preview")}
              className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                activeTab === "preview"
                  ? "bg-white dark:bg-white/12 text-neutral-900 dark:text-white shadow-xs font-semibold"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 shrink-0" aria-hidden="true" />
              <span>Preview</span>
            </button>

            <button
              ref={tabCodeRef}
              id="hero-tab-code"
              type="button"
              role="tab"
              aria-selected={activeTab === "code"}
              aria-controls="hero-panel-code"
              tabIndex={activeTab === "code" ? 0 : -1}
              onClick={() => setActiveTab("code")}
              onKeyDown={(e) => handleTabKeyDown(e, "code")}
              className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                activeTab === "code"
                  ? "bg-white dark:bg-white/12 text-neutral-900 dark:text-white shadow-xs font-semibold"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 shrink-0" aria-hidden="true" />
              <span>HireJobless.tsx</span>
            </button>
          </div>
        </div>

        {/* Tab Panel 1: Preview (Default) */}
        <div
          id="hero-panel-preview"
          role="tabpanel"
          aria-labelledby="hero-tab-preview"
          hidden={activeTab !== "preview"}
          className={`relative h-[340px] sm:h-[350px] p-3.5 sm:p-6 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-200 ${
            activeTab === "preview" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
          }`}
        >
          {/* 4 Quiet Spatially Positioned Floating Chips */}
          <span
            aria-hidden="true"
            className="animate-drift-1 pointer-events-none absolute top-3 left-2.5 sm:top-5 sm:left-5 inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-neutral-100/80 dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] text-[10.5px] sm:text-xs font-medium text-neutral-600 dark:text-neutral-300 shadow-xs backdrop-blur-md"
          >
            6 senior builders
          </span>

          <span
            aria-hidden="true"
            className="animate-drift-2 pointer-events-none absolute top-3 right-2.5 sm:top-5 sm:right-5 inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-neutral-100/80 dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] text-[10.5px] sm:text-xs font-medium text-neutral-600 dark:text-neutral-300 shadow-xs backdrop-blur-md"
          >
            Direct collaboration
          </span>

          <span
            aria-hidden="true"
            className="animate-drift-3 pointer-events-none absolute bottom-3 left-2.5 sm:bottom-5 sm:left-5 inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-neutral-100/80 dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] text-[10px] sm:text-xs font-medium text-neutral-600 dark:text-neutral-300 shadow-xs backdrop-blur-md"
          >
            Web &middot; Mobile &middot; AI &middot; Cloud
          </span>

          <span
            aria-hidden="true"
            className="animate-drift-4 pointer-events-none absolute bottom-3 right-2.5 sm:bottom-5 sm:right-5 inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-neutral-100/80 dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] text-[10.5px] sm:text-xs font-medium text-neutral-600 dark:text-neutral-300 shadow-xs backdrop-blur-md"
          >
            You own the code
          </span>

          {/* Central Spatial Composition */}
          <div className="flex flex-col items-center justify-center max-w-[300px] sm:max-w-[320px] mx-auto z-10">
            {/* Abstract Engineering Mark */}
            <div
              className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-indigo-500/10 dark:from-violet-500/20 dark:via-purple-500/20 dark:to-indigo-500/20 border border-violet-500/20 dark:border-violet-400/30 flex items-center justify-center text-violet-600 dark:text-violet-400 shadow-xs mb-3"
              aria-hidden="true"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m16 18 6-6-6-6" />
                <path d="m8 6-6 6 6 6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>

            {/* Short 2-line Statement */}
            <p className="text-[17px] sm:text-[18px] font-semibold text-neutral-900 dark:text-white tracking-tight leading-snug mb-4">
              Your senior product team,
              <br />
              <span className="text-neutral-500 dark:text-neutral-400 font-normal text-[15px] sm:text-[16px]">
                ready when the roadmap is.
              </span>
            </p>

            {/* Dominant Primary Clickable CTA */}
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 font-semibold text-sm transition-all duration-200 shadow-lg shadow-neutral-950/15 dark:shadow-white/10 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 min-h-[44px]"
            >
              <span>Hire us</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>

            {/* Small Availability Note */}
            <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 mt-3">
              Available for select projects
            </p>
          </div>
        </div>

        {/* Tab Panel 2: HireJobless.tsx (Code View) */}
        <div
          id="hero-panel-code"
          role="tabpanel"
          aria-labelledby="hero-tab-code"
          hidden={activeTab !== "code"}
          className={`relative h-[340px] sm:h-[350px] p-3.5 sm:p-5 flex flex-col justify-between overflow-hidden text-left font-mono transition-all duration-200 ${
            activeTab === "code" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
          }`}
        >
          {/* Syntax Highlighted Code (9-11 Lines, zero scroll) */}
          <div className="text-[11px] sm:text-[12px] leading-[1.65] text-neutral-800 dark:text-neutral-200 select-text overflow-hidden font-mono">
            <div className="flex items-center">
              <span className="w-5 text-right mr-3 text-neutral-300 dark:text-neutral-700 select-none text-[10px]" aria-hidden="true">1</span>
              <span>
                <span className="text-purple-600 dark:text-purple-400 font-medium">import</span>
                <span className="text-neutral-500 dark:text-neutral-400"> &#123; </span>
                <span className="text-indigo-600 dark:text-cyan-300 font-semibold">Jobless</span>
                <span className="text-neutral-500 dark:text-neutral-400"> &#125; </span>
                <span className="text-purple-600 dark:text-purple-400 font-medium">from</span>
                <span className="text-emerald-600 dark:text-emerald-400"> &quot;@jobless/core&quot;</span>
                <span className="text-neutral-500 dark:text-neutral-400">;</span>
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-5 text-right mr-3 text-neutral-300 dark:text-neutral-700 select-none text-[10px]" aria-hidden="true">2</span>
              <span>&nbsp;</span>
            </div>

            <div className="flex items-center">
              <span className="w-5 text-right mr-3 text-neutral-300 dark:text-neutral-700 select-none text-[10px]" aria-hidden="true">3</span>
              <span>
                <span className="text-purple-600 dark:text-purple-400 font-medium">export default function </span>
                <span className="text-amber-600 dark:text-amber-300 font-semibold">HireJobless</span>
                <span className="text-neutral-500 dark:text-neutral-400">() &#123;</span>
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-5 text-right mr-3 text-neutral-300 dark:text-neutral-700 select-none text-[10px]" aria-hidden="true">4</span>
              <span>
                <span className="text-neutral-500 dark:text-neutral-400">&nbsp;&nbsp;</span>
                <span className="text-purple-600 dark:text-purple-400 font-medium">return</span>
                <span className="text-neutral-500 dark:text-neutral-400"> (</span>
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-5 text-right mr-3 text-neutral-300 dark:text-neutral-700 select-none text-[10px]" aria-hidden="true">5</span>
              <span>
                <span className="text-neutral-500 dark:text-neutral-400">&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                <span className="text-indigo-600 dark:text-cyan-300 font-semibold">Jobless</span>
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-5 text-right mr-3 text-neutral-300 dark:text-neutral-700 select-none text-[10px]" aria-hidden="true">6</span>
              <span>
                <span className="text-neutral-500 dark:text-neutral-400">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="text-amber-700 dark:text-indigo-300">team</span>
                <span className="text-neutral-500 dark:text-neutral-400">=</span>
                <span className="text-emerald-600 dark:text-emerald-400">&quot;senior&quot;</span>
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-5 text-right mr-3 text-neutral-300 dark:text-neutral-700 select-none text-[10px]" aria-hidden="true">7</span>
              <span>
                <span className="text-neutral-500 dark:text-neutral-400">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className="text-amber-700 dark:text-indigo-300">capabilities</span>
                <span className="text-neutral-500 dark:text-neutral-400">=&#123;[</span>
                <span className="text-emerald-600 dark:text-emerald-400">&quot;web&quot;</span>
                <span className="text-neutral-500 dark:text-neutral-400">, </span>
                <span className="text-emerald-600 dark:text-emerald-400">&quot;mobile&quot;</span>
                <span className="text-neutral-500 dark:text-neutral-400">, </span>
                <span className="text-emerald-600 dark:text-emerald-400">&quot;ai&quot;</span>
                <span className="text-neutral-500 dark:text-neutral-400">, </span>
                <span className="text-emerald-600 dark:text-emerald-400">&quot;cloud&quot;</span>
                <span className="text-neutral-500 dark:text-neutral-400">]&#125;</span>
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-5 text-right mr-3 text-neutral-300 dark:text-neutral-700 select-none text-[10px]" aria-hidden="true">8</span>
              <span>
                <span className="text-neutral-500 dark:text-neutral-400">&nbsp;&nbsp;&nbsp;&nbsp;&gt;</span>
              </span>
            </div>

            {/* Focal Highlight Line */}
            <div className="flex items-center bg-violet-500/[0.07] dark:bg-violet-500/15 py-0.5 -mx-1.5 px-1.5 rounded-md border-l-2 border-violet-500">
              <span className="w-5 text-right mr-3 text-violet-500/70 select-none text-[10px]" aria-hidden="true">9</span>
              <span>
                <span className="text-neutral-500 dark:text-neutral-400">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>
                <span className="text-violet-700 dark:text-violet-300 font-semibold">HireUs</span>
                <span className="text-amber-700 dark:text-indigo-300">&nbsp;href</span>
                <span className="text-neutral-500 dark:text-neutral-400">=</span>
                <span className="text-emerald-600 dark:text-emerald-400">&quot;/contact&quot;</span>
                <span className="text-neutral-500 dark:text-neutral-400">&nbsp;/&gt;</span>
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-5 text-right mr-3 text-neutral-300 dark:text-neutral-700 select-none text-[10px]" aria-hidden="true">10</span>
              <span>
                <span className="text-neutral-500 dark:text-neutral-400">&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>
                <span className="text-indigo-600 dark:text-cyan-300 font-semibold">Jobless</span>
                <span className="text-neutral-500 dark:text-neutral-400">&gt;</span>
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-5 text-right mr-3 text-neutral-300 dark:text-neutral-700 select-none text-[10px]" aria-hidden="true">11</span>
              <span>
                <span className="text-neutral-500 dark:text-neutral-400">&nbsp;&nbsp;);</span>
              </span>
            </div>

            <div className="flex items-center">
              <span className="w-5 text-right mr-3 text-neutral-300 dark:text-neutral-700 select-none text-[10px]" aria-hidden="true">12</span>
              <span>
                <span className="text-neutral-500 dark:text-neutral-400">&#125;</span>
              </span>
            </div>
          </div>

          {/* Clean Bottom Link */}
          <div className="pt-2.5 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between text-xs font-sans">
            <span className="text-neutral-400 dark:text-neutral-500 text-[11px] font-mono">
              @jobless/core
            </span>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-500 transition-colors"
            >
              <span>Hire us</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCodePreviewWidget;

