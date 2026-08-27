import React from "react";
import type { Metadata } from "next";
import ContactSection from "@/components/homepage/contactSection";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact & Project Inquiries",
  description:
    "Get in touch with Jobless Coders. Discuss your software architecture, sprint timeline, or project requirements with our engineering leads.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Jobless Coders | Start a Project",
    description:
      "Direct communication with senior engineers. Response within 24 business hours.",
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-16">
      <ContactSection />
    </div>
  );
}
