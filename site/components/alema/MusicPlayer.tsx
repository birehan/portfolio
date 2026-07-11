"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Music, Play, Pause, Volume2, VolumeX, ChevronDown } from "lucide-react";
import { music } from "./content";

// --- Minimal typings for the YouTube IFrame API (only what we use) ----------
type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getPlayerState: () => number;
  setVolume: (v: number) => void;
};
type YTNamespace = {
  Player: new (
    el: string | HTMLElement,
    opts: Record<string, unknown>,
  ) => YTPlayer;
  PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
};
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

/** Load the YouTube IFrame API once and resolve when it is ready. */
function loadYouTubeApi(): Promise<YTNamespace> {
  return new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve(window.YT);
      return;
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      if (window.YT) resolve(window.YT);
    };
    if (!document.getElementById("yt-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "yt-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  });
}

type MusicPlayerProps = {
  /** When true, the player mounts and tries to start playing. */
  active: boolean;
};

/**
 * Background music. Embeds the YouTube song via the IFrame API so it can:
 *  - attempt autoplay when the experience unlocks,
 *  - fall back to a glowing "play our song" button if the browser blocks it,
 *  - stay playing across every section / variant,
 *  - expose a visible, collapsible player she can watch or control.
 */
export function MusicPlayer({ active }: MusicPlayerProps) {
  const playerRef = useRef<YTPlayer | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled) return;
      playerRef.current = new YT.Player("alema-yt-player", {
        videoId: music.videoId,
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: music.videoId, // required for loop of a single video
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            setReady(true);
            // Try to start playing (best effort — may be blocked when unmuted).
            e.target.playVideo();
            setMuted(e.target.isMuted());
            // If nothing is playing shortly after, ask for a tap.
            setTimeout(() => {
              const state = e.target.getPlayerState();
              if (state !== window.YT?.PlayerState.PLAYING) {
                setNeedsGesture(true);
              }
            }, 1200);
          },
          onStateChange: (e: { data: number }) => {
            const YTns = window.YT;
            if (!YTns) return;
            const isPlaying = e.data === YTns.PlayerState.PLAYING;
            setPlaying(isPlaying);
            if (isPlaying) setNeedsGesture(false);
          },
        },
      });
    });

    return () => {
      cancelled = true;
    };
  }, [active]);

  const togglePlay = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    // A user tap satisfies autoplay policy: unmute and play.
    if (playing) {
      p.pauseVideo();
    } else {
      if (p.isMuted()) {
        p.unMute();
        setMuted(false);
      }
      p.playVideo();
    }
    setNeedsGesture(false);
  }, [playing]);

  const toggleMute = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (p.isMuted()) {
      p.unMute();
      setMuted(false);
    } else {
      p.mute();
      setMuted(true);
    }
  }, []);

  if (!active) return null;

  return (
    <>
      {/* Fullscreen "tap to play" fallback when autoplay is blocked */}
      <AnimatePresence>
        {needsGesture && (
          <motion.button
            type="button"
            onClick={togglePlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.gestureOverlay}
          >
            <motion.span
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={styles.gestureBtn}
            >
              <Play size={30} fill="currentColor" />
            </motion.span>
            <span style={styles.gestureText}>Tap to play our song</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating dock, bottom-right */}
      <div style={styles.dock}>
        {/*
          The panel is ALWAYS mounted (never conditionally removed) so the
          YouTube iframe stays alive and keeps playing across sections and
          variant switches. When collapsed it is simply faded/moved out of the
          way with pointer events disabled.
        */}
        <motion.div
          animate={
            open
              ? { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" }
              : { opacity: 0, y: 16, scale: 0.96, pointerEvents: "none" }
          }
          transition={{ duration: 0.3 }}
          style={styles.panel}
          aria-hidden={!open}
        >
          <div style={styles.panelHeader}>
            <span style={styles.panelTitle}>
              <Music size={14} /> {music.title}
            </span>
            <button
              type="button"
              aria-label="Collapse player"
              onClick={() => setOpen(false)}
              style={styles.panelClose}
            >
              <ChevronDown size={16} />
            </button>
          </div>

          {/* The visible embedded player (host element must stay in the DOM). */}
          <div style={styles.videoWrap}>
            <div id="alema-yt-player" style={{ width: "100%", height: "100%" }} />
          </div>

          <div style={styles.controls}>
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
              style={styles.ctrlBtn}
              disabled={!ready}
            >
              {playing ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              style={styles.ctrlBtn}
              disabled={!ready}
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        </motion.div>

        <motion.button
          type="button"
          aria-label="Music player"
          onClick={() => setOpen((v) => !v)}
          animate={playing ? { rotate: [0, 8, -8, 0] } : {}}
          transition={{ duration: 3, repeat: Infinity }}
          style={styles.fab}
        >
          <Music size={20} />
        </motion.button>
      </div>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  gestureOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 90,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    border: "none",
    cursor: "pointer",
    color: "#fff",
    background:
      "radial-gradient(800px 600px at 50% 50%, rgba(20,13,24,0.7), rgba(10,7,13,0.92))",
    backdropFilter: "blur(6px)",
  },
  gestureBtn: {
    display: "grid",
    placeItems: "center",
    width: 92,
    height: 92,
    borderRadius: 999,
    color: "#2a1420",
    background: "linear-gradient(135deg, #f6c48c, #f0a9c4)",
    boxShadow: "0 20px 60px rgba(246,169,196,0.5)",
  },
  gestureText: {
    fontFamily: "var(--font-display)",
    fontSize: "1.4rem",
    letterSpacing: "0.04em",
  },
  dock: {
    position: "fixed",
    right: "clamp(1rem, 3vw, 2rem)",
    bottom: "clamp(1rem, 3vw, 2rem)",
    zIndex: 80,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "0.75rem",
  },
  panel: {
    position: "absolute",
    right: 0,
    bottom: 66,
    width: "min(320px, 78vw)",
    borderRadius: 16,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.16)",
    background: "rgba(18,12,22,0.82)",
    backdropFilter: "blur(16px)",
    boxShadow: "0 24px 70px rgba(0,0,0,0.5)",
    color: "#f4ecf5",
  },
  panelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.6rem 0.85rem",
  },
  panelTitle: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.45rem",
    fontFamily: "var(--font-serif)",
    fontSize: "0.95rem",
    letterSpacing: "0.05em",
    color: "#f6c48c",
  },
  panelClose: {
    display: "grid",
    placeItems: "center",
    width: 28,
    height: 28,
    borderRadius: 8,
    border: "none",
    color: "#f4ecf5",
    background: "rgba(255,255,255,0.08)",
    cursor: "pointer",
  },
  videoWrap: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    background: "#000",
  },
  controls: {
    display: "flex",
    gap: "0.5rem",
    padding: "0.7rem 0.85rem",
  },
  ctrlBtn: {
    display: "grid",
    placeItems: "center",
    width: 40,
    height: 40,
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.16)",
    background: "rgba(255,255,255,0.06)",
    color: "#f4ecf5",
    cursor: "pointer",
  },
  fab: {
    display: "grid",
    placeItems: "center",
    width: 54,
    height: 54,
    borderRadius: 999,
    border: "none",
    color: "#2a1420",
    background: "linear-gradient(135deg, #f6c48c, #f0a9c4)",
    boxShadow: "0 12px 34px rgba(246,169,196,0.5)",
    cursor: "pointer",
  },
};
