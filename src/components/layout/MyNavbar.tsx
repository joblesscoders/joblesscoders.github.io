"use client";
import React, { useState } from "react";

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
//   ProductItem,
//   HoveredLink,
} from "@/components/ui/resizable-navbar";

export default function MyNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define nav items with mega menu support
  const navItems = [
    // {
    //   name: "Features",
    //   // For items with dropdown, don't include link
    //   children: (
    //     <div className="flex flex-col space-y-4 text-sm">
    //       <div className="flex flex-col space-y-2">
    //         <HoveredLink href="#analytics">Analytics Dashboard</HoveredLink>
    //         <HoveredLink href="#reporting">Custom Reports</HoveredLink>
    //         <HoveredLink href="#integrations">Integrations</HoveredLink>
    //       </div>
    //       <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
    //         <ProductItem
    //           title="Pro Analytics"
    //           description="Advanced analytics with real-time insights"
    //           href="#pro-analytics"
    //           src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
    //         />
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   name: "Products",
    //   children: (
    //     <div className="flex flex-col space-y-4 text-sm">
    //       <div className="grid grid-cols-2 gap-4">
    //         <ProductItem
    //           title="SaaS Platform"
    //           description="Complete business management solution"
    //           href="#saas"
    //           src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
    //         />
    //         <ProductItem
    //           title="Mobile App"
    //           description="Native mobile experience"
    //           href="#mobile"
    //           src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
    //         />
    //       </div>
    //       <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
    //         <div className="flex flex-col space-y-2">
    //           <HoveredLink href="#api">Developer API</HoveredLink>
    //           <HoveredLink href="#webhooks">Webhooks</HoveredLink>
    //           <HoveredLink href="#sdk">SDK & Libraries</HoveredLink>
    //         </div>
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   name: "Pricing",
    //   link: "#pricing", // Simple link without dropdown
    // },
    // {
    //   name: "Resources",
    //   children: (
    //     <div className="flex flex-col space-y-4 text-sm">
    //       <div className="flex flex-col space-y-2">
    //         <HoveredLink href="#documentation">Documentation</HoveredLink>
    //         <HoveredLink href="#guides">Guides & Tutorials</HoveredLink>
    //         <HoveredLink href="#blog">Blog</HoveredLink>
    //         <HoveredLink href="#community">Community</HoveredLink>
    //       </div>
    //       <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
    //         <div className="flex flex-col space-y-2">
    //           <HoveredLink href="#support">Support Center</HoveredLink>
    //           <HoveredLink href="#status">System Status</HoveredLink>
    //         </div>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      name: "About Us",
      link: "#", // Link to the homepage
    },
    {
      name: "Blog",
      link: "#", // Link to the blog page
    },
    {
      name: "Careers",
      link: "#", // Link to the careers page
    },
    {
      name: "Pricing",
      link: "#", // Simple link without dropdown
    },
    {
      name: "Contact",
      link: "#", // Simple link without dropdown
    },
  ];

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          <NavbarButton variant="secondary">Make a CV</NavbarButton>
          <NavbarButton variant="primary">Login</NavbarButton>
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
          {/* Mobile menu items - flattened for mobile */}
          <div className="flex flex-col space-y-4 w-full">
            {/* Features Section */}
            <div>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                About Us
              </h3>
              {/* <div className="pl-4 space-y-2">
                <a
                  href="#analytics"
                  className="block text-neutral-600 dark:text-neutral-300"
                >
                  Analytics Dashboard
                </a>
                <a
                  href="#reporting"
                  className="block text-neutral-600 dark:text-neutral-300"
                >
                  Custom Reports
                </a>
                <a
                  href="#integrations"
                  className="block text-neutral-600 dark:text-neutral-300"
                >
                  Integrations
                </a>
              </div> */}
            </div>

            {/* Products Section */}
            <div>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                Blog
              </h3>
              {/* <div className="pl-4 space-y-2">
                <a
                  href="#saas"
                  className="block text-neutral-600 dark:text-neutral-300"
                >
                  SaaS Platform
                </a>
                <a
                  href="#mobile"
                  className="block text-neutral-600 dark:text-neutral-300"
                >
                  Mobile App
                </a>
                <a
                  href="#api"
                  className="block text-neutral-600 dark:text-neutral-300"
                >
                  Developer API
                </a>
              </div> */}
            </div>

            {/* Simple links */}
            <a
              href="#pricing"
              className="text-neutral-600 dark:text-neutral-300 font-medium"
            >
              Careers
            </a>

            {/* Resources Section */}
            <div>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                Pricing
              </h3>
              {/* <div className="pl-4 space-y-2">
                <a
                  href="#documentation"
                  className="block text-neutral-600 dark:text-neutral-300"
                >
                  Documentation
                </a>
                <a
                  href="#guides"
                  className="block text-neutral-600 dark:text-neutral-300"
                >
                  Guides & Tutorials
                </a>
                <a
                  href="#blog"
                  className="block text-neutral-600 dark:text-neutral-300"
                >
                  Blog
                </a>
                <a
                  href="#support"
                  className="block text-neutral-600 dark:text-neutral-300"
                >
                  Support Center
                </a>
              </div> */}
            </div>

            <a
              href="#contact"
              className="text-neutral-600 dark:text-neutral-300 font-medium"
            >
              Contact
            </a>
          </div>

          {/* Mobile CTA buttons */}
          <div className="flex w-full flex-col gap-4 mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="secondary"
              className="w-full"
            >
              Make a CV
            </NavbarButton>
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full"
            >
              Login
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
