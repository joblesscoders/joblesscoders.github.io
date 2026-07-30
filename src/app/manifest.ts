import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} | Web Development Services`,
    short_name: siteConfig.name,
    description: siteConfig.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#8b5cf6",
    icons: [
      {
        src: "/assets/Jobless_coders_colored.png",
        sizes: "500x500",
        type: "image/png",
      },
    ],
  };
}
