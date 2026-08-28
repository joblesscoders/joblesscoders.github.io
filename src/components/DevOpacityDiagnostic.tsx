"use client";

import { useEffect } from "react";

export function DevOpacityDiagnostic() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const flaggedElements = new WeakMap<Element, number>();

    const checkInViewportElements = () => {
      const meaningfulSelectors = [
        "h1",
        "h2",
        "h3",
        "h4",
        "p",
        "article",
        "section",
        "button",
        "a",
        ".work-card",
        ".service-card",
        ".process-step",
        ".tech-card",
        ".team-card",
        ".proof-item",
        ".hero-title",
        ".hero-desc",
      ];

      const elements = document.querySelectorAll(meaningfulSelectors.join(","));
      const now = Date.now();
      const vHeight = window.innerHeight;
      const vWidth = window.innerWidth;

      elements.forEach((el) => {
        // Skip hidden dropdowns, modals, and dock tooltips by design
        if (el.closest('[aria-hidden="true"]') || el.closest('[role="dialog"]') || el.closest('[role="tooltip"]')) {
          return;
        }

        const rect = el.getBoundingClientRect();
        // Check if element is inside viewport
        const isInViewport =
          rect.top < vHeight && rect.bottom > 0 && rect.left < vWidth && rect.right > 0 && rect.width > 0 && rect.height > 0;

        if (isInViewport) {
          const style = window.getComputedStyle(el);
          const opacity = parseFloat(style.opacity || "1");
          const isHidden = opacity < 0.05 || style.visibility === "hidden";

          if (isHidden) {
            const firstSeen = flaggedElements.get(el);
            if (!firstSeen) {
              flaggedElements.set(el, now);
            } else if (now - firstSeen > 800) {
              console.warn(
                `⚠️ [DevOpacityDiagnostic] Element has remained stuck at low opacity (${opacity}) or hidden in viewport for >800ms:`,
                el
              );
            }
          } else {
            flaggedElements.delete(el);
          }
        } else {
          flaggedElements.delete(el);
        }
      });
    };

    const interval = setInterval(checkInViewportElements, 400);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return null;
}

export default DevOpacityDiagnostic;
