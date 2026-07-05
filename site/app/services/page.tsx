import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { services } from "@/lib/data";
import { site, canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services — AI Backend, RAG & LLM Builds, Automation",
  description: `Contract engagements with ${site.name}, ${site.role}: production FastAPI/Python AI backends, RAG and LLM product builds with pgvector, and n8n / voice / chatbot automation shipped end-to-end.`,
  alternates: { canonical: canonical("/services") },
};

export default function ServicesPage() {
  return (
    <div className="container-x py-12 md:py-16 pb-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-mono text-[var(--muted)] hover:text-[var(--accent)] mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <header className="max-w-3xl mb-12">
        <p className="eyebrow">Contract work</p>
        <h1 className="h1 mb-5">
          Select <span className="text-[var(--accent)]">contract engagements</span>
        </h1>
        <p className="lead text-lg">
          My focus is full-time AI/ML roles, but I take on a small number of
          contract engagements alongside that work. Each is scoped to ship
          something real into production, not a prototype or a slide deck.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <Card key={s.title} className="p-6 flex flex-col hover:border-[var(--accent)] transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-[var(--muted)]">0{i + 1}</span>
              <Badge variant="accent">{s.timeline}</Badge>
            </div>
            <h3 className="text-lg font-semibold tracking-tight mb-2">{s.title}</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
              {s.description}
            </p>
            <ul className="space-y-2 mb-6 text-sm flex-1">
              {s.deliverables.map((d) => (
                <li key={d} className="flex gap-2">
                  <Check className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span className="text-[var(--text)]">{d}</span>
                </li>
              ))}
            </ul>
            <a href={`mailto:${site.email}?subject=${encodeURIComponent(s.title + " inquiry")}`}>
              <Button variant="secondary" size="md" className="w-full">
                Start a project
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </Card>
        ))}
      </div>

      <section className="mt-16 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10 max-w-3xl">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-3">
          How engagements work
        </h2>
        <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
          I work async-first with solid overlap across EU and US-East hours.
          Projects start with a 30-minute scoping call, a written
          proposal with milestones, and weekly written demos once we kick off.
        </p>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          Most engagements are fixed-scope at a milestone price, with hourly
          billing available for open-ended platform work.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={`mailto:${site.email}?subject=Project%20inquiry`}>
            <Button size="md">
              Email me
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
          <Link href="/#work">
            <Button variant="secondary" size="md">See case studies</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
