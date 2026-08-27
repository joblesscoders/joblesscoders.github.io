import React from "react";
import { Compass, Palette, Code2, Rocket } from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      step: "01",
      title: "Discovery & Architecture",
      description:
        "We audit data models, user flows, and scaling goals to establish optimal Next.js route boundaries and state strategies before writing code.",
      icon: Compass,
    },
    {
      step: "02",
      title: "System & Interface Design",
      description:
        "We build synchronized design tokens in Figma and Tailwind CSS, pairing accessible Radix UI primitives with responsive dark-mode support.",
      icon: Palette,
    },
    {
      step: "03",
      title: "Sprint Engineering & CI",
      description:
        "2-week sprints guided by strict TypeScript types, automated GitHub Actions testing, and transparent async updates directly with senior leads.",
      icon: Code2,
    },
    {
      step: "04",
      title: "Launch & Observability",
      description:
        "Production deployment with structured error tracing, Lighthouse Core Web Vitals benchmarking, security header audit, and complete runbooks.",
      icon: Rocket,
    },
  ];

  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-3">
            <span>{"// How We Work"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            A Disciplined Engineering Process
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Predictable sprint cycles from initial architectural blueprint to production deployment and monitoring.
          </p>
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-card border border-border hover:border-violet-500/30 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-violet-400 font-bold px-2 py-0.5 bg-violet-500/10 rounded">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
