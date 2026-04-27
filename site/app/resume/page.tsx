import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { site, getWhatsAppHref } from "@/lib/site";
import {
  experience,
  education,
  skillGroups,
  achievements,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${site.name}, ${site.role}. Full experience, education, skills, and achievements.`,
};

export default function ResumePage() {
  return (
    <div className="container-x py-12 md:py-16 pb-20">
      <div className="print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-mono text-[var(--muted)] hover:text-[var(--accent)] mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>

      <header className="max-w-3xl mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 print:hidden">
        <div>
          <p className="eyebrow">Resume</p>
          <h1 className="h1 mb-4">
            {site.name}&apos;s <span className="text-[var(--accent)]">CV</span>
          </h1>
          <p className="lead text-lg">
            Full professional history, skills, and achievements, kept up to date.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href="/resume.pdf" download="Birehan-Zewdie-Resume.pdf">
            <Button size="md">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </a>
        </div>
      </header>

      <article className="resume-doc rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-12 print:border-0 print:bg-white print:p-0 print:shadow-none">
        <ResumeHeader />
        <ResumeSection title="Summary">
          <p className="text-sm leading-relaxed text-[var(--muted)] print:text-black">
            {site.longDescription}
          </p>
        </ResumeSection>

        <ResumeSection title="Experience">
          <div className="space-y-6">
            {experience.map((job) => (
              <div key={`${job.company}-${job.role}`}>
                <div className="flex items-baseline justify-between gap-4 flex-wrap mb-0.5">
                  <h3 className="text-base font-semibold tracking-tight">
                    {job.role}{" "}
                    <span className="text-[var(--accent)] print:text-black">
                      @ {job.company}
                    </span>
                  </h3>
                  <span className="font-mono text-xs text-[var(--muted)] whitespace-nowrap print:text-black">
                    {job.start} to {job.end}
                  </span>
                </div>
                {job.location && (
                  <p className="text-xs font-mono text-[var(--muted)] mb-2 print:text-black">
                    {job.location}
                  </p>
                )}
                <ul className="space-y-1.5 text-sm text-[var(--muted)] leading-relaxed print:text-black">
                  {job.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[var(--accent)] shrink-0 mt-1.5 print:text-black">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                {job.stack && job.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {job.stack.map((s) => (
                      <Badge key={s} variant="subtle" className="print:border print:border-black/30">
                        {s}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="Skills">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h4 className="font-semibold text-sm tracking-tight mb-2">{group.title}</h4>
                <p className="text-sm text-[var(--muted)] leading-relaxed print:text-black">
                  {group.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="Education">
          <div className="space-y-4">
            {education.map((e) => (
              <div key={e.institution}>
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <h4 className="font-semibold text-sm tracking-tight">{e.institution}</h4>
                  <span className="font-mono text-xs text-[var(--muted)] print:text-black">
                    {e.start} to {e.end}
                  </span>
                </div>
                <p className="text-xs text-[var(--accent)] mb-1 print:text-black">{e.degree}</p>
                {e.detail && (
                  <p className="text-xs text-[var(--muted)] leading-relaxed print:text-black">
                    {e.detail}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="Achievements">
          <ul className="space-y-2 text-sm text-[var(--muted)] print:text-black">
            {achievements.map((a) => (
              <li key={a.title} className="flex gap-2">
                <span className="text-[var(--accent)] shrink-0 mt-1.5 print:text-black">›</span>
                <span>
                  <strong className="text-[var(--text)] print:text-black">{a.title}</strong>
                  {a.year && ` (${a.year})`}
                  {a.detail && `, ${a.detail}`}
                </span>
              </li>
            ))}
          </ul>
        </ResumeSection>
      </article>
    </div>
  );
}

function ResumeHeader() {
  return (
    <header className="mb-8 pb-6 border-b border-[var(--border)] print:border-black/30">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
        {site.name}
      </h2>
      <p className="text-sm text-[var(--accent)] font-medium mb-3 print:text-black">
        {site.role}
      </p>
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs font-mono text-[var(--muted)] print:text-black">
        <span className="inline-flex items-center gap-1.5">
          <Mail className="h-3 w-3" /> {site.email}
        </span>
        <a
          href={getWhatsAppHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-[var(--accent)]"
        >
          <MessageCircle className="h-3 w-3" /> {site.whatsapp}
        </a>
        <a href={site.social.linkedin} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 hover:text-[var(--accent)]">
          <Linkedin className="h-3 w-3" /> /in/birehan
        </a>
        <a href={site.social.github} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 hover:text-[var(--accent)]">
          <Github className="h-3 w-3" /> @birehan
        </a>
      </div>
    </header>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8 last:mb-0">
      <h3 className="font-mono text-[11px] uppercase tracking-widest text-[var(--accent)] mb-4 pb-2 border-b border-[var(--border)] print:text-black print:border-black/30">
        {title}
      </h3>
      {children}
    </section>
  );
}
