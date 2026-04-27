import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { slugify } from "./utils";

const ROOT = path.resolve(process.cwd(), "..");
const PORTFOLIO_DIRS = {
  client: path.join(ROOT, "client_projects"),
  personal: path.join(ROOT, "projects"),
  certificates: path.join(ROOT, "certificates"),
} as const;

export type ProjectKind = "client" | "personal";

export type ProjectLinks = {
  live?: string;
  github?: string;
  medium?: string;
  demo?: string;
  playstore?: string;
  appstore?: string;
};

export type Project = {
  slug: string;
  folder: string;
  kind: ProjectKind;
  title: string;
  role?: string;
  summary: string;
  outcome?: string;
  stack: string[];
  links: ProjectLinks;
  cover: string | null;
  gallery: string[];
  body: string;
  featured: boolean;
  order: number;
  date?: string;
};

export type Certificate = {
  slug: string;
  title: string;
  category: "10-academy" | "competitive" | "coursera" | "udemy";
  categoryLabel: string;
  issuer?: string;
  date?: string;
  description?: string;
  image: string | null;
  extraImages: string[];
  links: { href: string; label: string }[];
};

const PUBLIC_CONTENT_BASE = "/content";

function publicPath(kind: ProjectKind | "certificates", folderName: string, file: string) {
  return `${PUBLIC_CONTENT_BASE}/${kind}/${folderName}/${file}`;
}

function listImages(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(f))
    .sort();
}

function pickCover(images: string[]): string | null {
  if (images.length === 0) return null;
  const main = images.find((f) => /^main[._-]?image\./i.test(f));
  if (main) return main;
  const home = images.find((f) => /^home[._-]?page\./i.test(f));
  if (home) return home;
  return images[0];
}

function readMarkdown(file: string): { data: Record<string, unknown>; content: string } {
  if (!fs.existsSync(file)) return { data: {}, content: "" };
  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);
  return { data: parsed.data as Record<string, unknown>, content: parsed.content };
}

function inferTitleFromFolder(folder: string): string {
  return folder
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function extractFirstParagraph(md: string): string {
  const stripped = md.replace(/^#.*$/gm, "").trim();
  const para = stripped.split(/\n\s*\n/).find((p) => p.trim().length > 30) ?? "";
  return para.replace(/\s+/g, " ").trim().slice(0, 240);
}

function extractLinksFromBody(md: string): ProjectLinks {
  const links: ProjectLinks = {};
  const urlRe = /https?:\/\/[^\s)<>"]+/g;
  const found = md.match(urlRe) ?? [];
  for (const u of found) {
    const url = u.replace(/[).,;]+$/, "");
    if (!links.github && /github\.com/i.test(url)) links.github = url;
    else if (!links.medium && /medium\.com/i.test(url)) links.medium = url;
    else if (!links.playstore && /play\.google\.com/i.test(url)) links.playstore = url;
    else if (!links.appstore && /apps\.apple\.com/i.test(url)) links.appstore = url;
    else if (!links.demo && /drive\.google\.com/i.test(url)) links.demo = url;
    else if (
      !links.live &&
      !/(github|medium|google|coursera|linkedin|upwork)/i.test(url)
    ) {
      links.live = url;
    }
  }
  return links;
}

function readProject(kind: ProjectKind, folderName: string): Project | null {
  const baseDir = PORTFOLIO_DIRS[kind];
  const folderPath = path.join(baseDir, folderName);
  const infoPath = path.join(folderPath, "info.md");
  if (!fs.existsSync(infoPath)) return null;
  const { data, content } = readMarkdown(infoPath);

  const images = listImages(path.join(folderPath, "images"));
  const cover = pickCover(images);

  const inferredTitle = inferTitleFromFolder(folderName);
  const firstLine = content.split(/\n/).find((l) => l.trim().length > 0)?.trim() ?? "";
  const titleFromBody = firstLine.replace(/^#+\s*/, "").trim();

  const slug = (data.slug as string | undefined) ?? slugify(folderName.replace(/_/g, "-"));

  const linksFromBody = extractLinksFromBody(content);
  const dataLinks = (data.links ?? {}) as ProjectLinks;
  const links: ProjectLinks = { ...linksFromBody, ...dataLinks };

  const title = (data.title as string | undefined)
    ?? (titleFromBody.length > 6 && titleFromBody.length < 120 ? titleFromBody : inferredTitle);

  const summary = (data.summary as string | undefined) ?? extractFirstParagraph(content);

  const stack = (data.stack as string[] | undefined) ?? [];

  return {
    slug,
    folder: folderName,
    kind,
    title,
    role: data.role as string | undefined,
    summary,
    outcome: data.outcome as string | undefined,
    stack,
    links,
    cover: cover ? publicPath(kind, folderName, cover) : null,
    gallery: images.map((img) => publicPath(kind, folderName, img)),
    body: content,
    featured: Boolean(data.featured ?? false),
    order: typeof data.order === "number" ? data.order : 999,
    date: data.date as string | undefined,
  };
}

export function getAllProjects(kind: ProjectKind): Project[] {
  const baseDir = PORTFOLIO_DIRS[kind];
  if (!fs.existsSync(baseDir)) return [];
  const folders = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const projects: Project[] = [];
  for (const folder of folders) {
    const p = readProject(kind, folder);
    if (p) projects.push(p);
  }
  return projects.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.order - b.order;
  });
}

export function getProject(kind: ProjectKind, slug: string): Project | null {
  const all = getAllProjects(kind);
  return all.find((p) => p.slug === slug) ?? null;
}

export function getFeaturedClientProjects(): Project[] {
  return getAllProjects("client").filter((p) => p.featured).slice(0, 6);
}

const CERT_CATEGORIES: Record<string, { id: Certificate["category"]; label: string }> = {
  "10_academy": { id: "10-academy", label: "10 Academy" },
  competitive_programming: { id: "competitive", label: "Competitive Programming" },
  coursera: { id: "coursera", label: "Coursera" },
  udemy: { id: "udemy", label: "Udemy" },
};

function readCertificateFromFolder(
  categoryFolder: string,
  itemFolder: string | null,
  itemName: string,
): Certificate | null {
  const cat = CERT_CATEGORIES[categoryFolder];
  if (!cat) return null;

  const baseDir = PORTFOLIO_DIRS.certificates;
  const folder = itemFolder
    ? path.join(baseDir, categoryFolder, itemFolder)
    : path.join(baseDir, categoryFolder);

  let infoPath = path.join(folder, "info.md");
  let images: string[] = [];

  if (itemFolder) {
    const imagesDir = path.join(folder, "images");
    if (fs.existsSync(imagesDir)) {
      images = listImages(imagesDir);
    } else {
      images = listImages(folder);
    }
  } else {
    images = listImages(folder).filter((img) => img.toLowerCase().includes(itemName.toLowerCase()));
    if (images.length === 0) {
      const all = listImages(folder);
      const lower = itemName.toLowerCase();
      const match = all.find((f) => f.toLowerCase().replace(/[\s_-]/g, "").includes(lower.replace(/[\s_-]/g, "")));
      if (match) images = [match];
    }
  }

  const { content } = fs.existsSync(infoPath) ? readMarkdown(infoPath) : { content: "" };

  const slug = slugify(`${cat.id}-${itemName}`);
  const cover = pickCover(images);

  const folderForPublic = itemFolder ?? "";
  const subPath = folderForPublic ? `${categoryFolder}/${folderForPublic}` : categoryFolder;
  const useImagesSubdir = itemFolder && fs.existsSync(path.join(folder, "images"));

  const toPublic = (file: string) => {
    if (useImagesSubdir) {
      return `/content/certificates/${subPath}/images/${file}`;
    }
    return `/content/certificates/${subPath}/${file}`;
  };

  return {
    slug,
    title: itemName,
    category: cat.id,
    categoryLabel: cat.label,
    description: content ? extractFirstParagraph(content) : undefined,
    image: cover ? toPublic(cover) : null,
    extraImages: images.filter((i) => i !== cover).map(toPublic),
    links: extractLinksAsList(content),
  };
}

function extractLinksAsList(md: string): { href: string; label: string }[] {
  const out: { href: string; label: string }[] = [];
  const seen = new Set<string>();
  const urls = md.match(/https?:\/\/[^\s)<>"]+/g) ?? [];
  for (const u of urls) {
    const clean = u.replace(/[).,;]+$/, "");
    if (seen.has(clean)) continue;
    seen.add(clean);
    let label = "Link";
    if (/linkedin\.com/i.test(clean)) label = "LinkedIn";
    else if (/coursera\.org/i.test(clean)) label = "Verify on Coursera";
    else if (/udemy\.com/i.test(clean)) label = "Verify on Udemy";
    else if (/a2sv\.org/i.test(clean)) label = "A2SV";
    out.push({ href: clean, label });
  }
  return out;
}

export function getAllCertificates(): Certificate[] {
  const certsDir = PORTFOLIO_DIRS.certificates;
  if (!fs.existsSync(certsDir)) return [];

  const out: Certificate[] = [];

  for (const categoryFolder of fs.readdirSync(certsDir)) {
    const catPath = path.join(certsDir, categoryFolder);
    if (!fs.statSync(catPath).isDirectory()) continue;
    const cat = CERT_CATEGORIES[categoryFolder];
    if (!cat) continue;

    if (cat.id === "competitive") {
      const files = fs.readdirSync(catPath).filter((f) => /\.(png|jpg|jpeg)$/i.test(f));
      for (const file of files) {
        const name = file.replace(/\.[^.]+$/, "").replace(/_/g, " ");
        const friendly = name
          .replace(/\b\w/g, (c) => c.toUpperCase())
          .replace(/A2sv/i, "A2SV")
          .replace(/Etcpc/i, "EtCPC");
        out.push({
          slug: slugify(`competitive-${name}`),
          title: friendly,
          category: cat.id,
          categoryLabel: cat.label,
          image: `/content/certificates/competitive_programming/${encodeURIComponent(file)}`,
          extraImages: [],
          links: [],
        });
      }
      continue;
    }

    if (cat.id === "udemy") {
      const files = fs.readdirSync(catPath).filter((f) => /\.(png|jpg|jpeg)$/i.test(f));
      for (const file of files) {
        const name = file.replace(/\.[^.]+$/, "");
        out.push({
          slug: slugify(`udemy-${name}`),
          title: name,
          category: cat.id,
          categoryLabel: cat.label,
          issuer: "Udemy",
          image: `/content/certificates/udemy/${encodeURIComponent(file)}`,
          extraImages: [],
          links: [],
        });
      }
      continue;
    }

    if (cat.id === "10-academy") {
      const cert = readCertificateFromFolder(categoryFolder, null, "10 Academy Distinction");
      const tenAcademyDir = catPath;
      const imagesDir = path.join(tenAcademyDir, "images");
      const images = fs.existsSync(imagesDir) ? listImages(imagesDir) : [];
      const main = images.find((f) => /main_certificate/i.test(f)) ?? images[0];
      const valedictorian = images.find((f) => /valedictorian/i.test(f));
      const detail = images.find((f) => /detail_certificate/i.test(f));
      if (main) {
        out.push({
          slug: "10-academy-distinction",
          title:
            "10 Academy: Machine Learning, Generative AI, Data Engineering & Web3 (with Distinction)",
          category: cat.id,
          categoryLabel: cat.label,
          issuer: "10 Academy",
          date: "June 2024",
          description:
            "6-month intensive training. Less than 4% of applicants completed this program. Cohort A Valedictorian.",
          image: `/content/certificates/10_academy/images/${main}`,
          extraImages: [detail, valedictorian]
            .filter(Boolean)
            .map((f) => `/content/certificates/10_academy/images/${f}`),
          links: [],
        });
      }
      continue;
    }

    if (cat.id === "coursera") {
      for (const sub of fs.readdirSync(catPath)) {
        const subPath = path.join(catPath, sub);
        if (!fs.statSync(subPath).isDirectory()) continue;
        const images = listImages(subPath);
        const cover = pickCover(images);
        const { content } = readMarkdown(path.join(subPath, "info.md"));
        out.push({
          slug: slugify(`coursera-${sub}`),
          title: sub,
          category: cat.id,
          categoryLabel: cat.label,
          issuer: sub.toLowerCase().includes("large language") ? "Google Cloud" : "IBM",
          description: extractFirstParagraph(content),
          image: cover ? `/content/certificates/coursera/${encodeURIComponent(sub)}/${cover}` : null,
          extraImages: [],
          links: extractLinksAsList(content),
        });
      }
      continue;
    }
  }

  const order: Record<Certificate["category"], number> = {
    "10-academy": 0,
    competitive: 1,
    coursera: 2,
    udemy: 3,
  };
  return out.sort((a, b) => order[a.category] - order[b.category]);
}
