import { experience } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function Experience() {
  return (
    <section id="experience" className="section bg-[var(--surface)] border-y border-[var(--border)]">
      <div className="container-x">
        <div className="mb-12">
          <p className="eyebrow">02 — Experience</p>
          <h2 className="h2">
            Where I&apos;ve <span className="text-[var(--accent)]">shipped impact</span>
          </h2>
          <p className="lead mt-4">
            5+ years building production AI / ML systems for ad-tech, lending, healthcare,
            and education — spanning team-lead, IC engineer, and freelance roles.
          </p>
        </div>

        <ol className="relative border-l border-[var(--border)] pl-6 md:pl-8 space-y-10">
          {experience.map((job) => (
            <li key={`${job.company}-${job.role}`} className="relative">
              <span
                className="absolute -left-[33px] md:-left-[41px] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--bg)] bg-[var(--accent)]"
                aria-hidden
              />
              <div className="flex items-baseline justify-between gap-4 flex-wrap mb-1">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight">
                  {job.role}{" "}
                  <span className="text-[var(--accent)]">@ {job.company}</span>
                </h3>
                <span className="font-mono text-xs text-[var(--muted)] whitespace-nowrap">
                  {job.start} — {job.end}
                </span>
              </div>
              {job.location && (
                <p className="text-xs font-mono text-[var(--muted)] mb-3">{job.location}</p>
              )}
              <ul className="space-y-2 text-sm text-[var(--muted)] leading-relaxed mb-4">
                {job.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[var(--accent)] shrink-0 mt-1.5">›</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {job.stack && job.stack.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {job.stack.map((s) => (
                    <Badge key={s} variant="subtle">
                      {s}
                    </Badge>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
