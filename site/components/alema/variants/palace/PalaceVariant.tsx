"use client";

import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
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

/** A soft, warm glowing orb (a "blooming light"). */
function GlowOrb({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    ref.current.scale.setScalar(scale * (1 + Math.sin(t * 1.3 + position[0]) * 0.1));
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.5, 24, 24]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.6} toneMapped={false} />
    </mesh>
  );
}

/** A drifting dome of golden petal points that slowly falls around the viewer. */
function PetalDome({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 2 + Math.random() * 12;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = Math.random() * 14 - 2;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    return arr;
  }, [count]);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    ref.current.rotation.y = t * 0.04;
    ref.current.position.y = ((-t * 0.35) % 14);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.12} color="#ffd7ac" transparent opacity={0.85} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function PalaceWorld({
  onOpenPortrait,
  onOpenPoem,
}: {
  onOpenPortrait: (i: number) => void;
  onOpenPoem: () => void;
}) {
  const tier = usePerfTier();
  const placements = useMemo(
    () => scatterRing({ count: gallery.images.length, seed: 47, radius: [4.5, 8.5], y: [-1.4, 3.8] }),
    [],
  );

  return (
    <>
      <color attach="background" args={["#1a0d1f"]} />
      <fog attach="fog" args={["#1a0d1f", 12, 34]} />
      <ambientLight intensity={0.5} color="#ffb0d0" />
      <pointLight position={[0, 3, 0]} intensity={45} color="#ffcf9e" distance={34} />
      <pointLight position={[-6, -1, -6]} intensity={26} color="#ff9ec4" distance={28} />
      <pointLight position={[6, 2, 6]} intensity={26} color="#d9a6ff" distance={28} />

      {/* Faint reflective palace floor. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.3, 0]}>
        <planeGeometry args={[46, 46]} />
        <meshStandardMaterial color="#241228" roughness={0.35} metalness={0.5} />
      </mesh>

      {/* Blooming lights ringed around the viewer. */}
      <Float speed={1.4} floatIntensity={1.2}>
        <GlowOrb position={[-8, 2, -3]} color="#ffb27a" scale={0.95} />
      </Float>
      <Float speed={1.1} floatIntensity={1}>
        <GlowOrb position={[7.5, -0.5, 4]} color="#ff9ec4" scale={1.15} />
      </Float>
      <Float speed={1.7} floatIntensity={1.4}>
        <GlowOrb position={[-5, 3.5, 7]} color="#d9a6ff" scale={0.8} />
      </Float>
      <Float speed={1.2} floatIntensity={1.1}>
        <GlowOrb position={[6, 3, -7]} color="#ffcf9e" scale={0.95} />
      </Float>
      <Float speed={1.3} floatIntensity={1.2}>
        <GlowOrb position={[0, 4.2, -9]} color="#ffb27a" scale={0.7} />
      </Float>

      {/* Poem on a glowing pedestal. */}
      <pointLight position={[0, 2, 5]} intensity={24} color="#ffe6c2" distance={16} />
      <mesh position={[POEM_ANCHOR.position[0], -1.9, POEM_ANCHOR.position[2]]}>
        <cylinderGeometry args={[0.9, 1.1, 1.4, 32]} />
        <meshStandardMaterial color="#3a2440" emissive="#ffb27a" emissiveIntensity={0.4} roughness={0.4} />
      </mesh>
      <ArtFrame
        url={poem.image}
        placement={{ position: POEM_ANCHOR.position, rotation: POEM_ANCHOR.rotation, scale: 1 }}
        size={POEM_SIZE}
        frameColor="#f6c48c"
        frameEmissive="#ffb27a"
        frameEmissiveIntensity={0.5}
        onOpen={onOpenPoem}
      />

      {/* Her portraits as gold-framed cards surrounding the viewer. */}
      {placements.map((p, i) => (
        <ArtFrame
          key={gallery.images[i].src}
          url={gallery.images[i].src}
          placement={p}
          frameColor="#f6c48c"
          frameEmissive="#ffb27a"
          frameEmissiveIntensity={0.35}
          onOpen={() => onOpenPortrait(i)}
          phase={i * 2.1}
        />
      ))}

      <Sparkles count={tier === "low" ? 70 : 190} scale={[24, 12, 24]} size={3} speed={0.4} color="#ffe6b8" opacity={0.9} />
      <PetalDome count={tier === "low" ? 70 : 170} />

      <EffectComposer>
        {[
          <Bloom key="bloom" intensity={tier === "low" ? 0.9 : 1.5} luminanceThreshold={0.2} mipmapBlur />,
          ...(tier === "high"
            ? [<DepthOfField key="dof" focusDistance={0.01} focalLength={0.035} bokehScale={4} />]
            : []),
        ]}
      </EffectComposer>
    </>
  );
}

const THEME: AlemaTheme = {
  script: "#ffc78e",
  heading: "#fdeaf3",
  body: "#fbe7f2",
  eyebrow: "#f2a9cf",
  panel: "linear-gradient(160deg, rgba(58,27,63,0.55), rgba(40,20,45,0.55))",
  panelBorder: "rgba(255,205,158,0.4)",
  accent: "#f6c48c",
  accentText: "#2a1420",
  textOutline: "rgba(24,8,26,0.6)",
};

export function PalaceVariant() {
  const { openPortrait, openPoem, lightbox } = useAlemaLightbox();
  const [chapter, setChapter] = useState(0);

  return (
    <div style={{ position: "relative" }}>
      <div style={baseBg} aria-hidden />
      <OrbitStage presets={RING_STATIONS} chapter={chapter} camera={{ position: RING_STATIONS[0].position, fov: 62 }}>
        <PalaceWorld onOpenPortrait={openPortrait} onOpenPoem={openPoem} />
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
  background: "radial-gradient(1000px 700px at 50% 20%, #3a1b3f, #150a1b)",
};
