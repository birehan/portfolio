import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

function projectLastModified(date: string | undefined, fallback: Date): Date {
  if (!date) return fallback;
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const baseUrl = site.url.replace(/\/$/, "");

  const staticRoutes = [
    "",
    "/about",
    "/certificates",
    "/resume",
    "/services",
    "/writing",
  ].map((route) => ({
    url: `${baseUrl}${route}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const work = getAllProjects("client").map((p) => ({
    url: `${baseUrl}/work/${p.slug}/`,
    lastModified: projectLastModified(p.date, now),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const personal = getAllProjects("personal").map((p) => ({
    url: `${baseUrl}/projects/${p.slug}/`,
    lastModified: projectLastModified(p.date, now),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...work, ...personal];
}
