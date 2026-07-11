"use client";

import { useMemo, useState } from "react";
import { MeshReflectorMaterial } from "@react-three/drei";
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

const CONCRETE = "#9c9a95";

/** A raw concrete wall/slab. */
function Concrete({
  position,
  size,
}: {
  position: [number, number, number];
  size: [number, number, number];
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={CONCRETE} roughness={0.92} metalness={0.02} />
    </mesh>
  );
}

function AndoWorld({
  onOpenPortrait,
  onOpenPoem,
}: {
  onOpenPortrait: (i: number) => void;
  onOpenPoem: () => void;
}) {
  const tier = usePerfTier();
  const placements = useMemo(
    () => scatterRing({ count: gallery.images.length, seed: 137, radius: [4.2, 7.5], y: [-1.4, 3.2] }),
    [],
  );

  return (
    <>
      <color attach="background" args={["#2a2926"]} />
      <fog attach="fog" args={["#2a2926", 14, 34]} />
      <ambientLight intensity={0.35} color="#cfc9bd" />
      {/* Dramatic light shaft raking down into the chamber. */}
      <spotLight position={[-3, 13, -6]} target-position={[0, 0, -4]} angle={0.34} penumbra={0.9} intensity={140} color="#fff3df" castShadow />
      <directionalLight position={[5, 9, 6]} intensity={0.6} color="#dfe4ea" />

      {/* Still reflective water floor (the Ando signature pool). */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]}>
        <planeGeometry args={[54, 54]} />
        {tier === "high" ? (
          <MeshReflectorMaterial
            blur={[200, 80]}
            resolution={1024}
            mixBlur={1}
            mixStrength={20}
            roughness={0.85}
            depthScale={0.9}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.2}
            color="#20201d"
            metalness={0.4}
          />
        ) : (
          <meshStandardMaterial color="#20201d" roughness={0.6} metalness={0.3} />
        )}
      </mesh>

      {/* Concrete chamber enclosing the viewer. */}
      <Concrete position={[-10, 3, 0]} size={[0.6, 12, 26]} />
      <Concrete position={[10, 3, 0]} size={[0.6, 12, 26]} />
      <Concrete position={[0, 3, 12.5]} size={[20, 12, 0.6]} />
      <Concrete position={[0, 8.4, 0]} size={[20.6, 0.6, 26]} />

      {/* Back wall (behind the poem) carrying the "cross of light". */}
      <Concrete position={[0, 3, -12.5]} size={[20, 12, 0.6]} />
      <mesh position={[0, 3.4, -12.1]}>
        <boxGeometry args={[0.4, 8, 0.2]} />
        <meshStandardMaterial color="#ffffff" emissive="#fff6e6" emissiveIntensity={4} toneMapped={false} />
      </mesh>
      <mesh position={[0, 3.4, -12.1]}>
        <boxGeometry args={[4, 0.4, 0.2]} />
        <meshStandardMaterial color="#ffffff" emissive="#fff6e6" emissiveIntensity={4} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 3.4, -9]} intensity={40} distance={26} color="#fff1d8" />

      {/* Poem framed on the concrete, lit from above. */}
      <spotLight position={[0, 6, 4]} target-position={POEM_ANCHOR.position} angle={0.45} penumbra={0.9} intensity={55} color="#fff3df" />
      <ArtFrame
        url={poem.image}
        placement={{ position: POEM_ANCHOR.position, rotation: POEM_ANCHOR.rotation, scale: 1 }}
        size={POEM_SIZE}
        frameColor="#e9e4d8"
        onOpen={onOpenPoem}
      />

      {placements.map((p, i) => (
        <ArtFrame
          key={gallery.images[i].src}
          url={gallery.images[i].src}
          placement={p}
          frameColor="#efeadf"
          onOpen={() => onOpenPortrait(i)}
          phase={i * 1.8}
        />
      ))}

      <EffectComposer>
        <Bloom intensity={tier === "low" ? 0.7 : 1.1} luminanceThreshold={0.6} mipmapBlur />
      </EffectComposer>
    </>
  );
}

const THEME: AlemaTheme = {
  script: "#c9a06a",
  heading: "#f3efe6",
  body: "#e2ddd1",
  eyebrow: "#b7b1a2",
  panel: "rgba(38,37,33,0.58)",
  panelBorder: "rgba(255,246,230,0.24)",
  accent: "#c9a06a",
  accentText: "#241f15",
  textOutline: "rgba(20,18,14,0.62)",
};

export function AndoVariant() {
  const { openPortrait, openPoem, lightbox } = useAlemaLightbox();
  const [chapter, setChapter] = useState(0);

  return (
    <div style={{ position: "relative" }}>
      <div style={baseBg} aria-hidden />
      <OrbitStage presets={RING_STATIONS} chapter={chapter} camera={{ position: RING_STATIONS[0].position, fov: 60 }}>
        <AndoWorld onOpenPortrait={openPortrait} onOpenPoem={openPoem} />
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
  background: "radial-gradient(900px 700px at 50% 20%, #35332e, #1b1a17)",
};
