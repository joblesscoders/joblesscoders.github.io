"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Terminal,
  Zap,
  ShieldCheck,
  TrendingUp,
  Copy,
  Check,
  Activity,
  Cpu,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const CODE_TABS = [
  {
    id: "pipeline",
    filename: "pipeline.ts",
    language: "TypeScript",
    lines: [
      { num: 1, content: 'import { createPipeline } from "@jc/ai-runtime";', type: "import" },
      { num: 2, content: "", type: "empty" },
      { num: 3, content: "// Distributed zero-latency AI workflow pipeline", type: "comment" },
      { num: 4, content: "export const distributedAgent = createPipeline({", type: "code" },
      { num: 5, content: '  model: "claude-3-7-sonnet",', type: "code" },
      { num: 6, content: '  ragVectorStore: "pgvector://enterprise-db",', type: "code" },
      { num: 7, content: "  concurrency: 128,", type: "code" },
      { num: 8, content: "  guardrails: { maxLatencyMs: 180, deterministic: true },", type: "accent" },
      { num: 9, content: "});", type: "code" },
      { num: 10, content: "", type: "empty" },
      { num: 11, content: "export async function handleRequest(query: string) {", type: "code" },
      { num: 12, content: "  const result = await distributedAgent.execute({ query });", type: "code" },
      { num: 13, content: "  return { status: 200, metrics: result.telemetry };", type: "code" },
      { num: 14, content: "}", type: "code" },
    ],
  },
  {
    id: "metrics",
    filename: "metrics.json",
    language: "JSON",
    lines: [
      { num: 1, content: "{", type: "code" },
      { num: 2, content: '  "cluster": "Production [GMT+6 Dhaka & Global Edge]",', type: "code" },
      { num: 3, content: '  "uptime": "99.994%",', type: "accent" },
      { num: 4, content: '  "p99_latency": "14.2ms",', type: "accent" },
      { num: 5, content: '  "throughput": "14,820 req/sec",', type: "accent" },
      { num: 6, content: '  "sprint_kickoff": "48 Hours",', type: "code" },
      { num: 7, content: '  "code_ownership": "100% Full IP Transfer",', type: "code" },
      { num: 8, content: '  "status": "HEALTHY_OPTIMAL"', type: "code" },
      { num: 9, content: "}", type: "code" },
    ],
  },
  {
    id: "architecture",
    filename: "architecture.rs",
    language: "Rust",
    lines: [
      { num: 1, content: "pub struct CloudOrchestrator {", type: "code" },
      { num: 2, content: "    pub vpc_cluster: Arc<ECSCluster>,", type: "code" },
      { num: 3, content: "    pub stream_buffer: LockFreeRingBuffer<Event>,", type: "code" },
      { num: 4, content: "}", type: "code" },
      { num: 5, content: "", type: "empty" },
      { num: 6, content: "impl CloudOrchestrator {", type: "code" },
      { num: 7, content: "    pub async fn dispatch_zero_downtime(&self) -> Result<HealthReport> {", type: "code" },
      { num: 8, content: "        self.vpc_cluster.deploy_staged_canary().await", type: "accent" },
      { num: 9, content: "    }", type: "code" },
      { num: 10, content: "}", type: "code" },
    ],
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeTabId, setActiveTabId] = useState("pipeline");
  const [copied, setCopied] = useState(false);
  const [liveReqs, setLiveReqs] = useState(14820);

  // Subtle live ticker for system throughput
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveReqs((prev) => prev + Math.floor(Math.random() * 11) - 5);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const activeTab = CODE_TABS.find((t) => t.id === activeTabId) || CODE_TABS[0];

  const handleCopyCode = () => {
    const codeText = activeTab.lines.map((l) => l.content).join("\n");
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

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

          {/* Right Column: 8–12 (Desktop) — Interactive Architecture & Code Card */}
          <div className="lg:col-span-5 flex justify-center items-center relative mt-4 lg:mt-0">
            <div className="hero-card-wrapper w-full max-w-[500px]">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/95 backdrop-blur-xl shadow-2xl overflow-hidden text-left font-mono">
                {/* Window Header */}
                <div className="px-4 py-3 bg-neutral-900/80 border-b border-neutral-800 flex items-center justify-between">
                  {/* macOS dots & Active Tab Picker */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>

                    <div className="flex items-center gap-1 ml-2" role="tablist" aria-label="Code tabs">
                      {CODE_TABS.map((tab) => (
                        <button
                          key={tab.id}
                          role="tab"
                          aria-selected={activeTabId === tab.id}
                          onClick={() => setActiveTabId(tab.id)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                            activeTabId === tab.id
                              ? "bg-neutral-800 text-violet-300 border border-neutral-700"
                              : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40"
                          }`}
                        >
                          {tab.filename}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    aria-label="Copy code to clipboard"
                    className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Live Uptime & Status Strip */}
                <div className="px-4 py-2 bg-neutral-900/40 border-b border-neutral-800/60 flex items-center justify-between text-[11px]">
                  <div className="inline-flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-emerald-400 font-semibold">99.99% Uptime</span>
                    <span className="text-neutral-600">|</span>
                    <span className="text-neutral-400">Production Active</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider">
                    {activeTab.language}
                  </div>
                </div>

                {/* Code Window */}
                <div className="p-4 overflow-x-auto text-[11.5px] leading-relaxed select-text min-h-[220px] max-h-[260px]">
                  <table className="w-full border-collapse">
                    <tbody>
                      {activeTab.lines.map((line) => (
                        <tr key={line.num} className="hover:bg-neutral-900/40 transition-colors">
                          <td className="w-6 pr-3 text-right text-neutral-600 select-none text-[10px] align-top py-0.5">
                            {line.num}
                          </td>
                          <td className="py-0.5 pl-1 whitespace-pre font-mono">
                            {line.type === "import" && (
                              <span className="text-violet-400">{line.content}</span>
                            )}
                            {line.type === "comment" && (
                              <span className="text-neutral-500 italic">{line.content}</span>
                            )}
                            {line.type === "accent" && (
                              <span className="text-emerald-400 font-medium bg-emerald-500/10 px-1 py-0.5 rounded">
                                {line.content}
                              </span>
                            )}
                            {line.type === "code" && (
                              <span className="text-neutral-200">{line.content}</span>
                            )}
                            {line.type === "empty" && <span>&nbsp;</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Live System Metrics Footer */}
                <div className="px-4 py-3 bg-neutral-900/95 border-t border-neutral-800 grid grid-cols-3 gap-2 text-center text-[10.5px]">
                  <div className="p-1.5 rounded-lg bg-neutral-950/80 border border-neutral-800">
                    <div className="text-neutral-400 text-[10px] uppercase">Latency (p99)</div>
                    <div className="font-semibold text-neutral-100 mt-0.5 flex items-center justify-center gap-1">
                      <Activity className="w-3 h-3 text-emerald-400" />
                      <span>&lt; 14ms</span>
                    </div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-neutral-950/80 border border-neutral-800">
                    <div className="text-neutral-400 text-[10px] uppercase">Throughput</div>
                    <div className="font-semibold text-neutral-100 mt-0.5 flex items-center justify-center gap-1">
                      <Cpu className="w-3 h-3 text-violet-400" />
                      <span>{liveReqs.toLocaleString()} r/s</span>
                    </div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-neutral-950/80 border border-neutral-800">
                    <div className="text-neutral-400 text-[10px] uppercase">Pipeline</div>
                    <div className="font-semibold text-emerald-400 mt-0.5 flex items-center justify-center gap-1">
                      <Terminal className="w-3 h-3 text-emerald-400" />
                      <span>Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
