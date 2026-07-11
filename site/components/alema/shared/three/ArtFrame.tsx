"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Image } from "@react-three/drei";
import type { Placement } from "./scatter";

type ArtFrameProps = {
  url: string;
  placement: Placement;
  /** Base plane size [width, height] before the placement scale is applied. */
  size?: [number, number];
  frameColor?: string;
  /** Emissive frame color (for neon variants); omit for matte frames. */
  frameEmissive?: string;
  frameEmissiveIntensity?: number;
  /** Called on click, e.g. to open the lightbox. */
  onOpen?: () => void;
  /** Random-ish phase so many frames don't bob in unison. */
  phase?: number;
};

/**
 * A single framed portrait floating in the 3D world: a drei <Image> (which
 * "covers" its plane, cropping to fit) sitting on a colored/emissive frame.
 * Gently bobs, lifts + brightens on hover, and opens the lightbox on click.
 */
export function ArtFrame({
  url,
  placement,
  size = [1.1, 1.4],
  frameColor = "#ffffff",
  frameEmissive,
  frameEmissiveIntensity = 1.5,
  onOpen,
  phase = 0,
}: ArtFrameProps) {
  const group = useRef<THREE.Group>(null!);
  const imageRef = useRef<THREE.Mesh>(null!);
  const gl = useThree((s) => s.gl);
  const [hovered, setHovered] = useState(false);
  const [w, h] = size;
  const frameW = w + 0.14;
  const frameH = h + 0.14;

  // Max anisotropic filtering keeps the photo/poem crisp at distance + angle.
  useEffect(() => {
    const mat = imageRef.current?.material as
      | (THREE.Material & { map?: THREE.Texture | null })
      | undefined;
    const tex = mat?.map ?? null;
    if (tex) {
      tex.anisotropy = gl.capabilities.getMaxAnisotropy();
      tex.needsUpdate = true;
    }
  }, [gl, url]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Gentle vertical bob around the scattered base position.
    group.current.position.y =
      placement.position[1] + Math.sin(t * 0.7 + phase) * 0.12;
    const target = hovered ? placement.scale * 1.12 : placement.scale;
    const cur = group.current.scale.x;
    group.current.scale.setScalar(cur + (target - cur) * 0.12);
  });

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };
  const handleOut = () => {
    setHovered(false);
    document.body.style.cursor = "";
  };
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onOpen?.();
  };

  return (
    <group
      ref={group}
      position={placement.position}
      rotation={placement.rotation}
      scale={placement.scale}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
      onClick={handleClick}
    >
      {/* Frame / mat behind the photo. */}
      <mesh position={[0, 0, -0.03]}>
        <planeGeometry args={[frameW, frameH]} />
        <meshStandardMaterial
          color={frameColor}
          emissive={frameEmissive ?? "#000000"}
          emissiveIntensity={frameEmissive ? frameEmissiveIntensity : 0}
          roughness={0.5}
          metalness={frameEmissive ? 0.4 : 0.05}
          side={THREE.DoubleSide}
          toneMapped={!frameEmissive}
        />
      </mesh>
      <Image
        ref={imageRef}
        url={url}
        scale={[w, h]}
        radius={0.04}
        transparent
        side={THREE.DoubleSide}
      />
    </group>
  );
}
