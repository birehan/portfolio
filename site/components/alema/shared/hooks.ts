"use client";

import { useEffect, useState } from "react";

/** True only after the component has mounted on the client. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** Matches a media query, SSR-safe (returns `false` until mounted). */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/**
 * Performance hint: reduce particle counts / 3D detail on small screens or when
 * the user prefers reduced motion, so the experience stays smooth everywhere.
 */
export function usePerfTier(): "low" | "high" {
  const small = useMediaQuery("(max-width: 768px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  return small || reduced ? "low" : "high";
}
