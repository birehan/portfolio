import { trustLogos } from "@/lib/data";

export function TrustStrip() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface)]">
      <div className="container-x py-8">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-5 text-center">
          Trusted by teams I&apos;ve built with
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-12">
          {trustLogos.map((l) => (
            <span
              key={l.short}
              className="text-sm md:text-base font-semibold tracking-tight text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              {l.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
