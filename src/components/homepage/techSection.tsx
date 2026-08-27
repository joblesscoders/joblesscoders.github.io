import React from "react";
import Image from "next/image";

export default function TechSection() {
  const categories = [
    {
      name: "Frontend & Mobile",
      description: "Fast, accessible user interfaces and cross-platform apps",
      items: [
        { name: "Next.js 15", icon: "/assets/icons/nextjs.svg" },
        { name: "React 19", icon: "/assets/icons/react.svg" },
        { name: "TypeScript", icon: "/assets/icons/TypeScript.svg" },
        { name: "Tailwind CSS", icon: "/assets/icons/tailwind.svg" },
        { name: "React Native", icon: "/assets/icons/react.svg" },
        { name: "Figma", icon: "/assets/icons/figma.svg" },
      ],
    },
    {
      name: "Backend & AI Workflows",
      description: "High-throughput APIs, vector databases, and LLM tool chains",
      items: [
        { name: "Node.js", icon: "/assets/icons/Node.js.svg" },
        { name: "Python", icon: "/assets/icons/python.svg" },
        { name: "PostgreSQL", icon: "/assets/icons/PostgresSQL.svg" },
        { name: "FastAPI", icon: "/assets/icons/Flask.svg" },
        { name: "PyTorch", icon: "/assets/icons/pytorch.svg" },
        { name: "Ollama / LLMs", icon: "/assets/icons/ollama.svg" },
      ],
    },
    {
      name: "Cloud & Infrastructure",
      description: "Containerized deployments, automated CI/CD, and security",
      items: [
        { name: "AWS", icon: "/assets/icons/aws.svg" },
        { name: "Docker", icon: "/assets/icons/docker.svg" },
        { name: "Linux", icon: "/assets/icons/Linux.svg" },
        { name: "GitHub Actions", icon: "/assets/icons/github.svg" },
        { name: "Vercel", icon: "/assets/icons/nextjs.svg" },
        { name: "Firebase", icon: "/assets/icons/firebase.svg" },
      ],
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-card/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-mono mb-3">
            <span>{"// Technology Arsenal"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Modern, Maintainable Tech Stacks
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            We select proven, battle-tested tools to maximize runtime performance, developer velocity, and maintainability.
          </p>
        </div>

        {/* Categorized Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="p-6 sm:p-7 rounded-2xl bg-card border border-border flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                  {cat.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-muted/50 border border-border/80 hover:border-violet-500/30 transition-colors"
                    >
                      <Image
                        src={item.icon}
                        alt={`${item.name} icon`}
                        width={20}
                        height={20}
                        className="w-5 h-5 shrink-0 object-contain"
                      />
                      <span className="text-xs font-medium text-foreground truncate">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
