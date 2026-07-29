"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Send,
  MapPin,
  Github,
  Linkedin,
  MessageSquare,
  ChevronDown,
  Check,
  User,
  AtSign,
  Tag,
  FileText,
} from "lucide-react";

const TOPIC_SUGGESTIONS = [
  "Project Collaboration",
  "Freelance / Contract Work",
  "Bug Report",
  "Feature Request",
  "General Inquiry",
  "Partnership Proposal",
  "Career Opportunity",
  "Technical Support",
];

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "joblesscoders@gmail.com",
    href: "mailto:joblesscoders@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: null,
  },
  {
    icon: MessageSquare,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
];

const SOCIAL_LINKS = [
  { icon: Github, label: "GitHub", href: "https://github.com/joblesscoders" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/joblesscoders" },
];

// Dot grid background
function DotGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="contact-dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" className="text-white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#contact-dots)" />
      </svg>
    </div>
  );
}

// Animated gradient orbs
function GlowOrbs() {
  return (
    <>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-violet-600/8 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/6 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
    </>
  );
}

// Grid line pattern for the form card (like Aceternity)
function GridLines() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      {/* Horizontal lines */}
      <div className="absolute top-0 right-0 w-24 h-px bg-gradient-to-l from-neutral-700/40 to-transparent" />
      <div className="absolute top-8 right-0 w-16 h-px bg-gradient-to-l from-neutral-700/20 to-transparent" />
      {/* Vertical lines */}
      <div className="absolute top-0 right-8 w-px h-16 bg-gradient-to-b from-neutral-700/30 to-transparent" />
      <div className="absolute top-0 right-16 w-px h-10 bg-gradient-to-b from-neutral-700/15 to-transparent" />
      {/* Corner grid pattern */}
      <svg className="absolute top-0 right-0 w-24 h-24 opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-lines" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-lines)" />
      </svg>
    </div>
  );
}

interface FormState {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [topicOpen, setTopicOpen] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const topicRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <DotGrid />
      <GlowOrbs />

      {/* Section Header */}
      <div className="text-center mb-16 relative z-10">
        {/* <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4"
        >
          <Mail className="w-3.5 h-3.5 text-violet-400" />
          Get In Touch
        </motion.div> */}

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
        >
          Contact <span className="text-violet-400">Us</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-neutral-400 max-w-xl mx-auto text-base sm:text-lg"
        >
          Have a project in mind or want to collaborate? We&apos;d love to hear from you. Drop us a message and we&apos;ll get back to you shortly.
        </motion.p>
      </div>

      {/* Main Content: Left Info + Right Form */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
        {/* Left Column — Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 flex flex-col justify-between"
        >
          <div>
            {/* Contact Info Cards */}
            <div className="space-y-4 mb-10">
              {CONTACT_INFO.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="group flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-violet-500/20 hover:bg-violet-500/[0.03] transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/15 flex items-center justify-center group-hover:bg-violet-500/15 transition-colors">
                    <item.icon className="w-4.5 h-4.5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-neutral-200 hover:text-violet-300 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-neutral-200">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">
                Follow Us
              </p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-violet-500/30 hover:bg-violet-500/10 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 text-neutral-400 group-hover:text-violet-300 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative world map hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:block mt-12"
          >
            <div className="relative p-6 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-neutral-500">Available for projects</span>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                We&apos;re based in <span className="text-neutral-200 font-medium">Dhaka, Bangladesh</span> and work with clients globally. Our team is available across multiple timezones.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column — Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-3"
        >
          <div className="relative rounded-2xl bg-neutral-950/60 border border-white/[0.08] backdrop-blur-sm overflow-hidden">
            <GridLines />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-10 sm:p-12 flex flex-col items-center justify-center text-center min-h-[500px]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mb-6"
                  >
                    <Check className="w-7 h-7 text-emerald-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-neutral-400 text-sm max-w-xs">
                    Thanks for reaching out, {form.name.split(" ")[0]}. We&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="p-6 sm:p-8 md:p-10 space-y-6"
                >
                  {/* Name Field (Required) */}
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="flex items-center gap-1.5 text-sm font-medium text-neutral-300">
                      <User className="w-3.5 h-3.5 text-neutral-500" />
                      Full Name
                      <span className="text-rose-400">*</span>
                    </label>
                    <div className={`relative rounded-xl border transition-all duration-300 ${
                      focusedField === "name"
                        ? "border-violet-500/50 shadow-[0_0_0_3px_rgba(139,92,246,0.08)]"
                        : "border-white/[0.08] hover:border-white/[0.15]"
                    }`}>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-white/[0.03] text-neutral-100 placeholder:text-neutral-600 px-4 py-3 rounded-xl text-sm outline-none"
                      />
                    </div>
                  </div>

                  {/* Email Field (Optional) */}
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="flex items-center gap-1.5 text-sm font-medium text-neutral-300">
                      <AtSign className="w-3.5 h-3.5 text-neutral-500" />
                      Email Address
                      <span className="text-neutral-600 text-xs font-normal ml-1">(for reply)</span>
                    </label>
                    <div className={`relative rounded-xl border transition-all duration-300 ${
                      focusedField === "email"
                        ? "border-violet-500/50 shadow-[0_0_0_3px_rgba(139,92,246,0.08)]"
                        : "border-white/[0.08] hover:border-white/[0.15]"
                    }`}>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-white/[0.03] text-neutral-100 placeholder:text-neutral-600 px-4 py-3 rounded-xl text-sm outline-none"
                      />
                    </div>
                  </div>

                  {/* Topic Field (Dropdown with suggestions) */}
                  <div className="space-y-2" ref={topicRef}>
                    <label htmlFor="contact-topic" className="flex items-center gap-1.5 text-sm font-medium text-neutral-300">
                      <Tag className="w-3.5 h-3.5 text-neutral-500" />
                      Topic
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        id="contact-topic"
                        onClick={() => setTopicOpen(!topicOpen)}
                        className={`w-full flex items-center justify-between bg-white/[0.03] px-4 py-3 rounded-xl text-sm outline-none border transition-all duration-300 ${
                          topicOpen
                            ? "border-violet-500/50 shadow-[0_0_0_3px_rgba(139,92,246,0.08)]"
                            : "border-white/[0.08] hover:border-white/[0.15]"
                        }`}
                      >
                        <span className={form.topic ? "text-neutral-100" : "text-neutral-600"}>
                          {form.topic || "Select a topic"}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
                            topicOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {topicOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -5, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -5, scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                            className="absolute z-50 mt-2 w-full rounded-xl bg-neutral-900/95 border border-white/[0.1] backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden"
                          >
                            <div className="py-1 max-h-56 overflow-y-auto">
                              {TOPIC_SUGGESTIONS.map((topic) => (
                                <button
                                  key={topic}
                                  type="button"
                                  onClick={() => {
                                    handleChange("topic", topic);
                                    setTopicOpen(false);
                                  }}
                                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                                    form.topic === topic
                                      ? "bg-violet-500/10 text-violet-300"
                                      : "text-neutral-300 hover:bg-white/[0.05] hover:text-white"
                                  }`}
                                >
                                  {topic}
                                  {form.topic === topic && (
                                    <Check className="w-3.5 h-3.5 text-violet-400" />
                                  )}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="flex items-center gap-1.5 text-sm font-medium text-neutral-300">
                      <FileText className="w-3.5 h-3.5 text-neutral-500" />
                      Message
                    </label>
                    <div className={`relative rounded-xl border transition-all duration-300 ${
                      focusedField === "message"
                        ? "border-violet-500/50 shadow-[0_0_0_3px_rgba(139,92,246,0.08)]"
                        : "border-white/[0.08] hover:border-white/[0.15]"
                    }`}>
                      <textarea
                        id="contact-message"
                        rows={5}
                        placeholder="Tell us about your project, idea, or question..."
                        value={form.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-white/[0.03] text-neutral-100 placeholder:text-neutral-600 px-4 py-3 rounded-xl text-sm outline-none resize-none"
                      />
                    </div>
                    <p className="text-xs text-neutral-600">
                      {form.message.length}/1000 characters
                    </p>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-violet-600/20 hover:shadow-violet-500/30 overflow-hidden cursor-pointer"
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <Send className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Send Message</span>
                  </motion.button>

                  {/* Privacy note */}
                  <p className="text-xs text-neutral-600 text-center">
                    Your message is private. We&apos;ll never share your information.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
