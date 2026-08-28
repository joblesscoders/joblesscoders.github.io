"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import AnimatedFaq, { FaqItem } from "@/components/ui/AnimatedFaq";
import { useGSAPReveal } from "@/lib/reveal";

const HOMEPAGE_FAQS: FaqItem[] = [
  {
    question: "How fast can we kick off and what is your delivery cadence?",
    answer:
      "We kick off sprints within 48 hours of scope alignment. Engineering runs in disciplined 2-week sprint cycles with live staging preview environments, continuous integration, and transparent async updates directly with senior leads.",
  },
  {
    question: "What is your engagement and pricing model?",
    answer:
      "We offer predictable fixed-scope sprint budgets or dedicated weekly engineering retainers with zero agency overhead. Every dollar goes directly into senior developer execution without account manager markups.",
  },
  {
    question: "What core tech stack and frameworks do you use?",
    answer:
      "Our frontend and platform layer is built on Next.js 15, React 19, TypeScript, and Tailwind CSS. For AI automation and backends, we leverage Python, FastAPI, pgvector, Docker, and AWS cloud environments.",
  },
  {
    question: "Who owns the code, design tokens, and intellectual property?",
    answer:
      "You retain 100% full intellectual property ownership from day one. All Git commits, database schemas, deployment pipelines, and architecture runbooks belong entirely to your team.",
  },
  {
    question: "Will junior engineers or outsourced contractors work on our build?",
    answer:
      "Never. Jobless Coders is a collective of 6 senior engineering specialists. Code is written, reviewed, and deployed directly by core leads with zero junior handoffs or third-party outsourcing.",
  },
];

export function FaqSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAPReveal(containerRef, [
    { selector: ".faq-header", y: 20, duration: 0.6, start: "top 85%" },
    { selector: ".faq-accordion-wrap", y: 24, duration: 0.6, delay: 0.1, start: "top 85%" },
  ]);

  return (
    <section
      id="faq"
      ref={containerRef}
      aria-label="Frequently Asked Questions"
      className="py-20 sm:py-24 border-t border-border bg-card/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Section Title & Context */}
          <div className="faq-header lg:col-span-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-mono mb-3">
              <span>04 / FAQ</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-[1.1] mb-4">
              Frequently Asked Questions
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              Straightforward answers regarding our sprint velocity, pricing structure, technology standards, and IP ownership.
            </p>

            <div className="p-4 rounded-xl bg-card border border-neutral-200 dark:border-neutral-800 text-xs text-muted-foreground space-y-2 mb-6">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <HelpCircle className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                <span>Have a custom technical inquiry?</span>
              </div>
              <p className="leading-relaxed">
                We review complex architectural scopes, compliance requirements, and custom SLA agreements during our initial technical consultation.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded"
            >
              <span>Book a Technical Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Column: Animated Accordion */}
          <div className="faq-accordion-wrap lg:col-span-7">
            <AnimatedFaq items={HOMEPAGE_FAQS} defaultOpenIndex={0} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
