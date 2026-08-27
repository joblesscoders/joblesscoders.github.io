import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllServices, getServiceBySlug } from "@/content";
import { siteConfig } from "@/lib/site-config";
import { ArrowLeft, CheckCircle2, Terminal } from "lucide-react";

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
    title: `${service.title} | ${siteConfig.name}`,
    description: service.summary,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | ${siteConfig.name}`,
      description: service.summary,
      url: `${siteConfig.url}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Services</span>
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-4">
          <span>{`// ${service.shortName} Spec`}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          {service.title}
        </h1>
        <p className="mt-3 text-lg sm:text-xl font-medium text-violet-400">
          {service.tagline}
        </p>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          {service.summary}
        </p>
      </header>

      {/* Problem & Outcome Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border">
          <h2 className="text-lg font-bold text-foreground mb-3">The Problem We Solve</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {service.buyerProblem}
          </p>
        </div>
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border">
          <h2 className="text-lg font-bold text-foreground mb-3">Expected Outcomes</h2>
          <ul className="space-y-2.5">
            {service.outcomes.map((outcome, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-violet-400" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-6">Core Capabilities & Deliverables</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {service.capabilities.map((cap, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-card border border-border flex items-start gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-violet-400 mt-1.5 shrink-0" />
              <span className="text-sm font-medium text-foreground">{cap}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture & Code Sample */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-4">Architecture & Code Pattern</h2>
        <div className="rounded-2xl bg-neutral-950 border border-border overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-border text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-violet-400" />
              <span>{service.slug}.architecture.ts</span>
            </div>
            <span className="text-[11px] text-neutral-500 uppercase">{service.codeLanguage || "typescript"}</span>
          </div>
          <div className="p-4 sm:p-6 overflow-x-auto font-mono text-xs sm:text-sm text-neutral-300">
            <pre className="whitespace-pre-wrap leading-relaxed">
              <code>{service.codeSnippet}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-4">Technology Stack</h2>
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

      {/* Engineering Process */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-foreground mb-6">Our Sprint Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.process.map((step) => (
            <div key={step.step} className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-violet-400 font-bold px-2 py-0.5 bg-violet-500/10 rounded">
                  {step.step}
                </span>
                <h3 className="text-base font-bold text-foreground mt-3 mb-2">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-border">
                <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Direct CTA */}
      <div className="p-8 sm:p-10 rounded-2xl bg-card border border-border text-center">
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Ready to build with our {service.shortName.toLowerCase()} team?
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
          We offer direct access to senior engineers with no agency overhead and transparent async communication.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-colors shadow-lg shadow-violet-600/20"
        >
          {service.ctaText || "Start a Project Conversation"}
        </Link>
      </div>
    </div>
  );
}
