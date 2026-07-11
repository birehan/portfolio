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

const TIMBER = "#6b4a30";

/** A timber post or beam. */
function Timber({
  position,
  size,
}: {
  position: [number, number, number];
  size: [number, number, number];
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={TIMBER} roughness={0.85} metalness={0.03} />
    </mesh>
  );
}

/** A softly glowing paper lantern. */
function Lantern({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.32, 20, 16]} />
        <meshStandardMaterial color="#ffdca0" emissive="#ffb86b" emissiveIntensity={2.4} toneMapped={false} />
      </mesh>
      <pointLight intensity={9} distance={10} color="#ffcf94" />
    </group>
  );
}

/** Falling cherry-blossom petals drifting down around the viewer. */
function Blossoms({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 1 + Math.random() * 13;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = Math.random() * 16;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    return arr;
  }, [count]);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    ref.current.position.y = ((-t * 0.5) % 16);
    ref.current.rotation.y = t * 0.03;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.16} color="#ffc2d6" transparent opacity={0.9} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function ZenWorld({
  onOpenPortrait,
  onOpenPoem,
}: {
  onOpenPortrait: (i: number) => void;
  onOpenPoem: () => void;
}) {
  const tier = usePerfTier();
  const placements = useMemo(
    () => scatterRing({ count: gallery.images.length, seed: 307, radius: [4.2, 7], y: [-1.2, 3] }),
    [],
  );

  return (
    <>
      <color attach="background" args={["#2a2230"]} />
      <fog attach="fog" args={["#2a2230", 14, 34]} />
      <ambientLight intensity={0.42} color="#ffd9b8" />
      <directionalLight position={[6, 11, 4]} intensity={1.1} color="#ffe2c0" castShadow />

      {/* Raked gravel courtyard. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#d8cdb8" roughness={1} />
      </mesh>

      {/* Still reflecting pond off to one side. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-11, -2.46, 0]}>
        <planeGeometry args={[12, 40]} />
        {tier === "high" ? (
          <MeshReflectorMaterial
            blur={[220, 90]}
            resolution={1024}
            mixBlur={1}
            mixStrength={12}
            roughness={0.9}
            depthScale={0.7}
            minDepthThreshold={0.3}
            maxDepthThreshold={1.1}
            color="#16232a"
            metalness={0.3}
          />
        ) : (
          <meshStandardMaterial color="#16232a" roughness={0.5} metalness={0.3} />
        )}
      </mesh>

      {/* Timber pavilion enclosing the viewer, with a low veranda roof. */}
      {[-7, 7].map((x) =>
        [-7, 7].map((z) => (
          <Timber key={`post-${x}-${z}`} position={[x, 0, z]} size={[0.3, 6, 0.3]} />
        )),
      )}
      <Timber position={[0, 2.9, 0]} size={[15, 0.35, 15]} />
      <Timber position={[0, 3.2, 0]} size={[15.6, 0.25, 15.6]} />

      {/* Translucent shoji panels on two sides. */}
      {[7.05, -7.05].map((x) => (
        <mesh key={`shoji-${x}`} position={[x, 0.4, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[14, 5]} />
          <meshStandardMaterial color="#f4ead2" emissive="#ffe6bd" emissiveIntensity={0.5} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Warm lanterns hanging around the veranda. */}
      <Float speed={1} floatIntensity={0.6}>
        <Lantern position={[-4, 1.7, -4]} />
      </Float>
      <Float speed={0.8} floatIntensity={0.5}>
        <Lantern position={[4.5, 1.3, 4]} />
      </Float>
      <Float speed={1.1} floatIntensity={0.7}>
        <Lantern position={[-3.5, 1.9, 5]} />
      </Float>
      <Float speed={0.9} floatIntensity={0.6}>
        <Lantern position={[4, 1.6, -5]} />
      </Float>

      {/* Poem framed under a warm lantern. */}
      <pointLight position={[0, 2, 5]} intensity={18} color="#ffdca0" distance={14} />
      <ArtFrame
        url={poem.image}
        placement={{ position: POEM_ANCHOR.position, rotation: POEM_ANCHOR.rotation, scale: 1 }}
        size={POEM_SIZE}
        frameColor="#3a2a1c"
        onOpen={onOpenPoem}
      />

      {placements.map((p, i) => (
        <ArtFrame
          key={gallery.images[i].src}
          url={gallery.images[i].src}
          placement={p}
          frameColor="#efe3cf"
          onOpen={() => onOpenPortrait(i)}
          phase={i * 1.8}
        />
      ))}

      <Blossoms count={tier === "low" ? 80 : 180} />

      <EffectComposer>
        <Bloom intensity={tier === "low" ? 0.7 : 1.1} luminanceThreshold={0.5} mipmapBlur />
      </EffectComposer>
    </>
  );
}

const THEME: AlemaTheme = {
  script: "#f0b57a",
  heading: "#fbeede",
  body: "#f0e2cf",
  eyebrow: "#d3b48f",
  panel: "rgba(42,34,48,0.58)",
  panelBorder: "rgba(255,214,160,0.28)",
  accent: "#e6a45f",
  accentText: "#2a1c10",
  textOutline: "rgba(26,18,26,0.6)",
};

export function ZenVariant() {
  const { openPortrait, openPoem, lightbox } = useAlemaLightbox();
  const [chapter, setChapter] = useState(0);

  return (
    <div style={{ position: "relative" }}>
      <div style={baseBg} aria-hidden />
      <OrbitStage presets={RING_STATIONS} chapter={chapter} camera={{ position: RING_STATIONS[0].position, fov: 60 }}>
        <ZenWorld onOpenPortrait={openPortrait} onOpenPoem={openPoem} />
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
  background: "radial-gradient(900px 700px at 50% 15%, #3a2c40, #1c1620)",
};
