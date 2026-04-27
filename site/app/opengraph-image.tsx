import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const alt = `${site.name} | ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(34,211,238,0.18) 0%, transparent 70%)",
          color: "#e5e5e5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              border: "2px solid #27272a",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#22d3ee",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            {site.initials}
          </div>
          <div style={{ fontSize: 22, color: "#a1a1aa", display: "flex" }}>
            {site.url.replace("https://", "")}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 32,
              color: "#22d3ee",
              marginBottom: 18,
              display: "flex",
            }}
          >
            {site.role}
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: -2.5,
              lineHeight: 1.05,
              color: "#fafafa",
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.35,
              color: "#a1a1aa",
              marginTop: 28,
              maxWidth: 1000,
              display: "flex",
            }}
          >
            Building production AI systems for clients and product teams.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 14,
            color: "#a1a1aa",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex" }}>Top Rated · Upwork</div>
          <div style={{ color: "#27272a", display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>10+ clients</div>
          <div style={{ color: "#27272a", display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>1,000+ hrs</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
