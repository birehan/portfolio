import { skillGroups } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-x">
        <div className="mb-12">
          <p className="eyebrow">03: Skills</p>
          <h2 className="h2">
            What I work with <span className="text-[var(--accent)]">every day</span>
          </h2>
          <p className="lead mt-4">
            The tools I reach for first, by layer. Primary stack is highlighted, and
            everything here has shipped to production.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group) => (
            <Card
              key={group.title}
              className={cn(
                "p-6 transition-colors hover:border-[var(--accent)]",
                group.primary && "border-[color-mix(in_srgb,var(--accent)_35%,var(--border))]",
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-base tracking-tight">{group.title}</h3>
                {group.primary && (
                  <Badge variant="accent" className="text-[10px] uppercase">Primary</Badge>
                )}
              </div>
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
