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
              "overflow-hidden rounded-2xl border transition-all duration-200 bg-card",
              isOpen
                ? "border-neutral-400 dark:border-neutral-600 bg-neutral-50/80 dark:bg-neutral-900/50 shadow-sm"
                : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50/60 dark:hover:bg-neutral-900/40"
            )}
          >
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 focus-visible:outline-offset-[-2px]"
              >
                <div className="flex items-center gap-3.5 flex-1 pr-2">
                  <span className="font-mono text-xs font-semibold text-violet-600 dark:text-violet-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-foreground leading-snug">
                    {faq.question}
                  </span>
                </div>
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/80 text-neutral-600 dark:text-neutral-400 transition-transform duration-300 ease-out",
                    isOpen && "rotate-180 border-violet-500/40 bg-violet-500/10 text-violet-600 dark:text-violet-400"
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
                <div className="border-t border-neutral-200 dark:border-neutral-800/60 ml-12 sm:ml-14 mr-5 sm:mr-6 pb-5 pt-3.5 sm:pb-6 text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
