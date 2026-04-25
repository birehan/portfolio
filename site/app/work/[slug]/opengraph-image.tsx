import { ImageResponse } from "next/og";
import { getAllProjects, getProject } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllProjects("client").map((p) => ({ slug: p.slug }));
}

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject("client", slug);
  return ProjectOG(project?.title ?? "Project", project?.summary ?? "", project?.stack ?? []);
}

function ProjectOG(title: string, summary: string, stack: string[]) {
  const titleSize = Math.min(72, Math.max(40, 1100 / Math.max(title.length / 2, 12)));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
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
              width: 56,
              height: 56,
              border: "2px solid #27272a",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#22d3ee",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            {site.initials}
          </div>
          <div style={{ fontSize: 22, color: "#a1a1aa", display: "flex" }}>
            Case study · {site.name}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: titleSize,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.08,
              color: "#fafafa",
              maxWidth: 1040,
              display: "flex",
            }}
          >
            {title}
          </div>
          {summary ? (
            <div
              style={{
                fontSize: 26,
                lineHeight: 1.35,
                color: "#a1a1aa",
                marginTop: 22,
                maxWidth: 1040,
                display: "flex",
              }}
            >
              {summary.length > 180 ? summary.slice(0, 177) + "…" : summary}
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {stack.slice(0, 6).map((s) => (
            <div
              key={s}
              style={{
                padding: "8px 14px",
                border: "1px solid #27272a",
                borderRadius: 999,
                color: "#a1a1aa",
                fontSize: 18,
                display: "flex",
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
