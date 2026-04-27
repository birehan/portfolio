import Link from "next/link";
import { Home, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFeaturedClientProjects } from "@/lib/content";

export default function NotFound() {
  const suggestions = getFeaturedClientProjects().slice(0, 2);

  return (
    <div className="container-x py-20 md:py-28">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-3">
          404
        </p>
        <h1 className="h1 mb-5">
          Page <span className="text-[var(--accent)]">not found</span>.
        </h1>
        <p className="lead mx-auto mb-8">
          The link you followed may be broken, or the page may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button size="lg">
              <Home className="h-4 w-4" />
              Go home
            </Button>
          </Link>
          <Link href="/#work">
            <Button variant="secondary" size="lg">
              See my work
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="max-w-4xl mx-auto mt-20">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4 text-center">
            Most-viewed case studies
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suggestions.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}/`}
                className="group block focus-visible:outline-none"
              >
                <Card className="p-5 h-full hover:border-[var(--accent)] transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-base tracking-tight group-hover:text-[var(--accent)] transition-colors">
                      {p.title}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--muted)] group-hover:text-[var(--accent)]" />
                  </div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-2">
                    {p.summary}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
