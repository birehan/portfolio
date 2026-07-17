"use client";

import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles, Environment } from "@react-three/drei";
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

/**
 * A flowing white ribbon built from a smooth (closed) Catmull-Rom curve swept
 * into a TubeGeometry: the parametric, sculptural language of Zaha Hadid,
 * here looping *around* the viewer.
 */
function Ribbon({
  points,
  radius,
  color = "#f4f2ee",
  speed = 0.04,
}: {
  points: [number, number, number][];
  radius: number;
  color?: string;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      points.map((p) => new THREE.Vector3(...p)),
      true,
      "catmullrom",
      0.5,
    );
    return new THREE.TubeGeometry(curve, 260, radius, 26, true);
  }, [points, radius]);

  useFrame((s) => {
    ref.current.rotation.y = Math.sin(s.clock.elapsedTime * speed) * 0.05;
  });

  return (
    <mesh ref={ref} geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial color={color} roughness={0.35} metalness={0.1} side={THREE.DoubleSide} />
    </mesh>
  );
}

function ZahaWorld({
  onOpenPortrait,
  onOpenPoem,
}: {
  onOpenPortrait: (i: number) => void;
  onOpenPoem: () => void;
}) {
  const tier = usePerfTier();
  const placements = useMemo(
    () => scatterRing({ count: gallery.images.length, seed: 91, radius: [4.5, 8], y: [-1.4, 3.6] }),
    [],
  );

  return (
    <>
      <color attach="background" args={["#eef0f2"]} />
      <fog attach="fog" args={["#eef0f2", 18, 40]} />
      <hemisphereLight args={["#ffffff", "#d7dbe0", 1.25]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 16, 8]} intensity={2.4} color="#ffffff" castShadow />
      {tier === "high" && <Environment preset="studio" />}

      {/* Smooth curved white shell ground. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, 0]} receiveShadow>
        <planeGeometry args={[70, 70]} />
        <meshStandardMaterial color="#e9eaec" roughness={0.6} metalness={0.05} />
      </mesh>

      {/* Flowing parametric ribbons looping around the viewer. */}
      <Float speed={0.8} floatIntensity={0.5} rotationIntensity={0.1}>
        <Ribbon
          points={[
            [-9, 3.5, -3],
            [-4, 1.2, -9],
            [4, 2.5, -9],
            [9, 1, -2],
            [6, 3, 6],
            [-2, 4.2, 8],
            [-8, 2, 4],
          ]}
          radius={0.55}
        />
      </Float>
      <Float speed={0.7} floatIntensity={0.4} rotationIntensity={0.1}>
        <Ribbon
          points={[
            [7, -1, -6],
            [2, 0.5, -10],
            [-6, 0, -7],
            [-9, 1.5, 2],
            [-3, 2.5, 8],
            [5, 1.5, 7],
            [9, 0.5, 1],
          ]}
          radius={0.4}
          color="#e7e4de"
          speed={0.05}
        />
      </Float>
      <Float speed={0.9} floatIntensity={0.5} rotationIntensity={0.12}>
        <Ribbon
          points={[
            [-6, 5.5, -5],
            [4, 5, -7],
            [8, 6, 3],
            [-1, 5.4, 8],
            [-7, 6.2, 2],
          ]}
          radius={0.32}
          color="#f7f5f1"
          speed={0.06}
        />
      </Float>

      {/* Poem as a framed artwork against a soft curved wall. */}
      <spotLight position={[0, 6, 4]} target-position={POEM_ANCHOR.position} angle={0.5} penumbra={0.9} intensity={40} color="#fffaf2" />
      <ArtFrame
        url={poem.image}
        placement={{ position: POEM_ANCHOR.position, rotation: POEM_ANCHOR.rotation, scale: 1 }}
        size={POEM_SIZE}
        frameColor="#ffffff"
        onOpen={onOpenPoem}
      />

      {placements.map((p, i) => (
        <ArtFrame
          key={gallery.images[i].src}
          url={gallery.images[i].src}
          placement={p}
          frameColor="#ffffff"
          onOpen={() => onOpenPortrait(i)}
          phase={i * 1.6}
        />
      ))}

      <Sparkles count={tier === "low" ? 40 : 100} scale={[26, 14, 26]} size={2} speed={0.15} color="#ffffff" opacity={0.5} />

      {tier === "high" && (
        <EffectComposer>
          <Bloom intensity={0.5} luminanceThreshold={0.8} mipmapBlur />
        </EffectComposer>
      )}
    </>
  );
}

const THEME: AlemaTheme = {
  script: "#b08d63",
  heading: "#20232a",
  body: "#3f434b",
  eyebrow: "#7f838c",
  panel: "rgba(255,255,255,0.7)",
  panelBorder: "rgba(0,0,0,0.12)",
  accent: "#2a2e37",
  accentText: "#ffffff",
  textOutline: "rgba(255,255,255,0.8)",
};

export function ZahaVariant() {
  const { openPortrait, openPoem, lightbox } = useAlemaLightbox();
  const [chapter, setChapter] = useState(0);

  return (
    <div style={{ position: "relative" }}>
      <div style={baseBg} aria-hidden />
      <OrbitStage presets={RING_STATIONS} chapter={chapter} camera={{ position: RING_STATIONS[0].position, fov: 60 }}>
        <ZahaWorld onOpenPortrait={openPortrait} onOpenPoem={openPoem} />
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
  background: "linear-gradient(180deg, #f4f5f6, #e6e8ea)",
};
