"use client";

import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { OrbitStage } from "../../shared/three/OrbitStage";
import { StoryText } from "../../shared/three/StoryText";
import { ImmersiveNav } from "../../shared/three/ImmersiveNav";
import { ArtFrame } from "../../shared/three/ArtFrame";
import { scatterRing } from "../../shared/three/scatter";
import { RING_STATIONS, POEM_ANCHOR, POEM_SIZE } from "../../shared/three/viewpoints";
import type { AlemaTheme } from "../../shared/three/theme";
import { useAlemaLightbox } from "../../shared/three/useAlemaLightbox";
import { usePerfTier } from "../../shared/hooks";
import { gallery, poem } from "../../content";

/** A slowly drifting concrete slab. */
function Slab({
  position,
  size,
  color = "#eceae3",
}: {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.12 + position[0]) * 0.05;
  });
  return (
    <mesh ref={ref} position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.95} metalness={0.03} />
    </mesh>
  );
}

function MinimalWorld({
  onOpenPortrait,
  onOpenPoem,
}: {
  onOpenPortrait: (i: number) => void;
  onOpenPoem: () => void;
}) {
  const tier = usePerfTier();
  const placements = useMemo(
    () => scatterRing({ count: gallery.images.length, seed: 21 }),
    [],
  );

  return (
    <>
      <color attach="background" args={["#edeae3"]} />
      <fog attach="fog" args={["#edeae3", 16, 34]} />
      <hemisphereLight args={["#ffffff", "#d8d2c6", 1.15]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[-8, 14, 6]} intensity={2.2} color="#fff6e8" castShadow />

      {/* A calm concrete room enclosing the viewer. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]} receiveShadow>
        <planeGeometry args={[46, 46]} />
        <meshStandardMaterial color="#e4ded3" roughness={1} />
      </mesh>
      <mesh position={[-12, 3, 0]} receiveShadow>
        <boxGeometry args={[0.6, 11, 28]} />
        <meshStandardMaterial color="#eceae3" roughness={0.95} />
      </mesh>
      <mesh position={[12, 3, 0]} receiveShadow>
        <boxGeometry args={[0.6, 11, 28]} />
        <meshStandardMaterial color="#eceae3" roughness={0.95} />
      </mesh>
      <mesh position={[0, 3, -13]} receiveShadow>
        <boxGeometry args={[24, 11, 0.6]} />
        <meshStandardMaterial color="#e6e2d9" roughness={0.95} />
      </mesh>
      <mesh position={[0, 3, 13]} receiveShadow>
        <boxGeometry args={[24, 11, 0.6]} />
        <meshStandardMaterial color="#e6e2d9" roughness={0.95} />
      </mesh>

      {/* Floating architectural slabs between the ring and the walls. */}
      <Float speed={1} floatIntensity={0.5} rotationIntensity={0.2}>
        <Slab position={[-8.5, 2.2, -5]} size={[0.4, 5, 3]} />
      </Float>
      <Float speed={0.8} floatIntensity={0.4} rotationIntensity={0.15}>
        <Slab position={[8.5, 0.6, 5]} size={[0.4, 4.2, 3.2]} color="#e6e2d9" />
      </Float>
      <Float speed={1.2} floatIntensity={0.6} rotationIntensity={0.2}>
        <Slab position={[-6, 3.4, 8]} size={[3, 0.35, 2.4]} />
      </Float>
      <Float speed={0.9} floatIntensity={0.5} rotationIntensity={0.15}>
        <Slab position={[6.5, 2, -9]} size={[0.4, 4.4, 3]} color="#eae5dc" />
      </Float>

      {/* Poem, spotlit like a feature artwork. */}
      <spotLight position={[0, 5, 4]} target-position={POEM_ANCHOR.position} angle={0.5} penumbra={0.8} intensity={45} color="#fff3df" />
      <ArtFrame
        url={poem.image}
        placement={{ position: POEM_ANCHOR.position, rotation: POEM_ANCHOR.rotation, scale: 1 }}
        size={POEM_SIZE}
        frameColor="#fbfaf6"
        onOpen={onOpenPoem}
      />

      {/* Her portraits, surrounding the viewer on all sides. */}
      {placements.map((p, i) => (
        <ArtFrame
          key={gallery.images[i].src}
          url={gallery.images[i].src}
          placement={p}
          frameColor="#ffffff"
          onOpen={() => onOpenPortrait(i)}
          phase={i * 1.7}
        />
      ))}

      <Sparkles count={tier === "low" ? 40 : 110} scale={[24, 12, 24]} size={2} speed={0.2} color="#fff6e8" opacity={0.5} />

      {tier === "high" && (
        <EffectComposer>
          <Bloom intensity={0.4} luminanceThreshold={0.85} mipmapBlur />
        </EffectComposer>
      )}
    </>
  );
}

const THEME: AlemaTheme = {
  script: "#a98b63",
  heading: "#23221d",
  body: "#4a4740",
  eyebrow: "#7d7465",
  panel: "rgba(255,255,255,0.72)",
  panelBorder: "rgba(0,0,0,0.12)",
  accent: "#b0906a",
  accentText: "#ffffff",
  textOutline: "rgba(255,255,255,0.78)",
};

export function MinimalVariant() {
  const { openPortrait, openPoem, lightbox } = useAlemaLightbox();
  const [chapter, setChapter] = useState(0);

  return (
    <div style={{ position: "relative" }}>
      <div style={baseBg} aria-hidden />
      <OrbitStage presets={RING_STATIONS} chapter={chapter} camera={{ position: RING_STATIONS[0].position, fov: 60 }}>
        <MinimalWorld onOpenPortrait={openPortrait} onOpenPoem={openPoem} />
        <StoryText theme={THEME} chapter={chapter} />
      </OrbitStage>
      <ImmersiveNav theme={THEME} chapter={chapter} count={RING_STATIONS.length} onChange={setChapter} />
      {lightbox}
    </div>
  );
}

const baseBg: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 0,
  background: "linear-gradient(180deg, #f2eee7, #e4ded4)",
};
