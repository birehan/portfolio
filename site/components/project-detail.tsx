import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  BookOpen,
  Smartphone,
  Play,
  CalendarDays,
} from "lucide-react";
import type { Project } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/markdown";
import { ProjectGallery } from "@/components/project-gallery";
import { MarkdownToc, extractHeadings } from "@/components/markdown-toc";

type Props = {
  project: Project;
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
  basePath: "/work" | "/projects";
  backLabel: string;
};

function readingMinutes(md: string): number {
  const words = md.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

/** Cover first, then remaining gallery paths (deduped). */
function orderedProjectMedia(project: Project): string[] {
  const paths = project.gallery;
  if (paths.length === 0) return [];
  const c = project.cover;
  if (!c) return paths;
  const rest = paths.filter((p) => p !== c);
  return [c, ...rest];
}

export function ProjectDetail({ project, prev, next, basePath, backLabel }: Props) {
  const headings = extractHeadings(project.body);
  const minutes = readingMinutes(project.body);
  const gallerySlides = orderedProjectMedia(project);

  return (
    <article className="pb-20">
      <div className="container-x pt-12 md:pt-16">
        <Link
          href={basePath === "/work" ? "/#work" : "/#projects"}
          className="inline-flex items-center gap-1.5 text-sm font-mono text-[var(--muted)] hover:text-[var(--accent)] mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>

        <header className="max-w-4xl">
          {project.role && (
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-3">
              {project.role}
            </p>
          )}
          <h1 className="h1 mb-5">{project.title}</h1>
          <p className="lead text-lg">{project.summary}</p>

          {gallerySlides.length > 0 && (
            <div className="mt-8 md:mt-10 max-w-5xl">
              <h2 className="text-sm font-semibold tracking-tight text-[var(--text)] mb-2">
                Project gallery
              </h2>
              <p className="text-sm text-[var(--muted)] mb-4">
                {gallerySlides.length > 1
                  ? "Use the side arrows to browse; click an image for full size."
                  : "Click the image for full size."}
              </p>
              <ProjectGallery images={gallerySlides} title={project.title} />
            </div>
          )}

          {project.outcome && (
            <p className="mt-8 md:mt-10 text-base text-[var(--text)] font-medium border-l-2 border-[var(--accent)] pl-4 max-w-3xl">
              {project.outcome}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 mt-5 text-xs font-mono text-[var(--muted)]">
            {project.date && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3 w-3" />
                {project.date}
              </span>
            )}
            <span>·</span>
            <span>{minutes} min read</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-7">
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noopener">
                <Button size="md">
                  <ExternalLink className="h-4 w-4" />
                  Live site
                </Button>
              </a>
            )}
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener">
                <Button variant="secondary" size="md">
                  <Github className="h-4 w-4" />
                  Source
                </Button>
              </a>
            )}
            {project.links.medium && (
              <a href={project.links.medium} target="_blank" rel="noopener">
                <Button variant="secondary" size="md">
                  <BookOpen className="h-4 w-4" />
                  Article
                </Button>
              </a>
            )}
            {project.links.playstore && (
              <a href={project.links.playstore} target="_blank" rel="noopener">
                <Button variant="secondary" size="md">
                  <Smartphone className="h-4 w-4" />
                  Play Store
                </Button>
              </a>
            )}
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noopener">
                <Button variant="secondary" size="md">
                  <Play className="h-4 w-4" />
                  Watch demo
                </Button>
              </a>
            )}
          </div>

          {project.stack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-6">
              {project.stack.map((s) => (
                <Badge key={s} variant="default">
                  {s}
                </Badge>
              ))}
            </div>
          )}
        </header>
      </div>

      <div className="container-x mt-12 md:mt-16">
        <div className="grid xl:grid-cols-[minmax(0,1fr)_220px] gap-8">
          <div className="max-w-3xl">
            <Markdown content={project.body} />
          </div>
          <MarkdownToc headings={headings} />
        </div>
      </div>

      <nav
        aria-label="Project navigation"
        className="container-x mt-20 pt-8 border-t border-[var(--border)] grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {prev ? (
          <Link
            href={`${basePath}/${prev.slug}/`}
            className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 hover:border-[var(--accent)] transition-colors"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-2 inline-flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" />
              Previous
            </p>
            <p className="font-semibold tracking-tight group-hover:text-[var(--accent)] transition-colors">
              {prev.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
        {next && (
          <Link
            href={`${basePath}/${next.slug}/`}
            className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 hover:border-[var(--accent)] transition-colors text-right md:ml-auto md:max-w-md w-full"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-2 inline-flex items-center gap-1 justify-end w-full">
              Next
              <ArrowRight className="h-3 w-3" />
            </p>
            <p className="font-semibold tracking-tight group-hover:text-[var(--accent)] transition-colors">
              {next.title}
            </p>
          </Link>
        )}
      </nav>
    </article>
  );
}
