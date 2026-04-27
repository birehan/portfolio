import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 70%)",
        }}
      />
      <div className="container-x pt-24 pb-10 md:pt-32 md:pb-12">
        <h1 className="h1-hero mb-8">
          Building <span className="text-[var(--accent)]">production AI systems</span>
          <br />
          for real users.
        </h1>

        <a href="/resume.pdf" target="_blank" rel="noopener">
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
            <Download className="h-4 w-4" />
            Download resume
          </Button>
        </a>
      </div>
    </section>
  );
}
