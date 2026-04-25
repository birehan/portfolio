import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-x py-32 md:py-48 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-3">
        404
      </p>
      <h1 className="h1 mb-5">
        Page <span className="text-[var(--accent)]">not found</span>.
      </h1>
      <p className="lead mx-auto mb-8">
        The link you followed may be broken, or the page may have been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/">
          <Button size="lg">
            <Home className="h-4 w-4" />
            Go home
          </Button>
        </Link>
        <Link href="/#work">
          <Button variant="secondary" size="lg">
            See my work
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
