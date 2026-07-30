import { siteConfig } from "@/lib/site-config";

const TEAM = [
  { name: "Asif Bhuiyan Shawon", title: "Team Lead, Full-Stack & DevOps" },
  { name: "Tousif Muhaimine", title: "Backend Lead & AI Engineer" },
  { name: "Midhat Ratib Khan", title: "Data Analyst & Cloud Engineer" },
  { name: "Shafkat Sharif Bhuiyan", title: "Data & System Engineer" },
  { name: "Rafi Haque", title: "Frontend Lead" },
  { name: "Zarif Zoha", title: "Cyber Security Lead" },
];

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/assets/Jobless_coders_colored.png`,
    image: `${siteConfig.url}/assets/Jobless_coders_colored.png`,
    description: siteConfig.description,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressCountry: siteConfig.location.countryCode,
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "Full-Stack Web Development",
      "Mobile App Development",
      "UI/UX & Design Systems",
      "AI & Machine Learning",
      "Cloud & DevOps Solutions",
    ],
    employee: TEAM.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.title,
    })),
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.facebook,
      siteConfig.social.x,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
