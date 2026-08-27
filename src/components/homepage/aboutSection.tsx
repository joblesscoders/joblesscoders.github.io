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
    tagline: "Fast, Accessible, Production-Ready Web Platforms",
    icon: Globe,
    description:
      "We architect high-performance web applications using Next.js 15, React 19, and modern TypeScript microservices, prioritizing responsive UX, clean server rendering, and long-term maintainability.",
    features: [
      "Server-Side Rendering & Streaming Strategy",
      "Component Design Systems & Dynamic UI",
      "REST & WebSocket API Integrations",
      "Core Web Vitals & Performance Budgets",
    ],
    techStack: ["Next.js 15", "React 19", "TypeScript", "TailwindCSS", "Node.js"],
    codeSnippet: `// Next.js App Router Server Handler
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = await queryServiceRegistry({ env: process.env.NODE_ENV });
  return Response.json({ status: "ok", data });
}`,
  },
  {
    id: "mobile-dev",
    name: "Mobile App Development",
    shortName: "Mobile Apps",
    tagline: "Cross-Platform Native Mobile Apps for iOS & Android",
    icon: Smartphone,
    description:
      "Cross-platform mobile applications built with React Native and Expo. Seamless offline-first state management, biometric authentication, and native device integration.",
    features: [
      "Cross-Platform iOS & Android Parity",
      "Smooth Gesture Transitions & Native UI",
      "Push Notifications & In-App Analytics",
      "Offline-First SQLite & Local Storage",
    ],
    techStack: ["React Native", "Expo", "TypeScript", "Redux Toolkit", "GraphQL"],
    codeSnippet: `// React Native Offline Sync Hook
export function useSyncQueue() {
  const isOnline = useNetworkStatus();
  return { isOnline, pendingMutations: isOnline ? 0 : queue.length };
}`,
  },
  {
    id: "design-systems",
    name: "UI/UX & Design Systems",
    shortName: "UI/UX Design",
    tagline: "Consistent Interfaces & Scalable Design Tokens",
    icon: Palette,
    description:
      "Building brand identities and scalable UI component libraries with dark-mode support, accessible Radix UI primitives, and typed Tailwind design tokens.",
    features: [
      "Figma-to-Code Design Token Pipelines",
      "Accessible Radix UI Primitives",
      "Responsive Multi-Theme Color Tokens",
      "WCAG 2.1 AA Accessibility Guidelines",
    ],
    techStack: ["Figma", "TailwindCSS", "Radix UI", "GSAP", "CSS Modules"],
    codeSnippet: `/* Design Tokens System */
:root {
  --color-primary: oklch(0.205 0 0);
  --color-surface: oklch(0.985 0 0);
  --color-accent: #8b5cf6;
}`,
  },
  {
    id: "ai-automation",
    name: "AI & Machine Learning",
    shortName: "AI / Automation",
    tagline: "Production AI Workflows & Custom LLM Integrations",
    icon: Cpu,
    description:
      "Integrating practical AI capabilities—from custom RAG pipelines to structured LLM agent tool use and semantic search workflows.",
    features: [
      "Custom Vector Search & RAG Pipelines",
      "LLM Function Calling & Tool Orchestration",
      "Structured Data Extraction & Parsing",
      "Domain-Specific Prompt Engineering",
    ],
    techStack: ["Python", "PyTorch", "FastAPI", "OpenAI", "LangChain", "Pinecone"],
    codeSnippet: `# LLM Agent Tool Dispatcher
@agent.tool
def search_knowledge_base(query: str) -> list[Document]:
    embeddings = embed_query(query)
    return vector_store.similarity_search(embeddings, top_k=4)`,
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps Solutions",
    shortName: "Cloud DevOps",
    tagline: "Containerized Cloud Infrastructure & Automated CI/CD",
    icon: Server,
    description:
      "Building resilient containerized and serverless environments on AWS and Vercel with automated GitHub Actions CI/CD pipelines and centralized logging.",
    features: [
      "Automated GitHub Actions CI/CD Pipelines",
      "Docker & Container Orchestration",
      "Infrastructure as Code (Terraform / CloudFormation)",
      "Structured Error Logging & Health Probes",
    ],
    techStack: ["AWS", "Docker", "Linux", "GitHub Actions", "Vercel", "PostgreSQL"],
    codeSnippet: `# GitHub Actions CI/CD Pipeline
name: Test & Staged Deploy
on:
  push:
    branches: [main]
jobs:
  verify-and-build:
    runs-on: ubuntu-latest`,
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Discovery & Architecture",
    description:
      "We analyze your project requirements, defining modular software architecture, data schemas, and sprint milestones.",
    icon: Code2,
  },
  {
    step: "02",
    title: "Sprint Execution & CI/CD",
    description:
      "Writing typed, modular code with continuous automated testing, peer reviews, and transparent async updates.",
    icon: Zap,
  },
  {
    step: "03",
    title: "Deployment & Handoff",
    description:
      "Staged deployment, performance benchmarking, automated smoke tests, and comprehensive documentation.",
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
                  6
                </div>
                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-tight mt-0.5">Core Engineers</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  GMT+6
                </div>
                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-tight mt-0.5">Dhaka & Global</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  100%
                </div>
                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-tight mt-0.5">Direct Access</div>
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
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Open for New Projects</span>
            </span>
            <span className="text-neutral-500">Dhaka, BD</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
