"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";
import { useMounted, usePerfTier } from "./hooks";

type SceneCanvasProps = {
  children: ReactNode;
  /** Extra className for the fixed canvas layer. */
  className?: string;
  /** Passthrough camera config. */
  camera?: CanvasProps["camera"];
  style?: React.CSSProperties;
  /**
   * When true the canvas receives pointer/scroll events (needed for the
   * scroll-driven immersive worlds + clickable portraits). Defaults to false,
   * which keeps the layer as a non-interactive backdrop.
   */
  interactive?: boolean;
};

/**
 * A safe wrapper around react-three-fiber's <Canvas>. It only renders on the
 * client (avoids SSR/static-export issues), clamps the device pixel ratio for
 * performance, and drops resolution on low-power devices.
 */
export function SceneCanvas({
  children,
  className,
  camera,
  style,
  interactive = false,
}: SceneCanvasProps) {
  const mounted = useMounted();
  const tier = usePerfTier();

  if (!mounted) return null;

  return (
    <div
      className={`alema-canvas-layer ${className ?? ""}`}
      aria-hidden={!interactive}
      style={interactive ? { pointerEvents: "auto" } : undefined}
    >
      <Canvas
        camera={camera ?? { position: [0, 0, 6], fov: 45 }}
        dpr={tier === "low" ? [1, 1.4] : [1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%", ...style }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
