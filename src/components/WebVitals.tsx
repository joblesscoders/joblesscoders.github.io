"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === "development") {
      // In development, log vitals to console for inspection
      console.log(`[Web Vitals] ${metric.name}:`, Math.round(metric.value * 10) / 10, metric.rating);
    }
  });

  return null;
}