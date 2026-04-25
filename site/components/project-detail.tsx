import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  BookOpen,
  Smartphone,
  Play,
} from "lucide-react";
import type { Project } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/markdown";
import { ProjectGallery } from "@/components/project-gallery";

type Props = {
  project: Project;
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
  basePath: "/work" | "/projects";
  backLabel: string;
};

export function ProjectDetail({ project, prev, next, basePath, backLabel }: Props) {
  return (
    <article className="pb-20">
      <div className="container-x pt-12 md:pt-16">
        <Link
          href="/#work"
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

          {project.outcome && (
            <p className="mt-5 text-base text-[var(--text)] font-medium border-l-2 border-[var(--accent)] pl-4 max-w-3xl">
              {project.outcome}
            </p>
          )}

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

      {project.cover && (
        <div className="container-x mt-10 md:mt-14">
          <div className="relative aspect-[16/9] md:aspect-[2/1] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-top"
            />
          </div>
        </div>
      )}

      <div className="container-x mt-12 md:mt-16">
        <div className="max-w-3xl">
          <Markdown content={project.body} />
        </div>
      </div>

      {project.gallery.length > 1 && (
        <div className="container-x mt-16">
          <h2 className="text-xl font-semibold tracking-tight mb-2">
            Project gallery
          </h2>
          <p className="text-sm text-[var(--muted)] mb-6">
            Tap any image to view full size.
          </p>
          <ProjectGallery
            images={project.gallery.filter((g) => g !== project.cover)}
            title={project.title}
          />
        </div>
      )}

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
