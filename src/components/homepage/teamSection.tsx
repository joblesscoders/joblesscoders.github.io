"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { getAllTeamMembers } from "@/content";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import { useGSAPReveal } from "@/lib/reveal";

export default function TeamSection() {
  const containerRef = useRef<HTMLElement>(null);
  const team = getAllTeamMembers();

  useGSAPReveal(containerRef, [
    { selector: ".team-header", y: 20, duration: 0.6, start: "top 85%" },
    { selector: ".team-card", y: 20, stagger: 0.08, duration: 0.6, start: "top 85%" },
  ]);

  return (
    <section id="team" ref={containerRef} className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="team-header flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-mono mb-3">
              <span>{"// The Collective"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              6 Senior Engineers & Builders
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl">
              Based in Dhaka (GMT+6), working directly with founders and CTOs worldwide. Zero middle-management friction.
            </p>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded"
          >
            <span>Learn more about the team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Team Grid */}
        <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <article
              key={member.handle}
              className="team-card p-6 sm:p-7 rounded-2xl bg-card border border-border hover:border-violet-500/30 transition-[border-color,box-shadow,background-color] duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-mono text-violet-600 dark:text-violet-400 font-semibold">
                    @{member.handle}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                    <span>Senior</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                <p className="text-xs font-medium text-violet-600 dark:text-violet-400 mb-3">{member.role}</p>

                <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                  {member.bio}
                </p>

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
      </div>
    </section>
  );
}
