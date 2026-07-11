"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { hero, loveLetter, poem, interlude, ending } from "../../content";
import { STORY_ANCHORS } from "./viewpoints";
import { FONTS } from "./fonts";
import type { AlemaTheme } from "./theme";

type StoryTextProps = {
  theme: AlemaTheme;
  chapter: number;
};

/** One line of 3D text within a chapter block. */
type Line = {
  key: string;
  text: string;
  font: string;
  size: number;
  color: string;
  /** Vertical position within the block (world units, +up). */
  y: number;
  letterSpacing?: number;
  maxWidth?: number;
  lineHeight?: number;
  sdf?: number;
};

/**
 * The story rendered as true 3D text (drei/troika SDF <Text>) that lives inside
 * the world and stays razor-sharp at any zoom. Each chapter is a small stack of
 * lines, positioned at its anchor and turned to face that chapter's camera
 * station so it reads head-on, while still tilting naturally as she orbits.
 * A cheap scale/position settle plays on each chapter change (no blur).
 */
export function StoryText({ theme, chapter }: StoryTextProps) {
  const group = useRef<THREE.Group>(null!);
  const intro = useRef(0);

  const anchor = STORY_ANCHORS[Math.min(chapter, STORY_ANCHORS.length - 1)];
  const yaw = useMemo(() => {
    const dx = anchor.faceFrom[0] - anchor.position[0];
    const dz = anchor.faceFrom[2] - anchor.position[2];
    return Math.atan2(dx, dz);
  }, [anchor]);

  const outline = theme.textOutline ?? "rgba(0,0,0,0.55)";
  const lines = useMemo(() => buildChapter(chapter, theme), [chapter, theme]);

  // Replay the settle animation whenever the chapter changes.
  useEffect(() => {
    intro.current = 0;
  }, [chapter]);

  useFrame((_, dt) => {
    if (!group.current) return;
    intro.current = Math.min(1, intro.current + dt * 2.4);
    const e = 1 - Math.pow(1 - intro.current, 3); // easeOutCubic
    const s = 0.92 + 0.08 * e;
    group.current.scale.setScalar(s);
    group.current.position.set(
      anchor.position[0],
      anchor.position[1] + (1 - e) * 0.18,
      anchor.position[2],
    );
  });

  return (
    // Isolate font loading: drei's <Text> suspends until troika finishes
    // parsing the font. Its own boundary means a slow/failed font can never
    // blank the surrounding world — only the text waits.
    <Suspense fallback={null}>
      <group ref={group} position={anchor.position} rotation={[0, yaw, 0]}>
        {lines.map((l) => (
          <Text
            key={l.key}
            position={[0, l.y, 0]}
            font={l.font}
            fontSize={l.size}
            color={l.color}
            anchorX="center"
            anchorY="middle"
            textAlign="center"
            maxWidth={l.maxWidth}
            lineHeight={l.lineHeight}
            letterSpacing={l.letterSpacing}
            sdfGlyphSize={l.sdf ?? 64}
            outlineWidth={0.006}
            outlineColor={outline}
            outlineOpacity={0.85}
            outlineBlur="18%"
          >
            {l.text}
          </Text>
        ))}
      </group>
    </Suspense>
  );
}

/** Build the ordered lines for a chapter, reading all copy from content.ts. */
function buildChapter(chapter: number, theme: AlemaTheme): Line[] {
  const { script, heading, body, eyebrow } = theme;

  switch (chapter) {
    case 0:
      return [
        { key: "cue", text: hero.eyebrow, font: FONTS.script, size: 0.32, color: script, y: 0.8 },
        { key: "name", text: hero.name, font: FONTS.display, size: 0.95, color: heading, y: 0.16, sdf: 128 },
        { key: "tag", text: hero.tagline, font: FONTS.displayItalic, size: 0.16, color: body, y: -0.62, maxWidth: 3.6, lineHeight: 1.35 },
      ];
    case 1:
      return [
        { key: "title", text: loveLetter.title.toUpperCase(), font: FONTS.body, size: 0.14, color: eyebrow, y: 1.08, letterSpacing: 0.18 },
        {
          key: "paras",
          text: loveLetter.paragraphs.join("\n\n"),
          font: FONTS.body,
          size: 0.135,
          color: body,
          y: 0.02,
          maxWidth: 3.7,
          lineHeight: 1.5,
        },
        { key: "sign", text: loveLetter.signature, font: FONTS.script, size: 0.28, color: script, y: -1.2 },
      ];
    case 2:
      return [
        { key: "eyebrow", text: poem.eyebrow, font: FONTS.script, size: 0.28, color: script, y: 0.18 },
        { key: "hint", text: "Tap the artwork to read it", font: FONTS.body, size: 0.11, color: eyebrow, y: -0.2, letterSpacing: 0.16 },
      ];
    case 3:
      return [
        { key: "line", text: interlude.line, font: FONTS.script, size: 0.36, color: script, y: 0.2, maxWidth: 4.2, lineHeight: 1.2 },
        { key: "hint", text: "Tap any portrait to see it closer", font: FONTS.body, size: 0.11, color: eyebrow, y: -0.45, letterSpacing: 0.16 },
      ];
    case 4:
    default:
      return [
        { key: "eyebrow", text: ending.eyebrow.toUpperCase(), font: FONTS.body, size: 0.13, color: eyebrow, y: 0.95, letterSpacing: 0.18 },
        { key: "title", text: ending.title, font: FONTS.display, size: 0.46, color: heading, y: 0.42, sdf: 128 },
        { key: "msg", text: ending.message, font: FONTS.body, size: 0.135, color: body, y: -0.4, maxWidth: 3.7, lineHeight: 1.45 },
      ];
  }
}
