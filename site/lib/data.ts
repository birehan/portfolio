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
    role: "AI/ML Engineer",
    location: "New York, USA (Remote)",
    start: "May 2025",
    end: "Present",
    current: true,
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
      "7% revenue increase from an AI floor-price prediction system (LightGBM) that optimizes pricing per ad request for DSPs.",
      "86%+ accuracy on a client revenue-forecasting system built from scraped domain data, PageSpeed and WHOIS signals, historical performance, and LLM-generated features.",
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
      "~16% KPI lift from an automated pacing algorithm that pairs predictive modeling with real-time bid adjustments.",
      "~10% engagement lift and ~5% CTR/CPA improvement from a creative scoring system (historical performance + LLMs) that ranks variants before spend.",
      "Cut creative ideation time roughly in half with an LLM pipeline that generates on-brand ad concepts.",
      "~15% conversion lift and ~10% margin lift from an inventory scoring model (DCN v2 + learning-to-rank) that tunes bids across publishers, formats, and devices.",
    ],
  },
  {
    company: "Eskalate S.C.",
    role: "AI Software Engineer · Team Lead",
    location: "Addis Ababa, Ethiopia",
    start: "Mar 2022",
    end: "Apr 2024",
    track: "full-time",
    stack: ["Llama 3", "AI Agents", "Python", "Next.js"],
    bullets: [
      "Led a cross-functional team of 18 to launch HakimHub, a first-of-its-kind AI-powered medical recommendation platform, coordinating planning and delivery through Jira.",
      "Fine-tuned a Llama 3-based chatbot using AI agents for personalized symptom assessments and follow-ups, integrated with tooling to query doctors and hospitals.",
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
      "RAG & Agentic RAG (LangChain)",
      "AI Agents & Function Calling",
      "Fine-tuning (Llama 2/3, BERT)",
      "Structured outputs (Pydantic / JSON schema)",
      "Eval harnesses · LLM-as-judge · regression tests",
      "Prompt Engineering",
      "LightGBM · PyTorch · scikit-learn",
      "AI-native dev (Cursor, Claude Code)",
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
    title: "Frontend / Full-Stack",
    primary: true,
    items: [
      "Next.js 15 (App Router)",
      "React 19",
      "TypeScript 5",
      "Tailwind CSS",
      "Ant Design · Zustand",
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
    title: "Contract Advisor RAG: building a high-precision legal expert LLM app",
    excerpt:
      "How I pushed a contract Q&A RAG system to 87% relevance with semantic chunking, hybrid retrieval, and a real evaluation loop instead of vibes.",
    date: "2024-02-01",
    url: "https://medium.com/@birehanzewdie4/contract-advisor-rag-towards-building-a-high-precision-legal-expert-llm-app-560c4776370c",
    tags: ["RAG", "LLMs", "Evaluation"],
  },
  {
    title: "Fine-tuning Llama 2 for Amharic embeddings and text generation",
    excerpt:
      "Enabling quality embeddings and generation for a low-resource language, then wiring the model into a RAG-based Amharic ad-copy builder.",
    date: "2024-05-01",
    url: "https://medium.com/@birehanzewdie4/llm-finetuning-enabling-quality-embedding-and-text-generation-for-amharic-language-643d55c90d33",
    tags: ["Fine-tuning", "LLMs", "Amharic"],
  },
  {
    title: "Automated storyboard synthesis for digital advertising",
    excerpt:
      "Combining EDA on creative assets, YOLO object detection, and image generation to cut storyboard production from a week to a few hours.",
    date: "2024-02-15",
    url: "https://medium.com/@birehanzewdie4/automated-storyboard-synthesis-for-digital-advertising-78828a34d085",
    tags: ["Computer Vision", "Generative AI", "Ad-Tech"],
  },
  {
    title: "Revolutionizing data analysis with a Redash chatbot add-on",
    excerpt:
      "An agentic RAG add-on that turns natural-language questions into SQL against existing Redash dashboards, so users chat with their data.",
    date: "2024-01-01",
    url: "https://medium.com/@birehanzewdie4/revolutionizing-data-analysis-with-redash-chatbot-add-on-5f0e63187343",
    tags: ["Agentic RAG", "LLMs", "Analytics"],
  },
];
