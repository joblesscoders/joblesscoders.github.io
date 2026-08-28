import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllServices, getServiceBySlug, getPublishedProjects } from "@/content";
import { siteConfig } from "@/lib/site-config";
import {
  CheckCircle2,
  Terminal,
  ArrowRight,
  ShieldAlert,
  Layers,
  Sparkles,
} from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CtaSection from "@/components/layout/CtaSection";
import AnimatedFaq from "@/components/ui/AnimatedFaq";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | Architecture & Engineering`,
    description: service.summary,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | ${siteConfig.name}`,
      description: service.summary,
      url: `${siteConfig.url}/services/${service.slug}`,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | ${siteConfig.name}`,
      description: service.summary,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Find related real projects if specified
  const allProjects = getPublishedProjects();
  const relatedProjects = service.relatedWorkSlugs
    ? allProjects.filter((p) => service.relatedWorkSlugs?.includes(p.slug))
    : [];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.shortName,
    description: service.summary,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Capabilities`,
      itemListElement: service.capabilities.map((cap) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: cap,
        },
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${siteConfig.url}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${siteConfig.url}/services/${service.slug}`,
      },
    ],
  };

  const faqSchema = service.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      {/* Header */}
      <header className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-4">
          <span>{`// ${service.shortName} Architecture Specification`}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          {service.title}
        </h1>
        <p className="mt-3 text-lg sm:text-xl font-medium text-violet-400">
          {service.tagline}
        </p>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          {service.summary}
        </p>
      </header>

      {/* Problem vs Outcome Section */}
      <section aria-labelledby="problem-outcome-heading" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-semibold mb-3">
              <ShieldAlert className="w-4 h-4 shrink-0" aria-hidden="true" />
              <h2 id="problem-outcome-heading" className="uppercase tracking-wider">
                The Buyer Problem
              </h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {service.buyerProblem}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-2 text-violet-400 text-xs font-mono font-semibold mb-3">
            <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
            <h2 className="uppercase tracking-wider">Expected Engineering Outcomes</h2>
          </div>
          <ul className="space-y-2.5">
            {service.outcomes.map((outcome, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-violet-400" aria-hidden="true" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Capabilities & Deliverables */}
      <section aria-labelledby="capabilities-heading" className="mb-16">
        <div className="flex items-center gap-2 text-xs font-mono text-violet-400 font-semibold mb-2">
          <Layers className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{"// Scope of Delivery"}</span>
        </div>
        <h2 id="capabilities-heading" className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
          Core Capabilities & Deliverables
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {service.capabilities.map((cap, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-xl bg-card border border-border flex items-start gap-3 hover:border-violet-500/20 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 shrink-0" aria-hidden="true" />
              <span className="text-sm font-medium text-foreground leading-relaxed">{cap}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture & Code Sample */}
      <section aria-labelledby="code-pattern-heading" className="mb-16">
        <div className="flex items-center gap-2 text-xs font-mono text-violet-400 font-semibold mb-2">
          <Terminal className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{"// Implementation Blueprint"}</span>
        </div>
        <h2 id="code-pattern-heading" className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Architecture & Code Pattern
        </h2>
        <div className="rounded-2xl bg-neutral-950 border border-border overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-border text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-violet-400" aria-hidden="true" />
              <span>{service.slug}.architecture.{service.codeLanguage === "python" ? "py" : service.codeLanguage === "yaml" ? "yml" : service.codeLanguage === "css" ? "css" : "ts"}</span>
            </div>
            <span className="text-[11px] text-neutral-400 uppercase font-mono px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700">
              {service.codeLanguage || "typescript"}
            </span>
          </div>
          <div className="p-4 sm:p-6 overflow-x-auto font-mono text-xs sm:text-sm text-neutral-200 bg-neutral-950">
            <pre className="whitespace-pre-wrap leading-relaxed">
              <code>{service.codeSnippet}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section aria-labelledby="tech-stack-heading" className="mb-16">
        <h2 id="tech-stack-heading" className="text-xl sm:text-2xl font-bold text-foreground mb-4">
          Technologies Used in Production
        </h2>
        <div className="flex flex-wrap gap-2">
          {service.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-xs font-mono bg-card text-foreground rounded-lg border border-border shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Practical Process */}
      <section aria-labelledby="process-heading" className="mb-16">
        <div className="flex items-center gap-2 text-xs font-mono text-violet-400 font-semibold mb-2">
          <span>{"// Execution Cadence"}</span>
        </div>
        <h2 id="process-heading" className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
          Our 3-Step Sprint Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.process.map((step) => (
            <div key={step.step} className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-violet-400 font-bold px-2 py-0.5 bg-violet-500/10 border border-violet-500/20 rounded">
                  STEP {step.step}
                </span>
                <h3 className="text-base font-bold text-foreground mt-4 mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Real Work (if applicable) */}
      {relatedProjects.length > 0 && (
        <section aria-labelledby="related-work-heading" className="mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-violet-400 font-semibold mb-2">
            <span>{"// Verified Case Studies"}</span>
          </div>
          <h2 id="related-work-heading" className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
            Related Real Work & Engineering Proof
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProjects.map((project) => (
              <article
                key={project.slug}
                className="p-6 rounded-2xl bg-card border border-border hover:border-violet-500/30 transition-all duration-200"
              >
                <span className="text-xs font-mono text-violet-400 font-semibold uppercase block mb-2">
                  {project.category}
                </span>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  <Link href={`/work/${project.slug}`} className="hover:text-violet-400 transition-colors">
                    {project.title}
                  </Link>
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                  {project.summary}
                </p>
                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-violet-400 hover:text-violet-300"
                >
                  <span>Read full case study</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Accessible FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section aria-labelledby="faqs-heading" className="mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-violet-400 font-semibold mb-2">
            <span>{"// Common Inquiries"}</span>
          </div>
          <h2 id="faqs-heading" className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
            Frequently Asked Technical Questions
          </h2>
          <AnimatedFaq items={service.faqs} />
        </section>
      )}

      {/* Shared CTA */}
      <CtaSection
        title={`Ready to build with our ${service.shortName.toLowerCase()} team?`}
        description={`We collaborate with your engineering leads to build resilient ${service.shortName.toLowerCase()} architectures with clean sprints and transparent async communication.`}
        primaryButtonText={service.ctaText || "Start a Project Conversation"}
        primaryButtonHref="/contact"
      />
    </div>
  );
}
