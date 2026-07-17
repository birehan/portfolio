import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const alt = `${site.name} | ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function headshotDataUri(): string | null {
  try {
    const file = path.join(process.cwd(), "public", "birehan-zewdie.jpg");
    const buf = fs.readFileSync(file);
    return `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function OG() {
  const headshot = headshotDataUri();
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
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
          {headshot && (
            <img
              src={headshot}
              width={104}
              height={104}
              style={{
                width: 104,
                height: 104,
                borderRadius: 999,
                border: "3px solid #22d3ee",
                objectFit: "cover",
              }}
            />
          )}
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
            Shipping AI products end-to-end: frontend, backend, and the models.
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
          <div style={{ display: "flex" }}>Next.js</div>
          <div style={{ color: "#27272a", display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>FastAPI</div>
          <div style={{ color: "#27272a", display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>RAG &amp; agents</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
