"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Mail,
  Send,
  MapPin,
  Github,
  Linkedin,
  MessageSquare,
  Check,
  User,
  AtSign,
  Tag,
  FileText,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useGSAPReveal } from "@/lib/reveal";
import {
  CONTACT_TOPICS,
  CONTACT_LIMITS,
  validateContactPayload,
  type ContactPayload,
  type ContactApiResponse,
} from "@/lib/contact";

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "joblesscodersbd@gmail.com",
    href: "mailto:joblesscodersbd@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: null,
  },
  {
    icon: MessageSquare,
    label: "Response Process",
    value: "Within 24–48 business hours",
    href: null,
  },
];

const SOCIAL_LINKS = [
  { icon: Github, label: "GitHub", href: "https://github.com/joblesscoders" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/joblesscoders" },
];

function DotGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="contact-dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" className="text-foreground" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#contact-dots)" />
      </svg>
    </div>
  );
}

function GridLines() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none" aria-hidden="true">
      <div className="absolute top-0 right-0 w-24 h-px bg-gradient-to-l from-neutral-700/40 to-transparent" />
      <div className="absolute top-8 right-0 w-16 h-px bg-gradient-to-l from-neutral-700/20 to-transparent" />
      <div className="absolute top-0 right-8 w-px h-16 bg-gradient-to-b from-neutral-700/30 to-transparent" />
      <div className="absolute top-0 right-16 w-px h-10 bg-gradient-to-b from-neutral-700/15 to-transparent" />
      <svg className="absolute top-0 right-0 w-24 h-24 opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-lines" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-lines)" />
      </svg>
    </div>
  );
}

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const renderTimeRef = useRef<number>(Date.now());
  const isSubmittingRef = useRef<boolean>(false);

  const [form, setForm] = useState<ContactPayload>({
    name: "",
    email: "",
    topic: "",
    message: "",
    _hp_company: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactPayload, string>>>({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Set initial render time
  useEffect(() => {
    renderTimeRef.current = Date.now();
  }, []);

  useGSAPReveal(containerRef, [
    { selector: ".contact-header", y: 20, duration: 0.5, start: "top 90%" },
    { selector: ".contact-info-col", y: 24, duration: 0.5, start: "top 88%" },
    { selector: ".contact-form-col", y: 24, duration: 0.5, delay: 0.1, start: "top 88%" },
  ]);

  const handleChange = (field: keyof ContactPayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmittingRef.current || loading) return;

    // Validate on client before dispatch
    const validation = validateContactPayload(form);
    if (!validation.isValid) {
      setFieldErrors(validation.fieldErrors);
      setErrorMsg("Please correct the errors before submitting.");

      // Focus first invalid element
      const firstErrorField = Object.keys(validation.fieldErrors)[0];
      if (firstErrorField && firstErrorField !== "_hp_company") {
        const elem = document.getElementById(`contact-${firstErrorField}`);
        elem?.focus();
      }
      return;
    }

    isSubmittingRef.current = true;
    setLoading(true);
    setErrorMsg(null);
    setFieldErrors({});

    try {
      const payloadWithMeta: ContactPayload = {
        ...form,
        _ts: renderTimeRef.current,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payloadWithMeta),
      });

      const data: ContactApiResponse = await res.json().catch(() => ({
        success: false,
        error: "An unexpected server response occurred. Please try again.",
      }));

      if (res.ok && data.success) {
        setSubmitted(true);
        setForm({ name: "", email: "", topic: "", message: "", _hp_company: "" });
        renderTimeRef.current = Date.now();
      } else {
        if (data.fieldErrors && Object.keys(data.fieldErrors).length > 0) {
          setFieldErrors(data.fieldErrors);
        }
        setErrorMsg(
          data.error || "Unable to send your message at this moment. Please check your inputs or try again."
        );
      }
    } catch {
      // Network failure - form data is preserved in state so user does not lose input
      setErrorMsg(
        "Network connection error. Your message has been saved in the form. Please check your connection and retry, or email us directly at joblesscodersbd@gmail.com."
      );
    } finally {
      setLoading(false);
      isSubmittingRef.current = false;
    }
  };

  return (
    <section id="contact" ref={containerRef} className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <DotGrid />

      {/* Section Header */}
      <div className="contact-header text-center mb-16 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
          Contact <span className="text-violet-400">Us</span>
        </h2>

        <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
          Have a project in mind or want to collaborate? Drop us a message and our technical leads will review your requirements directly.
        </p>
      </div>

      {/* Main Content: Left Info + Right Form */}
      <div className="contact-grid-content relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
        {/* Left Column — Contact Info */}
        <div className="contact-info-col lg:col-span-2 flex flex-col justify-between">
          <div>
            {/* Contact Info Cards */}
            <div className="space-y-4 mb-10">
              {CONTACT_INFO.map((item) => (
                <div
                  key={item.label}
                  className="group flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-violet-500/30 transition-all duration-200"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-violet-500/10 border border-violet-500/15 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-violet-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium text-foreground hover:text-violet-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded px-1 py-0.5 min-h-[44px] inline-flex items-center"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Direct Channels
              </p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-card border border-border hover:border-violet-500/40 hover:bg-violet-500/10 text-muted-foreground hover:text-foreground transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500"
                    aria-label={`Jobless Coders on ${social.label}`}
                  >
                    <social.icon className="w-4.5 h-4.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Location details */}
          <div className="hidden lg:block mt-12">
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-muted-foreground font-mono">Available for projects</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                We are based in <span className="text-foreground font-medium">Dhaka, Bangladesh (GMT+6)</span> and collaborate with engineering teams globally across flexible timezone overlaps.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column — Contact Form */}
        <div className="contact-form-col lg:col-span-3">
          <div className="relative rounded-2xl bg-card border border-border backdrop-blur-sm overflow-hidden shadow-sm">
            <GridLines />

            {/* Live Region for Screen Reader Announcements */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {loading && "Submitting your message to Jobless Coders leads..."}
              {submitted && "Your message has been sent successfully. We will respond within 24 to 48 business hours."}
              {errorMsg && `Error: ${errorMsg}`}
            </div>

            {submitted ? (
              <div className="p-10 sm:p-12 flex flex-col items-center justify-center text-center min-h-[480px]">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mb-6">
                  <Check className="w-7 h-7 text-emerald-400" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Message Sent Successfully</h3>
                <p className="text-muted-foreground text-sm max-w-xs mb-6 leading-relaxed">
                  Thank you for reaching out. Our engineering leads will review your inquiry and respond within 24–48 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 min-h-[44px] text-xs font-semibold text-violet-400 hover:underline cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 rounded"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 md:p-10 space-y-6">
                {/* Honeypot field (hidden from real users, traps bots) */}
                <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
                  <label htmlFor="contact-company">Leave this field empty</label>
                  <input
                    type="text"
                    id="contact-company"
                    name="_hp_company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form._hp_company || ""}
                    onChange={(e) => handleChange("_hp_company", e.target.value)}
                  />
                </div>

                {/* Name Field */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <User className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                    Full Name
                    <span className="text-rose-400" aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <div
                    className={`relative rounded-xl border transition-all duration-150 ${
                      fieldErrors.name
                        ? "border-rose-500 ring-2 ring-rose-500/20"
                        : focusedField === "name"
                        ? "border-violet-500 ring-2 ring-violet-500/20"
                        : "border-border hover:border-border/80"
                    }`}
                  >
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      aria-required="true"
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                      autoComplete="name"
                      maxLength={CONTACT_LIMITS.name.max}
                      placeholder="Your Name"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-background text-foreground placeholder:text-muted-foreground px-4 py-3 min-h-[44px] rounded-xl text-sm outline-none"
                    />
                  </div>
                  {fieldErrors.name && (
                    <p id="contact-name-error" role="alert" className="text-xs text-rose-400 font-medium flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                {/* Email Field (Required for direct engineering reply) */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <AtSign className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                    Email Address
                    <span className="text-rose-400" aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <div
                    className={`relative rounded-xl border transition-all duration-150 ${
                      fieldErrors.email
                        ? "border-rose-500 ring-2 ring-rose-500/20"
                        : focusedField === "email"
                        ? "border-violet-500 ring-2 ring-violet-500/20"
                        : "border-border hover:border-border/80"
                    }`}
                  >
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                      autoComplete="email"
                      maxLength={CONTACT_LIMITS.email.max}
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-background text-foreground placeholder:text-muted-foreground px-4 py-3 min-h-[44px] rounded-xl text-sm outline-none"
                    />
                  </div>
                  {fieldErrors.email && (
                    <p id="contact-email-error" role="alert" className="text-xs text-rose-400 font-medium flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Topic Native Select Field */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-topic" className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <Tag className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                    Inquiry Topic
                    <span className="text-rose-400" aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <div
                    className={`relative rounded-xl border transition-all duration-150 ${
                      fieldErrors.topic
                        ? "border-rose-500 ring-2 ring-rose-500/20"
                        : focusedField === "topic"
                        ? "border-violet-500 ring-2 ring-violet-500/20"
                        : "border-border hover:border-border/80"
                    }`}
                  >
                    <select
                      id="contact-topic"
                      name="topic"
                      required
                      aria-required="true"
                      aria-invalid={!!fieldErrors.topic}
                      aria-describedby={fieldErrors.topic ? "contact-topic-error" : undefined}
                      value={form.topic}
                      onChange={(e) => handleChange("topic", e.target.value)}
                      onFocus={() => setFocusedField("topic")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-background text-foreground px-4 py-3 min-h-[44px] rounded-xl text-sm outline-none cursor-pointer appearance-none"
                    >
                      <option value="" disabled className="text-muted-foreground">
                        Select an inquiry topic...
                      </option>
                      {CONTACT_TOPICS.map((topic) => (
                        <option key={topic} value={topic} className="bg-card text-foreground">
                          {topic}
                        </option>
                      ))}
                    </select>
                    {/* Custom chevron indicator */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  {fieldErrors.topic && (
                    <p id="contact-topic-error" role="alert" className="text-xs text-rose-400 font-medium flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" aria-hidden="true" />
                      {fieldErrors.topic}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <FileText className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                    Project Scope / Message
                    <span className="text-rose-400" aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <div
                    className={`relative rounded-xl border transition-all duration-150 ${
                      fieldErrors.message
                        ? "border-rose-500 ring-2 ring-rose-500/20"
                        : focusedField === "message"
                        ? "border-violet-500 ring-2 ring-violet-500/20"
                        : "border-border hover:border-border/80"
                    }`}
                  >
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      aria-required="true"
                      aria-invalid={!!fieldErrors.message}
                      aria-describedby={`message-counter ${fieldErrors.message ? "contact-message-error" : ""}`}
                      rows={5}
                      maxLength={CONTACT_LIMITS.message.max}
                      placeholder="Tell us about your project requirements, timeline, architecture, or questions..."
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-background text-foreground placeholder:text-muted-foreground px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    {fieldErrors.message ? (
                      <p id="contact-message-error" role="alert" className="text-xs text-rose-400 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" aria-hidden="true" />
                        {fieldErrors.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <p id="message-counter" className="text-xs text-muted-foreground ml-auto font-mono">
                      {form.message.length}/{CONTACT_LIMITS.message.max}
                    </p>
                  </div>
                </div>

                {/* Top-level Error Banner */}
                {errorMsg && (
                  <div role="alert" className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center font-medium">
                    {errorMsg}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[48px] rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white font-semibold text-sm transition-all duration-150 shadow-lg shadow-violet-600/20 hover:-translate-y-0.5 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 focus-visible:outline-offset-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Send className="w-4 h-4" aria-hidden="true" />
                  )}
                  <span>{loading ? "Sending..." : "Send Message to Engineers"}</span>
                </button>

                {/* Truthful Privacy & Security Assurance */}
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  Your message is securely transmitted directly to our engineering leads. We never share or sell your contact information.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
