import React from "react";
import TechStack from "@/components/ui/techstack";
import { Type } from "lucide-react";
import { TypewriterEffectSmooth } from "../ui/type-writer";

export default function TechSection() {
  const techIcons_1 = [
    {
      name: "HTML5",
      icon_dark: "HTML5.svg",
      icon_light: "",
    },
    { name: "CSS3", icon_dark: "CSS3.svg", icon_light: "" },
    {
      name: "JavaScript",
      icon_dark: "JavaScript.svg",
      icon_light: "",
    },
    {
      name: "React.js",
      icon_dark: "React.svg",
      icon_light: "",
    },
    {
      name: "Next.js",
      icon_dark: "Next.svg",
      icon_light: "",
    },
    {
      name: "Node.js",
      icon_dark: "Node.svg",
      icon_light: "",
    },
    {
      name: "Python",
      icon_dark: "Python.svg",
      icon_light: "",
    },
    {
      name: "Flask",
      icon_dark: "Flask.svg",
      icon_light: "",
    },
    {
      name: "C++",
      icon_dark: "C++ (CPlusPlus).svg",
      icon_light: "",
    },
    {
      name: "Spring",
      icon_dark: "Spring.svg",
      icon_light: "",
    },
    {
      name: "MySQL",
      icon_dark: "MySQL.svg",
      icon_light: "",
    },
    {
      name: "PostgreSQL",
      icon_dark: "PostgresSQL.svg",
      icon_light: "",
    },
    {
      name: "GitHub",
      icon_dark: "github.svg",
      icon_light: "",
    },
  ];

  const techIcons_2 = [
    {
      name: "AWS",
      icon_dark: "aws.svg",
      icon_light: "",
    },
    {
      name: "TailwindCSS",
      icon_dark: "TailwindCSS.svg",
      icon_light: "",
    },
    {
      name: "NPM",
      icon_dark: "NPM.svg",
      icon_light: "",
    },
    {
      name: "Linux",
      icon_dark: "Linux.svg",
      icon_light: "",
    },
    {
      name: "Figma",
      icon_dark: "figma.svg",
      icon_light: "",
    },
    {
      name: "Redux",
      icon_dark: "Redux.svg",
      icon_light: "",
    },
    {
      name: "Vercel",
      icon_dark: "vercel.svg",
      icon_light: "",
    },
    {
      name: "FastAPI",
      icon_dark: "FastAPI.svg",
      icon_light: "",
    },
    {
      name: "Django",
      icon_dark: "Django.svg",
      icon_light: "",
    },
  ];

  const words = [
    {
      text: "Tech"
    },
    {
      text: "Stack",
      className: "text-blue-500",
    },
  ];

  return (
    <div>
      <div className="max-w-full mx-auto flex flex-wrap items-center justify-center gap-4 pt-10">
        <TechStack techIcons={techIcons_1} />
        <TechStack techIcons={techIcons_2} rotate={true} />
      </div>
    </div>
  );
}
