"use client";

import { useRef, type ReactNode } from "react";
import type { CanvasProps } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { SceneCanvas } from "../SceneCanvas";
import { ChapterCameraRig } from "./ChapterCameraRig";
import type { Viewpoint } from "./viewpoints";

type OrbitStageProps = {
  presets: Viewpoint[];
  chapter: number;
  camera?: CanvasProps["camera"];
  minDistance?: number;
  maxDistance?: number;
  enablePan?: boolean;
  children: ReactNode;
};

/**
 * The explorable stage: a full-screen interactive canvas with drei
 * <OrbitControls> (drag to rotate, wheel/pinch to zoom, right-drag/two-finger
 * to pan). A <ChapterCameraRig> glides the camera to chapter viewpoints, and any
 * user drag cancels that glide so free exploration always wins.
 */
export function OrbitStage({
  presets,
  chapter,
  camera,
  minDistance = 1.2,
  maxDistance = 20,
  enablePan = true,
  children,
}: OrbitStageProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const userInteracting = useRef(false);

  return (
    <SceneCanvas interactive camera={camera}>
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.08}
        enablePan={enablePan}
        minDistance={minDistance}
        maxDistance={maxDistance}
        // Keep the camera from dipping under the floor.
        maxPolarAngle={Math.PI * 0.86}
        onStart={() => {
          userInteracting.current = true;
        }}
      />
      <ChapterCameraRig
        controlsRef={controlsRef}
        presets={presets}
        chapter={chapter}
        userInteractingRef={userInteracting}
      />
      {children}
    </SceneCanvas>
  );
}
