"use client";

import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, Float } from "@react-three/drei";
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

/** A slowly morphing parametric neon knot. */
function ParametricForm({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const group = useRef<THREE.Group>(null!);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    group.current.rotation.y = t * 0.2;
    group.current.rotation.x = Math.sin(t * 0.25) * 0.3;
  });
  return (
    <group ref={group} position={position} scale={scale}>
      <mesh>
        <torusKnotGeometry args={[1.1, 0.34, 180, 28]} />
        <meshStandardMaterial color="#0c0e18" metalness={0.95} roughness={0.15} emissive="#12d6ff" emissiveIntensity={0.3} />
      </mesh>
      <mesh scale={1.05}>
        <torusKnotGeometry args={[1.1, 0.34, 140, 18]} />
        <meshBasicMaterial color="#22e0ff" wireframe transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

/** Drifting neon dust filling the hall. */
function NeonDust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26;
      arr[i * 3 + 1] = Math.random() * 12 - 2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 26;
    }
    return arr;
  }, [count]);
  useFrame((s) => {
    ref.current.rotation.y = s.clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#7ad9ff" transparent opacity={0.7} depthWrite={false} />
    </points>
  );
}

function MuseumWorld({
  onOpenPortrait,
  onOpenPoem,
}: {
  onOpenPortrait: (i: number) => void;
  onOpenPoem: () => void;
}) {
  const tier = usePerfTier();
  const placements = useMemo(
    () => scatterRing({ count: gallery.images.length, seed: 73 }),
    [],
  );

  return (
    <>
      <color attach="background" args={["#05060a"]} />
      <fog attach="fog" args={["#05060a", 14, 36]} />
      <ambientLight intensity={0.25} />
      <spotLight position={[6, 10, 4]} angle={0.6} penumbra={1} intensity={90} color="#12d6ff" />
      <spotLight position={[-7, 8, -6]} angle={0.6} penumbra={1} intensity={70} color="#ff3ea5" />

      {/* Reflective museum floor beneath the whole ring. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[54, 54]} />
        {tier === "high" ? (
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={40}
            roughness={0.7}
            depthScale={1.1}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#070810"
            metalness={0.7}
          />
        ) : (
          <meshStandardMaterial color="#070810" metalness={0.7} roughness={0.4} />
        )}
      </mesh>

      <Float speed={1.2} floatIntensity={0.6}>
        <ParametricForm position={[-8, 2.4, -4]} scale={0.9} />
      </Float>
      <Float speed={1} floatIntensity={0.5}>
        <ParametricForm position={[8, 1.6, 5]} scale={1.1} />
      </Float>
      <Float speed={1.1} floatIntensity={0.6}>
        <ParametricForm position={[-3, 3.4, 9]} scale={0.7} />
      </Float>

      {/* Poem on a glowing plinth. */}
      <pointLight position={[0, 2, 5]} intensity={28} color="#22e0ff" distance={18} />
      <mesh position={[POEM_ANCHOR.position[0], -1.55, POEM_ANCHOR.position[2]]}>
        <boxGeometry args={[1.6, 1, 1.6]} />
        <meshStandardMaterial color="#0a0e1a" emissive="#12d6ff" emissiveIntensity={0.5} metalness={0.8} roughness={0.3} />
      </mesh>
      <ArtFrame
        url={poem.image}
        placement={{ position: POEM_ANCHOR.position, rotation: POEM_ANCHOR.rotation, scale: 1 }}
        size={POEM_SIZE}
        frameColor="#0c1220"
        frameEmissive="#22e0ff"
        frameEmissiveIntensity={1.6}
        onOpen={onOpenPoem}
      />

      {/* Her portraits as neon-framed panels surrounding the viewer. */}
      {placements.map((p, i) => (
        <ArtFrame
          key={gallery.images[i].src}
          url={gallery.images[i].src}
          placement={p}
          frameColor="#0c1220"
          frameEmissive={i % 2 === 0 ? "#22e0ff" : "#ff3ea5"}
          frameEmissiveIntensity={1.5}
          onOpen={() => onOpenPortrait(i)}
          phase={i * 1.9}
        />
      ))}

      <NeonDust count={tier === "low" ? 90 : 240} />

      <EffectComposer>
        <Bloom intensity={tier === "low" ? 0.9 : 1.4} luminanceThreshold={0.35} mipmapBlur />
      </EffectComposer>
    </>
  );
}

const THEME: AlemaTheme = {
  script: "#3fe0ff",
  heading: "#eafcff",
  body: "#d5ecff",
  eyebrow: "#3fe0ff",
  panel: "rgba(9,14,24,0.55)",
  panelBorder: "rgba(34,224,255,0.3)",
  accent: "#22e0ff",
  accentText: "#04121c",
  textOutline: "rgba(2,6,12,0.62)",
};

export function MuseumVariant() {
  const { openPortrait, openPoem, lightbox } = useAlemaLightbox();
  const [chapter, setChapter] = useState(0);

  return (
    <div style={{ position: "relative" }}>
      <div style={baseBg} aria-hidden />
      <OrbitStage presets={RING_STATIONS} chapter={chapter} camera={{ position: RING_STATIONS[0].position, fov: 62 }}>
        <MuseumWorld onOpenPortrait={openPortrait} onOpenPoem={openPoem} />
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
  background: "radial-gradient(1000px 800px at 50% 30%, #0a1320, #030409)",
};
