"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type LightboxImage = { src: string; caption?: string; alt?: string };

type LightboxProps = {
  images: readonly LightboxImage[];
  /** Currently open index, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

/**
 * A shared, elegant fullscreen image viewer with keyboard + button navigation.
 * Reused by every variant's memory gallery.
 */
export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const open = index !== null;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      const next = (index + dir + images.length) % images.length;
      onNavigate(next);
    },
    [index, images.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go, onClose]);

  const current = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "grid",
            placeItems: "center",
            background: "rgba(8, 6, 12, 0.92)",
            backdropFilter: "blur(14px)",
            padding: "clamp(1rem, 4vw, 3rem)",
          }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            style={iconBtnStyle({ top: 20, right: 20 })}
          >
            <X size={22} />
          </button>

          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            style={iconBtnStyle({ left: 16, top: "50%" }, true)}
          >
            <ChevronLeft size={26} />
          </button>

          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            style={iconBtnStyle({ right: 16, top: "50%" }, true)}
          >
            <ChevronRight size={26} />
          </button>

          <motion.figure
            key={current.src}
            initial={{ scale: 0.94, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ margin: 0, textAlign: "center", maxWidth: "min(1280px, 100%)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={current.alt ?? current.caption ?? "Memory"}
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                borderRadius: 8,
                boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
                objectFit: "contain",
              }}
            />
            {current.caption && (
              <figcaption
                style={{
                  marginTop: "1.1rem",
                  color: "rgba(255,255,255,0.82)",
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.25rem",
                  letterSpacing: "0.02em",
                }}
              >
                {current.caption}
              </figcaption>
            )}
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function iconBtnStyle(
  pos: React.CSSProperties,
  vCenter = false,
): React.CSSProperties {
  return {
    position: "absolute",
    ...pos,
    transform: vCenter ? "translateY(-50%)" : undefined,
    display: "grid",
    placeItems: "center",
    width: 46,
    height: 46,
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.25)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    cursor: "pointer",
    zIndex: 101,
  };
}
