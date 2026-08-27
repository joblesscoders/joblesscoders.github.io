import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllTeamMembers } from "@/content";
import { siteConfig } from "@/lib/site-config";
import { Github, Globe, Linkedin, ShieldCheck, Terminal, Twitter } from "lucide-react";

export const metadata: Metadata = {
  title: "About the Collective & Senior Engineering Team",
  description:
    "Learn about Jobless Coders: a collective of senior software engineers based in Dhaka (GMT+6) delivering full-stack platforms, mobile apps, AI workflows, and cloud infrastructure.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Jobless Coders | Engineering Collective",
    description:
      "A collective of senior software engineers delivering production-grade platforms with direct access and zero fluff.",
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  const team = getAllTeamMembers();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-4">
          <span>{"// Who We Are"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          An Engineering Collective Built for High-Impact Software
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          Jobless Coders is an independent collective of senior engineers based in Dhaka (GMT+6) collaborating with tech companies globally. We replace bloated agency layers with direct, hands-on engineering capability.
        </p>
      </div>

      {/* Core Studio Tenets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border">
          <div className="w-9 h-9 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-4">
            <Terminal className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">Senior-Only Roster</h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Every line of code is written by experienced builders. No junior bait-and-switch or fragmented subcontracting.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border">
          <div className="w-9 h-9 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-4">
            <Globe className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">Global Async Overlap</h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Operating from GMT+6 gives us seamless workday overlap with Europe, Middle East, and Asia, plus night-cycle delivery for the Americas.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border">
          <div className="w-9 h-9 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">Obsessive Quality</h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Strict TypeScript types, clean Server Component boundaries, self-hosted fonts, and zero bloated third-party dependencies.
          </p>
        </div>
      </div>

      {/* Team Roster Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-3">
          <span>{"// Core Team"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Meet the 6 Senior Engineers
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Each member brings focused domain expertise across backend architecture, AI pipelines, mobile apps, and systems security.
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {team.map((member) => (
          <article
            key={member.handle}
            className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between hover:border-violet-500/30 transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-xs font-mono text-violet-400 font-semibold">
                  @{member.handle}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Active</span>
                </span>
              </div>

              <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
              <p className="text-xs font-medium text-violet-400 mb-3">{member.role}</p>

              <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                {member.bio}
              </p>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {member.specialties.map((spec) => (
                  <span
                    key={spec}
                    className="px-2 py-0.5 text-[10px] font-mono bg-muted text-muted-foreground rounded-md border border-border"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-border flex items-center gap-3">
              {member.socials.github && (
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} GitHub`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {member.socials.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} LinkedIn`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {member.socials.x && (
                <a
                  href={member.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} X`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Direct Contact Banner */}
      <div className="p-8 sm:p-10 rounded-2xl bg-card border border-border text-center">
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Interested in working directly with our collective?
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
          We accept a limited number of client engagements each quarter to ensure maximum focus and technical velocity.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-colors shadow-lg shadow-violet-600/20"
        >
          Get in Touch with the Leads
        </Link>
      </div>
    </div>
  );
}
