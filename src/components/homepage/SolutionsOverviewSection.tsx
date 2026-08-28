"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Globe, Rocket, LayoutDashboard, Cpu, Smartphone } from "lucide-react";
import { useGSAPReveal } from "@/lib/reveal";

export const SOLUTIONS_DATA = [
  {
    slug: "ecommerce",
    title: "E-commerce Platforms",
    short: "High-throughput headless storefronts, Stripe/checkout integrations, and sub-second catalog navigation.",
    icon: ShoppingCart,
    tag: "Revenue Systems",
    metrics: "Fast catalog UX & resilient checkout",
  },
  {
    slug: "portfolio-websites",
    title: "Portfolio & Brand Websites",
    short: "Editorial, accessible brand experiences with micro-interactions, responsive typography, and strict performance budgets.",
    icon: Globe,
    tag: "Brand Architecture",
    metrics: "Accessible, SEO-ready, motion-rich builds",
  },
  {
    slug: "saas-mvp",
    title: "SaaS & MVP Development",
    short: "Rapid concept-to-production engineering with Next.js 15, PostgreSQL, multi-tenant auth, and billing infrastructure.",
    icon: Rocket,
    tag: "Velocity & Product",
    metrics: "Focused delivery in defined milestones",
  },
  {
    slug: "business-platforms",
    title: "Business Portals & Dashboards",
    short: "High-density enterprise data views, real-time telemetry, role-based permissions, and custom internal operations tools.",
    icon: LayoutDashboard,
    tag: "Internal Ops",
    metrics: "Real-time sync & granular RBAC",
  },
  {
    slug: "ai-automation",
    title: "AI Automation Systems",
    short: "Custom RAG document search pipelines, deterministic LLM tool chains, and high-throughput vector database APIs.",
    icon: Cpu,
    tag: "AI & Vector",
    metrics: "Measured retrieval quality & observable pipelines",
  },
  {
    slug: "mobile-apps",
    title: "Mobile Applications",
    short: "Cross-platform React Native & Expo mobile apps for iOS and Android with offline-first data sync and biometric auth.",
    icon: Smartphone,
    tag: "iOS & Android",
    metrics: "Shared codebase with native integrations",
  },
];

export function SolutionsOverviewSection({ asPage = false }: { asPage?: boolean }) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAPReveal(containerRef, [
    { selector: ".solutions-header", y: 20, duration: 0.5, start: "top 90%" },
    { selector: ".solution-item-card", y: 24, stagger: 0.06, duration: 0.5, start: "top 88%" },
  ]);

  return (
    <section
      id="solutions"
      ref={containerRef}
      className={`${asPage ? "pt-8 pb-20 sm:pt-10 sm:pb-24" : "py-20 sm:py-24"} bg-card/40 border-y border-border`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="solutions-header flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-3">
              <span>{"// Dedicated Solutions"}</span>
            </div>
            {asPage ? (
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Solutions Engineered for Specific Growth Milestones
              </h1>
            ) : (
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Engineered for Specific Growth Milestones
              </h2>
            )}
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl">
              Turnkey architectural solutions tailored to product launches, enterprise migrations, and automated AI pipelines.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded"
          >
            <span>Request customized solution brief</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6-Card Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS_DATA.map((item, idx) => {
            const Icon = item.icon;
            return (
              <article
                key={item.slug}
                className="solution-item-card flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-card border border-border hover:border-violet-500/30 transition-[border-color,box-shadow,background-color] duration-200 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground uppercase px-2 py-0.5 rounded bg-muted">
                      0{idx + 1} &bull; {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                    <Link
                      href={`/solutions/${item.slug}`}
                      className="hover:text-violet-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded"
                    >
                      {item.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                    {item.short}
                  </p>

                  <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5 rounded-lg mb-6 inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{item.metrics}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <Link
                    href={`/solutions/${item.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    <span>View Solution Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SolutionsOverviewSection;
