"use client";

import React from "react";
import { motion } from "framer-motion";
import ProfileCard from "@/components/ui/profile-card";

interface TeamMember {
  name: string;
  title: string;
  handle: string;
  status: string;
  avatarUrl: string;
  innerGradient: string;
  behindGlowColor: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Asif Bhuiyan Shawon",
    title: "Team Lead, Full-Stack & DevOps",
    handle: "shawon",
    status: "Online",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    innerGradient:
      "linear-gradient(145deg, rgba(99, 102, 241, 0.35) 0%, rgba(15, 15, 22, 0.95) 100%)",
    behindGlowColor: "rgba(99, 102, 241, 0.55)",
  },
  {
    name: "Tousif Muhaimine",
    title: "Backend Lead & AI Engineer",
    handle: "tousif",
    status: "Online",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
    innerGradient:
      "linear-gradient(145deg, rgba(16, 185, 129, 0.35) 0%, rgba(15, 15, 22, 0.95) 100%)",
    behindGlowColor: "rgba(16, 185, 129, 0.55)",
  },
  {
    name: "Midhat Ratib Khan",
    title: "Data Analyst & Cloud Engineer",
    handle: "ratib",
    status: "Online",
    avatarUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
    innerGradient:
      "linear-gradient(145deg, rgba(245, 158, 11, 0.35) 0%, rgba(15, 15, 22, 0.95) 100%)",
    behindGlowColor: "rgba(245, 158, 11, 0.55)",
  },
  {
    name: "Shafkat Sharif Bhuiyan",
    title: "Data & System Engineer",
    handle: "shafkat",
    status: "Online",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80",
    innerGradient:
      "linear-gradient(145deg, rgba(239, 68, 68, 0.35) 0%, rgba(15, 15, 22, 0.95) 100%)",
    behindGlowColor: "rgba(239, 68, 68, 0.55)",
  },
  {
    name: "Rafi Haque",
    title: "Frontend Lead",
    handle: "rafi",
    status: "Online",
    avatarUrl:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80",
    innerGradient:
      "linear-gradient(145deg, rgba(6, 182, 212, 0.35) 0%, rgba(15, 15, 22, 0.95) 100%)",
    behindGlowColor: "rgba(6, 182, 212, 0.55)",
  },
  {
    name: "Zarif Zoha",
    title: "Cyber Security Lead",
    handle: "zarif",
    status: "Online",
    avatarUrl:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&auto=format&fit=crop&q=80",
    innerGradient:
      "linear-gradient(145deg, rgba(236, 72, 153, 0.35) 0%, rgba(15, 15, 22, 0.95) 100%)",
    behindGlowColor: "rgba(236, 72, 153, 0.55)",
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16 relative z-10">
        {/* <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          Meet The Team
        </motion.div> */}

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
        >
          The Minds Behind <span className="text-violet-400">Jobless Coders</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-neutral-400 max-w-2xl mx-auto text-base sm:text-lg"
        >
          A collective of software engineers, cloud architects, data scientists, and security experts driven by passion for clean code and high performance.
        </motion.p>
      </div>

      {/* 3x2 Grid of 3D React Bits Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 justify-items-center relative z-10 max-w-6xl mx-auto">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.handle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full flex justify-center"
          >
            <ProfileCard
              name={member.name}
              title={member.title}
              handle={member.handle}
              status={member.status}
              avatarUrl={member.avatarUrl}
              iconUrl="/assets/iconpattern.svg"
              innerGradient={member.innerGradient}
              behindGlowEnabled={true}
              behindGlowColor={member.behindGlowColor}
              behindGlowSize="50%"
              enableTilt={true}
              enableMobileTilt={true}
              showUserInfo={true}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
