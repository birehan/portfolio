export const site = {
  name: "Birehan Anteneh",
  initials: "BA",
  role: "AI/ML Engineer",
  tagline:
    "AI/ML Engineer building production LLM systems for clients and product teams.",
  longDescription:
    "I design, build, and ship AI products end-to-end — from RAG pipelines and LLM agents to backend platforms and the data systems behind them. Currently ML Engineer at The COOL Company.",
  location: "Addis Ababa, Ethiopia",
  timezone: "GMT+3",
  email: "birehananteneh4@gmail.com",
  url: "https://birehan.dev",
  social: {
    github: "https://github.com/birehan",
    linkedin: "https://linkedin.com/in/birehan",
    upwork: "https://www.upwork.com/freelancers/birehananteneh",
    medium: "https://medium.com/@birehananteneh4",
  },
  trust: [
    { label: "Top Rated · Upwork" },
    { label: "10+ clients shipped" },
    { label: "$10K+ delivered" },
    { label: "1,000+ hours" },
  ],
  availability: {
    open: true,
    text: "Open to contract, freelance, and full-time remote roles.",
  },
} as const;

export type Site = typeof site;
