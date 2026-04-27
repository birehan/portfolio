import { List } from "lucide-react";

type Heading = {
  level: 2 | 3;
  text: string;
  id: string;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const lines = markdown.split(/\n/);
  let inFence = false;
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const level = m[1].length as 2 | 3;
    const text = m[2].replace(/[*_`]/g, "").trim();
    if (/brutally honest|honest limits|honest assessment|what i'?d highlight in an interview|what to actually claim|weaknesses you should know/i.test(text)) {
      continue;
    }
    headings.push({ level, text, id: slugify(text) });
  }
  return headings;
}

export function MarkdownToc({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;
  return (
    <nav
      aria-label="Table of contents"
      className="hidden xl:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4"
    >
      <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-3 inline-flex items-center gap-1.5">
        <List className="h-3 w-3" />
        On this page
      </p>
      <ul className="space-y-1.5 text-xs border-l border-[var(--border)]">
        {headings.map((h, i) => (
          <li key={`${h.id}-${i}`}>
            <a
              href={`#${h.id}`}
              className={
                "block pl-3 -ml-px border-l border-transparent py-1 leading-snug text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors " +
                (h.level === 3 ? "pl-6 text-[var(--muted)]" : "font-medium text-[var(--text)]")
              }
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
