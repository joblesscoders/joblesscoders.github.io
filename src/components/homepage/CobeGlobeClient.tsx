"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import createGlobe, { Globe } from "cobe";
import GlobeFallback from "./GlobeFallback";

interface CobeGlobeProps {
  className?: string;
}

export function CobeGlobeClient({ className = "" }: CobeGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const globeRef = useRef<Globe | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const isTabActiveRef = useRef<boolean>(true);
  const isReducedMotionRef = useRef<boolean>(false);

  // Pointer Dragging & Inertia State refs
  const isDraggingRef = useRef<boolean>(false);
  const pointerStartRef = useRef<{ x: number; time: number }>({ x: 0, time: 0 });
  const phiRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);

  useEffect(() => {
    // 1. Eligibility Check: Screen Size (Desktop only >= 768px)
    if (typeof window === "undefined" || window.innerWidth < 768) {
      setIsSupported(false);
      return;
    }

    // 2. Eligibility Check: Reduced Motion
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    isReducedMotionRef.current = reducedMotion;
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
    let width = containerRef.current.clientWidth || 440;
    let rafId: number | null = null;

    // Check theme
    const isDark = document.documentElement.classList.contains("dark");

    // WebGL Context Lost & Restored Event Handlers
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      if (rafId) cancelAnimationFrame(rafId);
      if (globeRef.current) {
        try {
          globeRef.current.destroy();
        } catch {
          // Ignore cleanup errors
        }
        globeRef.current = null;
      }
      setIsSupported(false);
    };

    const handleContextRestored = () => {
      setIsSupported(true);
    };

    const handleCreationError = () => {
      setIsSupported(false);
    };

    canvas.addEventListener("webglcontextlost", handleContextLost, false);
    canvas.addEventListener("webglcontextrestored", handleContextRestored, false);
    canvas.addEventListener("webglcontextcreationerror", handleCreationError, false);

    // Bounded resolution & DPR cap (1.35 max for high precision with bounded GPU overhead)
    const dprCap = Math.min(window.devicePixelRatio || 1, 1.35);

    try {
      globeRef.current = createGlobe(canvas, {
        devicePixelRatio: dprCap,
        width: width * dprCap,
        height: width * dprCap,
        phi: phiRef.current,
        theta: 0.22,
        dark: isDark ? 1 : 0,
        diffuse: isDark ? 1.2 : 1.1,
        mapSamples: 8000,
        mapBrightness: isDark ? 5 : 4,
        baseColor: isDark ? [0.28, 0.28, 0.33] : [0.85, 0.85, 0.9],
        markerColor: [0.65, 0.45, 1], // Studio Violet
        glowColor: isDark ? [0.15, 0.1, 0.25] : [0.92, 0.9, 0.98],
        markers: [
          // Dhaka, Bangladesh [23.8103, 90.4125]
          { location: [23.8103, 90.4125], size: 0.08 },
          // London, UK [51.5074, -0.1278]
          { location: [51.5074, -0.1278], size: 0.06 },
          // San Francisco, USA [37.7749, -122.4194]
          { location: [37.7749, -122.4194], size: 0.06 },
        ],
      });

      // Render loop with ambient rotation, pointer inertia and pause mechanics
      const render = () => {
        if (isVisibleRef.current && isTabActiveRef.current && globeRef.current) {
          if (!isDraggingRef.current) {
            // Apply velocity damping and ambient drift
            phiRef.current += 0.0022 + velocityRef.current;
            velocityRef.current *= 0.93; // Inertia damping
            if (Math.abs(velocityRef.current) < 0.00005) {
              velocityRef.current = 0;
            }
          }
          globeRef.current.update({ phi: phiRef.current });
        }
        rafId = requestAnimationFrame(render);
      };

      rafId = requestAnimationFrame(render);
    } catch {
      setIsSupported(false);
      return;
    }

    // ResizeObserver to dynamically update dimensions
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

    // IntersectionObserver to pause loop when scrolled out of view
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(containerRef.current);

    // VisibilityChange to pause when tab is inactive
    const handleVisibilityChange = () => {
      isTabActiveRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      canvas.removeEventListener("webglcontextcreationerror", handleCreationError);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      if (globeRef.current) {
        try {
          globeRef.current.destroy();
        } catch {
          // Ignore destroy exceptions
        }
        globeRef.current = null;
      }
    };
  }, [isSupported]);

  // Pointer Interaction Handlers for Desktop Dragging
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Disable dragging on touch devices or reduced motion
    if (e.pointerType === "touch" || isReducedMotionRef.current) return;

    isDraggingRef.current = true;
    pointerStartRef.current = { x: e.clientX, time: performance.now() };
    velocityRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const currentX = e.clientX;
    const currentTime = performance.now();
    const deltaX = currentX - pointerStartRef.current.x;
    const deltaTime = Math.max(currentTime - pointerStartRef.current.time, 1);

    // Rotate phi with drag movement
    phiRef.current -= deltaX * 0.005;
    // Calculate instantaneous velocity for inertia on release
    velocityRef.current = -(deltaX / deltaTime) * 0.06;

    pointerStartRef.current = { x: currentX, time: currentTime };
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore release error
    }
  }, []);

  // Fallback to SVG if WebGL is unavailable
  if (isSupported === false) {
    return <GlobeFallback className={className} />;
  }

  return (
    <div
      ref={containerRef}
      aria-label="Interactive 3D Studio Globe"
      role="region"
      data-cursor="drag"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[520px] aspect-square flex items-center justify-center select-none cursor-grab active:cursor-grabbing touch-pan-y ${className}`}
    >
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-600/20 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none opacity-95 transition-opacity duration-500"
        style={{ width: "100%", height: "100%", contain: "layout paint size" }}
      />

      {/* Drag Indicator Badge on Desktop Hover */}
      <div
        className={`absolute bottom-3 px-3 py-1 rounded-full bg-card/85 backdrop-blur-md border border-border text-[11px] font-mono text-muted-foreground shadow-sm transition-all duration-200 pointer-events-none ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        }`}
      >
        <span className="text-violet-400 font-semibold">DRAG</span> to rotate
      </div>
    </div>
  );
}

export default CobeGlobeClient;
