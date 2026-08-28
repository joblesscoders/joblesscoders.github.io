"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { getAllServices } from "@/content";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useGSAPReveal } from "@/lib/reveal";

export function ServicesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const services = getAllServices();

  useGSAPReveal(containerRef, [
    { selector: ".services-header", y: 20, duration: 0.5, start: "top 90%" },
    { selector: ".service-card", y: 24, stagger: 0.06, duration: 0.5, start: "top 88%" },
  ]);

  return (
    <section
      id="services"
      ref={containerRef}
      className="py-20 sm:py-24 bg-card/30 border-y border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="services-header flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-3">
              <span>{"// Disciplines & Capabilities"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              What We Build & Deliver
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl">
              End-to-end software engineering across modern web platforms, mobile applications, AI workflows, and cloud infrastructure.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded"
          >
            <span>Explore all service specifications</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <article
              key={service.slug}
              className="service-card flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-card border border-border hover:border-violet-500/30 transition-[border-color,box-shadow,background-color] duration-200 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono text-violet-400 font-semibold uppercase">
                    0{index + 1}
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {service.shortName}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-violet-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded"
                  >
                    {service.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                  {service.summary}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-1.5 mb-6">
                  {service.capabilities.slice(0, 3).map((cap, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-violet-400" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Read More Link */}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                >
                  <span>Explore {service.shortName} Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
