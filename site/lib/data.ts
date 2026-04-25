export type Experience = {
  company: string;
  role: string;
  location?: string;
  start: string;
  end: string;
  current?: boolean;
  bullets: string[];
  stack?: string[];
};

export const experience: Experience[] = [
  {
    company: "The COOL Company",
    role: "Machine Learning Engineer",
    location: "New York, USA (Remote)",
    start: "May 2025",
    end: "Present",
    current: true,
    stack: ["Python", "LightGBM", "LLMs", "Feature Engineering"],
    bullets: [
      "Built a client revenue-forecasting system that predicts daily revenue from scraped domain data, Google PageSpeed metrics, WHOIS info, historical performance, and LLM-generated features — 86%+ accuracy.",
      "Developed a LightGBM floor-price prediction model for an SSP, setting optimal floor prices per ad request and delivering a 7% revenue lift.",
    ],
  },
  {
    company: "Adludio",
    role: "Machine Learning Engineer",
    location: "London, UK (Remote)",
    start: "May 2024",
    end: "May 2025",
    stack: ["Python", "PyTorch", "DCN v2", "LTR", "LLMs"],
    bullets: [
      "Optimized campaign ROI with an automated pacing algorithm using predictive modeling and real-time bid adjustments — 16% KPI improvement.",
      "Built a creative scoring system using historical data and LLMs to evaluate creative variations — 10% lift in engagement, 5% better CTR/CPA.",
      "Created an LLM-driven pipeline that generates on-brand ad concepts aligned with campaign objectives — cut ideation time by 50%.",
      "Built an inventory scoring system using DCN v2 and LTR to optimize bid adjustments — 15% conversion uplift, 10% higher profit margins.",
    ],
  },
  {
    company: "Eskalate S.C.",
    role: "AI Software Developer · Team Lead",
    location: "Addis Ababa, Ethiopia",
    start: "Mar 2023",
    end: "Apr 2024",
    stack: ["Llama 3", "AI Agents", "Python", "Next.js"],
    bullets: [
      "Led a team of 18 to launch HakimHub, Ethiopia's first AI-driven medical recommendation platform.",
      "Fine-tuned a Llama 3-based chatbot using AI agents for personalized symptom assessments, integrated with a doctors and hospitals database.",
    ],
  },
  {
    company: "Upwork",
    role: "Backend AI Engineer · AI Agent Developer",
    location: "Remote",
    start: "Aug 2024",
    end: "Present",
    current: true,
    stack: ["FastAPI", "Next.js", "RAG", "LLMs", "GCP"],
    bullets: [
      "Top Rated freelancer — delivered for 10+ clients, 1,000+ hours, $10K+ earned.",
      "Shipped production systems including the AI Underwriter backend for a real-estate lending platform (malamafunding.com).",
    ],
  },
  {
    company: "AiQEM Tech",
    role: "Software Engineer",
    location: "Addis Ababa, Ethiopia",
    start: "Jul 2023",
    end: "Sep 2023",
    stack: ["React", "JavaScript"],
    bullets: [
      "Designed and built a React-based dashboard for campaign statistics — engagement rates, trends over time, key advertiser metrics.",
    ],
  },
];

export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "AI / ML Engineering",
    items: [
      "LLMs (OpenAI, Claude, Gemini, Groq)",
      "Retrieval-Augmented Generation (RAG)",
      "Fine-tuning (Llama 2/3, BERT, RoBERTa)",
      "Prompt Engineering",
      "AI Agents & Function Calling",
      "MLOps (MLflow, FLAML)",
      "LightGBM, scikit-learn, PyTorch",
    ],
  },
  {
    title: "Backend",
    items: [
      "Python 3.12",
      "FastAPI",
      "SQLAlchemy 2 (async)",
      "PostgreSQL + pgvector",
      "Alembic migrations",
      "Pub/Sub & event-driven systems",
      "REST APIs · OAuth · JWT",
    ],
  },
  {
    title: "Frontend",
    items: [
      "Next.js 15 (App Router)",
      "React 19",
      "TypeScript 5",
      "Tailwind CSS",
      "Ant Design / shadcn",
    ],
  },
  {
    title: "Cloud · DevOps",
    items: [
      "Google Cloud Run",
      "GCP Pub/Sub · Cloud Storage · Secret Manager",
      "AWS Lambda · SageMaker",
      "Docker · Docker Compose",
      "Cloud Build · GitHub Actions CI/CD",
      "OpenTelemetry · Sentry · Logfire",
    ],
  },
  {
    title: "Automation · Integrations",
    items: [
      "n8n self-hosted workflows",
      "Vapi (voice AI) + Twilio",
      "WhatsApp Business Cloud API",
      "Meta Messenger API",
      "Firecrawl · SearXNG",
      "Telegram Bot API",
      "Google Sheets / Drive APIs",
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
      "Production FastAPI / Python backends for AI products — from clean architecture to async DB, auth, observability, and cloud deploy.",
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
      "Multi-provider LLM gateway (OpenAI / Claude / Gemini / Groq)",
      "Structured outputs (Pydantic / JSON schema) + retries",
      "Eval harness + human-in-the-loop pattern",
    ],
    timeline: "3-8 weeks",
  },
  {
    title: "Automation · Agents (n8n, voice, chat)",
    description:
      "Self-hosted n8n pipelines, AI voice receptionists, WhatsApp / Messenger bots, and lead-capture flows — wired into your stack.",
    deliverables: [
      "n8n workflows (self-hosted Docker stack)",
      "Vapi + Twilio voice agents",
      "WhatsApp Cloud API / Messenger bot with signed webhooks",
      "Quality-gate eval framework with regression tests",
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
    title: "10 Academy Valedictorian — Cohort A",
    detail:
      "Top of leaderboard in 6-month intensive ML / Generative AI / Data Engineering / Web3 program (less than 4% of applicants completed).",
    year: "2024",
  },
  {
    title: "10 Academy — with Distinction",
    detail: "Machine Learning, Generative AI, Data Engineering & Web3 Engineering Training.",
    year: "2024",
  },
  {
    title: "2nd Place — A2SV Champions League",
    detail: "$600 prize. Competed against 500+ students; champions-league format with 32 finalists.",
    year: "2023",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7131236120503177216/",
  },
  {
    title: "3rd Place — Ethiopian Collegiate Programming Contest (EtCPC)",
    detail: "Out of 80+ teams from universities across Ethiopia.",
    year: "2023",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7112032415274926080/",
  },
  {
    title: "Top Problem Solver — A2SV G4 Camp II",
    detail: "Solved every camp coding challenge; 1st place top problem solver certificate.",
    year: "2023",
  },
  {
    title: "Winner — DevFest 2022 Hackathon",
    detail: "Hosted by Google Developers Group, Addis Ababa.",
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
    institution: "Addis Ababa University",
    degree: "BSc in Software Engineering — AI Stream",
    location: "Addis Ababa, Ethiopia",
    start: "Oct 2019",
    end: "Jun 2024",
    detail: "OOP, Databases, Software Development, Machine Learning, NLP, Reinforcement Learning.",
  },
  {
    institution: "10 Academy",
    degree: "Data Science · ML · Generative AI · Web3 (with Distinction, Valedictorian)",
    location: "Santa Clara, USA (Remote)",
    start: "Dec 2023",
    end: "May 2024",
  },
  {
    institution: "A2SV — Africa to Silicon Valley",
    degree: "Software Engineering Program (backed by Google)",
    location: "Palo Alto, USA (Remote)",
    start: "Sep 2022",
    end: "Sep 2023",
    detail: "Solved 1,000+ algorithm problems (850+ LeetCode, 200+ Codeforces).",
  },
];

export type TrustLogo = {
  name: string;
  short: string;
};

export const trustLogos: TrustLogo[] = [
  { name: "The COOL Company", short: "COOL" },
  { name: "Adludio", short: "Adludio" },
  { name: "Eskalate", short: "Eskalate" },
  { name: "Malama Funding", short: "Malama" },
  { name: "Al-Shalawi Law", short: "Al-Shalawi" },
  { name: "SkillBridge", short: "SkillBridge" },
  { name: "10 Academy", short: "10 Academy" },
  { name: "A2SV", short: "A2SV" },
];
