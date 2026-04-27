import Link from "next/link";
import { Trophy, GraduationCap, ExternalLink, Award } from "lucide-react";
import { achievements, education } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Achievements() {
  return (
    <section id="achievements" className="section bg-[var(--surface)] border-y border-[var(--border)]">
      <div className="container-x">
        <div className="mb-12 max-w-3xl">
          <p className="eyebrow">05: Achievements & education</p>
          <h2 className="h2">
            Recognition and <span className="text-[var(--accent)]">academic record</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <h3 className="font-semibold tracking-tight mb-5 inline-flex items-center gap-2">
              <Trophy className="h-4 w-4 text-[var(--accent)]" />
              Awards & honors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievements.map((a) => (
                <Card key={a.title} className="p-5 hover:border-[var(--accent)] transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <Award className="h-4 w-4 text-[var(--accent)] shrink-0 mt-1" />
                    {a.year && (
                      <span className="font-mono text-xs text-[var(--muted)]">{a.year}</span>
                    )}
                  </div>
                  <h4 className="font-semibold text-sm tracking-tight mb-2">{a.title}</h4>
                  {a.detail && (
                    <p className="text-xs text-[var(--muted)] leading-relaxed">{a.detail}</p>
                  )}
                  {a.link && (
                    <a
                      href={a.link}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1 mt-3 text-xs font-mono text-[var(--accent)] hover:text-[var(--accent-hover)]"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View
                    </a>
                  )}
                </Card>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/certificates/">
                <Button variant="secondary" size="md">
                  See all certificates
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold tracking-tight mb-5 inline-flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-[var(--accent)]" />
              Education
            </h3>
            <div className="space-y-4">
              {education.map((e) => (
                <Card key={e.institution} className="p-5">
                  <p className="font-mono text-xs text-[var(--muted)] mb-1">
                    {e.start} to {e.end}
                  </p>
                  <h4 className="font-semibold text-sm tracking-tight mb-1">{e.institution}</h4>
                  <p className="text-xs text-[var(--accent)] mb-2">{e.degree}</p>
                  {e.detail && (
                    <p className="text-xs text-[var(--muted)] leading-relaxed">{e.detail}</p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
