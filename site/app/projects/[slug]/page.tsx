import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import { getAllProjects, getProject } from "@/lib/content";
import { ProjectDetail } from "@/components/project-detail";
import { site, canonical } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllProjects("personal").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject("personal", slug);
  if (!project) return { title: "Project not found" };
  const url = canonical(`/projects/${project.slug}`);
  return {
    title: project.title,
    description: project.summary,
    keywords: project.stack.length ? project.stack : undefined,
    alternates: { canonical: url },
    openGraph: {
      title: project.title,
      description: project.summary,
      url,
      images: project.cover ? [{ url: project.cover, alt: project.title }] : undefined,
      type: "article",
      siteName: site.name,
    },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject("personal", slug);
  if (!project) notFound();

  const all = getAllProjects("personal");
  const idx = all.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? all[idx - 1] : undefined;
  const next = idx < all.length - 1 ? all[idx + 1] : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${site.url}/projects/${project.slug}/`,
    author: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    ...(project.date ? { dateCreated: String(project.date) } : {}),
    ...(project.cover ? { image: `${site.url}${project.cover}` } : {}),
    ...(project.stack.length ? { keywords: project.stack.join(", ") } : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${site.url}/#projects` },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${site.url}/projects/${project.slug}/`,
      },
    ],
  };

  return (
    <>
      <Script
        id={`creativework-${project.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id={`breadcrumb-${project.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProjectDetail
        project={project}
        prev={prev ? { slug: prev.slug, title: prev.title } : undefined}
        next={next ? { slug: next.slug, title: next.title } : undefined}
        basePath="/projects"
        backLabel="Back to side projects"
      />
    </>
  );
}
