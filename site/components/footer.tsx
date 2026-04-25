import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="container-x py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold tracking-tight"
            >
              <span className="grid h-8 w-8 place-items-center rounded-md border border-[var(--border)] bg-[var(--bg)] font-mono text-sm font-bold text-[var(--accent)]">
                {site.initials}
              </span>
              {site.name}
            </Link>
            <p className="mt-3 text-sm text-[var(--muted)] max-w-md">
              {site.role} · {site.location} · {site.timezone}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
              className="grid h-10 w-10 place-items-center rounded-md text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-md text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="grid h-10 w-10 place-items-center rounded-md text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[var(--muted)] font-mono">
          <span>© {year} {site.name}. All rights reserved.</span>
          <span>
            Built with Next.js · Tailwind · shadcn primitives ·
            <Link href="/" className="ml-1 hover:text-[var(--accent)]">birehan.dev</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
