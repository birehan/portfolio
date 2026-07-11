"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { PasswordGate } from "./PasswordGate";
import { MusicPlayer } from "./MusicPlayer";
import { VariantSwitcher, type VariantId } from "./VariantSwitcher";

// Variants are heavy (three.js + effects), so load them only on the client and
// only when needed. This keeps the initial password screen light and fast.
const MinimalVariant = dynamic(
  () => import("./variants/minimal/MinimalVariant").then((m) => m.MinimalVariant),
  { ssr: false },
);
const PalaceVariant = dynamic(
  () => import("./variants/palace/PalaceVariant").then((m) => m.PalaceVariant),
  { ssr: false },
);
const MuseumVariant = dynamic(
  () => import("./variants/museum/MuseumVariant").then((m) => m.MuseumVariant),
  { ssr: false },
);
const ZahaVariant = dynamic(
  () => import("./variants/zaha/ZahaVariant").then((m) => m.ZahaVariant),
  { ssr: false },
);
const AndoVariant = dynamic(
  () => import("./variants/ando/AndoVariant").then((m) => m.AndoVariant),
  { ssr: false },
);
const GlassVariant = dynamic(
  () => import("./variants/glass/GlassVariant").then((m) => m.GlassVariant),
  { ssr: false },
);
const ZenVariant = dynamic(
  () => import("./variants/zen/ZenVariant").then((m) => m.ZenVariant),
  { ssr: false },
);

const STORAGE_KEY = "alema:unlocked";
const VARIANT_KEY = "alema:variant";

/**
 * Top-level orchestrator for the /alema experience:
 *   password gate -> unlock -> the chosen romantic variant + persistent music.
 */
export function AlemaExperience() {
  const [unlocked, setUnlocked] = useState(false);
  const [variant, setVariant] = useState<VariantId>("palace");

  // Remember the unlock + chosen variant for the rest of the browser session so
  // a refresh doesn't send her back to the password screen.
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
    const saved = sessionStorage.getItem(VARIANT_KEY) as VariantId | null;
    if (saved) setVariant(saved);
  }, []);

  function handleUnlock() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setUnlocked(true);
  }

  function handleVariant(id: VariantId) {
    setVariant(id);
    sessionStorage.setItem(VARIANT_KEY, id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <AnimatePresence>
        {!unlocked && <PasswordGate key="gate" onUnlock={handleUnlock} />}
      </AnimatePresence>

      {unlocked && (
        <>
          <VariantSwitcher current={variant} onChange={handleVariant} />

          <AnimatePresence mode="wait">
            <motion.div
              key={variant}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              {variant === "minimal" && <MinimalVariant />}
              {variant === "palace" && <PalaceVariant />}
              {variant === "museum" && <MuseumVariant />}
              {variant === "zaha" && <ZahaVariant />}
              {variant === "ando" && <AndoVariant />}
              {variant === "glass" && <GlassVariant />}
              {variant === "zen" && <ZenVariant />}
            </motion.div>
          </AnimatePresence>

          {/* Music mounts once here so it keeps playing across variant switches. */}
          <MusicPlayer active={unlocked} />
        </>
      )}
    </>
  );
}
