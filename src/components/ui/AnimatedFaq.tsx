"use client";

import React, { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

interface AnimatedFaqProps {
  items: FaqItem[];
  defaultOpenIndex?: number | null;
  className?: string;
}

export default function AnimatedFaq({
  items,
  defaultOpenIndex = 0,
  className,
}: AnimatedFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const baseId = useId();

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <article
            key={faq.question}
            data-state={isOpen ? "open" : "closed"}
            className={cn(
              "overflow-hidden rounded-2xl border bg-card transition-[border-color,box-shadow,background-color] duration-300",
              isOpen
                ? "border-violet-500/35 bg-violet-500/[0.035] shadow-lg shadow-violet-950/5"
                : "border-border hover:border-violet-500/20"
            )}
          >
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 focus-visible:outline-offset-[-2px]"
              >
                <span className="font-mono text-[11px] font-semibold text-violet-400/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-sm font-semibold text-foreground sm:text-base">
                  {faq.question}
                </span>
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition-[transform,color,border-color,background-color] duration-300",
                    isOpen && "rotate-180 border-violet-500/30 bg-violet-500/10 text-violet-400"
                  )}
                  aria-hidden="true"
                >
                  <ChevronDown className="h-4 w-4" />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="ml-14 border-t border-border/60 px-0 pb-5 pt-4 pr-5 text-xs leading-relaxed text-muted-foreground sm:ml-16 sm:pb-6 sm:pr-6 sm:text-sm">
                  {faq.answer}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
