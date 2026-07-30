"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/../public/assets/Jobless_coders_colored.png";

const FOOTER_LINKS = [
  {
    title: "Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "#about" },
      { label: "Team", href: "#team" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Socials",
    links: [
      { label: "GitHub", href: "https://github.com/joblesscoders" },
      { label: "LinkedIn", href: "https://linkedin.com/company/joblesscoders" },
      { label: "Facebook", href: "https://facebook.com/joblesscoders" },
      { label: "Discord", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "#" },
      { label: "Cloud Solutions", href: "#" },
      { label: "AI & ML", href: "#" },
      { label: "Cyber Security", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/[0.06] bg-neutral-950/80">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-14 pb-8">
        {/* Top row: Logo + Link columns */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Logo + Copyright */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <Image
                src={logo}
                alt="Jobless Coders logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="font-bitcount-normal font-light text-xl text-white">
                <span className="text-violet-500">{"<"}</span>
                Jobless{" "}
                <span className="text-red-400">
                  Coders<span className="text-violet-500">{"/>"}</span>
                </span>
              </span>
            </Link>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
              © {new Date().getFullYear()} Jobless Coders. All rights reserved.
            </p>
            <p className="text-xs text-neutral-600 mt-2 max-w-xs leading-relaxed">
              A collective of engineers building high-performance digital experiences from Dhaka, Bangladesh.
            </p>
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_LINKS.map((group) => (
              <div key={group.title}>
                <h4 className="text-sm font-semibold text-neutral-300 mb-4">
                  {group.title}
                </h4>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm text-neutral-500 hover:text-violet-400 transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Giant watermark brand name */}
      <div className="relative w-full overflow-hidden select-none pointer-events-none" aria-hidden="true">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div
            className="font-bitcount-normal text-[clamp(5rem,15vw,12rem)] leading-none tracking-tight text-white/[0.03] whitespace-nowrap pb-4"
          >
            {"<"}Jobless Coders{"/>"}
          </div>
        </div>
      </div>
    </footer>
  );
}
