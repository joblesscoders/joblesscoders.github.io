import { ProjectRecord } from "./types";

export const projects: ProjectRecord[] = [
  {
    slug: "studio-marketing-platform",
    title: "Editorial Technical Studio Platform",
    summary: "A fast, accessible, SEO-optimized marketing web platform engineered with Next.js 15, React 19, and Tailwind CSS.",
    isDraft: false,
    category: "Full-Stack Web & Design Systems",
    problem: "The previous template relied on bloated assets, duplicate DOM elements, and unverified performance metrics.",
    constraints: [
      "Zero framework migration; keep Next.js 15 and React 19",
      "Strict internal budget: <=150KB homepage First Load JS",
      "WCAG 2.1 AA accessibility compliance and zero horizontal overflow at 320px",
    ],
    teamContribution: "Architected Server Component boundaries, unified design tokens, and eliminated render-blocking font requests.",
    solution: "Refactored the application to use next/font self-hosting, semantic HTML landmarks, and streamlined GSAP/CSS animations.",
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4", "GSAP"],
    images: [
      {
        src: "/assets/Jobless_coders_colored.png",
        alt: "Jobless Coders Studio Platform",
        caption: "Technical studio design system and architecture",
      },
    ],
    url: "https://joblesscoders.vercel.app",
    repoUrl: "https://github.com/joblesscoders/joblesscoders.github.io",
    timeframe: "2026",
    verifiableOutcomes: [
      "Zero external Google Font stylesheet requests (100% self-hosted)",
      "99.4% byte-size reduction on primary brand SVG assets",
      "Full keyboard navigation and skip-to-content accessibility support",
    ],
  },
  {
    slug: "enterprise-rag-assistant",
    title: "Domain Knowledge RAG Pipeline",
    summary: "Low-latency vector search and LLM tool orchestration system for structured technical document retrieval.",
    isDraft: true,
    category: "AI & Machine Learning",
    problem: "Client engineering teams spent hours searching fragmented internal runbooks and technical documentation.",
    constraints: ["Sub-500ms vector search response", "Strict zero-data-retention compliance"],
    teamContribution: "Implemented embedding chunking strategy, FastAPI vector retrieval endpoint, and evaluation benchmark harness.",
    solution: "Deployed a containerized pgvector retrieval service integrated with OpenAI function calling.",
    stack: ["Python", "FastAPI", "pgvector", "LangChain", "Docker"],
    images: [],
    timeframe: "2025 - 2026",
    verifiableOutcomes: ["Deterministic citation extraction", "Sub-500ms retrieval latency"],
  },
];