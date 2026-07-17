export const site = {
  name: "Birehan Zewdie",
  initials: "BZ",
  role: "Full-Stack AI Engineer",
  tagline:
    "I build and ship production AI products end-to-end: RAG and LLM agents, FastAPI backends, and Next.js frontends.",
  longDescription:
    "Full-Stack AI Engineer with 4+ years shipping production LLM and ML products, from frontend to backend to the cloud infra that keeps them running.",
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
