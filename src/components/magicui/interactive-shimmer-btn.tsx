import React from "react";
import { ArrowRight } from "lucide-react";

// A utility function for conditionally joining class names.
// You can replace this with your own, e.g., from `clsx`.
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

// Define the props for the new combined button, including shimmer options.
export interface InteractiveShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  children?: React.ReactNode;
}

export const InteractiveShimmerButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveShimmerButtonProps
>(
  (
    {
      children,
      className,
      shimmerColor = "#ffffff",
      shimmerSize = "0.1em",
      shimmerDuration = "5s",
      // Default to a full pill shape, matching the original interactive button.
      borderRadius = "9999px",
      // Default to a transparent background to inherit from the parent.
      // You can set this to a specific color like "hsl(var(--background))" or "black".
      background = "transparent",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as React.CSSProperties
        }
        className={cn(
          // Base classes from both components, reconciled for compatibility.
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-neutral-700 px-6 py-3 text-white font-semibold",
          "[background:var(--bg)] [border-radius:var(--radius)]",
          "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
          className,
        )}
        {...props}
      >
        {/* Shimmer Effect Layers (from ShimmerButton) - Placed in the background */}
        <div
          className={cn(
            // Using a negative z-index to place the shimmer behind the content.
            "-z-30 blur-[2px]",
            "absolute inset-0 overflow-visible [container-type:size]",
          )}
        >
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
            {/* The conic gradient that creates the shimmer */}
            <div className="absolute -inset-full w-auto rotate-0 animate-spin-around [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>

        {/* Backdrop to cover the shimmer and show the button's background color */}
        <div
          className={cn(
            "absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]",
          )}
        />

        {/* Hover Animation Layers (from InteractiveHoverButton) - Placed in the foreground */}
        <div className="relative z-10 flex items-center gap-2">
          {/* The small dot that scales on hover */}
          <div className="h-2 w-2 rounded-full bg-white/75 transition-all duration-300 group-hover:scale-[100.8]"></div>
          {/* The text that slides out on hover */}
          <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
            {children}
          </span>
        </div>

        {/* The content that appears on hover */}
        <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
          <span>{children}</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </button>
    );
  },
);

InteractiveShimmerButton.displayName = "InteractiveShimmerButton";