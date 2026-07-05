import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Github,
  Linkedin,
  BookOpen,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AboutBio } from "@/components/sections/about";
import { site, canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Birehan Zewdie — Full-Stack AI Engineer",
  description: `About ${site.name}, a ${site.role} in ${site.location.city}, ${site.location.country}, with 4+ years of software / AI engineering: LLM and RAG products, AI agents, FastAPI/Python backends, and Next.js/React frontends shipped end-to-end.`,
  alternates: { canonical: canonical("/about") },
  openGraph: {
    title: "About Birehan Zewdie — Full-Stack AI Engineer",
    description: `${site.role} in ${site.location.city}, ${site.location.country}. LLMs, RAG, AI agents, FastAPI, and Next.js, shipped end-to-end.`,
    url: canonical("/about"),
    type: "profile",
    siteName: site.name,
    images: [{ url: site.image, alt: `${site.name}, ${site.role}` }],
  },
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${canonical("/about")}#profilepage`,
  url: canonical("/about"),
  name: `About ${site.name}`,
  mainEntity: { "@id": `${site.url}/#person` },
};

export default function AboutPage() {
  return (
    <>
      <Script
        id="about-profilepage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <div className="container-x py-12 md:py-16 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-mono text-[var(--muted)] hover:text-[var(--accent)] mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <header className="max-w-3xl flex flex-col sm:flex-row sm:items-center gap-6 mb-10">
          <Image
            src={site.image}
            alt={`${site.name}, ${site.role}`}
            width={120}
            height={120}
            priority
            className="h-28 w-28 shrink-0 rounded-2xl border border-[var(--border)] object-cover"
          />
          <div>
            <p className="eyebrow">About</p>
            <h1 className="h1 mb-2">
              {site.name.split(" ")[0]}{" "}
              <span className="text-[var(--accent)]">
                {site.name.split(" ").slice(1).join(" ")}
              </span>
            </h1>
            <p className="text-base text-[var(--muted)]">{site.role}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-xs text-[var(--muted)]">
              <MapPin className="h-3.5 w-3.5" />
              {site.location.city}, {site.location.country} · Remote-friendly
            </p>
          </div>
        </header>

        {site.availability.open && (
          <Badge variant="accent" className="mb-8 px-4 py-2 text-sm">
            {site.availability.text}
          </Badge>
        )}

        <div className="max-w-3xl">
          <AboutBio />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/#contact">
            <Button size="md">
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="/resume.pdf" target="_blank" rel="noopener">
            <Button variant="secondary" size="md">
              <Download className="h-4 w-4" />
              Resume
            </Button>
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4 text-sm">
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="me noopener"
            className="inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--accent)]"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href={site.social.github}
            target="_blank"
            rel="me noopener"
            className="inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--accent)]"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={site.social.medium}
            target="_blank"
            rel="me noopener"
            className="inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--accent)]"
          >
            <BookOpen className="h-4 w-4" />
            Medium
          </a>
        </div>
      </div>
    </>
  );
}
