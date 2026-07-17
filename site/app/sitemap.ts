import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/** Normalize a parsed date to UTC midnight of its calendar day (timezone-stable). */
function toUtcDay(d: Date): Date {
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
}

function projectLastModified(date: unknown, fallback: Date): Date {
  // YAML may parse full dates (e.g. `date: 2024-02-01`) into Date objects.
  if (date instanceof Date) {
    return Number.isNaN(date.getTime()) ? fallback : toUtcDay(date);
  }
  if (date === undefined || date === null || date === "") return fallback;
  // Bare year (e.g. 2024 as a number or "2024"); otherwise `new Date(2024)`
  // is interpreted as milliseconds since the epoch and resolves to 1970.
  const raw = String(date).trim();
  if (/^\d{4}$/.test(raw)) {
    return new Date(Date.UTC(Number(raw), 0, 1));
  }
  // Strings like "Feb 2024" parse in local time; snap to the intended UTC day.
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? fallback : toUtcDay(parsed);
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
