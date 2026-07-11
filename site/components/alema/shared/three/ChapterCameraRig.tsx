"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { Viewpoint } from "./viewpoints";

type ChapterCameraRigProps = {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  presets: Viewpoint[];
  chapter: number;
  /** Set true by OrbitStage the moment the user grabs the scene. */
  userInteractingRef: React.RefObject<boolean>;
};

/**
 * Eases the orbit camera + target toward the current chapter's viewpoint. The
 * tween is cancelled the instant the user starts dragging (free exploration
 * always wins) and re-engages only when the chapter changes.
 */
export function ChapterCameraRig({
  controlsRef,
  presets,
  chapter,
  userInteractingRef,
}: ChapterCameraRigProps) {
  const camera = useThree((s) => s.camera);
  const tweening = useRef(false);
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetLook = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const vp = presets[chapter];
    if (!vp) return;
    targetPos.set(...vp.position);
    targetLook.set(...vp.target);
    tweening.current = true;
    userInteractingRef.current = false;
  }, [chapter, presets, targetPos, targetLook, userInteractingRef]);

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls || !tweening.current || userInteractingRef.current) return;

    camera.position.lerp(targetPos, 0.06);
    controls.target.lerp(targetLook, 0.06);
    controls.update();

    if (
      camera.position.distanceTo(targetPos) < 0.05 &&
      controls.target.distanceTo(targetLook) < 0.05
    ) {
      tweening.current = false;
    }
  });

  return null;
}
