"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function ScrollProgress() {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!progressBarRef.current) return;

      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.15,
        },
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      if (progressBarRef.current) {
        gsap.set(progressBarRef.current, { display: "none" });
      }
    });
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none bg-transparent"
    >
      <div
        ref={progressBarRef}
        className="h-full w-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
