export const site = {
  name: "Birehan Zewdie",
  initials: "BZ",
  role: "Full-Stack AI Engineer",
  tagline:
    "I build and ship production AI products end-to-end: RAG and LLM agents on async FastAPI backends, Next.js frontends, and the cloud infra behind them.",
  longDescription:
    "Full-Stack AI Engineer shipping production LLM and ML products end-to-end, from Next.js frontends and async FastAPI backends to retrieval pipelines, agent workflows, and the cloud infrastructure that keeps them running.",
  email: "birehananteneh4@gmail.com",
  /** E.164; used for display and wa.me links */
  whatsapp: "+251982070195",
  url: "https://birehan.me",
  /** Professional headshot, served from site/public */
  image: "/birehan-zewdie.jpg",
  location: {
    city: "Addis Ababa",
    region: "Addis Ababa",
    country: "Ethiopia",
    countryCode: "ET",
  },
  bookingUrl: "",
  plausibleDomain: "birehan.me",
  social: {
    github: "https://github.com/birehan",
    linkedin: "https://linkedin.com/in/birehan",
    upwork: "https://www.upwork.com/freelancers/birehanzewdie",
    medium: "https://medium.com/@birehanzewdie4",
    twitter: "",
  },
  availability: {
    open: true,
    text: "Open to full-time remote Full-Stack AI / AI Software Engineer roles.",
  },
} as const;

export type Site = typeof site;

export function getWhatsAppHref(): string {
  return `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`;
}

/** Absolute canonical URL for a given path (leading slash, keeps trailing slash convention). */
export function canonical(path = "/"): string {
  const base = site.url.replace(/\/$/, "");
  if (path === "/" || path === "") return `${base}/`;
  const clean = `/${path.replace(/^\/+/, "").replace(/\/+$/, "")}/`;
  return `${base}${clean}`;
}
