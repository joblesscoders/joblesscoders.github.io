"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

const dockVariants = cva(
  "mx-auto flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border border-border bg-card/80 p-2 backdrop-blur-md shadow-lg transition-all"
);

export const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ className, children, direction = "middle", ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Quick links dock"
        className={cn(dockVariants({ className }), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        })}
        {...props}
      >
        {children}
      </nav>
    );
  }
);

Dock.displayName = "Dock";

export interface DockIconProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export const DockIcon = ({ className, children, ...props }: DockIconProps) => {
  return (
    <div
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full transition-transform duration-150 ease-out hover:scale-110 active:scale-95",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

DockIcon.displayName = "DockIcon";
