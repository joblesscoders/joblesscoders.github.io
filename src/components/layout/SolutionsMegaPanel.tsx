"use client";

import React from "react";
import Link from "next/link";
import {
  Code2,
  Cpu,
  Cloud,
  ArrowRight,
  Sparkles,
  Layers,
  Terminal,
  Bot,
  Database,
  Shield,
  Workflow,
  Zap,
} from "lucide-react";

interface SolutionsMegaPanelProps {
  onItemClick?: () => void;
}

export const SOLUTIONS_CATEGORIES = [
  {
    category: "Core Engineering",
    icon: Code2,
    badgeColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    links: [
      {
        name: "Custom Web Apps",
        href: "/solutions/saas-mvp",
        description: "High-scale Next.js 15 & React 19 production platforms",
        icon: Layers,
      },
      {
        name: "Microservices & Backends",
        href: "/solutions/business-platforms",
        description: "Distributed event-driven APIs with PostgreSQL & Redis",
        icon: Terminal,
      },
      {
        name: "API Architecture",
        href: "/solutions/ecommerce",
        description: "Sub-second GraphQL & REST headless transaction pipelines",
        icon: Zap,
      },
    ],
  },
  {
    category: "AI & Data Systems",
    icon: Cpu,
    badgeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    links: [
      {
        name: "LLM Integrations",
        href: "/solutions/ai-automation",
        description: "Enterprise RAG pipelines with pgvector & strict citations",
        icon: Bot,
      },
      {
        name: "Autonomous Agents",
        href: "/solutions/ai-automation",
        description: "Deterministic tool calling & automated multi-step actions",
        icon: Sparkles,
      },
      {
        name: "Data Pipelines",
        href: "/solutions/business-platforms",
        description: "Real-time ETL, vector embedding sync & stream ingest",
        icon: Database,
      },
    ],
  },
  {
    category: "Cloud & Operations",
    icon: Cloud,
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    links: [
      {
        name: "DevOps & Containers",
        href: "/services/cloud-devops",
        description: "Docker & AWS ECS orchestration with zero-downtime deploys",
        icon: Shield,
      },
      {
        name: "CI/CD Automation",
        href: "/services/cloud-devops",
        description: "Automated GitHub Actions pipelines & staged testing",
        icon: Workflow,
      },
      {
        name: "Performance Tuning",
        href: "/solutions/portfolio-websites",
        description: "Sub-second LCP, Core Web Vitals & edge cache tuning",
        icon: Zap,
      },
    ],
  },
];

// Maintained for mobile drawer compatibility
export const DELIVERABLE_LINKS = [
  { name: "SaaS & MVP Platforms", href: "/solutions/saas-mvp" },
  { name: "E-Commerce Systems", href: "/solutions/ecommerce" },
  { name: "AI Automation & LLMs", href: "/solutions/ai-automation" },
  { name: "Operations & Portals", href: "/solutions/business-platforms" },
  { name: "Mobile Applications", href: "/solutions/mobile-apps" },
  { name: "Brand & Portfolios", href: "/solutions/portfolio-websites" },
];

export function SolutionsMegaPanel({ onItemClick }: SolutionsMegaPanelProps) {
  return (
    <div
      id="solutions-mega-menu"
      role="menu"
      aria-label="Solutions Overview Menu"
      className="w-[840px] lg:w-[900px] p-6 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl text-left font-sans"
    >
      {/* 3 Categorized Columns */}
      <div className="grid grid-cols-3 gap-6 pb-5">
        {SOLUTIONS_CATEGORIES.map((col) => {
          const ColIcon = col.icon;
          return (
            <div key={col.category} className="space-y-3">
              {/* Category Header */}
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-200 dark:border-neutral-800/80">
                <div className={`p-1.5 rounded-lg border ${col.badgeColor}`}>
                  <ColIcon className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
                <span className="text-xs font-mono font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {col.category}
                </span>
              </div>

              {/* Category Items */}
              <div className="space-y-1">
                {col.links.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      role="menuitem"
                      onClick={onItemClick}
                      className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-neutral-100/80 dark:hover:bg-neutral-900/80 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
                    >
                      <div className="w-6 h-6 rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 group-hover:text-violet-600 dark:group-hover:text-violet-300 group-hover:border-violet-500/40 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                        <ItemIcon className="w-3.5 h-3.5" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors leading-tight">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug mt-0.5 line-clamp-1">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Bar: Quick link to Custom Enterprise Inquiries */}
      <div className="pt-3.5 mt-2 border-t border-neutral-200 dark:border-neutral-800/90 flex items-center justify-between px-2 text-xs">
        <div className="text-neutral-500 dark:text-neutral-400 text-[11px] font-mono">
          Need dedicated engineering squads, custom SLAs, or private VPC architectures?
        </div>
        <Link
          href="/contact?topic=Custom+Enterprise+Architecture"
          role="menuitem"
          onClick={onItemClick}
          className="inline-flex items-center gap-1.5 font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-colors text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded px-2 py-1"
        >
          <span>Custom Enterprise Inquiries</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export default SolutionsMegaPanel;

