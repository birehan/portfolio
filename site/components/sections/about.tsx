import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

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
          <div className="prose-content mt-6">
            <p>
              I&apos;m {site.name.split(" ")[0]}, an AI software engineer. I build production
              systems where AI is wired into the product: services and APIs, data
              pipelines, and LLM-backed features people use every week. At The COOL Company
              in New York that was intelligent pricing and revenue tooling inside programmatic
              ads. At Adludio in London before that it was pacing and creative workflows,
              plus an LLM-assisted pipeline that cut concept iteration time about in half.
              The through-line is software that stays reliable when intelligence sits in the
              critical path.
            </p>
            <p>
              I lead with engineering discipline, then sweat the AI details: contracts,
              evaluation, rollout, and the boring glue so teams trust what ships. That sits
              on a Software Engineering degree with an AI stream, 1,000+ competitive
              problems through A2SV, and valedictorian at 10 Academy Cohort A. Same bar
              everywhere: ship AI software that still makes sense after launch, not only in
              a demo.
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
      </div>
    </section>
  );
}
