"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Smartphone,
  Palette,
  Cpu,
  Server,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Terminal,
  Code2,
  Zap,
  ShieldCheck,
  Code,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceItem {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  icon: React.ElementType;
  description: string;
  features: string[];
  techStack: string[];
  codeSnippet: string;
}

const services: ServiceItem[] = [
  {
    id: "web-dev",
    name: "Full-Stack Web Development",
    shortName: "Web Apps",
    tagline: "Blazing-fast, SEO-optimized, Next-Gen Web Platforms",
    icon: Globe,
    description:
      "We architect high-concurrency web applications using Next.js 15, React 19, and modern microservices, delivering lightning-fast page load times and flawless UX.",
    features: [
      "Server-Side Rendering & ISR Strategy",
      "Custom Micro-animations & Dynamic UI",
      "Real-time WebSocket & API Integrations",
      "Lighthouse 100% Core Web Vitals",
    ],
    techStack: ["Next.js 15", "React 19", "TypeScript", "TailwindCSS", "Node.js"],
    codeSnippet: `// Next.js App Router API
export async function GET() {
  const data = await fetchServices();
  return Response.json({ status: "200 OK", data });
}`,
  },
  {
    id: "mobile-dev",
    name: "Mobile App Development",
    shortName: "Mobile Apps",
    tagline: "Cross-Platform Native Mobile Apps for iOS & Android",
    icon: Smartphone,
    description:
      "Fluid 60fps mobile applications built with React Native and Expo. Seamless offline-first state management, biometric authentication, and native performance.",
    features: [
      "Cross-Platform iOS & Android Parity",
      "Fluid Gesture Animations (Reanimated)",
      "Push Notifications & In-App Analytics",
      "Offline-First SQLite / WatermelonDB",
    ],
    techStack: ["React Native", "Expo", "TypeScript", "Redux Toolkit", "GraphQL"],
    codeSnippet: `// Mobile Native Hook
const useNativeSensor = () => {
  const { isConnected } = useNetwork();
  return { status: isConnected ? "online" : "offline" };
};`,
  },
  {
    id: "design-systems",
    name: "UI/UX & Design Systems",
    shortName: "UI/UX Design",
    tagline: "Pixel-Perfect Interfaces & Scalable Design Tokens",
    icon: Palette,
    description:
      "Elevating brand identities with modern dark-mode aesthetic, glassmorphism, dynamic design tokens, and highly reusable design component libraries.",
    features: [
      "Comprehensive Figma Design Systems",
      "Custom Tailwind & Radix UI Primitives",
      "Interactive Micro-Interactions",
      "WCAG 2.1 AAA Accessibility Standards",
    ],
    techStack: ["Figma", "TailwindCSS", "Radix UI", "Framer Motion", "CSS Modules"],
    codeSnippet: `/* Design Tokens */
:root {
  --accent-glow: radial-gradient(circle, #8b5cf6 0%, #3b82f6 100%);
  --glass-border: rgba(255, 255, 255, 0.08);
}`,
  },
  {
    id: "ai-automation",
    name: "AI & Machine Learning",
    shortName: "AI / Automation",
    tagline: "Intelligent Workflows & Custom LLM Integrations",
    icon: Cpu,
    description:
      "Integrating cutting-edge AI capabilities—from custom RAG pipelines to autonomous task agents and intelligent natural language search systems.",
    features: [
      "Custom Vector Search & RAG Pipelines",
      "LLM Agent Function Calling & Tool Use",
      "Automated Data Mining & Extraction",
      "Fine-tuned Domain Specific Models",
    ],
    techStack: ["Python", "PyTorch", "FastAPI", "OpenAI", "LangChain", "Pinecone"],
    codeSnippet: `# AI Agent Tool Declaration
@agent.tool
def execute_query(prompt: str) -> dict:
    return rag_pipeline.search(prompt, limit=5)`,
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps Solutions",
    shortName: "Cloud DevOps",
    tagline: "Bulletproof Infrastructure & Zero-Downtime Deployments",
    icon: Server,
    description:
      "Building resilient serverless and containerized cloud setups on AWS and Vercel with automated GitHub Actions CI/CD pipelines and 24/7 logging.",
    features: [
      "Automated CI/CD Deployment Pipelines",
      "Docker & Kubernetes Containerization",
      "Cloud Infrastructure as Code (Terraform)",
      "Real-time Monitoring & Alert Systems",
    ],
    techStack: ["AWS", "Docker", "Linux", "GitHub Actions", "Vercel", "PostgreSQL"],
    codeSnippet: `# GitHub Actions Deployment
name: Deploy Main
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest`,
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description:
      "We dive deep into your requirements, defining project architecture, database models, and target milestones.",
    icon: Code2,
  },
  {
    step: "02",
    title: "Agile Development",
    description:
      "Writing clean, modular code with continuous testing, regular code reviews, and transparent client updates.",
    icon: Zap,
  },
  {
    step: "03",
    title: "Launch & Optimization",
    description:
      "Zero-downtime deployment, performance tuning, and 24/7 operational reliability for continuous growth.",
    icon: ShieldCheck,
  },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const currentService = services[activeTab];

  const handleNext = () => {
    setActiveTab((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setActiveTab((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Title Header */}
      <div className="text-center mb-16 relative z-10">
        {/* <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          About Jobless Coders
        </motion.div> */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
        >
          Who We Are & <span className="text-violet-400">What We Build</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-neutral-400 max-w-2xl mx-auto text-base sm:text-lg"
        >
          An elite group of software engineers dedicated to turning ambitious visions into robust digital reality.
        </motion.p>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* LEFT COLUMN: macOS Theme Window for Services Showcase (7 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col h-[560px]"
        >
          {/* macOS Window Outer Container with Fixed Height */}
          <div className="w-full rounded-2xl bg-neutral-950/80 backdrop-blur-xl border border-neutral-800/80 shadow-2xl overflow-hidden flex flex-col h-[560px]">
            {/* macOS Titlebar */}
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/70 border-b border-neutral-800/80 shrink-0">
              {/* Traffic Light Control Buttons */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/30" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/30" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/30" />
              </div>

              {/* Window Title */}
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <Terminal className="w-3.5 h-3.5 text-violet-400" />
                <span>services.config.ts — JoblessCoders IDE</span>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-300 bg-neutral-800/60 px-2 py-0.5 rounded-full border border-neutral-700/50">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                <span>Active</span>
              </div>
            </div>

            {/* Inner Window Body: Sidebar Tabs + Active Service Content */}
            <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-neutral-800/60">
              {/* Sidebar Tabs (4 Cols on md) */}
              <div className="md:col-span-4 p-3 bg-neutral-900/30 flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto">
                <div className="hidden md:block px-2 py-1.5 text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                  {"// Services Catalog"}
                </div>
                {services.map((service, index) => {
                  const Icon = service.icon;
                  const isActive = index === activeTab;
                  return (
                    <button
                      key={service.id}
                      onClick={() => setActiveTab(index)}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left whitespace-nowrap md:whitespace-normal group cursor-pointer shrink-0",
                        isActive
                          ? "bg-neutral-800/90 text-white shadow-sm border border-neutral-700/80"
                          : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40"
                      )}
                    >
                      <div
                        className={cn(
                          "p-1.5 rounded-lg transition-colors",
                          isActive ? "bg-violet-500/10 border border-violet-500/20" : "bg-neutral-800/50 group-hover:bg-neutral-800"
                        )}
                      >
                        <Icon className={cn("w-4 h-4", isActive ? "text-violet-400" : "text-neutral-400")} />
                      </div>
                      <span className="font-semibold tracking-wide">{service.shortName}</span>
                    </button>
                  );
                })}
              </div>

              {/* Main Service Viewer Content (8 Cols on md) */}
              <div className="md:col-span-8 p-5 sm:p-6 flex flex-col justify-between bg-neutral-950/40 relative overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentService.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      {/* Service Badge & Icon Header */}
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 rounded-xl border shrink-0 bg-violet-500/10 border-violet-500/20">
                          <currentService.icon className="w-6 h-6 text-violet-400" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                            {currentService.name}
                          </h3>
                          <p className="text-xs text-neutral-400 font-medium">
                            {currentService.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-3 mt-2">
                        {currentService.description}
                      </p>

                      {/* Key Features List */}
                      <div className="space-y-1.5 mb-3">
                        <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                          {"// Key Deliverables"}
                        </span>
                        <div className="grid grid-cols-1 gap-1.5">
                          {currentService.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-neutral-200">
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-violet-400" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {currentService.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[11px] font-mono bg-neutral-900 text-neutral-300 rounded-md border border-neutral-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Mini Code Snippet */}
                      <div className="rounded-lg bg-neutral-900/90 p-2.5 border border-neutral-800/80 font-mono text-[11px] text-neutral-300 overflow-x-auto">
                        <pre className="whitespace-pre-wrap leading-tight text-neutral-400">
                          <code>{currentService.codeSnippet}</code>
                        </pre>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Footer Controls inside macOS Window */}
                <div className="pt-3 mt-3 border-t border-neutral-800/80 flex items-center justify-between shrink-0">
                  <button
                    onClick={handlePrev}
                    className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer px-2.5 py-1.5 rounded-lg hover:bg-neutral-800/50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {services.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all cursor-pointer",
                          idx === activeTab
                            ? "bg-violet-400 w-5"
                            : "bg-neutral-700 hover:bg-neutral-500"
                        )}
                        aria-label={`Go to service ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors cursor-pointer font-medium px-2.5 py-1.5 rounded-lg hover:bg-violet-500/10"
                  >
                    <span>Next Service</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: How We Work & Engineering Standards (5 Cols - Matching Height) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-neutral-950/80 backdrop-blur-xl border border-neutral-800/80 shadow-2xl p-5 sm:p-6 h-[560px] relative overflow-hidden"
        >
          {/* Subtle Watermark Coding </> Icon */}
          <div className="absolute -right-4 -top-4 opacity-10 pointer-events-none text-neutral-400">
            <Code className="w-44 h-44 stroke-[1.25]" />
          </div>

          <div>
            {/* Header with </> Sign & Title */}
            <div className="flex items-center gap-3 mb-5 relative z-10">
              <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 shadow-sm">
                <Code className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-mono text-lg font-bold">
                  <span className="text-violet-400">{"<"}</span>
                  <span className="text-white">Jobless <span className="text-red-400">Coders</span></span>
                  <span className="text-violet-400">{" />"}</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Engineering Standards & Workflow
                </p>
              </div>
            </div>

            {/* Clean, Non-Distracting Stats Highlights Bar */}
            <div className="grid grid-cols-3 gap-2 p-3.5 rounded-xl bg-neutral-900/40 border border-neutral-800/80 text-center mb-5 relative z-10">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  100%
                </div>
                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-tight mt-0.5">Code Quality</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  60 FPS
                </div>
                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-tight mt-0.5">Fluid UI UX</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  24/7
                </div>
                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-tight mt-0.5">Agile Velocity</div>
              </div>
            </div>

            {/* Workflow Section Header */}
            <div className="mb-3 relative z-10">
              <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                {"// How We Work"}
              </h4>
            </div>

            {/* Workflow Cards */}
            <div className="space-y-3 relative z-10">
              {workflowSteps.map((ws, i) => {
                const Icon = ws.icon;
                return (
                  <motion.div
                    key={ws.step}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * i }}
                    className="p-3.5 rounded-xl bg-neutral-900/30 border border-neutral-800/60 hover:border-neutral-700/80 transition-all flex items-start gap-3 group"
                  >
                    <div className="p-2 rounded-lg bg-neutral-800/80 text-violet-400 group-hover:bg-violet-500/10 transition-colors shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-violet-400 font-bold px-1.5 py-0.5 bg-violet-500/10 rounded">
                          {ws.step}
                        </span>
                        <h5 className="text-xs sm:text-sm font-semibold text-white">
                          {ws.title}
                        </h5>
                      </div>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                        {ws.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bottom Footer Badge */}
          <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400 font-mono relative z-10">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
              <span>Production Ready</span>
            </span>
            <span className="text-neutral-500">v2.4.0</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
