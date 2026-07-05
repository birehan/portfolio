import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Project } from "@/lib/content";

export function FeaturedWork({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="section section-after-hero">
      <div className="container-x">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="eyebrow">01: Selected work</p>
            <h2 className="h2">
              Production systems that <span className="text-[var(--accent)]">shipped</span>
            </h2>
            <p className="lead mt-4">
              End-to-end AI products, owned from the Next.js frontend and FastAPI
              backend through RAG, agents, and cloud deploy — shipped and running for
              real users.
            </p>
          </div>
          <Link
            href="/#about"
            className="text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] inline-flex items-center gap-1 font-medium"
          >
            About me
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} priority={i < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, priority }: { project: Project; priority?: boolean }) {
  const stack = project.stack.slice(0, 4);
  const live = project.links.live;
  const demo = project.links.demo;
  const playstore = project.links.playstore;

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:border-[var(--accent)] transition-all duration-200 hover:translate-y-[-2px]">
      <Link
        href={`/work/${project.slug}/`}
        className="group block flex-1 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface-2)]">
          {project.cover ? (
            <Image
              src={project.cover}
              alt={project.title}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-[var(--muted)] font-mono text-sm px-4 text-center">
              {project.title}
            </div>
          )}
          {project.featured && (
            <Badge
              variant="accent"
              className="absolute top-3 left-3 backdrop-blur"
            >
              <Star className="h-3 w-3 fill-current" />
              Featured
            </Badge>
          )}
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-lg md:text-xl font-semibold tracking-tight group-hover:text-[var(--accent)] transition-colors">
              {project.title}
            </h3>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          {project.role && (
            <p className="font-mono text-xs text-[var(--muted)] mb-3">{project.role}</p>
          )}
          <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-3 mb-4">
            {project.summary}
          </p>
          {project.outcome && (
            <p className="text-sm text-[var(--text)] font-medium mb-4 border-l-2 border-[var(--accent)] pl-3">
              {project.outcome}
            </p>
          )}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {stack.map((s) => (
              <Badge key={s} variant="outline">
                {s}
              </Badge>
            ))}
            {project.stack.length > stack.length && (
              <Badge variant="outline">+{project.stack.length - stack.length}</Badge>
            )}
          </div>
        </div>
      </Link>

      {(live || demo || playstore) && (
        <div className="px-6 pb-5 pt-1 border-t border-[var(--border)] flex flex-col gap-2">
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[var(--accent)] bg-[var(--accent)]/12 px-4 py-2.5 text-sm font-semibold text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] hover:border-[var(--accent)] transition-colors"
            >
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
              <span className="truncate">{new URL(live).host}</span>
            </a>
          )}
          {!live && demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[var(--accent)] bg-[var(--accent)]/12 px-4 py-2.5 text-sm font-semibold text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors"
            >
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
              Watch demo
            </a>
          )}
          {playstore && (
            <a
              href={playstore}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-xs font-semibold text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Google Play
            </a>
          )}
        </div>
      )}
    </Card>
  );
}
