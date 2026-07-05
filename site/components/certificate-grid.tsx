"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import type { Certificate } from "@/lib/content";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function certAlt(c: Certificate): string {
  const issuer = c.issuer ? ` from ${c.issuer}` : "";
  return `${c.title}${issuer} — ${c.categoryLabel} certificate awarded to Birehan Zewdie`;
}

export function CertificateGrid({ certificates }: { certificates: Certificate[] }) {
  const [open, setOpen] = useState<Certificate | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificates.map((c) => (
          <Card
            key={c.slug}
            className="overflow-hidden flex flex-col hover:border-[var(--accent)] transition-colors"
          >
            <button
              type="button"
              onClick={() => c.image && setOpen(c)}
              className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-2)] focus-visible:outline-none group"
              disabled={!c.image}
            >
              {c.image ? (
                <Image
                  src={c.image}
                  alt={certAlt(c)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-3 group-hover:scale-[1.02] transition-transform duration-300"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-[var(--muted)] text-sm">
                  Certificate
                </div>
              )}
            </button>
            <div className="p-5 flex-1 flex flex-col">
              <Badge variant="accent" className="self-start mb-3">
                {c.categoryLabel}
              </Badge>
              <h3 className="font-semibold text-sm tracking-tight mb-2 line-clamp-2">{c.title}</h3>
              {c.issuer && (
                <p className="font-mono text-xs text-[var(--muted)] mb-1">{c.issuer}</p>
              )}
              {c.date && (
                <p className="font-mono text-xs text-[var(--muted)] mb-2">{c.date}</p>
              )}
              {c.description && (
                <p className="text-xs text-[var(--muted)] leading-relaxed mb-3 line-clamp-3 flex-1">
                  {c.description}
                </p>
              )}
              {c.links.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-auto">
                  {c.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1 text-xs font-mono text-[var(--accent)] hover:text-[var(--accent-hover)]"
                    >
                      {l.label}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] grid place-items-center bg-black/85 backdrop-blur p-4"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-md bg-white/10 text-white hover:bg-white/20"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(null);
            }}
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative w-full max-w-5xl max-h-[90vh] aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            {open.image && (
              <Image
                src={open.image}
                alt={certAlt(open)}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
