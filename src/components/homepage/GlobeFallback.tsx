import React from "react";

export function GlobeFallback({ className = "" }: { className?: string }) {
  return (
    <div
      aria-label="Studio Global Operations Graphic"
      className={`relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[520px] aspect-square flex items-center justify-center select-none pointer-events-none ${className}`}
    >
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-600/20 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* High-Contrast SVG Vector Globe with Precision Rings & Location Pins */}
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full text-violet-500/35 dark:text-violet-400/30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="globe-body-grad" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="70%" stopColor="currentColor" stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="globe-stroke-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Sphere Base */}
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="url(#globe-body-grad)"
          stroke="url(#globe-stroke-grad)"
          strokeWidth="1.5"
        />

        {/* Latitude Rings */}
        <ellipse cx="200" cy="200" rx="150" ry="42" stroke="currentColor" strokeWidth="0.9" strokeDasharray="4 4" opacity="0.7" />
        <ellipse cx="200" cy="140" rx="130" ry="32" stroke="currentColor" strokeWidth="0.9" strokeDasharray="4 4" opacity="0.6" />
        <ellipse cx="200" cy="260" rx="130" ry="32" stroke="currentColor" strokeWidth="0.9" strokeDasharray="4 4" opacity="0.6" />

        {/* Longitude Ellipses */}
        <ellipse cx="200" cy="200" rx="45" ry="150" stroke="currentColor" strokeWidth="0.9" strokeDasharray="4 4" opacity="0.7" />
        <ellipse cx="200" cy="200" rx="95" ry="150" stroke="currentColor" strokeWidth="0.9" strokeDasharray="4 4" opacity="0.6" />
        <line x1="200" y1="50" x2="200" y2="350" stroke="currentColor" strokeWidth="1" opacity="0.8" />

        {/* Studio Location Marker — Dhaka (GMT+6) */}
        <g>
          <circle cx="242" cy="162" r="5.5" fill="#a78bfa" className="animate-pulse" />
          <circle cx="242" cy="162" r="11" stroke="#a78bfa" strokeWidth="1.2" opacity="0.6" />
          <text x="254" y="166" fill="#a78bfa" fontSize="10" fontFamily="monospace" fontWeight="600">
            Dhaka (GMT+6)
          </text>
        </g>

        {/* Global Overlap Pins */}
        <g opacity="0.8">
          <circle cx="160" cy="138" r="3.5" fill="#818cf8" />
          <circle cx="118" cy="155" r="3.5" fill="#818cf8" />
        </g>
      </svg>
    </div>
  );
}

export default GlobeFallback;
