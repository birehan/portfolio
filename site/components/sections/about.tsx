import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function AboutBio() {
  return (
    <div className="prose-content">
      <p>
        I&apos;m {site.name.split(" ")[0]}, a full-stack AI engineer with 4+ years of
        experience building production products where AI is wired in end-to-end:
        Next.js frontends, async FastAPI backends, and the RAG pipelines and LLM
        agents behind them. I shipped Al-Shalawi, a bilingual Arabic/English legal
        platform, from database and API through the RTL UI and a RAG drafting
        assistant. Before that I built pricing and revenue tooling at The COOL
        Company, and an LLM pipeline at Adludio that cut concept iteration time
        roughly in half.
      </p>
      <p>
        I own the whole slice: frontend, backend, model, and the evaluation glue
        that makes teams trust what ships. That sits on a Software Engineering
        degree (AI stream), 1,000+ competitive problems through A2SV, and
        valedictorian at 10 Academy Cohort A.
      </p>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">06: About</p>
          <h2 className="h2">
            Engineer first,{" "}
            <span className="text-[var(--accent)]">AI second.</span>
          </h2>
          <div className="mt-6">
            <AboutBio />
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
      </div>
    </section>
  );
}
