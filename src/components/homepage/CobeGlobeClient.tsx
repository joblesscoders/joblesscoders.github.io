"use client";

import React, { useEffect, useRef, useState } from "react";
import createGlobe, { Globe } from "cobe";
import GlobeFallback from "./GlobeFallback";

interface CobeGlobeProps {
  className?: string;
}

export function CobeGlobeClient({ className = "" }: CobeGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const globeRef = useRef<Globe | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const isTabActiveRef = useRef<boolean>(true);

  useEffect(() => {
    // 1. Eligibility Check: Screen Size (Desktop only >= 768px)
    if (typeof window === "undefined" || window.innerWidth < 768) {
      setIsSupported(false);
      return;
    }

    // 2. Eligibility Check: Reduced Motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setIsSupported(false);
      return;
    }

    // 3. Eligibility Check: Save-Data Network Header
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) {
      setIsSupported(false);
      return;
    }

    // 4. Eligibility Check: WebGL Context Support Test
    try {
      const testCanvas = document.createElement("canvas");
      const gl =
        testCanvas.getContext("webgl2") ||
        testCanvas.getContext("webgl") ||
        testCanvas.getContext("experimental-webgl");

      if (!gl) {
        setIsSupported(false);
        return;
      }
      setIsSupported(true);
    } catch {
      setIsSupported(false);
      return;
    }
  }, []);

  useEffect(() => {
    if (!isSupported || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    let width = containerRef.current.clientWidth || 360;
    let phi = 0;
    let rafId: number | null = null;

    // WebGL Context Lost & Error Event Handlers
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      if (rafId) cancelAnimationFrame(rafId);
      if (globeRef.current) {
        try {
          globeRef.current.destroy();
        } catch {
          // Ignore cleanup errors on lost context
        }
        globeRef.current = null;
      }
      setIsSupported(false);
    };

    const handleCreationError = () => {
      setIsSupported(false);
    };

    canvas.addEventListener("webglcontextlost", handleContextLost, false);
    canvas.addEventListener("webglcontextcreationerror", handleCreationError, false);

    // Bounded resolution & DPR cap (<= 1.25 to protect low-power/mobile GPUs)
    const dprCap = Math.min(window.devicePixelRatio || 1, 1.25);

    try {
      globeRef.current = createGlobe(canvas, {
        devicePixelRatio: dprCap,
        width: width * dprCap,
        height: width * dprCap,
        phi: 0,
        theta: 0.25,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 6000, // Reduced from 12k/20k for bounded compute
        mapBrightness: 5,
        baseColor: [0.3, 0.3, 0.35],
        markerColor: [0.65, 0.45, 1], // Violet / Dhaka marker
        glowColor: [0.15, 0.1, 0.25],
        markers: [
          // Dhaka, Bangladesh [23.8103, 90.4125]
          { location: [23.8103, 90.4125], size: 0.09 },
        ],
      });

      // Custom restrained render loop
      const render = () => {
        if (isVisibleRef.current && isTabActiveRef.current && globeRef.current) {
          phi += 0.003;
          globeRef.current.update({ phi });
        }
        rafId = requestAnimationFrame(render);
      };

      rafId = requestAnimationFrame(render);
    } catch {
      setIsSupported(false);
      return;
    }

    // ResizeObserver to handle container scaling smoothly
    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current || !globeRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      if (newWidth && newWidth !== width) {
        width = newWidth;
        globeRef.current.update({
          width: width * dprCap,
          height: width * dprCap,
        });
      }
    });
    resizeObserver.observe(containerRef.current);

    // IntersectionObserver to pause loop when scrolled out of viewport
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(containerRef.current);

    // VisibilityChange to pause when user switches browser tabs
    const handleVisibilityChange = () => {
      isTabActiveRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextcreationerror", handleCreationError);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      if (globeRef.current) {
        try {
          globeRef.current.destroy();
        } catch {
          // Ignore destruction exceptions on unmount
        }
        globeRef.current = null;
      }
    };
  }, [isSupported]);

  // If not supported, render zero-JS SVG fallback
  if (isSupported === false) {
    return <GlobeFallback className={className} />;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`relative w-full max-w-[340px] sm:max-w-[400px] aspect-square flex items-center justify-center select-none pointer-events-none ${className}`}
    >
      {/* Subtle outer glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-600/15 via-purple-500/10 to-transparent blur-2xl" />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none opacity-90 transition-opacity duration-500"
        style={{ width: "100%", height: "100%", contain: "layout paint size" }}
      />
    </div>
  );
}

export default CobeGlobeClient;
