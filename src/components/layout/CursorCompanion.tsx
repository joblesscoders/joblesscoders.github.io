"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export function CursorCompanion() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<"default" | "hover" | "drag" | "hidden">("default");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // 1. Disable for touch/coarse pointers and reduced-motion preferences
    if (typeof window === "undefined") return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || isReduced) {
      return;
    }

    setIsActive(true);

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Fast, hardware-accelerated position tracking with GSAP quickTo
    const setX = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3.out" });
    const setY = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3.out" });

    let isVisible = false;

    const handlePointerMove = (e: PointerEvent) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to(cursor, { opacity: 1, duration: 0.2 });
      }

      setX(e.clientX);
      setY(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check for form fields (suppress companion for native text editing)
      if (target.closest("input, textarea, select, [contenteditable='true']")) {
        setCursorState("hidden");
        return;
      }

      // Check for globe drag target
      if (target.closest('[data-cursor="drag"]')) {
        setCursorState("drag");
        return;
      }

      // Check for interactive controls
      if (
        target.closest("a, button, [role='button'], input[type='submit'], [data-cursor='hover']")
      ) {
        setCursorState("hover");
        return;
      }

      setCursorState("default");
    };

    const handleMouseLeave = () => {
      isVisible = false;
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isActive) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] opacity-0 -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out will-change-transform"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
    >
      {cursorState === "default" && (
        <div className="w-3.5 h-3.5 rounded-full bg-violet-500/40 border border-violet-400/80 shadow-[0_0_12px_rgba(139,92,246,0.3)] transition-all duration-150" />
      )}

      {cursorState === "hover" && (
        <div className="w-9 h-9 rounded-full bg-violet-500/15 border border-violet-400 scale-110 shadow-[0_0_16px_rgba(139,92,246,0.35)] transition-all duration-150 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
        </div>
      )}

      {cursorState === "drag" && (
        <div className="px-2.5 py-1 rounded-full bg-violet-600/90 backdrop-blur-md border border-violet-400 text-[10px] font-mono font-bold text-white shadow-lg shadow-violet-600/30 scale-105 transition-all duration-150">
          DRAG
        </div>
      )}

      {cursorState === "hidden" && <div className="opacity-0" />}
    </div>
  );
}

export default CursorCompanion;
