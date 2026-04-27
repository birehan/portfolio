export type Experience = {
  company: string;
  role: string;
  location?: string;
  start: string;
  end: string;
  current?: boolean;
  track?: "full-time" | "freelance";
  bullets: string[];
  stack?: string[];
};

export const experience: Experience[] = [
  {
    company: "The COOL Company",
    role: "Machine Learning Engineer",
    location: "New York, USA (Remote)",
    start: "May 2025",
    end: "Jan 2026",
    track: "full-time",
    stack: [
      "Python",
      "LightGBM",
      "LLMs",
      "AI Integration",
      "Feature Engineering",
      "DSP / Programmatic Ads",
      "Web Scraping & Signals",
      "Model Deployment",
    ],
    bullets: [
      "Built a data-driven AI floor-price prediction system using LightGBM to dynamically optimize pricing per ad request for DSPs, resulting in a 7% increase in revenue.",
      "Built a client revenue-forecasting system that predicts daily revenue using scraped domain data, Google PageSpeed metrics, WHOIS information, historical performance data, and LLM-generated features, achieving 86%+ prediction accuracy.",
    ],
  },
  {
    company: "Adludio",
    role: "Machine Learning Engineer",
    location: "London, UK (Remote)",
    start: "May 2024",
    end: "May 2025",
    track: "full-time",
    stack: ["Python", "PyTorch", "DCN v2", "LTR", "LLMs"],
    bullets: [
      "Improved campaign ROI with an automated pacing algorithm (predictive modeling + real-time bid adjustments), with ~16% KPI lift.",
      "Shipped a creative scoring system (history + LLMs) to rank creative variants, with ~10% engagement lift and ~5% CTR/CPA improvement.",
      "Shipped an LLM pipeline for on-brand ad concepts aligned to campaign goals and cut creative ideation time by about half.",
      "Shipped inventory scoring (DCN v2 + LTR) to tune bids across publishers, formats, and devices, with ~15% conversion lift and ~10% margin lift.",
    ],
  },
  {
    company: "Eskalate S.C.",
    role: "AI Software Developer · Team Lead",
    location: "Remote",
    start: "Mar 2023",
    end: "Apr 2024",
    track: "full-time",
    stack: ["Llama 3", "AI Agents", "Python", "Next.js"],
    bullets: [
      "Led a cross-functional team to launch HakimHub, a first-of-its-kind AI-powered medical recommendation platform, using Jira for structured planning, task tracking, and coordination through delivery.",
      "Fine-tuned a Llama 3-based chatbot using AI agents for personalized symptom assessments and follow-ups, integrated with tooling to query doctors and hospitals.",
    ],
  },
  {
    company: "AiQEM Tech",
    role: "Software Engineer",
    location: "Remote",
    start: "Jul 2023",
    end: "Sep 2023",
    track: "full-time",
    stack: ["React", "JavaScript", "Dashboards"],
    bullets: [
      "Built a React dashboard for advertisers to visualize campaign performance, including engagement, trends, and key metrics over time.",
      "Partnered with product and stakeholders to gather requirements and tighten dashboard usability.",
    ],
  },
];

export type SkillGroup = {
  title: string;
  primary?: boolean;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "AI / ML Engineering",
    primary: true,
    items: [
      "LLMs (OpenAI, Claude, Gemini)",
      "Retrieval-Augmented Generation (RAG)",
      "Fine-tuning (Llama 2/3, BERT)",
      "AI Agents & Function Calling",
      "Prompt Engineering & Evals",
      "LightGBM · PyTorch · scikit-learn",
    ],
  },
  {
    title: "Backend",
    primary: true,
    items: [
      "Python 3.12",
      "FastAPI",
      "SQLAlchemy 2 (async)",
      "PostgreSQL + pgvector",
      "Alembic migrations",
      "Event-driven systems (Pub/Sub)",
      "REST · OAuth · JWT",
    ],
  },
  {
    title: "Cloud · DevOps",
    primary: true,
    items: [
      "Google Cloud Run",
      "GCP Pub/Sub · Cloud Storage · Secret Manager",
      "AWS Lambda · SageMaker",
      "Docker · Docker Compose",
      "GitHub Actions · Cloud Build CI/CD",
      "OpenTelemetry · Sentry",
    ],
  },
  {
    title: "Frontend",
    items: [
      "Next.js 15 (App Router)",
      "React 19",
      "TypeScript 5",
      "Tailwind CSS",
    ],
  },
  {
    title: "Automation · Integrations",
    items: [
      "n8n self-hosted workflows",
      "Vapi (voice AI) + Twilio",
      "WhatsApp Business Cloud API",
      "Telegram Bot API",
    ],
  },
];

export type Service = {
  title: string;
  description: string;
  deliverables: string[];
  timeline: string;
};

export const services: Service[] = [
  {
    title: "AI Backend Engineering",
    description:
      "Production FastAPI / Python backends for AI products with clean architecture, async DB, auth, observability, and cloud deploy.",
    deliverables: [
      "FastAPI service with async SQLAlchemy + PostgreSQL",
      "Auth (JWT / OAuth / OTP), RBAC, encryption",
      "Cloud Run / Docker deploy + CI/CD",
      "OpenTelemetry / Sentry / structured logs",
    ],
    timeline: "2-6 weeks",
  },
  {
    title: "RAG · LLM Product Build",
    description:
      "End-to-end LLM features: prompt design, RAG pipelines with pgvector, multi-provider routing, structured outputs, and feedback loops.",
    deliverables: [
      "pgvector / Pinecone retrieval with proper similarity floors",
      "Multi-provider LLM gateway (OpenAI / Claude / Gemini)",
      "Structured outputs (Pydantic / JSON schema) + retries",
      "Eval harness + human-in-the-loop pattern",
    ],
    timeline: "3-8 weeks",
  },
  {
    title: "Automation · Agents (n8n, voice, chat)",
    description:
      "Self-hosted n8n pipelines, AI voice receptionists, WhatsApp / Messenger bots, and lead-capture flows, wired into your stack.",
    deliverables: [
      "n8n workflows (self-hosted Docker stack)",
      "Vapi + Twilio voice agents",
      "WhatsApp Cloud API / Messenger bot with signed webhooks",
      "Eval framework with regression tests",
    ],
    timeline: "1-4 weeks",
  },
];

export type Achievement = {
  title: string;
  detail?: string;
  year?: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    title: "10 Academy Cohort A, Valedictorian (with Distinction)",
    detail:
      "Top of leaderboard in a 6-month intensive Machine Learning, Generative AI, Data Engineering, and Web3 program. Less than 4% of applicants completed.",
    year: "2024",
  },
  {
    title: "2nd Place, A2SV Champions League",
    detail:
      "Competed against 500+ students; champions-league format with 32 finalists.",
    year: "2023",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7131236120503177216/",
  },
  {
    title: "3rd Place, Collegiate Programming Contest (EtCPC)",
    detail: "Out of 80+ teams from universities across the region.",
    year: "2023",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7112032415274926080/",
  },
  {
    title: "Top Problem Solver, A2SV G4 Camp II",
    detail: "Solved every camp coding challenge; 1st place top problem-solver certificate.",
    year: "2023",
  },
  {
    title: "Winner, DevFest 2022 Hackathon",
    detail: "Hosted by Google Developers Group.",
    year: "2022",
  },
];

export type Education = {
  institution: string;
  degree: string;
  location?: string;
  start: string;
  end: string;
  detail?: string;
};

export const education: Education[] = [
  {
    institution: "AAU",
    degree: "BSc in Software Engineering (AI Stream)",
    start: "Oct 2019",
    end: "Jun 2024",
    detail: "OOP, Databases, Software Development, Machine Learning, NLP, Reinforcement Learning.",
  },
  {
    institution: "10 Academy",
    degree: "Data Science · ML · Generative AI · Web3 (Distinction, Valedictorian)",
    location: "Santa Clara, USA (Remote)",
    start: "Dec 2023",
    end: "May 2024",
  },
  {
    institution: "A2SV (Africa to Silicon Valley)",
    degree: "Software Engineering Program (backed by Google)",
    location: "Palo Alto, USA (Remote)",
    start: "Sep 2022",
    end: "Sep 2023",
    detail: "Solved 1,000+ algorithm problems (850+ LeetCode, 200+ Codeforces).",
  },
];

export type Article = {
  title: string;
  excerpt: string;
  date: string;
  url: string;
  tags?: string[];
};

export const articles: Article[] = [
  {
    title: "Retrieval-Augmented Generation in production: lessons from shipping",
    excerpt:
      "Placeholder: replace with a real Medium article. What worked, what didn't, and the boring ops work that actually matters.",
    date: "2025-01-01",
    url: "https://medium.com/@birehanzewdie4",
    tags: ["RAG", "LLMs", "FastAPI"],
  },
  {
    title: "Fine-tuning Llama 2 for low-resource languages",
    excerpt:
      "Placeholder: replace with a real Medium article. Data prep, LoRA config, evaluation, and what the numbers actually mean.",
    date: "2024-06-01",
    url: "https://medium.com/@birehanzewdie4",
    tags: ["Fine-tuning", "LLMs", "Amharic"],
  },
  {
    title: "Building an LLM gateway: multi-provider routing and retries",
    excerpt:
      "Placeholder: replace with a real Medium article about routing between OpenAI / Claude / Gemini with structured outputs.",
    date: "2024-10-01",
    url: "https://medium.com/@birehanzewdie4",
    tags: ["LLMs", "Architecture"],
  },
];
