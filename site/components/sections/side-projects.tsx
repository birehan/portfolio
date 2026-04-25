import Link from "next/link";
import { ArrowUpRight, Github, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/content";

export function SideProjects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="section">
      <div className="container-x">
        <div className="mb-12 max-w-3xl">
          <p className="eyebrow">05 — Side projects & writing</p>
          <h2 className="h2">
            Open-source experiments and <span className="text-[var(--accent)]">research</span>
          </h2>
          <p className="lead mt-4">
            Personal projects from my 10 Academy program and ongoing research into
            LLMs, RAG, and ML pipelines. Most include a Medium write-up and GitHub source.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}/`}
              className="group block focus-visible:outline-none"
            >
              <Card className="p-5 h-full hover:border-[var(--accent)] transition-all hover:translate-y-[-1px]">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-base tracking-tight group-hover:text-[var(--accent)] transition-colors">
                    {p.title}
                  </h3>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                {p.date && (
                  <p className="font-mono text-xs text-[var(--muted)] mb-3">{p.date}</p>
                )}
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-4 line-clamp-2">
                  {p.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.stack.slice(0, 4).map((s) => (
                    <Badge key={s} variant="outline">
                      {s}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-xs text-[var(--muted)] font-mono">
                  {p.links.github && (
                    <span className="inline-flex items-center gap-1">
                      <Github className="h-3 w-3" />
                      Source
                    </span>
                  )}
                  {p.links.medium && (
                    <span className="inline-flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      Article
                    </span>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
