import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen } from "lucide-react";
import { articles } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { site, canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Writing: RAG, LLMs, Fine-tuning & Production AI",
  description: `Articles and engineering notes by ${site.name} on RAG and agentic RAG, LLM fine-tuning, evaluation, and shipping production AI systems with FastAPI and Next.js.`,
  alternates: { canonical: canonical("/writing") },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export default function WritingPage() {
  return (
    <div className="container-x py-12 md:py-16 pb-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-mono text-[var(--muted)] hover:text-[var(--accent)] mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <header className="max-w-3xl mb-12">
        <p className="eyebrow">Writing</p>
        <h1 className="h1 mb-5">
          Notes on shipping <span className="text-[var(--accent)]">production AI</span>
        </h1>
        <p className="lead text-lg">
          Writing about RAG, fine-tuning, LLM architecture, and the operational
          work that keeps AI systems running in production.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
        {articles.map((a) => (
          <a
            key={a.url + a.title}
            href={a.url}
            target="_blank"
            rel="noopener"
            className="group block focus-visible:outline-none"
          >
            <Card className="p-5 h-full hover:border-[var(--accent)] transition-all hover:translate-y-[-1px]">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-semibold text-base tracking-tight group-hover:text-[var(--accent)] transition-colors">
                  {a.title}
                </h3>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <p className="font-mono text-xs text-[var(--muted)] mb-3">{formatDate(a.date)}</p>
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-4 line-clamp-3">
                {a.excerpt}
              </p>
              {a.tags && a.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {a.tags.map((t) => (
                    <Badge key={t} variant="outline">{t}</Badge>
                  ))}
                </div>
              )}
            </Card>
          </a>
        ))}
      </div>

      <section className="mt-16 max-w-3xl">
        <a href={site.social.medium} target="_blank" rel="noopener">
          <Button variant="secondary" size="md">
            <BookOpen className="h-4 w-4" />
            Read on Medium
          </Button>
        </a>
      </section>
    </div>
  );
}
