"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import GlobeFallback from "./GlobeFallback";
import GlobeErrorBoundary from "./GlobeErrorBoundary";

// Lazy-loaded dynamic chunk with zero SSR burden
const DynamicCobeGlobe = dynamic(() => import("./CobeGlobeClient"), {
  ssr: false,
  loading: () => <GlobeFallback />,
});

export function GlobeContainer({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadChunk, setShouldLoadChunk] = useState(false);

  useEffect(() => {
    // Check initial desktop requirement before even creating intersection observer
    if (typeof window === "undefined" || window.innerWidth < 768) {
      return;
    }

    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Check save-data
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) {
      return;
    }

    // Load chunk when near viewport (100px margin)
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadChunk(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" className={className}>
      <GlobeErrorBoundary fallback={<GlobeFallback className={className} />}>
        {shouldLoadChunk ? (
          <DynamicCobeGlobe className={className} />
        ) : (
          <GlobeFallback className={className} />
        )}
      </GlobeErrorBoundary>
    </div>
  );
}

export default GlobeContainer;
