import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`mb-8 ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-muted-foreground">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded px-2 py-1.5 min-h-[36px]"
          >
            <Home className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/80 shrink-0" aria-hidden="true" />
              {isLast || !item.href ? (
                <span
                  aria-current="page"
                  className="font-medium text-foreground px-2 py-1.5 truncate max-w-[200px] sm:max-w-[320px]"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded px-2 py-1.5 min-h-[36px] inline-flex items-center truncate max-w-[200px]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
