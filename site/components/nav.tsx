"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/writing/", label: "Writing" },
  { href: "/about/", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-200",
        scrolled
          ? "bg-[color-mix(in_srgb,var(--bg)_85%,transparent)] backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-base hover:text-[var(--accent)] transition-colors"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-8 w-8 place-items-center rounded-md border border-[var(--border)] bg-[var(--surface)] font-mono text-sm font-bold text-[var(--accent)]">
            {site.initials}
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors rounded-md hover:bg-[var(--surface-2)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener"
            className="hidden sm:inline-flex"
          >
            <Button variant="secondary" size="sm">
              <Download className="h-3.5 w-3.5" />
              Resume
            </Button>
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-[var(--text)] hover:bg-[var(--surface-2)]"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)]">
          <nav className="container-x flex flex-col py-4">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-[var(--text)] border-b border-[var(--border)] last:border-0"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener"
              className="mt-3"
              onClick={() => setOpen(false)}
            >
              <Button variant="secondary" size="md" className="w-full">
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
