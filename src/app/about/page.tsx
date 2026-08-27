import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { getAllTeamMembers } from "@/content";
import { siteConfig } from "@/lib/site-config";
import { Github, Globe, Linkedin, ShieldCheck, Terminal, Twitter, Users } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CtaSection from "@/components/layout/CtaSection";

export const metadata: Metadata = {
  title: "About the Collective & Senior Engineering Team",
  description:
    "Learn about Jobless Coders: a collective of 6 senior software engineers based in Dhaka (GMT+6) delivering full-stack platforms, mobile apps, AI workflows, and cloud infrastructure.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About the Collective & Senior Engineering Team | Jobless Coders",
    description:
      "A senior software engineering collective delivering production-grade platforms with direct access, async velocity, and zero fluff.",
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function AboutPage() {
  const team = getAllTeamMembers();

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Jobless Coders Collective",
    description: "Learn about the Jobless Coders senior engineering collective in Dhaka, Bangladesh.",
    url: `${siteConfig.url}/about`,
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      member: team.map((m) => ({
        "@type": "Person",
        name: m.name,
        jobTitle: m.role,
        description: m.bio,
      })),
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "About" }]} />

      {/* Header */}
      <header className="max-w-3xl mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-4">
          <span>{"// Who We Are & How We Operate"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          An Engineering Collective Built for High-Impact Software
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          Jobless Coders is an independent collective of senior engineers based in Dhaka, Bangladesh (GMT+6) collaborating with engineering teams worldwide. We replace traditional agency overhead and account managers with direct, hands-on engineering velocity.
        </p>
      </header>

      {/* Why We Exist & Studio Tenets */}
      <section aria-labelledby="tenets-heading" className="mb-20">
        <h2 id="tenets-heading" className="sr-only">
          Core Studio Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-4">
              <Terminal className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Senior Builders Only</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Every feature, schema, and CI/CD configuration is designed and written by senior engineers. We don&apos;t practice junior bait-and-switch or opaque subcontracting.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-4">
              <Globe className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Global Async Velocity</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Based in Dhaka (GMT+6), we have direct workday overlap with European and Asian teams, paired with efficient overnight delivery cycles for North American clients.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Clean Technical Rigor</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Strict TypeScript types, clean Next.js Server Component boundaries, self-hosted fonts, and zero bloated third-party dependencies ensure production longevity.
            </p>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section aria-labelledby="how-we-work-heading" className="mb-20">
        <div className="p-8 sm:p-10 rounded-2xl bg-card/60 border border-border">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-3">
              <span>{"// Operational Model"}</span>
            </div>
            <h2 id="how-we-work-heading" className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              How the Collective Collaborates With You
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              Unlike large consultancies that burden your budget with non-technical overhead, we embed directly into your GitHub repos, Slack channels, and issue trackers:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-background/50 border border-border/80">
              <div className="text-xs font-mono text-violet-400 font-bold mb-2">01 / ARCHITECTURE</div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Collaborative Spec</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Clear technical roadmaps, database schemas, and API contracts agreed upon before writing code.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-background/50 border border-border/80">
              <div className="text-xs font-mono text-violet-400 font-bold mb-2">02 / SPRINTS</div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Iterative Delivery</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Focused 2-week sprints with staged pull request previews and automated test coverage.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-background/50 border border-border/80">
              <div className="text-xs font-mono text-violet-400 font-bold mb-2">03 / ASYNC</div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Transparent Comms</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Async daily standups, clean Loom/PR walkthroughs, and direct Slack/Discord access.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-background/50 border border-border/80">
              <div className="text-xs font-mono text-violet-400 font-bold mb-2">04 / HANDOFF</div>
              <h3 className="text-sm font-semibold text-foreground mb-1">No Lock-In</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Comprehensive documentation, clean type definitions, and thorough code handoff to your team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Roster Header */}
      <section aria-labelledby="team-heading" className="mb-20">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-3">
            <Users className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{"// Core Team"}</span>
          </div>
          <h2 id="team-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Meet the 6 Core Engineers
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Each member brings deep domain experience across full-stack architecture, machine learning pipelines, mobile engineering, systems optimization, and cloud security.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <article
              key={member.handle}
              className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between hover:border-violet-500/30 transition-all duration-200 shadow-sm"
            >
              <div>
                {/* Avatar & Handle Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-border shrink-0 bg-neutral-900">
                    <Image
                      src={member.avatarUrl}
                      alt={`${member.name} portrait`}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground leading-snug">{member.name}</h3>
                    <p className="text-xs font-mono text-violet-400">@{member.handle}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{member.role}</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                  {member.bio}
                </p>

                {/* Specialties */}
                <div className="space-y-1.5 mb-6">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
                    Core Focus Areas
                  </span>
                  <div className="flex flex-wrap gap-1.5">
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
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-border flex items-center gap-2">
                {member.socials.github && (
                  <a
                    href={member.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on GitHub (opens in new tab)`}
                    className="p-2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}
                {member.socials.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn (opens in new tab)`}
                    className="p-2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
                  >
                    <Linkedin className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}
                {member.socials.x && (
                  <a
                    href={member.socials.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on X (opens in new tab)`}
                    className="p-2 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
                  >
                    <Twitter className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Shared CTA */}
      <CtaSection
        title="Interested in working directly with our collective?"
        description="We take on a limited number of high-impact engineering engagements each quarter to ensure senior-level execution and dedicated focus."
        primaryButtonText="Get in Touch with Our Leads"
        primaryButtonHref="/contact"
      />
    </div>
  );
}
