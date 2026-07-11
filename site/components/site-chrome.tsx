"use client";

import { usePathname } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

/**
 * Wraps the site's global chrome (Nav + Footer) around page content, but hides
 * it on the immersive, full-screen `/alema` experience so that route can take
 * over the whole viewport.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const immersive = pathname?.startsWith("/alema") ?? false;

  return (
    <>
      {!immersive && <Nav />}
      <main>{children}</main>
      {!immersive && <Footer />}
    </>
  );
}
