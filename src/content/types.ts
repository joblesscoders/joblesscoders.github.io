export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceRecord {
  slug: string;
  title: string;
  shortName: string;
  tagline: string;
  summary: string;
  buyerProblem: string;
  outcomes: string[];
  capabilities: string[];
  process: ProcessStep[];
  technologies: string[];
  codeSnippet: string;
  codeLanguage?: string;
  faqs?: FAQItem[];
  relatedWorkSlugs?: string[];
  ctaText?: string;
}

export interface ProjectRecord {
  slug: string;
  title: string;
  summary: string;
  isDraft: boolean;
  category: string;
  problem: string;
  constraints?: string[];
  teamContribution: string;
  solution: string;
  stack: string[];
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  url?: string;
  repoUrl?: string;
  timeframe?: string;
  verifiableOutcomes: string[];
}

export interface TeamMemberRecord {
  name: string;
  role: string;
  handle: string;
  bio: string;
  specialties: string[];
  avatarUrl: string;
  status: string;
  socials: {
    github?: string;
    linkedin?: string;
    x?: string;
  };
}