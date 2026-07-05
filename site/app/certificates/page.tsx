import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllCertificates } from "@/lib/content";
import { CertificateGrid } from "@/components/certificate-grid";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Certificates & Awards — ML, LLMs, Competitive Programming",
  description:
    "Machine learning, LLM, and data-engineering certificates plus competitive-programming awards: 10 Academy (Distinction, Cohort A Valedictorian), A2SV, EtCPC, Coursera (IBM, Google Cloud), and Udemy.",
  alternates: { canonical: canonical("/certificates") },
};

const sectionMeta: Record<
  string,
  { title: string; subtitle: string }
> = {
  "10-academy": {
    title: "10 Academy",
    subtitle:
      "6-month intensive ML / Generative AI / Data Engineering / Web3 program, completed with Distinction as Cohort A Valedictorian.",
  },
  competitive: {
    title: "Competitive Programming",
    subtitle: "Awards from A2SV (Africa to Silicon Valley) and the EtCPC collegiate programming contest.",
  },
  coursera: {
    title: "Coursera",
    subtitle: "Specializations focused on machine learning, exploratory data analysis, and large language models.",
  },
  udemy: {
    title: "Udemy",
    subtitle: "Web development bootcamp covering full-stack JavaScript and modern web technologies.",
  },
};

export default function CertificatesPage() {
  const certs = getAllCertificates();
  const grouped = certs.reduce<Record<string, typeof certs>>((acc, c) => {
    (acc[c.category] ??= []).push(c);
    return acc;
  }, {});

  const order = ["10-academy", "competitive", "coursera", "udemy"] as const;

  return (
    <div className="container-x py-12 md:py-16 pb-20">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-mono text-[var(--muted)] hover:text-[var(--accent)] mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <header className="max-w-3xl mb-12">
        <p className="eyebrow">Certificates & Awards</p>
        <h1 className="h1 mb-5">
          The <span className="text-[var(--accent)]">paper trail</span>.
        </h1>
        <p className="lead text-lg">
          Awards from competitive programming, intensive engineering programs, and online
          coursework. Click any image to view the full certificate.
        </p>
      </header>

      <div className="space-y-16">
        {order.map((cat) => {
          const list = grouped[cat];
          if (!list || list.length === 0) return null;
          const meta = sectionMeta[cat];
          return (
            <section key={cat} id={cat}>
              <div className="mb-6">
                <h2 className="h2 text-2xl md:text-3xl">{meta.title}</h2>
                <p className="lead mt-2 text-base">{meta.subtitle}</p>
              </div>
              <CertificateGrid certificates={list} />
            </section>
          );
        })}
      </div>
    </div>
  );
}
