import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";

const HIDDEN_HEADINGS = [
  /brutally honest/i,
  /honest limits/i,
  /honest assessment/i,
  /what i'?d highlight in an interview/i,
  /what to actually claim/i,
  /weaknesses you should know/i,
];

function stripCandidNotes(md: string): string {
  const lines = md.split(/\n/);
  const out: string[] = [];
  let skipping = false;
  let skipLevel = 0;

  for (const line of lines) {
    const headingMatch = /^(#{1,6})\s+(.+)$/.exec(line);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const isCandid = HIDDEN_HEADINGS.some((re) => re.test(text));

      if (isCandid) {
        skipping = true;
        skipLevel = level;
        continue;
      }
      if (skipping && level <= skipLevel) {
        skipping = false;
      }
    }
    if (!skipping) out.push(line);
  }
  return out.join("\n");
}

export function Markdown({ content }: { content: string }) {
  const cleaned = stripCandidNotes(content);
  return (
    <div className="prose-content max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          a: ({ href, children, ...props }) => {
            const external = href?.startsWith("http");
            return (
              <a
                href={href}
                {...props}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {cleaned}
      </ReactMarkdown>
    </div>
  );
}
