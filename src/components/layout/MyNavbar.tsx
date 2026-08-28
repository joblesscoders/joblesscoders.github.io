"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IconChevronDown } from "@tabler/icons-react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { SolutionsMegaPanel, DELIVERABLE_LINKS } from "./SolutionsMegaPanel";

export default function MyNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);

  const navItems = [
    {
      name: "Work",
      link: "/work",
    },
    {
      name: "Solutions",
      link: "/solutions",
      children: <SolutionsMegaPanel />,
    },
    {
      name: "Services",
      link: "/services",
    },
    {
      name: "About",
      link: "/about",
    },
  ];

  return (
    <Navbar>
      {/* Desktop Sticky Header */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          <NavbarButton variant="primary" href="/contact">
            Start a Project
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Sticky Header & Drawer */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {/* Mobile menu items */}
          <div className="flex flex-col space-y-1 w-full text-left" role="navigation" aria-label="Mobile links">
            <Link
              href="/work"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-foreground font-medium hover:text-violet-400 py-3 px-3 min-h-[48px] flex items-center rounded-xl hover:bg-muted transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
            >
              Work
            </Link>

            {/* Solutions overview link + disclosure */}
            <div className="w-full">
              <div className="flex items-center rounded-xl hover:bg-muted focus-within:bg-muted transition-colors">
                <Link
                  href="/solutions"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 text-foreground font-medium hover:text-violet-400 py-3 pl-3 min-h-[48px] flex items-center rounded-l-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
                >
                  Solutions
                </Link>
                <button
                  type="button"
                  onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                  aria-label={`${isMobileSolutionsOpen ? "Close" : "Open"} solutions menu`}
                  aria-expanded={isMobileSolutionsOpen}
                  aria-controls="mobile-solutions-menu"
                  className="px-4 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-r-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 cursor-pointer"
                >
                  <IconChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                      isMobileSolutionsOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </div>

              {isMobileSolutionsOpen && (
                <div id="mobile-solutions-menu" className="pl-4 pr-2 py-2 space-y-1 bg-muted/30 rounded-xl mt-1 border border-border/50">
                  {DELIVERABLE_LINKS.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-xs text-muted-foreground hover:text-foreground py-2.5 px-3 min-h-[44px] flex items-center rounded-lg hover:bg-muted transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-foreground font-medium hover:text-violet-400 py-3 px-3 min-h-[48px] flex items-center rounded-xl hover:bg-muted transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
            >
              Services
            </Link>

            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-foreground font-medium hover:text-violet-400 py-3 px-3 min-h-[48px] flex items-center rounded-xl hover:bg-muted transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
            >
              About
            </Link>
          </div>

          {/* Mobile CTA button */}
          <div className="flex w-full flex-col gap-4 mt-4 pt-4 border-t border-border">
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              href="/contact"
              variant="primary"
              className="w-full min-h-[48px]"
            >
              Start a Project
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
