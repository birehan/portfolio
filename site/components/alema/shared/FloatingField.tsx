"use client";

import { useEffect, useState } from "react";
import { usePerfTier } from "./hooks";

type FloatingFieldProps = {
  /** The glyphs to float upward (emoji or characters), picked at random. */
  symbols: string[];
  /** Base particle count on desktop (auto-reduced on low-perf devices). */
  count?: number;
  /** Font-size range in px [min, max]. */
  sizeRange?: [number, number];
  /** Max opacity of each particle. */
  opacity?: number;
  className?: string;
  /** z-index of the layer. */
  zIndex?: number;
};

type Particle = {
  id: number;
  left: number;
  symbol: string;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
};

/**
 * A lightweight DOM particle layer: floating hearts, petals, flowers or
 * sparkles that drift up the screen. Cheaper than a 3D system and perfect as a
 * romantic overlay on top of the canvas.
 */
export function FloatingField({
  symbols,
  count = 22,
  sizeRange = [14, 34],
  opacity = 0.85,
  className,
  zIndex = 2,
}: FloatingFieldProps) {
  const tier = usePerfTier();
  const total = tier === "low" ? Math.round(count * 0.45) : count;

  // The layout uses Math.random(), which would differ between server and client
  // and cause a hydration mismatch. So we generate particles ONLY after mount
  // (client-side); nothing is rendered during SSR.
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const [min, max] = sizeRange;
    setParticles(
      Array.from({ length: total }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        size: min + Math.random() * (max - min),
        duration: 14 + Math.random() * 16,
        delay: Math.random() * 18,
        drift: (Math.random() - 0.5) * 160,
        opacity: opacity * (0.5 + Math.random() * 0.5),
      })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, opacity, ...sizeRange, ...symbols]);

  return (
    <div
      className={className}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex,
      }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="alema-particle"
          style={
            {
              left: `${p.left}%`,
              fontSize: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--float-drift": `${p.drift}px`,
              "--float-opacity": p.opacity,
            } as React.CSSProperties
          }
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}
