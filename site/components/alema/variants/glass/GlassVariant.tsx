"use client";

import { useMemo, useState } from "react";
import * as THREE from "three";
import { Instances, Instance, Environment, Sky } from "@react-three/drei";
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

const STEEL = "#20232a";

/** A thin steel frame member. */
function Beam({
  position,
  size,
}: {
  position: [number, number, number];
  size: [number, number, number];
}) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={STEEL} roughness={0.4} metalness={0.8} />
    </mesh>
  );
}

/** A low-poly grove of trees surrounding the pavilion, instanced. */
function Grove({ count }: { count: number }) {
  const items = useMemo(() => {
    const rand = seeded(9001);
    return Array.from({ length: count }, () => {
      const a = rand() * Math.PI * 2;
      const r = 12 + rand() * 22;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      const s = 0.9 + rand() * 1.6;
      return { position: [x, -2.6, z] as [number, number, number], scale: s };
    });
  }, [count]);

  return (
    <group>
      <Instances limit={count} range={count}>
        <cylinderGeometry args={[0.12, 0.16, 1.4, 6]} />
        <meshStandardMaterial color="#5b4636" roughness={0.9} />
        {items.map((t, i) => (
          <Instance key={`trunk-${i}`} position={[t.position[0], t.position[1] + 0.7 * t.scale, t.position[2]]} scale={t.scale} />
        ))}
      </Instances>
      <Instances limit={count} range={count}>
        <coneGeometry args={[0.9, 2.4, 7]} />
        <meshStandardMaterial color="#42704d" roughness={0.85} />
        {items.map((t, i) => (
          <Instance key={`leaf-${i}`} position={[t.position[0], t.position[1] + 2 * t.scale, t.position[2]]} scale={t.scale} />
        ))}
      </Instances>
    </group>
  );
}

function GlassWorld({
  onOpenPortrait,
  onOpenPoem,
}: {
  onOpenPortrait: (i: number) => void;
  onOpenPoem: () => void;
}) {
  const tier = usePerfTier();
  const placements = useMemo(
    () => scatterRing({ count: gallery.images.length, seed: 211, radius: [4, 6.4], y: [-1.2, 3] }),
    [],
  );

  return (
    <>
      <color attach="background" args={["#f6d9b0"]} />
      <fog attach="fog" args={["#f3cfa2", 24, 70]} />
      <Sky sunPosition={[-30, 3, -60]} turbidity={8} rayleigh={3} inclination={0.48} />
      {tier === "high" && <Environment preset="sunset" />}
      <ambientLight intensity={0.6} color="#ffe6c8" />
      <directionalLight position={[-20, 7, -20]} intensity={2.6} color="#ffcf94" castShadow />
      <hemisphereLight args={["#ffe9cf", "#7c8a6a", 0.6]} />

      {/* Grassy ground + travertine platform. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.62, 0]} receiveShadow>
        <planeGeometry args={[180, 180]} />
        <meshStandardMaterial color="#6f8a5b" roughness={1} />
      </mesh>
      <mesh position={[0, -2.5, 0]} receiveShadow>
        <boxGeometry args={[18, 0.3, 18]} />
        <meshStandardMaterial color="#e7dfcf" roughness={0.8} />
      </mesh>

      {/* The Mies glass pavilion enclosing the viewer: steel frame + glass. */}
      {[-8, 8].map((x) =>
        [-8, 8].map((z) => (
          <Beam key={`col-${x}-${z}`} position={[x, 0.4, z]} size={[0.2, 6, 0.2]} />
        )),
      )}
      <Beam position={[0, 3.3, 0]} size={[16.4, 0.24, 16.4]} />
      <Beam position={[0, -2.3, 0]} size={[16.4, 0.18, 16.4]} />

      {/* Four glass walls. */}
      {([[0, 8.05, 0], [0, -8.05, 0]] as const).map(([, z], k) => (
        <mesh key={`glassz-${k}`} position={[0, 0.6, z]}>
          <planeGeometry args={[16, 5.6]} />
          {tier === "high" ? (
            <meshPhysicalMaterial transmission={0.9} thickness={0.4} roughness={0.08} metalness={0} ior={1.4} transparent opacity={0.32} color="#cfe6ff" side={THREE.DoubleSide} />
          ) : (
            <meshStandardMaterial color="#cfe6ff" transparent opacity={0.2} metalness={0.3} roughness={0.1} side={THREE.DoubleSide} />
          )}
        </mesh>
      ))}
      {[-8.05, 8.05].map((x) => (
        <mesh key={`glassx-${x}`} position={[x, 0.6, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[16, 5.6]} />
          {tier === "high" ? (
            <meshPhysicalMaterial transmission={0.9} thickness={0.4} roughness={0.08} metalness={0} ior={1.4} transparent opacity={0.32} color="#cfe6ff" side={THREE.DoubleSide} />
          ) : (
            <meshStandardMaterial color="#cfe6ff" transparent opacity={0.2} metalness={0.3} roughness={0.1} side={THREE.DoubleSide} />
          )}
        </mesh>
      ))}

      <Grove count={tier === "low" ? 18 : 36} />

      {/* Poem framed inside the pavilion. */}
      <ArtFrame
        url={poem.image}
        placement={{ position: POEM_ANCHOR.position, rotation: POEM_ANCHOR.rotation, scale: 1 }}
        size={POEM_SIZE}
        frameColor="#1c1f26"
        onOpen={onOpenPoem}
      />

      {placements.map((p, i) => (
        <ArtFrame
          key={gallery.images[i].src}
          url={gallery.images[i].src}
          placement={p}
          frameColor="#f4efe6"
          onOpen={() => onOpenPortrait(i)}
          phase={i * 1.7}
        />
      ))}

      {tier === "high" && (
        <EffectComposer>
          <Bloom intensity={0.6} luminanceThreshold={0.75} mipmapBlur />
        </EffectComposer>
      )}
    </>
  );
}

/** Local seeded PRNG so the grove is stable across renders. */
function seeded(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const THEME: AlemaTheme = {
  script: "#b9713a",
  heading: "#2c2620",
  body: "#4c4234",
  eyebrow: "#8a7358",
  panel: "rgba(255,246,235,0.72)",
  panelBorder: "rgba(120,80,40,0.22)",
  accent: "#c67b3e",
  accentText: "#ffffff",
  textOutline: "rgba(255,246,235,0.72)",
};

export function GlassVariant() {
  const { openPortrait, openPoem, lightbox } = useAlemaLightbox();
  const [chapter, setChapter] = useState(0);

  return (
    <div style={{ position: "relative" }}>
      <div style={baseBg} aria-hidden />
      <OrbitStage presets={RING_STATIONS} chapter={chapter} camera={{ position: RING_STATIONS[0].position, fov: 62 }}>
        <GlassWorld onOpenPortrait={openPortrait} onOpenPoem={openPoem} />
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
  background: "linear-gradient(180deg, #ffd9a8, #f6b98a 60%, #b98a63)",
};
