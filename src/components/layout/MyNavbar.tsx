"use client";
import React, { useState } from "react";
import { smoothScrollTo } from "@/lib/utils";

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

  // Define nav items
  const navItems = [
    {
      name: "About Us",
      link: "#about",
    },
    {
      name: "Team",
      link: "#team",
    },
  ];

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    smoothScrollTo(targetId, 1000);
  };

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          <NavbarButton variant="primary" href="#contact">
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
          <div className="flex flex-col space-y-4 w-full">
            <a
              href="#about"
              onClick={(e) => handleMobileNavClick(e, "#about")}
              className="text-neutral-600 dark:text-neutral-300 font-medium hover:text-white transition-colors cursor-pointer"
            >
              About Us
            </a>
            <a
              href="#team"
              onClick={(e) => handleMobileNavClick(e, "#team")}
              className="text-neutral-600 dark:text-neutral-300 font-medium hover:text-white transition-colors cursor-pointer"
            >
              Team
            </a>
          </div>

          {/* Mobile CTA button */}
          <div className="flex w-full flex-col gap-4 mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <NavbarButton
              onClick={() => {
                setIsMobileMenuOpen(false);
                smoothScrollTo("#contact", 1000);
              }}
              href="#contact"
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
