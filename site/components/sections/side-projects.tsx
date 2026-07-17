import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/content";

export function SideProjects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="section">
      <div className="container-x">
        <div className="mb-12 max-w-3xl">
          <p className="eyebrow">04: Side projects & research</p>
          <h2 className="h2">
            ML experiments and <span className="text-[var(--accent)]">open-source research</span>
          </h2>
          <p className="lead mt-4">
            LLM fine-tuning, RAG architectures, and ML pipelines. Most include a
            Medium write-up and GitHub source.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}/`}
              className="group block focus-visible:outline-none"
            >
              <Card className="overflow-hidden h-full hover:border-[var(--accent)] transition-all hover:translate-y-[-1px]">
                {p.cover && (
                  <div className="relative aspect-[4/3] w-full shrink-0 border-b border-[var(--border)] bg-[var(--muted)]/10">
                    <div className="absolute inset-2.5 sm:inset-3 rounded-md bg-[var(--surface-2)] ring-1 ring-[var(--border)]/50 overflow-hidden">
                      <Image
                        src={p.cover}
                        alt={p.title}
                        fill
                        sizes="(max-width: 767px) 100vw, 33vw"
                        className="object-contain object-center opacity-[0.98] transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </div>
                  </div>
                )}
                <div className="p-5">
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
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
