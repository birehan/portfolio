import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 70%)",
        }}
      />
      <div className="container-x pt-24 pb-10 md:pt-32 md:pb-12">
        <Image
          src={site.image}
          alt={`${site.name}, ${site.role}`}
          width={72}
          height={72}
          priority
          className="mb-6 h-16 w-16 rounded-full border border-[var(--border)] object-cover md:h-[72px] md:w-[72px]"
        />
        {site.availability.open && (
          <p className="eyebrow inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            Open to full-time remote roles
          </p>
        )}

        <h1 className="h1-hero mb-6">
          {site.name}, <span className="text-[var(--accent)]">{site.role}</span>
          <br />
          shipping AI products end-to-end.
        </h1>

        <p className="lead mb-6 max-w-2xl">
          {site.tagline} Recent wins: a 7% revenue lift from an AI floor-price
          model at The COOL Company, and a bilingual RAG legal platform live in
          production.
        </p>

        <p className="mb-8 max-w-2xl text-sm text-[var(--muted)]">
          <span className="text-[var(--text)] font-medium">
            4+ years of software / AI engineering.
          </span>{" "}
          LLMs, RAG &amp; AI agents · LLM fine-tuning &amp; evaluation · FastAPI &amp;
          Python · Next.js, React &amp; TypeScript · PostgreSQL / pgvector · Docker on
          GCP &amp; AWS.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <Link href="/#work">
            <Button size="lg" className="w-full sm:w-auto">
              View my work
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="/resume.pdf" target="_blank" rel="noopener">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              <Download className="h-4 w-4" />
              Download resume
            </Button>
          </a>
          <Link href="/#contact">
            <Button variant="ghost" size="lg" className="w-full sm:w-auto">
              Get in touch
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
