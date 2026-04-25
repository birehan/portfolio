import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `Download or view the latest resume of ${site.name}, ${site.role}.`,
};

export default function ResumePage() {
  return (
    <div className="container-x py-12 md:py-16 pb-20">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-mono text-[var(--muted)] hover:text-[var(--accent)] mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <header className="max-w-3xl mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Resume</p>
          <h1 className="h1 mb-4">
            {site.name}&apos;s <span className="text-[var(--accent)]">CV</span>
          </h1>
          <p className="lead text-lg">
            One-page resume kept up to date for {site.role.toLowerCase()} roles —
            both contract and full-time.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href="/resume.pdf" download="Birehan-Anteneh-Resume.pdf">
            <Button size="md">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener">
            <Button variant="secondary" size="md">
              <ExternalLink className="h-4 w-4" />
              Open in new tab
            </Button>
          </a>
        </div>
      </header>

      <div className="rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface-2)]">
        <object
          data="/resume.pdf"
          type="application/pdf"
          className="w-full h-[80vh] min-h-[600px]"
          aria-label="Embedded resume PDF"
        >
          <div className="p-8 text-center">
            <p className="text-sm text-[var(--muted)] mb-3">
              Your browser can&apos;t embed PDFs.
            </p>
            <a href="/resume.pdf" target="_blank" rel="noopener">
              <Button>
                <ExternalLink className="h-4 w-4" />
                Open resume
              </Button>
            </a>
          </div>
        </object>
      </div>
    </div>
  );
}
