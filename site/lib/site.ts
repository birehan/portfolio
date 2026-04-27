export const site = {
  name: "Birehan Zewdie",
  initials: "BZ",
  role: "AI Engineer",
  tagline:
    "I build production AI systems: RAG, LLM agents, and the backends behind them.",
  longDescription:
    "AI Engineer designing and shipping production LLM and ML systems end-to-end, from retrieval pipelines and agent workflows to the async Python backends and cloud infrastructure that keep them running.",
  email: "birehananteneh4@gmail.com",
  /** E.164; used for display and wa.me links */
  whatsapp: "+251982070195",
  url: "https://birehan.dev",
  bookingUrl: "",
  plausibleDomain: "birehan.dev",
  social: {
    github: "https://github.com/birehan",
    linkedin: "https://linkedin.com/in/birehan",
    upwork: "https://www.upwork.com/freelancers/birehanzewdie",
    medium: "https://medium.com/@birehanzewdie4",
    twitter: "",
  },
  availability: {
    open: true,
    text: "Open to full-time remote and contract AI / ML engineering roles.",
  },
} as const;

export type Site = typeof site;

export function getWhatsAppHref(): string {
  return `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`;
}
