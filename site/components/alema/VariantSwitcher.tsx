"use client";

import { useState } from "react";
import { Sparkles, ChevronUp } from "lucide-react";

export type VariantId =
  | "minimal"
  | "palace"
  | "museum"
  | "zaha"
  | "ando"
  | "glass"
  | "zen";

export const VARIANTS: { id: VariantId; label: string; hint: string }[] = [
  { id: "minimal", label: "Minimal", hint: "Modern Architecture" },
  { id: "palace", label: "Palace", hint: "Dreamy Romantic" },
  { id: "museum", label: "Museum", hint: "Parametric Future" },
  { id: "zaha", label: "Hadid", hint: "Fluid Forms" },
  { id: "ando", label: "Ando", hint: "Concrete & Light" },
  { id: "glass", label: "Mies", hint: "Glass Pavilion" },
  { id: "zen", label: "Zen", hint: "Wood & Water" },
];

type VariantSwitcherProps = {
  current: VariantId;
  onChange: (id: VariantId) => void;
};

/**
 * A small floating control so you can flip between the three design variants
 * live and pick your favourite. (Delete this + the unused variants later.)
 */
export function VariantSwitcher({ current, onChange }: VariantSwitcherProps) {
  const [open, setOpen] = useState(true);

  return (
    <div style={styles.wrap}>
      {open ? (
        <div style={styles.bar}>
          <span style={styles.title}>
            <Sparkles size={14} /> Choose your world
          </span>
          <div style={styles.options}>
            {VARIANTS.map((v) => {
              const active = v.id === current;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => onChange(v.id)}
                  style={{
                    ...styles.option,
                    ...(active ? styles.optionActive : null),
                  }}
                >
                  <span style={styles.optionLabel}>{v.label}</span>
                  <span style={styles.optionHint}>{v.hint}</span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            aria-label="Hide switcher"
            onClick={() => setOpen(false)}
            style={styles.collapse}
          >
            <ChevronUp size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={styles.pill}
          aria-label="Show variant switcher"
        >
          <Sparkles size={14} /> Variants
        </button>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    position: "fixed",
    top: "clamp(0.75rem, 2vw, 1.25rem)",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 85,
  },
  bar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "0.6rem",
    padding: "0.5rem 0.6rem 0.5rem 1rem",
    borderRadius: 22,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(15,12,20,0.72)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 16px 44px rgba(0,0,0,0.45)",
    color: "#f4ecf5",
    maxWidth: "94vw",
  },
  title: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    fontFamily: "var(--font-serif)",
    fontSize: "0.8rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#f6c48c",
    whiteSpace: "nowrap",
  },
  options: { display: "flex", gap: "0.35rem", flexWrap: "wrap", justifyContent: "center" },
  option: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    lineHeight: 1.1,
    padding: "0.4rem 0.75rem",
    borderRadius: 999,
    border: "1px solid transparent",
    background: "transparent",
    color: "rgba(244,236,245,0.7)",
    cursor: "pointer",
    transition: "all .25s ease",
  },
  optionActive: {
    background: "linear-gradient(135deg, #f6c48c, #f0a9c4)",
    color: "#2a1420",
    borderColor: "rgba(255,255,255,0.4)",
  },
  optionLabel: {
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize: "0.95rem",
  },
  optionHint: { fontSize: "0.62rem", opacity: 0.8, letterSpacing: "0.04em" },
  collapse: {
    display: "grid",
    placeItems: "center",
    width: 30,
    height: 30,
    borderRadius: 999,
    border: "none",
    background: "rgba(255,255,255,0.1)",
    color: "#f4ecf5",
    cursor: "pointer",
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: "0.5rem 1rem",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(15,12,20,0.72)",
    backdropFilter: "blur(16px)",
    color: "#f6c48c",
    fontFamily: "var(--font-serif)",
    fontSize: "0.85rem",
    letterSpacing: "0.08em",
    cursor: "pointer",
  },
};
