"use client";

import type { CSSProperties } from "react";
import { ChevronLeft, ChevronRight, Move3d } from "lucide-react";
import type { AlemaTheme } from "./theme";

type ImmersiveNavProps = {
  theme: AlemaTheme;
  chapter: number;
  count: number;
  onChange: (chapter: number) => void;
};

const LABELS = ["Welcome", "The letter", "The poem", "You", "Forever"];

/**
 * Deliberately tiny navigation so the 3D world is never boxed in by a big text
 * card: two edge arrows to move through the chapters, a slim row of dots, and a
 * whispered "drag to explore" hint. All the actual story now lives in-world via
 * <StoryText/>.
 */
export function ImmersiveNav({ theme, chapter, count, onChange }: ImmersiveNavProps) {
  const accent = theme.accent ?? theme.script;
  const accentText = theme.accentText ?? "#1a1420";
  const atStart = chapter <= 0;
  const atEnd = chapter >= count - 1;

  const arrow = (disabled: boolean): CSSProperties => ({
    display: "grid",
    placeItems: "center",
    width: 52,
    height: 52,
    borderRadius: 999,
    border: `1px solid ${theme.panelBorder ?? "rgba(255,255,255,0.22)"}`,
    background: disabled ? "rgba(0,0,0,0.14)" : accent,
    color: disabled ? theme.eyebrow : accentText,
    opacity: disabled ? 0.35 : 0.92,
    cursor: disabled ? "default" : "pointer",
    backdropFilter: "blur(10px)",
    transition: "all .25s ease",
    pointerEvents: "auto",
  });

  return (
    <>
      <button
        type="button"
        aria-label="Previous chapter"
        onClick={() => !atStart && onChange(chapter - 1)}
        disabled={atStart}
        style={{ ...styles.edge, left: "clamp(0.6rem, 2vw, 1.5rem)", ...arrow(atStart) }}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        type="button"
        aria-label="Next chapter"
        onClick={() => !atEnd && onChange(chapter + 1)}
        disabled={atEnd}
        style={{ ...styles.edge, right: "clamp(0.6rem, 2vw, 1.5rem)", ...arrow(atEnd) }}
      >
        <ChevronRight size={24} />
      </button>

      <div style={styles.bottom}>
        <span style={{ ...styles.label, color: theme.eyebrow }}>
          {LABELS[Math.min(chapter, LABELS.length - 1)]}
        </span>
        <div style={styles.dots}>
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to chapter ${i + 1}`}
              onClick={() => onChange(i)}
              style={{
                ...styles.dot,
                width: i === chapter ? 24 : 8,
                background: i === chapter ? accent : theme.panelBorder ?? "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>
        <span style={{ ...styles.hint, color: theme.eyebrow }}>
          <Move3d size={12} /> drag to explore · scroll to zoom
        </span>
      </div>
    </>
  );
}

const styles: Record<string, CSSProperties> = {
  edge: {
    position: "fixed",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 80,
  },
  bottom: {
    position: "fixed",
    left: "50%",
    bottom: "clamp(0.9rem, 3vh, 1.8rem)",
    transform: "translateX(-50%)",
    zIndex: 80,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.45rem",
    pointerEvents: "none",
  },
  label: {
    fontFamily: "var(--font-serif)",
    fontSize: "0.8rem",
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    textShadow: "0 1px 10px rgba(0,0,0,0.4)",
  },
  dots: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    pointerEvents: "auto",
  },
  dot: {
    height: 8,
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: "all .3s ease",
  },
  hint: {
    display: "flex",
    alignItems: "center",
    gap: "0.35rem",
    fontFamily: "var(--font-serif)",
    fontSize: "0.66rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    opacity: 0.7,
    textShadow: "0 1px 8px rgba(0,0,0,0.4)",
  },
};
