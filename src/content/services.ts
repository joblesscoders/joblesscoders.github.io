import { ServiceRecord } from "./types";

export const services: ServiceRecord[] = [
  {
    slug: "web-dev",
    title: "Full-Stack Web Development",
    shortName: "Web Apps",
    tagline: "Fast, Accessible, Production-Ready Web Platforms",
    summary:
      "We architect high-performance web applications using Next.js 15, React 19, and modern TypeScript microservices, prioritizing responsive UX, clean server rendering, and long-term maintainability.",
    buyerProblem:
      "Modern businesses face sluggish web experiences, high infrastructure costs, fragmented frontend architectures, and poor search engine crawlability.",
    outcomes: [
      "Sub-second page transitions and minimal client-side runtime overhead",
      "Robust Server Component architectures with streaming SSR and ISR",
      "Clean TypeScript codebases designed for long-term maintainability",
      "Strict performance budgets aligned with Core Web Vitals targets",
    ],
    capabilities: [
      "Server-Side Rendering & Streaming Strategy",
      "Component Design Systems & Dynamic UI",
      "REST & WebSocket API Integrations",
      "Database Schema Design & Query Optimization (PostgreSQL, MySQL)",
      "Edge Middleware & Authentication (NextAuth, Supabase, Clerk)",
    ],
    process: [
      {
        step: "01",
        title: "Technical Discovery & Architecture",
        description:
          "We analyze your data access patterns, user personas, and scaling goals to establish optimal Next.js route boundaries and state strategies.",
      },
      {
        step: "02",
        title: "Sprint Execution & Automated CI",
        description:
          "Iterative 2-week sprints with strict TypeScript types, continuous automated testing, and transparent async updates.",
      },
      {
        step: "03",
        title: "Production Hardening & Handoff",
        description:
          "Lighthouse benchmarking, security header configuration, structured error monitoring, and clean engineering documentation.",
      },
    ],
    technologies: ["Next.js 15", "React 19", "TypeScript", "TailwindCSS", "Node.js", "PostgreSQL", "Prisma/Drizzle"],
    codeSnippet: `// Next.js App Router Server Handler
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const data = await queryServiceRegistry({ env: process.env.NODE_ENV });
  return Response.json({ status: "ok", data });
}`,
    codeLanguage: "typescript",
    faqs: [
      {
        question: "How do you ensure web applications remain maintainable over time?",
        answer:
          "We enforce strict TypeScript configurations, modular component boundaries, automated lint/type check CI pipelines, and comprehensive documentation for every API route and data model.",
      },
      {
        question: "Can you migrate our legacy frontend to Next.js App Router?",
        answer:
          "Yes. We support incremental migration strategies (reverse proxying or route-by-route strangler pattern) to migrate without taking existing services offline.",
      },
    ],
    ctaText: "Discuss Your Web Project",
  },
  {
    slug: "mobile-dev",
    title: "Mobile App Development",
    shortName: "Mobile Apps",
    tagline: "Cross-Platform Native Mobile Apps for iOS & Android",
    summary:
      "Cross-platform mobile applications built with React Native and Expo. Seamless offline-first state management, biometric authentication, and native device integration.",
    buyerProblem:
      "Maintaining separate iOS and Android native codebases doubles engineering costs and slows down feature delivery for startups.",
    outcomes: [
      "90%+ shared codebase across iOS and Android with zero feature compromises",
      "Robust offline-first data caching with background sync queues",
      "Native device integration: push notifications, camera, geolocation, biometrics",
      "App Store and Google Play deployment automation via EAS / Fastlane",
    ],
    capabilities: [
      "Cross-Platform iOS & Android Parity",
      "Smooth Gesture Transitions & Native UI",
      "Push Notifications & In-App Analytics",
      "Offline-First SQLite & Local Storage",
      "Secure Biometric Authentication & Keychain Storage",
    ],
    process: [
      {
        step: "01",
        title: "UI Architecture & Native Mapping",
        description:
          "Designing responsive cross-platform component libraries adhering to Apple Human Interface and Material Design standards.",
      },
      {
        step: "02",
        title: "Offline-First State & Native Bridge",
        description:
          "Implementing SQLite/WatermelonDB local stores, optimistic UI updates, and native hardware API integrations.",
      },
      {
        step: "03",
        title: "Store Submission & CI/CD",
        description:
          "Automated TestFlight builds, Google Play internal testing tracks, and Over-The-Air (OTA) update configuration.",
      },
    ],
    technologies: ["React Native", "Expo", "TypeScript", "Redux Toolkit", "GraphQL", "SQLite", "EAS"],
    codeSnippet: `// React Native Offline Sync Hook
export function useSyncQueue() {
  const isOnline = useNetworkStatus();
  return { isOnline, pendingMutations: isOnline ? 0 : queue.length };
}`,
    codeLanguage: "typescript",
    faqs: [
      {
        question: "Do you support publishing to both Apple App Store and Google Play?",
        answer:
          "Yes. We manage certificates, provisioning profiles, store listing metadata, test tracks (TestFlight / Internal Testing), and compliance checks for both stores.",
      },
    ],
    ctaText: "Discuss Your Mobile App",
  },
  {
    slug: "ai-automation",
    title: "AI & Machine Learning",
    shortName: "AI / Automation",
    tagline: "Production AI Workflows & Custom LLM Integrations",
    summary:
      "Integrating practical AI capabilities�from custom RAG pipelines to structured LLM agent tool use and semantic search workflows.",
    buyerProblem:
      "Companies want to leverage LLMs and AI but struggle with hallucination risks, high API latency, unstructured data parsing, and cost control.",
    outcomes: [
      "Custom Retrieval-Augmented Generation (RAG) with low-latency vector search",
      "Deterministic agent tool orchestration using typed JSON schema function calling",
      "Automated document processing, classification, and data extraction pipelines",
      "Model routing and fallback caching to reduce token spend and latency",
    ],
    capabilities: [
      "Custom Vector Search & RAG Pipelines (Pinecone, Qdrant, pgvector)",
      "LLM Function Calling & Tool Orchestration",
      "Structured Data Extraction & Parsing",
      "Domain-Specific Prompt Engineering & Evaluation Suites",
      "FastAPI & Python Microservices for Inference",
    ],
    process: [
      {
        step: "01",
        title: "Data Audit & Feasibility",
        description:
          "Assessing your domain data, chunking strategies, embedding models, and accuracy benchmarks.",
      },
      {
        step: "02",
        title: "Pipeline Development & Evaluation",
        description:
          "Building vector retrieval, prompt guardrails, agent tools, and running quantitative test runs against ground truth datasets.",
      },
      {
        step: "03",
        title: "Deployment & Observability",
        description:
          "Deploying containerized inference APIs with latency tracing, token usage monitoring, and feedback collection.",
      },
    ],
    technologies: ["Python", "PyTorch", "FastAPI", "OpenAI", "LangChain", "Pinecone", "pgvector"],
    codeSnippet: `# LLM Agent Tool Dispatcher
@agent.tool
def search_knowledge_base(query: str) -> list[Document]:
    embeddings = embed_query(query)
    return vector_store.similarity_search(embeddings, top_k=4)`,
    codeLanguage: "python",
    faqs: [
      {
        question: "How do you protect proprietary data when using LLMs?",
        answer:
          "We use zero-data-retention enterprise endpoints or self-hosted open-weights models (via vLLM / Ollama), ensuring client data is never used for external model training.",
      },
    ],
    ctaText: "Explore AI Integration",
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps Solutions",
    shortName: "Cloud DevOps",
    tagline: "Containerized Cloud Infrastructure & Automated CI/CD",
    summary:
      "Building resilient containerized and serverless environments on AWS and Vercel with automated GitHub Actions CI/CD pipelines and centralized logging.",
    buyerProblem:
      "Unreliable deployment steps, lack of automated rollback, slow build pipelines, and unmonitored infrastructure lead to unexpected downtime.",
    outcomes: [
      "Fully automated GitHub Actions CI/CD pipelines with staged pull request previews",
      "Containerized microservices orchestrated with Docker and AWS ECS/EKS",
      "Reproducible Infrastructure as Code (Terraform / CloudFormation)",
      "Structured logging, health probes, and uptime alerting",
    ],
    capabilities: [
      "Automated GitHub Actions CI/CD Pipelines",
      "Docker & Container Orchestration",
      "Infrastructure as Code (Terraform / CloudFormation)",
      "Structured Error Logging & Health Probes",
      "VPC Networking, SSL/TLS, and Security Hardening",
    ],
    process: [
      {
        step: "01",
        title: "Infrastructure Audit",
        description:
          "Reviewing current cloud resources, security policies, build times, and monthly expenditure.",
      },
      {
        step: "02",
        title: "IaC & Pipeline Automation",
        description:
          "Codifying infrastructure in Terraform and establishing automated lint/test/deploy GitHub Actions workflows.",
      },
      {
        step: "03",
        title: "Observability & Runbooks",
        description:
          "Configuring structured logging, automated alert channels, and incident response documentation.",
      },
    ],
    technologies: ["AWS", "Docker", "Linux", "GitHub Actions", "Vercel", "PostgreSQL", "Terraform"],
    codeSnippet: `# GitHub Actions CI/CD Pipeline
name: Test & Staged Deploy
on:
  push:
    branches: [main]
jobs:
  verify-and-build:
    runs-on: ubuntu-latest`,
    codeLanguage: "yaml",
    faqs: [
      {
        question: "Do you support AWS multi-environment setups (staging, production)?",
        answer:
          "Yes. We configure isolated staging and production environments with branch-based automated deployments and environment variable secret isolation.",
      },
    ],
    ctaText: "Upgrade Cloud Setup",
  },
  {
    slug: "design-systems",
    title: "UI/UX & Design Systems",
    shortName: "UI/UX Design",
    tagline: "Consistent Interfaces & Scalable Design Tokens",
    summary:
      "Building brand identities and scalable UI component libraries with dark-mode support, accessible Radix UI primitives, and typed Tailwind design tokens.",
    buyerProblem:
      "Inconsistent UI components, poor accessibility, missing dark-mode tokens, and friction between Figma designs and frontend code.",
    outcomes: [
      "Synchronized design tokens bridging Figma and Tailwind CSS",
      "Reusable, composable React UI primitives with complete keyboard accessibility",
      "Native dark/light theme support with zero contrast defects",
      "WCAG 2.1 AA compliant focus management and touch targets",
    ],
    capabilities: [
      "Figma-to-Code Design Token Pipelines",
      "Accessible Radix UI Primitives",
      "Responsive Multi-Theme Color Tokens",
      "WCAG 2.1 AA Accessibility Guidelines",
      "Interactive Component Documentation & Storybook",
    ],
    process: [
      {
        step: "01",
        title: "Token Architecture & Audit",
        description:
          "Establishing typography scales, semantic color pairs, spacing increments, and radius variables.",
      },
      {
        step: "02",
        title: "Primitive Component Engineering",
        description:
          "Building headless accessible components with Radix UI and styling them with responsive Tailwind CSS utilities.",
      },
      {
        step: "03",
        title: "Documentation & Token Synchronization",
        description:
          "Exporting token definitions to code and providing living component usage guidelines.",
      },
    ],
    technologies: ["Figma", "TailwindCSS", "Radix UI", "GSAP", "CSS Modules", "TypeScript"],
    codeSnippet: `/* Design Tokens System */
:root {
  --color-primary: oklch(0.205 0 0);
  --color-surface: oklch(0.985 0 0);
  --color-accent: #8b5cf6;
}`,
    codeLanguage: "css",
    faqs: [
      {
        question: "How do you ensure accessibility in custom components?",
        answer:
          "We use Radix UI headless primitives for ARIA attributes, focus trapping, and keyboard interaction, and verify contrast ratios against WCAG 2.1 AA standards.",
      },
    ],
    ctaText: "Build Your Design System",
  },
];