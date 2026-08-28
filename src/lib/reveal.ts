"use client";

import { useLayoutEffect, useEffect, RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface RevealItemConfig {
  selector: string;
  stagger?: number;
  y?: number;
  duration?: number;
  delay?: number;
  start?: string;
  ease?: string;
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Debounced ScrollTrigger refresh call to synchronize geometry
 * across font loading, image layout shifts, and route transitions.
 */
export function debouncedScrollTriggerRefresh(delay = 120) {
  if (typeof window === "undefined") return;
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, delay);
}

/**
 * Shared hook for resilient GSAP scroll reveals.
 * - Content remains 100% visible by default in SSR HTML & CSS.
 * - Constructs animations strictly inside ScrollTrigger onEnter.
 * - Cleans up inline transform/opacity properties upon completion.
 * - Reduced motion performs zero mutations.
 */
export function useGSAPReveal(
  containerRef: RefObject<HTMLElement | null>,
  configs: RevealItemConfig[]
) {
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      configs.forEach((config) => {
        const {
          selector,
          stagger = 0.06,
          y = 24,
          duration = 0.5,
          delay = 0,
          start = "top 92%",
          ease = "power3.out",
        } = config;

        const elements = gsap.utils.toArray<HTMLElement>(selector, containerRef.current);
        if (!elements.length) return;

        ScrollTrigger.batch(elements, {
          start,
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { autoAlpha: 0, y },
              {
                autoAlpha: 1,
                y: 0,
                duration,
                delay,
                ease,
                stagger,
                overwrite: "auto",
                clearProps: "transform,opacity,visibility",
              }
            );
          },
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [containerRef, JSON.stringify(configs)]);
}
