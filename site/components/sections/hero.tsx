import Link from "next/link";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
      <div className="container-x pt-24 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <Badge variant="accent" className="px-3 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              </span>
              Available for new projects
            </Badge>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[var(--muted)]">
              <MapPin className="h-3 w-3" />
              {site.location} · {site.timezone}
            </span>
          </div>

          <p className="font-mono text-sm text-[var(--muted)] mb-4">
            Hi, I&apos;m {site.name}.
          </p>
          <h1 className="h1 mb-6">
            Building <span className="text-[var(--accent)]">production AI systems</span>
            <br />
            for clients and product teams.
          </h1>
          <p className="lead mb-10 text-lg">
            ML / Backend AI Engineer specializing in <strong className="text-[var(--text)]">RAG, LLM agents, and FastAPI platforms</strong>.
            Currently shipping ML systems at The COOL Company. Previously at Adludio.
            Top-Rated freelancer with 1,000+ hours and $10K+ delivered to 10+ clients.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <Link href="/#work">
              <Button size="lg" className="w-full sm:w-auto">
                See my work
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/#contact">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                <Sparkles className="h-4 w-4" />
                Hire me
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {site.trust.map((t) => (
              <div
                key={t.label}
                className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-3"
              >
                <p className="font-mono text-xs text-[var(--muted)]">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
