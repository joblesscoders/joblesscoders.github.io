"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = resolvedTheme === "light";
  const nextTheme = isLight ? "dark" : "light";

  const toggleTheme = () => {
    setTheme(nextTheme);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={mounted ? `Switch to ${nextTheme} mode` : "Toggle visual theme"}
      className="relative overflow-hidden min-h-[44px] min-w-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 focus-visible:outline-offset-2"
    >
      {mounted ? (
        isLight ? (
          <Sun className="h-[1.2rem] w-[1.2rem] transition-transform duration-150 rotate-0 scale-100" aria-hidden="true" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem] transition-transform duration-150 rotate-0 scale-100" aria-hidden="true" />
        )
      ) : (
        <span className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
      )}
      <span className="sr-only">{mounted ? `Switch to ${nextTheme} mode` : "Toggle visual theme"}</span>
    </Button>
  );
}