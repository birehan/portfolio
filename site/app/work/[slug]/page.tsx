import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import { getAllProjects, getProject } from "@/lib/content";
import { ProjectDetail } from "@/components/project-detail";
import { site } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllProjects("client").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject("client", slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.cover ? [{ url: project.cover, alt: project.title }] : undefined,
      type: "article",
      siteName: site.name,
    },
  };
}

export default async function WorkPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject("client", slug);
  if (!project) notFound();

  const all = getAllProjects("client");
  const idx = all.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? all[idx - 1] : undefined;
  const next = idx < all.length - 1 ? all[idx + 1] : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${site.url}/work/${project.slug}/`,
    author: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    ...(project.date ? { dateCreated: String(project.date) } : {}),
    ...(project.cover ? { image: `${site.url}${project.cover}` } : {}),
    ...(project.stack.length ? { keywords: project.stack.join(", ") } : {}),
  };

  return (
    <>
      <Script
        id={`creativework-${project.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetail
        project={project}
        prev={prev ? { slug: prev.slug, title: prev.title } : undefined}
        next={next ? { slug: next.slug, title: next.title } : undefined}
        basePath="/work"
        backLabel="Back to all client work"
      />
    </>
  );
}
