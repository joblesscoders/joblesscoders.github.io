import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} | Web Development Services`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 50% 35%, rgba(139,92,246,0.35) 0%, rgba(10,10,10,0) 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 96,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: -2,
          }}
        >
          <span style={{ color: "#a78bfa" }}>{"<"}</span>
          <span>Jobless</span>
          <span style={{ color: "#f87171", marginLeft: 20 }}>Coders</span>
          <span style={{ color: "#a78bfa" }}>{"/>"}</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 32,
            color: "#a3a3a3",
          }}
        >
          Web · Mobile · AI · Cloud — Engineering from Dhaka, Bangladesh
        </div>
      </div>
    ),
    { ...size }
  );
}
