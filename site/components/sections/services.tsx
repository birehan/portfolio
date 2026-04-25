import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { services } from "@/lib/data";

export function Services() {
  return (
    <section id="services" className="section bg-[var(--surface)] border-y border-[var(--border)]">
      <div className="container-x">
        <div className="mb-12 max-w-3xl">
          <p className="eyebrow">04 — Work with me</p>
          <h2 className="h2">
            Three ways I deliver <span className="text-[var(--accent)]">for clients</span>
          </h2>
          <p className="lead mt-4">
            Engagements I take on most often. Each is scoped to ship something real
            into production — not a prototype or a slide deck.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Card key={s.title} className="p-6 flex flex-col hover:border-[var(--accent)] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[var(--muted)]">
                  0{i + 1}
                </span>
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
              <Link href="/#contact">
                <Button variant="secondary" size="md" className="w-full">
                  Start a project
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
