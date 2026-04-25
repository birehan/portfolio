import { skillGroups } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-x">
        <div className="mb-12">
          <p className="eyebrow">03 — Skills</p>
          <h2 className="h2">
            What I work with <span className="text-[var(--accent)]">every day</span>
          </h2>
          <p className="lead mt-4">
            The tools I reach for first, organized by where they live in the stack.
            Everything here is something I&apos;ve shipped to production.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group) => (
            <Card key={group.title} className="p-6 hover:border-[var(--accent)] transition-colors">
              <h3 className="font-semibold text-base mb-4 tracking-tight">{group.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Badge key={item} variant="default">
                    {item}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
