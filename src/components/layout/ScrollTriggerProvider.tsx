"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { debouncedScrollTriggerRefresh } from "@/lib/reveal";

export default function ScrollTriggerProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Refresh on document fonts ready
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        debouncedScrollTriggerRefresh(50);
      });
    }

    // 2. Refresh on window load
    const handleLoad = () => {
      debouncedScrollTriggerRefresh(50);
    };
    if (document.readyState === "complete") {
      debouncedScrollTriggerRefresh(50);
    } else {
      window.addEventListener("load", handleLoad);
    }

    // 3. Refresh on bfcache pageshow restoration
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        debouncedScrollTriggerRefresh(50);
      }
    };
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  // 4. Refresh on Next.js route transitions
  useEffect(() => {
    debouncedScrollTriggerRefresh(100);
  }, [pathname]);

  return null;
}
