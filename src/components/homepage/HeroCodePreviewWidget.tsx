"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  Code2,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  Layers,
  Terminal,
  Activity,
} from "lucide-react";

interface Token {
  text: string;
  type: "keyword" | "component" | "function" | "prop" | "string" | "punct";
}

interface LineDef {
  num: number;
  tokens: Token[];
}

const CODE_LINES: LineDef[] = [
  {
    num: 1,
    tokens: [
      { text: "import ", type: "keyword" },
      { text: "{ ", type: "punct" },
      { text: "SeniorSquad", type: "component" },
      { text: ", ", type: "punct" },
      { text: "FastDeploy", type: "component" },
      { text: " } ", type: "punct" },
      { text: "from ", type: "keyword" },
      { text: '"@joblesscoders/core"', type: "string" },
      { text: ";", type: "punct" },
    ],
  },
  { num: 2, tokens: [{ text: "", type: "punct" }] },
  {
    num: 3,
    tokens: [
      { text: "export default function ", type: "keyword" },
      { text: "HireSquad", type: "function" },
      { text: "() {", type: "punct" },
    ],
  },
  {
    num: 4,
    tokens: [
      { text: "  return (", type: "keyword" },
    ],
  },
  {
    num: 5,
    tokens: [
      { text: "    <", type: "punct" },
      { text: "SeniorSquad", type: "component" },
    ],
  },
  {
    num: 6,
    tokens: [
      { text: "      model", type: "prop" },
      { text: "=", type: "punct" },
      { text: '"Senior-Only / Zero Agency Bloat"', type: "string" },
    ],
  },
  {
    num: 7,
    tokens: [
      { text: "      kickoff", type: "prop" },
      { text: "=", type: "punct" },
      { text: '"Within 48 Hours"', type: "string" },
    ],
  },
  {
    num: 8,
    tokens: [
      { text: "      stack", type: "prop" },
      { text: "={[", type: "punct" },
      { text: '"Next.js"', type: "string" },
      { text: ", ", type: "punct" },
      { text: '"Python / AI Workflows"', type: "string" },
      { text: ", ", type: "punct" },
      { text: '"Cloud Rust"', type: "string" },
      { text: "]}", type: "punct" },
    ],
  },
  {
    num: 9,
    tokens: [
      { text: "      leadTime", type: "prop" },
      { text: "=", type: "punct" },
      { text: '"Immediate"', type: "string" },
    ],
  },
  {
    num: 10,
    tokens: [
      { text: "    >", type: "punct" },
    ],
  },
  {
    num: 11,
    tokens: [
      { text: "      <", type: "punct" },
      { text: "FastDeploy ", type: "component" },
      { text: "target", type: "prop" },
      { text: "=", type: "punct" },
      { text: '"Production" ', type: "string" },
      { text: "security", type: "prop" },
      { text: "=", type: "punct" },
      { text: '"Enterprise"', type: "string" },
      { text: " />", type: "punct" },
    ],
  },
  {
    num: 12,
    tokens: [
      { text: "    </", type: "punct" },
      { text: "SeniorSquad", type: "component" },
      { text: ">", type: "punct" },
    ],
  },
  {
    num: 13,
    tokens: [
      { text: "  );", type: "punct" },
    ],
  },
  {
    num: 14,
    tokens: [
      { text: "}", type: "punct" },
    ],
  },
];

const RAW_CODE_STRING = `import { SeniorSquad, FastDeploy } from "@joblesscoders/core";

export default function HireSquad() {
  return (
    <SeniorSquad
      model="Senior-Only / Zero Agency Bloat"
      kickoff="Within 48 Hours"
      stack={["Next.js", "Python / AI Workflows", "Cloud Rust"]}
      leadTime="Immediate"
    >
      <FastDeploy target="Production" security="Enterprise" />
    </SeniorSquad>
  );
}`;

const TOTAL_CHAR_COUNT = CODE_LINES.reduce((total, line) => {
  const lineLen = line.tokens.reduce((acc, t) => acc + t.text.length, 0);
  return total + lineLen + 1; // +1 for newline
}, 0);

export function HeroCodePreviewWidget() {
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");
  const [copied, setCopied] = useState(false);
  const [typedChars, setTypedChars] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Typewriter effect logic
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setTypedChars(TOTAL_CHAR_COUNT);
      setIsTypingComplete(true);
      return;
    }

    let current = 0;
    const typeNextChar = () => {
      if (current < TOTAL_CHAR_COUNT) {
        // Variable typing delay for organic feel
        current += Math.floor(Math.random() * 2) + 2;
        if (current > TOTAL_CHAR_COUNT) current = TOTAL_CHAR_COUNT;
        setTypedChars(current);

        const delay = Math.random() < 0.08 ? 80 : Math.random() * 18 + 12;
        timerRef.current = setTimeout(typeNextChar, delay);
      } else {
        setIsTypingComplete(true);
      }
    };

    timerRef.current = setTimeout(typeNextChar, 350);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleReplay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setTypedChars(0);
    setIsTypingComplete(false);

    let current = 0;
    const typeNextChar = () => {
      if (current < TOTAL_CHAR_COUNT) {
        current += Math.floor(Math.random() * 2) + 2;
        if (current > TOTAL_CHAR_COUNT) current = TOTAL_CHAR_COUNT;
        setTypedChars(current);

        const delay = Math.random() < 0.08 ? 70 : Math.random() * 16 + 10;
        timerRef.current = setTimeout(typeNextChar, delay);
      } else {
        setIsTypingComplete(true);
      }
    };
    timerRef.current = setTimeout(typeNextChar, 100);
  };

  const handleSkipToEnd = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setTypedChars(TOTAL_CHAR_COUNT);
    setIsTypingComplete(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(RAW_CODE_STRING);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render partially or fully typed line tokens
  const renderedCode = useMemo(() => {
    let charBudget = typedChars;
    let cursorPlaced = false;

    return CODE_LINES.map((lineDef) => {
      if (charBudget <= 0) {
        return {
          num: lineDef.num,
          visible: false,
          tokens: [] as { text: string; type: Token["type"] }[],
          hasCursor: false,
        };
      }

      const lineTokens: { text: string; type: Token["type"] }[] = [];
      let lineHasCursor = false;

      for (const token of lineDef.tokens) {
        if (charBudget <= 0) break;

        if (charBudget >= token.text.length) {
          lineTokens.push({ text: token.text, type: token.type });
          charBudget -= token.text.length;
        } else {
          // Token is partially typed
          const partialText = token.text.slice(0, charBudget);
          lineTokens.push({ text: partialText, type: token.type });
          charBudget = 0;
          if (!cursorPlaced) {
            lineHasCursor = true;
            cursorPlaced = true;
          }
          break;
        }
      }

      // Account for newline character
      if (charBudget > 0) {
        charBudget -= 1;
      } else if (!cursorPlaced && !lineHasCursor) {
        lineHasCursor = true;
        cursorPlaced = true;
      }

      return {
        num: lineDef.num,
        visible: lineTokens.length > 0 || lineDef.num === 1 || charBudget >= 0,
        tokens: lineTokens,
        hasCursor: lineHasCursor && !isTypingComplete,
      };
    });
  }, [typedChars, isTypingComplete]);

  return (
    <div className="hero-card-wrapper w-full max-w-[540px] relative select-none">
      {/* Subtle Ambient Radial Backlight Glows */}
      <div
        className="w-56 h-56 rounded-full bg-violet-600/25 blur-[70px] pointer-events-none absolute -top-12 -right-12 -z-10"
        aria-hidden="true"
      />
      <div
        className="w-56 h-56 rounded-full bg-cyan-500/20 blur-[70px] pointer-events-none absolute -bottom-10 -left-10 -z-10"
        aria-hidden="true"
      />

      {/* Main Glassmorphic Slate Container */}
      <div className="rounded-2xl border border-white/10 bg-[#080B11]/95 backdrop-blur-xl shadow-2xl shadow-purple-950/30 overflow-hidden text-left font-sans transition-all duration-300">
        {/* Top Bar Header */}
        <div className="px-4 py-3 bg-[#0D121D]/90 border-b border-white/10 flex items-center justify-between gap-2">
          {/* Left: macOS window controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block shadow-xs" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block shadow-xs" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block shadow-xs" />
            </div>

            {/* Tab Switcher Pills */}
            <div
              className="flex items-center bg-black/40 p-0.5 rounded-lg border border-white/10 ml-2"
              role="tablist"
              aria-label="Interactive Showcase Modes"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "code"}
                onClick={() => setActiveTab("code")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === "code"
                    ? "bg-violet-600/20 text-violet-300 border border-violet-500/30 shadow-xs"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>HireJobless.tsx</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "preview"}
                onClick={() => setActiveTab("preview")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-sans font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === "preview"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-xs"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                <span>Preview</span>
                <span className="relative flex h-1.5 w-1.5 ml-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
              </button>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5">
            {activeTab === "code" && (
              <>
                <button
                  type="button"
                  onClick={isTypingComplete ? handleReplay : handleSkipToEnd}
                  aria-label={isTypingComplete ? "Replay typing animation" : "Skip typing animation"}
                  title={isTypingComplete ? "Replay typing" : "Skip to end"}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  aria-label="Copy code to clipboard"
                  title="Copy code"
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[11px] text-emerald-400 font-sans font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-sans font-medium">Copy</span>
                    </>
                  )}
                </button>
              </>
            )}

            {activeTab === "preview" && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Component</span>
              </div>
            )}
          </div>
        </div>

        {/* View Mode 1: Code View (HireJobless.tsx) */}
        {activeTab === "code" && (
          <div className="p-4 sm:p-5 overflow-x-auto text-[12px] sm:text-[12.5px] leading-relaxed select-text font-mono min-h-[340px] max-h-[380px] flex flex-col justify-between">
            <table className="w-full border-collapse">
              <tbody>
                {renderedCode.map((line) => (
                  <tr key={line.num} className="hover:bg-white/[0.02] transition-colors">
                    <td className="w-6 pr-4 text-right text-neutral-600 select-none text-[11px] align-top py-0.5 font-mono">
                      {line.num}
                    </td>
                    <td className="py-0.5 pl-1 whitespace-pre font-mono">
                      {line.tokens.map((token, tIdx) => {
                        let colorClass = "text-neutral-300";
                        if (token.type === "keyword") colorClass = "text-purple-400 font-medium";
                        if (token.type === "component") colorClass = "text-cyan-400 font-semibold";
                        if (token.type === "function") colorClass = "text-amber-300 font-semibold";
                        if (token.type === "prop") colorClass = "text-indigo-300";
                        if (token.type === "string") colorClass = "text-emerald-400";
                        if (token.type === "punct") colorClass = "text-neutral-400";

                        return (
                          <span key={tIdx} className={colorClass}>
                            {token.text}
                          </span>
                        );
                      })}
                      {line.hasCursor && (
                        <span className="inline-block w-2 h-4 bg-cyan-400 ml-0.5 align-middle animate-pulse" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Quick Switch to Preview Banner */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-sans">
              <span className="text-neutral-400 text-[11px] font-mono">
                TypeScript &bull; Next.js 15 &bull; Core Runtime
              </span>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
              >
                <span>View Rendered Output</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* View Mode 2: Rendered Live Component (Preview) */}
        {activeTab === "preview" && (
          <div className="p-5 sm:p-6 min-h-[340px] max-h-[380px] flex flex-col justify-between text-left font-sans">
            <div>
              {/* Squad Header & Live Availability */}
              <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300 shadow-xs">
                    <Layers className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">
                      Senior Dedicated Squad
                    </h3>
                    <p className="text-[11px] font-mono text-neutral-400">
                      @joblesscoders/core &bull; Direct Builder Access
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>1 Squad Available</span>
                </div>
              </div>

              {/* Squad Configuration Specs */}
              <div className="grid grid-cols-2 gap-2.5 my-3.5 text-xs">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="text-[10.5px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-violet-400" />
                    <span>Model</span>
                  </div>
                  <div className="font-semibold text-white text-[11.5px]">
                    Senior-Only / Zero Bloat
                  </div>
                  <div className="text-[10px] text-neutral-400">
                    6 domain leads, zero junior handoffs
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="text-[10.5px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>Kickoff</span>
                  </div>
                  <div className="font-semibold text-emerald-400 text-[11.5px]">
                    Within 48 Hours
                  </div>
                  <div className="text-[10px] text-neutral-400">
                    Immediate Sprint 1 architecture kickoff
                  </div>
                </div>
              </div>

              {/* Stack Tags */}
              <div className="space-y-1.5 mb-4">
                <div className="text-[10.5px] font-mono text-neutral-400 uppercase tracking-wider">
                  Configured Stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-violet-500/10 border border-violet-500/20 text-violet-300 font-mono text-[11px]">
                    Next.js 15
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-[11px]">
                    Python / AI Workflows
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-[11px]">
                    Cloud Rust
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-300 font-mono text-[11px]">
                    AWS / VPC
                  </span>
                </div>
              </div>
            </div>

            {/* FastDeploy Bar & Interactive Action CTA */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  Target: Production
                </span>
                <span className="flex items-center gap-1 text-violet-300">
                  <Lock className="w-3 h-3" />
                  Enterprise IP
                </span>
              </div>

              <Link
                href="/contact?topic=Hire+Senior+Squad"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 hover:-translate-y-0.5 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
              >
                <span>Hire This Squad</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Live System Metrics Footer */}
        <div className="px-4 py-2.5 bg-[#0D121D]/95 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-[10.5px] font-mono">
          <div className="p-1 rounded-lg bg-black/40 border border-white/5">
            <div className="text-neutral-400 text-[10px] uppercase">Latency</div>
            <div className="font-semibold text-neutral-100 mt-0.5 flex items-center justify-center gap-1">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span>&lt; 14ms (p99)</span>
            </div>
          </div>
          <div className="p-1 rounded-lg bg-black/40 border border-white/5">
            <div className="text-neutral-400 text-[10px] uppercase">Sprints</div>
            <div className="font-semibold text-neutral-100 mt-0.5 flex items-center justify-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>2-Week Cycles</span>
            </div>
          </div>
          <div className="p-1 rounded-lg bg-black/40 border border-white/5">
            <div className="text-neutral-400 text-[10px] uppercase">Code IP</div>
            <div className="font-semibold text-emerald-400 mt-0.5 flex items-center justify-center gap-1">
              <Terminal className="w-3 h-3 text-emerald-400" />
              <span>100% Transfer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCodePreviewWidget;
