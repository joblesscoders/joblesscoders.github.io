"use client";
import React, { useState } from "react";
import Link from "next/link";

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

export default function MyNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Services",
      link: "/services",
    },
    {
      name: "Work",
      link: "/work",
    },
    {
      name: "About",
      link: "/about",
    },
  ];

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          <NavbarButton variant="primary" href="/contact">
            Contact
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
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
          <div className="flex flex-col space-y-1 w-full" role="navigation" aria-label="Mobile links">
            <Link
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-neutral-700 dark:text-neutral-200 font-medium hover:text-violet-500 py-3 px-3 min-h-[48px] flex items-center rounded-lg hover:bg-muted transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
            >
              Services
            </Link>
            <Link
              href="/work"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-neutral-700 dark:text-neutral-200 font-medium hover:text-violet-500 py-3 px-3 min-h-[48px] flex items-center rounded-lg hover:bg-muted transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
            >
              Work
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-neutral-700 dark:text-neutral-200 font-medium hover:text-violet-500 py-3 px-3 min-h-[48px] flex items-center rounded-lg hover:bg-muted transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
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
              className="w-full"
            >
              Contact
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
