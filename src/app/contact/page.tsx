import React from "react";
import type { Metadata } from "next";
import ContactSection from "@/components/homepage/contactSection";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";
import { Clock, ShieldCheck, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Engineering Inquiries",
  description:
    "Get in touch with Jobless Coders. Discuss your software architecture, sprint timeline, or project requirements with our engineering leads.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Jobless Coders | Start an Engineering Discussion",
    description:
      "Direct communication with senior engineers. Expected response within 24–48 business hours.",
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Jobless Coders Leads",
    description: "Direct contact with Jobless Coders engineering leads.",
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      email: siteConfig.email,
      url: siteConfig.url,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.city,
        addressCountry: siteConfig.location.countryCode,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Contact" }]} />

      {/* Expected Process Banner */}
      <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-card border border-border">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-4">
          <span>{"// Direct Engineering Intake"}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
          What Happens After You Reach Out
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl mb-6">
          We respect your time. When you send a message, it is reviewed directly by our technical leads—not sales intermediaries or marketing bots.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="flex items-start gap-3">
            <UserCheck className="w-4 h-4 text-violet-400 mt-1 shrink-0" aria-hidden="true" />
            <div>
              <h2 className="text-xs font-mono uppercase font-bold text-foreground">1. Lead Review</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Senior engineers evaluate your requirements and feasibility.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-violet-400 mt-1 shrink-0" aria-hidden="true" />
            <div>
              <h2 className="text-xs font-mono uppercase font-bold text-foreground">2. Honest Timeline</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                We respond within 24–48 business hours with technical feedback.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400 mt-1 shrink-0" aria-hidden="true" />
            <div>
              <h2 className="text-xs font-mono uppercase font-bold text-foreground">3. Scoping Call</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                We schedule a 30-min architecture & sprint scoping session.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Contact Section */}
      <ContactSection />
    </div>
  );
}
