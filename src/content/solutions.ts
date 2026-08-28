export interface SolutionItem {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  outcome: string;
  clientProfile: string[];
  problems: { title: string; detail: string }[];
  capabilities: { title: string; detail: string }[];
  process: { step: string; title: string; detail: string }[];
  technologies: string[];
  walkthroughProof: { title: string; outcome: string; detail: string };
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
}

export const SOLUTIONS: Record<string, SolutionItem> = {
  ecommerce: {
    slug: "ecommerce",
    title: "E-Commerce Platforms & Headless Checkout",
    shortTitle: "E-Commerce",
    tagline: "Sub-second product catalogs, custom cart workflows, and high-conversion payment integrations.",
    outcome: "Eliminate cart abandonment friction with sub-second catalog transitions and robust payment pipelines.",
    clientProfile: [
      "DTC brands with 1,000+ SKUs outgrowing monolithic templates (Shopify/WooCommerce theme limits)",
      "B2B merchants needing custom tiered pricing, multi-currency wallets, and ERP inventory sync",
      "High-traffic retailers experiencing slow page loads during flash sales or seasonal campaigns",
    ],
    problems: [
      {
        title: "Sluggish Page Load & Layout Shifts",
        detail: "Template bloat and unoptimized tracking scripts degrade Core Web Vitals, causing instant drop-offs and poor organic Google rankings.",
      },
      {
        title: "Rigid Checkout Customization",
        detail: "Standard platforms make it difficult to support custom subscriptions, bundle discounts, and localized payment gateways.",
      },
      {
        title: "Inventory Desynchronization",
        detail: "Lagging webhooks between warehouse ERPs and checkout queues lead to overselling and customer support bottlenecks.",
      },
    ],
    capabilities: [
      {
        title: "Headless Next.js 15 Storefronts",
        detail: "Server-side streaming rendering, automatic image optimization, and static regeneration for lightning-fast browsing.",
      },
      {
        title: "Custom Stripe & Payment Integrations",
        detail: "Seamless checkout flows with Apple Pay, Google Pay, localized gateways, and fraud prevention telemetry.",
      },
      {
        title: "Real-Time Inventory & ERP Webhooks",
        detail: "Idempotent event-driven sync connecting Shopify Plus, Medusa, or custom PostgreSQL databases with warehouse backends.",
      },
      {
        title: "Faceted Search & Filtering",
        detail: "Instant client-side query filtering and vector search using Algolia, MeiliSearch, or pgvector.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Architecture & Data Spec",
        detail: "Catalog schema modeling, checkout edge cases, and API rate-limit strategy.",
      },
      {
        step: "02",
        title: "Storefront & Cart Engineering",
        detail: "Building accessible product pages, persistent carts, and multi-currency middleware.",
      },
      {
        step: "03",
        title: "Load Testing & Go-Live",
        detail: "Stress testing checkout under peak concurrent transactions and setting up real-time error observability.",
      },
    ],
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "Stripe API", "PostgreSQL", "Redis", "Medusa / Shopify API"],
    walkthroughProof: {
      title: "High-Throughput Storefront Architecture",
      outcome: "Sub-300ms catalog search and zero checkout downtime under load",
      detail: "Available for live architecture walkthrough during technical consultation, covering idempotency keys, cart session state, and CDN edge caching.",
    },
    faqs: [
      {
        question: "Can you integrate with our existing Shopify or Medusa backend?",
        answer: "Yes. We build headless frontend architectures that connect directly to Shopify Storefront API, MedusaJS, or custom commerce backends.",
      },
      {
        question: "How do you ensure PCI compliance?",
        answer: "We use hosted tokenized fields and secure redirect primitives (e.g. Stripe Elements / Payment Intents), ensuring payment card data never touches your server.",
      },
    ],
    metaTitle: "E-Commerce Platforms & Headless Storefront Engineering | Jobless Coders",
    metaDescription: "Engineer sub-second headless e-commerce platforms with Next.js 15, custom checkout workflows, and scalable inventory integrations.",
  },

  "portfolio-websites": {
    slug: "portfolio-websites",
    title: "Portfolio & Brand Websites",
    shortTitle: "Portfolio & Brand",
    tagline: "Editorial, accessible brand experiences that elevate studio credibility and convert high-value clients.",
    outcome: "Transform brand positioning with editorial typography, zero-bloat animations, and 100 Lighthouse performance scores.",
    clientProfile: [
      "Architecture, design, and executive studios seeking high-end digital identity",
      "Venture capital firms and tech consultancies presenting portfolio companies",
      "High-impact software collectives demonstrating verified engineering capabilities",
    ],
    problems: [
      {
        title: "Heavy Third-Party Template Bloat",
        detail: "Generic Webflow or WordPress templates with dozens of unmanaged plugins that slow down page loads and break responsiveness.",
      },
      {
        title: "Unreliable Scroll & Reveal Animations",
        detail: "Fragile JS animations that leave sections invisible at opacity 0 upon refresh or slow network connections.",
      },
      {
        title: "Poor Accessibility & Mobile UX",
        detail: "Inaccessible contrasts, missing keyboard navigation, and broken layouts on modern mobile viewports.",
      },
    ],
    capabilities: [
      {
        title: "Custom Precision Tech Aesthetic",
        detail: "Bespoke design systems with dark graphite themes, refined monospace typography, and subtle SVG micro-interactions.",
      },
      {
        title: "Resilient Reveal Engine",
        detail: "Zero hidden pre-animation states. 100% visible HTML by default with smooth GSAP hardware-accelerated transitions.",
      },
      {
        title: "Self-Hosted Typography & Zero-CLS Layouts",
        detail: "Sub-second font rendering with next/font, optimized WebP/SVG assets, and reserved dimension containers.",
      },
      {
        title: "Full WCAG 2.1 AA Compliance",
        detail: "Accessible landmarks, skip-to-content links, visible focus rings, and screen-reader polite announcements.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Brand Narrative & Hierarchy",
        detail: "Content structuring, value proposition hierarchy, and proof-first case study presentation.",
      },
      {
        step: "02",
        title: "Design Tokens & Motion Prototyping",
        detail: "Creating synchronized Figma tokens and restrained GSAP/CSS animations.",
      },
      {
        step: "03",
        title: "Hardening & SEO Structured Data",
        detail: "Lighthouse optimization, JSON-LD Schema markup, and cross-browser visual verification.",
      },
    ],
    technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4", "GSAP", "COBE WebGL"],
    walkthroughProof: {
      title: "Editorial Studio Marketing Platform",
      outcome: "100 Lighthouse score • 100% self-hosted fonts • 0.9s LCP",
      detail: "Clean open-source architecture demonstrating Server Component boundaries, accessibility focus management, and lightweight WebGL fallback.",
    },
    faqs: [
      {
        question: "Will the site remain accessible without JavaScript?",
        answer: "Yes. All copy, case studies, and navigation landmarks are rendered in static SSR HTML and CSS, remaining fully functional even with JavaScript disabled.",
      },
      {
        question: "How do you optimize Core Web Vitals?",
        answer: "We eliminate external font stylesheets, inline critical tokens, use next/image with AVIF/WebP, and cap animation DPR overhead.",
      },
    ],
    metaTitle: "Portfolio & Brand Website Engineering | Jobless Coders",
    metaDescription: "Build high-performance, accessible portfolio and editorial brand websites engineered with Next.js 15 and GSAP.",
  },

  "saas-mvp": {
    slug: "saas-mvp",
    title: "SaaS & MVP Engineering",
    shortTitle: "SaaS & MVP",
    tagline: "4 to 6-week concept-to-production launches for venture-backed and bootstrapped software founders.",
    outcome: "Launch your core value proposition in weeks with production-ready authentication, billing, and database architecture.",
    clientProfile: [
      "Early-stage founders needing to validate a technical thesis with real paying customers",
      "Seed-stage companies moving from prototype to robust multi-tenant software",
      "Domain experts automating workflows into recurring SaaS revenue products",
    ],
    problems: [
      {
        title: "Slow Engineering Velocity",
        detail: "Spending months building boilerplate authentication, team permissions, and subscription plumbing instead of core features.",
      },
      {
        title: "Architecture Rework Down the Road",
        detail: "Haphazard database schemas and unvalidated multi-tenant boundaries that require complete rewrites at scale.",
      },
      {
        title: "Junior Freelancer Churn",
        detail: "Inconsistent code quality, lack of automated testing, and unmaintainable technical debt from disconnected contractors.",
      },
    ],
    capabilities: [
      {
        title: "Multi-Tenant Architecture & RBAC",
        detail: "Granular role-based access control, organization workspaces, and secure session management.",
      },
      {
        title: "Subscription & Metered Billing",
        detail: "Complete Stripe Billing / Customer Portal setup with tier gating, webhook handling, and usage metering.",
      },
      {
        title: "Relational Schemas with Prisma / Drizzle",
        detail: "Typed PostgreSQL data models with automated migrations, indexing, and foreign key integrity.",
      },
      {
        title: "Automated GitHub CI/CD Workflows",
        detail: "Automated linting, type-checking, database migrations, and preview environments on every pull request.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Scope Scoping & Schema Blueprint",
        detail: "Prioritizing the primary customer loop and drafting relational entity diagrams.",
      },
      {
        step: "02",
        title: "Rapid 2-Week Sprints",
        detail: "Iterative builds with direct GitHub PR previews and senior developer async communication.",
      },
      {
        step: "03",
        title: "Launch & Production Handoff",
        detail: "Domain configuration, transactional email setup (Resend), error monitoring (Sentry), and comprehensive runbooks.",
      },
    ],
    technologies: ["Next.js 15", "TypeScript", "PostgreSQL", "Prisma / Drizzle", "Tailwind CSS", "Stripe Billing", "Docker"],
    walkthroughProof: {
      title: "Multi-Tenant SaaS Foundation Architecture",
      outcome: "Production launch within 4 weeks with automated billing & RBAC",
      detail: "Sanitized codebase walkthrough demonstrating organization tenancy, edge session verification, and webhook event recovery.",
    },
    faqs: [
      {
        question: "Who owns the intellectual property and source code?",
        answer: "You do. 100% of the source code, repository commits, design files, and deployment configurations belong to you upon completion.",
      },
      {
        question: "Can we continue scaling the codebase with an in-house team later?",
        answer: "Yes. We follow standard Next.js and TypeScript architectural conventions with strict type-safety and thorough documentation to make in-house handoffs painless.",
      },
    ],
    metaTitle: "SaaS & MVP Engineering Services | Jobless Coders",
    metaDescription: "Accelerate your SaaS launch with production-ready Next.js architecture, multi-tenant auth, Stripe billing, and automated CI/CD.",
  },

  "business-platforms": {
    slug: "business-platforms",
    title: "Business Portals & Operations Dashboards",
    shortTitle: "Business Portals",
    tagline: "High-density data interfaces, custom internal tools, and real-time operations portals.",
    outcome: "Replace chaotic spreadsheets and fragmented SaaS subscriptions with customized, secure internal web platforms.",
    clientProfile: [
      "Mid-market operations teams needing centralized order, logistics, or client tracking",
      "Financial services and fintech companies requiring secure document submission portals",
      "Healthcare and logistics providers consolidating disparate data sources into a single pane of glass",
    ],
    problems: [
      {
        title: "Fragmented Data Silos",
        detail: "Critical business data scattered across spreadsheets, legacy SQL databases, and disparate third-party tools.",
      },
      {
        title: "Security & Permission Risks",
        detail: "Lack of audit logging, IP restrictions, and granular permissions when giving staff access to sensitive customer records.",
      },
      {
        title: "Slow Internal Administrative Tools",
        detail: "Legacy admin portals that freeze under heavy filtering, causing employee frustration and slow resolution times.",
      },
    ],
    capabilities: [
      {
        title: "High-Density Data Tables & Visualizations",
        detail: "Virtual scrolling, column reordering, multi-column sorting, and responsive charting for millions of rows.",
      },
      {
        title: "Audit Logging & Fine-Grained Permissions",
        detail: "Comprehensive tamper-evident action logs, SSO/SAML integrations, and role-based permissions.",
      },
      {
        title: "Real-Time WebSocket Sync",
        detail: "Live telemetry feeds, instant notification channels, and multi-user collaborative editing states.",
      },
      {
        title: "Automated Data Ingestion & Export",
        detail: "Background batch workers, CSV/Excel parsers, PDF generation engines, and webhooks.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Workflow Audit & User Roles",
        detail: "Mapping operator pain points, permission matrices, and external API integration endpoints.",
      },
      {
        step: "02",
        title: "Interactive Prototype & Core Build",
        detail: "Building responsive table primitives, filters, and background mutation queues.",
      },
      {
        step: "03",
        title: "Security Audit & Enterprise Deployment",
        detail: "Penetration testing, encryption-at-rest verification, and VPC deployment.",
      },
    ],
    technologies: ["Next.js 15", "TypeScript", "PostgreSQL", "TanStack Table", "Tailwind CSS", "Redis", "Docker", "AWS"],
    walkthroughProof: {
      title: "Real-Time Operations Telemetry Portal",
      outcome: "Sub-50ms table rendering across 50,000+ live record sets",
      detail: "Available for technical walkthrough demonstrating virtualized data tables, optimistic updates, and role-based access enforcement.",
    },
    faqs: [
      {
        question: "Can you connect to our on-premise or private cloud database?",
        answer: "Yes. We build secure API middleware connecting directly to private VPC PostgreSQL, MySQL, MSSQL, or MongoDB databases through encrypted tunnels.",
      },
      {
        question: "Do you support Enterprise Single Sign-On (SSO)?",
        answer: "Yes. We integrate with Okta, Azure AD, Google Workspace, and SAML 2.0 / OIDC identity providers.",
      },
    ],
    metaTitle: "Custom Business Portals & Dashboard Development | Jobless Coders",
    metaDescription: "Engineer high-density internal business platforms, real-time dashboards, and secure operations portals with Next.js 15 and PostgreSQL.",
  },

  "ai-automation": {
    slug: "ai-automation",
    title: "AI Automation & Custom LLM Systems",
    shortTitle: "AI Automation",
    tagline: "Low-latency RAG document search, deterministic LLM tool chains, and intelligent workflow automation.",
    outcome: "Augment your software with deterministic AI capabilities that reduce manual hours without hallucination risks.",
    clientProfile: [
      "Enterprises with extensive proprietary documentation, contracts, or customer tickets",
      "SaaS companies wanting to add natural language copilot features to their existing platforms",
      "Operational teams looking to automate multi-step classification, extraction, and verification tasks",
    ],
    problems: [
      {
        title: "Hallucinations & Untrustworthy Outputs",
        detail: "Naive prompt engineering that produces confident inaccuracies without traceable source citations.",
      },
      {
        title: "High API Latency & Runaway Token Costs",
        detail: "Unoptimized context windows and lack of embedding caching causing slow user experiences and unpredictable bills.",
      },
      {
        title: "Data Privacy & Compliance Concerns",
        detail: "Risk of leaking sensitive internal company IP to public third-party model training datasets.",
      },
    ],
    capabilities: [
      {
        title: "Custom RAG Pipelines with Citations",
        detail: "Hybrid semantic search combining dense vector embeddings (pgvector/Qdrant) and sparse BM25 keyword matching with exact citations.",
      },
      {
        title: "Typed Function Calling & Agent Tools",
        detail: "Deterministic JSON schema tool execution that safely triggers database queries and external APIs.",
      },
      {
        title: "Self-Hosted & Private Model Deployments",
        detail: "Deploying open-weights LLMs (Llama 3, Mistral) on private VPC infrastructure with vLLM and zero data retention.",
      },
      {
        title: "Automated Evaluation Benchmark Suites",
        detail: "Quantitative regression testing measuring precision, recall, and hallucination rates across test datasets.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Data Audit & Chunking Strategy",
        detail: "Analyzing document structures, metadata tagging, and chunk hierarchy for maximum retrieval precision.",
      },
      {
        step: "02",
        title: "Vector Pipeline & Tool Engineering",
        detail: "Developing FastAPI inference services, guardrails, and deterministic tool dispatchers.",
      },
      {
        step: "03",
        title: "Benchmarking & Production Observability",
        detail: "Setting up latency tracing, token cost monitoring, and automated test evaluation runs.",
      },
    ],
    technologies: ["Python", "FastAPI", "PostgreSQL (pgvector)", "LangChain", "PyTorch", "Docker", "Ollama / vLLM"],
    walkthroughProof: {
      title: "Enterprise RAG Document Search Pipeline",
      outcome: "Sub-500ms retrieval latency with 100% deterministic source citations",
      detail: "Available for live architecture walkthrough covering hybrid search, rerankers, token budgeting, and zero-retention privacy guardrails.",
    },
    faqs: [
      {
        question: "Is our proprietary data used to train AI models?",
        answer: "No. We configure enterprise zero-data-retention API endpoints or self-host models on your private cloud, ensuring total data sovereignty.",
      },
      {
        question: "How do you test and prevent hallucinations?",
        answer: "We enforce strict grounding prompts requiring verbatim source quotes, paired with automated regression evaluation suites that grade every answer against ground truth datasets.",
      },
    ],
    metaTitle: "Custom AI Automation & LLM Pipeline Engineering | Jobless Coders",
    metaDescription: "Engineer low-latency RAG pipelines, deterministic LLM tool agents, and vector search systems with FastAPI and pgvector.",
  },

  "mobile-apps": {
    slug: "mobile-apps",
    title: "Cross-Platform Mobile Applications",
    shortTitle: "Mobile Apps",
    tagline: "High-performance React Native & Expo applications for iOS and Android with offline-first data synchronization.",
    outcome: "Deliver native mobile apps with 90%+ shared code parity, responsive gesture navigation, and robust offline sync.",
    clientProfile: [
      "Startups wanting to ship on both Apple App Store and Google Play without maintaining two separate native codebases",
      "Web platforms expanding into mobile with push notifications, background sync, and camera hardware access",
      "Field operations and logistics teams requiring reliable offline functionality in spotty network zones",
    ],
    problems: [
      {
        title: "Doubled Native Engineering Budgets",
        detail: "Hiring separate Swift (iOS) and Kotlin (Android) developers doubles cost and creates feature parity lag.",
      },
      {
        title: "Poor Offline Experiences",
        detail: "Apps that freeze or lose user data when internet connections drop or switch between cellular and WiFi.",
      },
      {
        title: "App Store Review Bottlenecks",
        detail: "Complex certificate signing, provisioning profile errors, and compliance rejections delaying releases.",
      },
    ],
    capabilities: [
      {
        title: "React Native & Expo Architecture",
        detail: "90%+ shared TypeScript codebase compiling to native iOS and Android binary views.",
      },
      {
        title: "Offline-First Local SQLite Sync",
        detail: "Local SQLite database with optimistic UI mutations, conflict resolution, and background sync queues.",
      },
      {
        title: "Native Hardware & Biometric Security",
        detail: "Face ID / Touch ID authentication, secure iOS Keychain / Android Keystore, camera, and geolocation APIs.",
      },
      {
        title: "Automated EAS / Fastlane Deployments",
        detail: "Automated TestFlight builds, Google Play internal tracks, and Over-The-Air (OTA) critical bug fixes.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Mobile UX & Native Bridge Spec",
        detail: "Designing responsive touch targets conforming to Apple HIG and Google Material guidelines.",
      },
      {
        step: "02",
        title: "Sprint Engineering & Device Testing",
        detail: "Building core screens, gesture animations, and verifying performance on physical iOS and Android devices.",
      },
      {
        step: "03",
        title: "Store Submission & Production Release",
        detail: "Managing store listings, screenshot assets, privacy declarations, and TestFlight beta tracks.",
      },
    ],
    technologies: ["React Native", "Expo", "TypeScript", "SQLite", "Redux Toolkit", "EAS / Fastlane", "Tailwind (NativeWind)"],
    walkthroughProof: {
      title: "Offline-First Mobile Data Sync Architecture",
      outcome: "Zero data loss during offline usage with seamless background sync",
      detail: "Available for live technical walkthrough demonstrating local SQLite transactions, background queues, and biometric keychain security.",
    },
    faqs: [
      {
        question: "Can React Native apps match native iOS and Android performance?",
        answer: "Yes. Modern React Native utilizes the New Architecture (Fabric renderer and TurboModules) with direct C++ bridges for 60/120fps gesture fluidity.",
      },
      {
        question: "Do you handle App Store and Google Play submissions?",
        answer: "Yes. We handle end-to-end certification, privacy manifests, store metadata, beta test distribution, and compliance review responses.",
      },
    ],
    metaTitle: "Cross-Platform Mobile App Engineering (iOS & Android) | Jobless Coders",
    metaDescription: "Build cross-platform mobile apps for iOS and Android with React Native, Expo, offline SQLite sync, and biometric auth.",
  },
};
