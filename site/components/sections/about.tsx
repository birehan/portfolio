import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { site } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-3">
            <p className="eyebrow">07 — About</p>
            <h2 className="h2">
              Engineer first, <span className="text-[var(--accent)]">AI second.</span>
            </h2>
            <div className="prose-content mt-6">
              <p>
                I&apos;m {site.name.split(" ")[0]} — an AI/ML engineer with a BSc in
                Software Engineering (AI Stream) from <strong>Addis Ababa University</strong>.
                My foundation comes from <strong>A2SV</strong>, the Google-backed
                African software fellowship, where I solved 1,000+ algorithm problems
                across LeetCode and Codeforces.
              </p>
              <p>
                I was the <strong>valedictorian of 10 Academy Cohort A</strong>, completing
                a 6-month intensive program in machine learning, generative AI, data
                engineering, and Web3 — top of the leaderboard out of a class where less
                than 4% of applicants finish.
              </p>
              <p>
                Today I&apos;m a <strong>Machine Learning Engineer at The COOL Company</strong>{" "}
                (NY), building revenue-forecasting and floor-price prediction systems for
                programmatic ad-tech. Previously I shipped predictive systems at{" "}
                <strong>Adludio</strong> in London. Alongside that, I run an active{" "}
                <strong>Top-Rated Upwork practice</strong>, building production AI backends
                and LLM agents for clients across the US, EU, MENA, and Africa.
              </p>
              <p>
                What drives me: turning AI from a research demo into something a real
                team uses on Monday morning — with the observability, security, and
                operational posture to keep it running.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/#contact">
                <Button size="md">
                  Get in touch
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="/resume.pdf" target="_blank" rel="noopener">
                <Button variant="secondary" size="md">View resume</Button>
              </a>
            </div>
          </div>

          <aside className="lg:col-span-2 lg:sticky lg:top-24">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="font-semibold mb-5 text-sm tracking-tight uppercase font-mono text-[var(--muted)]">
                Quick facts
              </h3>
              <dl className="space-y-4 text-sm">
                <Row label="Currently" value="ML Engineer @ The COOL Company (NY)" />
                <Row label="Based in" value={`${site.location} · ${site.timezone}`} />
                <Row label="Languages" value="English (full professional), Amharic (native)" />
                <Row label="Working since" value="2022" />
                <Row
                  label="Strengths"
                  value={
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      <Badge variant="outline">RAG / LLM systems</Badge>
                      <Badge variant="outline">Backend AI platforms</Badge>
                      <Badge variant="outline">FastAPI · async Python</Badge>
                      <Badge variant="outline">Algorithms (1000+ solved)</Badge>
                    </div>
                  }
                />
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] mb-1">
        {label}
      </dt>
      <dd className="text-[var(--text)] leading-relaxed">{value}</dd>
    </div>
  );
}
