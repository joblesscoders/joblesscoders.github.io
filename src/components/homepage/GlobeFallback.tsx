import React from "react";

export function GlobeFallback({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full max-w-[340px] sm:max-w-[400px] aspect-square flex items-center justify-center select-none pointer-events-none ${className}`}
    >
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-600/20 via-purple-500/10 to-transparent blur-2xl" />

      {/* SVG Vector Globe Silhouette with Latitude/Longitude Rings & Dhaka Pin */}
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full text-violet-500/30 dark:text-violet-400/25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="globe-body-grad" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
            <stop offset="70%" stopColor="currentColor" stopOpacity="0.03" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="globe-stroke-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Sphere Base */}
        <circle cx="200" cy="200" r="150" fill="url(#globe-body-grad)" stroke="url(#globe-stroke-grad)" strokeWidth="1.5" />

        {/* Latitude Rings */}
        <ellipse cx="200" cy="200" rx="150" ry="40" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
        <ellipse cx="200" cy="140" rx="130" ry="30" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
        <ellipse cx="200" cy="260" rx="130" ry="30" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />

        {/* Longitude Ellipses */}
        <ellipse cx="200" cy="200" rx="45" ry="150" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
        <ellipse cx="200" cy="200" rx="95" ry="150" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
        <line x1="200" y1="50" x2="200" y2="350" stroke="currentColor" strokeWidth="1" opacity="0.7" />

        {/* Highlighted Marker for Dhaka (GMT+6) */}
        <circle cx="242" cy="162" r="5" fill="#a78bfa" className="animate-pulse" />
        <circle cx="242" cy="162" r="10" stroke="#a78bfa" strokeWidth="1" opacity="0.6" />
      </svg>
    </div>
  );
}

export default GlobeFallback;
