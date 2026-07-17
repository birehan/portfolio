"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Lock, Heart } from "lucide-react";
import { gate, PASSWORD_HASH } from "./content";
import { sha256Hex } from "./shared/crypto";
import { FloatingField } from "./shared/FloatingField";

type PasswordGateProps = {
  /** Called once the correct password has been entered. */
  onUnlock: () => void;
};

/**
 * The romantic password screen, the very first thing she sees. Validates the
 * entered password by hashing it in-browser and comparing to the stored hash,
 * so the plaintext password never appears in the source.
 */
export function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  const [shake, setShake] = useState(false);
  const [checking, setChecking] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim() || checking) return;
    setChecking(true);
    const hash = await sha256Hex(value.trim());
    setChecking(false);

    if (hash === PASSWORD_HASH) {
      // Play a short "doors of light" opening animation, then reveal.
      setUnlocking(true);
      setTimeout(onUnlock, 1500);
    } else {
      setWrong(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  }

  return (
    <div style={styles.root}>
      {/* Soft romantic glow + floating hearts behind the card */}
      <div style={styles.glow} aria-hidden />
      <FloatingField
        symbols={["\u2764\ufe0f", "\ud83e\udd0d", "\u2728", "\ud83c\udf39"]}
        count={16}
        opacity={0.5}
        zIndex={1}
      />

      {/* The unlock flash: a warm bloom that fills the screen on success */}
      <AnimatePresence>
        {unlocking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 3 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            style={styles.unlockFlash}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={
          unlocking
            ? { opacity: 0, scale: 1.1, filter: "blur(8px)" }
            : { opacity: 1, y: 0 }
        }
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={styles.card}
      >
        <motion.div
          animate={shake ? { x: [0, -10, 10, -8, 8, -4, 0] } : { x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={styles.lockRing}>
            <Lock size={22} strokeWidth={1.5} />
          </div>

          <p style={styles.eyebrow}>{gate.eyebrow}</p>
          <h1 style={styles.title}>{gate.title}</h1>
          <p style={styles.subtitle}>{gate.subtitle}</p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="password"
              inputMode="numeric"
              autoComplete="off"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (wrong) setWrong(false);
              }}
              placeholder={gate.placeholder}
              aria-label="Password"
              style={styles.input}
              autoFocus
            />
            <button type="submit" style={styles.button} disabled={checking}>
              <Heart size={16} fill="currentColor" />
              {checking ? "\u2026" : gate.button}
            </button>
          </form>

          <AnimatePresence>
            {wrong && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                style={styles.wrongWrap}
              >
                <p style={styles.wrong}>{gate.wrongMessage}</p>
                <p style={styles.hint}>{gate.hint}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    position: "fixed",
    inset: 0,
    zIndex: 60,
    display: "grid",
    placeItems: "center",
    padding: "1.5rem",
    background:
      "radial-gradient(1200px 800px at 50% 20%, #241826 0%, #140d18 45%, #0a070d 100%)",
    color: "#f4ecf5",
    overflow: "hidden",
  },
  glow: {
    position: "absolute",
    top: "18%",
    left: "50%",
    width: "min(70vw, 640px)",
    height: "min(70vw, 640px)",
    transform: "translateX(-50%)",
    background:
      "radial-gradient(circle, rgba(240,178,122,0.28), rgba(214,120,168,0.14) 45%, transparent 70%)",
    filter: "blur(20px)",
    animation: "alemaPulseGlow 6s ease-in-out infinite",
    pointerEvents: "none",
  },
  unlockFlash: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "60vmax",
    height: "60vmax",
    transform: "translate(-50%, -50%)",
    borderRadius: "999px",
    background:
      "radial-gradient(circle, rgba(255,241,214,0.95), rgba(246,196,140,0.6) 40%, transparent 70%)",
    zIndex: 5,
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    zIndex: 3,
    width: "min(560px, 100%)",
    textAlign: "center",
    padding: "clamp(2rem, 5vw, 3.5rem)",
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(24,16,28,0.55)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 30px 90px rgba(0,0,0,0.55)",
  },
  lockRing: {
    display: "grid",
    placeItems: "center",
    width: 56,
    height: 56,
    margin: "0 auto 1.25rem",
    borderRadius: 999,
    border: "1px solid rgba(246,196,140,0.5)",
    color: "#f6c48c",
    background: "rgba(246,196,140,0.08)",
  },
  eyebrow: {
    fontFamily: "var(--font-script)",
    fontSize: "1.6rem",
    color: "#f2b7d0",
    margin: "0 0 0.25rem",
  },
  title: {
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize: "clamp(1.5rem, 4vw, 2.1rem)",
    lineHeight: 1.25,
    margin: "0 0 0.9rem",
  },
  subtitle: {
    fontFamily: "var(--font-serif)",
    fontSize: "clamp(1.05rem, 2.4vw, 1.25rem)",
    color: "rgba(244,236,245,0.78)",
    margin: "0 auto 1.8rem",
    maxWidth: "34ch",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
    justifyContent: "center",
  },
  input: {
    flex: "1 1 220px",
    minWidth: 0,
    padding: "0.85rem 1.1rem",
    fontSize: "1.05rem",
    fontFamily: "var(--font-serif)",
    letterSpacing: "0.35em",
    textAlign: "center",
    color: "#fff",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 12,
    outline: "none",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.85rem 1.6rem",
    fontSize: "1rem",
    fontFamily: "var(--font-serif)",
    fontWeight: 600,
    letterSpacing: "0.06em",
    color: "#2a1420",
    background: "linear-gradient(135deg, #f6c48c, #f0a9c4)",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
  },
  wrongWrap: { overflow: "hidden", marginTop: "1.4rem" },
  wrong: {
    fontFamily: "var(--font-display)",
    fontSize: "1.25rem",
    color: "#f7a8c4",
    margin: "0 0 0.5rem",
  },
  hint: {
    fontFamily: "var(--font-serif)",
    fontStyle: "italic",
    fontSize: "1.05rem",
    color: "rgba(244,236,245,0.72)",
    margin: 0,
    maxWidth: "42ch",
    marginInline: "auto",
  },
};
