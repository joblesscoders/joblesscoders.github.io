"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Globe,
  Rocket,
  LayoutDashboard,
  Cpu,
  Smartphone,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Zap,
  Bot,
  ShieldCheck,
} from "lucide-react";

interface SolutionsMegaPanelProps {
  onItemClick?: () => void;
}

export const DELIVERABLE_LINKS = [
  {
    name: "E-commerce Platforms",
    href: "/solutions/ecommerce",
    description: "High-conversion headless storefronts & cart systems",
    icon: ShoppingCart,
  },
  {
    name: "Portfolio & Brand Websites",
    href: "/solutions/portfolio-websites",
    description: "Editorial brand experiences & Core Web Vitals",
    icon: Globe,
  },
  {
    name: "SaaS & MVP Development",
    href: "/solutions/saas-mvp",
    description: "Multi-tenant platforms & 4–6 week launches",
    icon: Rocket,
  },
  {
    name: "Business Portals & Dashboards",
    href: "/solutions/business-platforms",
    description: "Internal operations tools & real-time telemetry",
    icon: LayoutDashboard,
  },
  {
    name: "AI Automation Systems",
    href: "/solutions/ai-automation",
    description: "Custom RAG search & deterministic LLM agents",
    icon: Cpu,
  },
  {
    name: "Mobile Applications",
    href: "/solutions/mobile-apps",
    description: "Cross-platform iOS & Android React Native apps",
    icon: Smartphone,
  },
];

export const NEED_LINKS = [
  {
    name: "Launch a New Product",
    href: "/solutions/saas-mvp",
    description: "Full-stack build from initial schema to launch",
    icon: TrendingUp,
  },
  {
    name: "Modernize a Platform",
    href: "/solutions/business-platforms",
    description: "Refactor legacy debt to modern Next.js 15",
    icon: RefreshCw,
  },
  {
    name: "Improve Performance & SEO",
    href: "/solutions/portfolio-websites",
    description: "Core Web Vitals, technical SEO & semantic structure",
    icon: Zap,
  },
  {
    name: "Automate Workflows",
    href: "/solutions/ai-automation",
    description: "Eliminate manual data ops with LLM pipelines",
    icon: Bot,
  },
];

export function SolutionsMegaPanel({ onItemClick }: SolutionsMegaPanelProps) {
  return (
    <div
      id="solutions-mega-menu"
      role="region"
      aria-label="Solutions Overview Menu"
      className="w-[780px] lg:w-[860px] p-6 grid grid-cols-12 gap-6 bg-card/95 backdrop-blur-md rounded-2xl border border-border shadow-2xl text-left"
    >
      {/* Column 1: By Deliverable (Cols 1-5) */}
      <div className="col-span-5 border-r border-border pr-5">
        <div className="text-[11px] font-mono font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          <span>By Deliverable</span>
        </div>
        <div className="space-y-1">
          {DELIVERABLE_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onItemClick}
                className="group flex items-start gap-3 p-2 rounded-xl hover:bg-muted/70 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
              >
                <div className="w-7 h-7 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-violet-500/20 transition-colors">
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground group-hover:text-violet-400 transition-colors leading-tight">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-muted-foreground leading-snug mt-0.5 line-clamp-1">
                    {item.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Column 2: By Need (Cols 6-8) */}
      <div className="col-span-4 border-r border-border pr-5">
        <div className="text-[11px] font-mono font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <span>By Business Goal</span>
        </div>
        <div className="space-y-1">
          {NEED_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onItemClick}
                className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-muted/70 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-indigo-500/20 transition-colors">
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground group-hover:text-indigo-400 transition-colors leading-tight">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-muted-foreground leading-snug mt-0.5 line-clamp-1">
                    {item.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Column 3: Featured Case Study (Cols 9-12) */}
      <div className="col-span-3 flex flex-col justify-between p-3.5 rounded-xl bg-muted/40 border border-border/80">
        <div>
          <span className="text-[10px] font-mono text-violet-400 font-semibold uppercase tracking-wider block mb-2">
            Featured Proof
          </span>
          <div className="relative w-full h-24 rounded-lg overflow-hidden border border-border mb-3 bg-neutral-900 flex items-center justify-center">
            <Image
              src="/assets/Jobless_coders_colored.png"
              alt="Editorial Studio Platform"
              width={140}
              height={70}
              className="object-contain p-2"
            />
          </div>
          <h4 className="text-xs font-bold text-foreground mb-1 leading-snug">
            Technical Studio Platform
          </h4>
          <div className="flex items-start gap-1.5 text-[11px] text-muted-foreground mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span>100% self-hosted & zero third-party font blocking</span>
          </div>
        </div>

        <Link
          href="/work/studio-marketing-platform"
          onClick={onItemClick}
          className="inline-flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
        >
          <span>View Case Study</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

export default SolutionsMegaPanel;
