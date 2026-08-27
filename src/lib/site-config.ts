/**
 * Centralized site configuration for Jobless Coders platform.
 * 
 * Production Launch TODO:
 * When custom domain DNS is active (e.g. joblesscoders.com or joblesscoders.github.io),
 * set NEXT_PUBLIC_SITE_URL in your hosting environment variables or update the fallback below.
 */
export const siteConfig = {
  name: "Jobless Coders",
  legalName: "Jobless Coders Collective",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://joblesscoders.vercel.app",
  description:
    "Senior software engineering collective based in Dhaka, Bangladesh (GMT+6). We engineer production web platforms, cross-platform mobile apps, custom AI workflows, and cloud infrastructure with direct developer access.",
  shortDescription:
    "Senior engineering collective building modern web platforms, mobile apps, custom AI workflows, and cloud infrastructure.",
  email: "joblesscodersbd@gmail.com",
  locale: "en_US",
  location: {
    city: "Dhaka",
    country: "Bangladesh",
    countryCode: "BD",
  },
  social: {
    github: "https://github.com/joblesscoders",
    linkedin: "https://linkedin.com/company/joblesscoders",
    facebook: "https://facebook.com/joblesscoders",
    x: "https://x.com/your_gumpy",
  },
} as const;
