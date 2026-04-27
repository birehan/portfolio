import Link from "next/link";
import { Github, Linkedin, Mail, BookOpen, MessageCircle } from "lucide-react";
import { site, getWhatsAppHref } from "@/lib/site";

const BUILD_TIME = new Date();

export function Footer() {
  const year = BUILD_TIME.getFullYear();
  const updated = BUILD_TIME.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="container-x py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-semibold tracking-tight"
            >
              <span className="grid h-8 w-8 place-items-center rounded-md border border-[var(--border)] bg-[var(--bg)] font-mono text-sm font-bold text-[var(--accent)]">
                {site.initials}
              </span>
              {site.name}
            </Link>
            <p className="mt-3 text-sm text-[var(--muted)] max-w-sm leading-relaxed">
              {site.role}. Building production AI systems for product teams and research
              groups.
            </p>
            <div className="mt-4 flex items-center gap-1">
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
                href={site.social.medium}
                target="_blank"
                rel="noopener"
                aria-label="Medium"
                className="grid h-10 w-10 place-items-center rounded-md text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
              >
                <BookOpen className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                className="grid h-10 w-10 place-items-center rounded-md text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={getWhatsAppHref()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-md text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterColumn title="Portfolio">
            <FooterLink href="/#work">Work</FooterLink>
            <FooterLink href="/#experience">Experience</FooterLink>
            <FooterLink href="/writing/">Writing</FooterLink>
            <FooterLink href="/certificates/">Certificates</FooterLink>
          </FooterColumn>

          <FooterColumn title="Connect">
            <FooterLink href="/#about">About</FooterLink>
            <FooterLink href="/#contact">Contact</FooterLink>
            <FooterLink href="/resume/">Resume</FooterLink>
            <FooterLink href="/services/">For clients</FooterLink>
          </FooterColumn>
        </div>

        <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[var(--muted)] font-mono">
          <span>© {year} {site.name}. All rights reserved.</span>
          <span>Last updated {updated}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-3">
        {title}
      </p>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}
