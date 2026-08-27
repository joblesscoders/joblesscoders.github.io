import React from "react";
import { Users, Globe2, Cpu, ShieldCheck } from "lucide-react";

export function ProofSection() {
  const proofs = [
    {
      stat: "6",
      label: "Senior Core Engineers",
      detail: "Full-stack, AI, Cloud & Security leads",
      icon: Users,
    },
    {
      stat: "GMT+6",
      label: "Dhaka & Global Overlap",
      detail: "Daily overlap with US, EMEA & APAC",
      icon: Globe2,
    },
    {
      stat: "100%",
      label: "Direct Developer Access",
      detail: "Zero account-manager friction or telephone games",
      icon: Cpu,
    },
    {
      stat: "0",
      label: "Subcontracting or Junior Handoffs",
      detail: "Code written directly by domain specialists",
      icon: ShieldCheck,
    },
  ];

  return (
    <section aria-label="Studio Facts" className="py-12 border-y border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {proofs.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="w-4 h-4 text-violet-400 shrink-0" />
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-foreground tracking-tight">
                    {item.stat}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-foreground">
                  {item.label}
                </div>
                <div className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {item.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
