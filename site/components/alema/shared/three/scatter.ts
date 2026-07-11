/**
 * Deterministic scattering of Alema's portraits through a 3D world.
 *
 * The photos are all of her, so rather than a tidy gallery we place them at
 * pseudo-random positions/rotations/scales along the camera's journey. A seeded
 * PRNG (mulberry32) makes the layout stable within a session and lets each
 * variant look different simply by using a different seed.
 */

export type Placement = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
};

/** Tiny, fast, seedable PRNG. Returns a function producing floats in [0, 1). */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type ScatterOptions = {
  count: number;
  seed: number;
  /** Depth range [near, far] (z) the portraits are spread across. */
  depth: [number, number];
  /** Minimum / maximum horizontal offset from the center line. */
  spreadX?: [number, number];
  /** Vertical spread (+/-) around eye level. */
  spreadY?: number;
  /** Scale range [min, max]. */
  scale?: [number, number];
};

/**
 * Spread `count` portraits along a corridor running down the z axis. Portraits
 * are biased to the left/right of the camera's centre line (so the path stays
 * open) and gently turned to face inward.
 */
/**
 * Scatter portraits in a full 360° ring/cloud *around* the origin, each turned
 * to face the centre. The camera sits inside this ring, so her photos surround
 * the viewer in every direction — the enveloping, "you are inside it" feeling.
 */
export function scatterRing({
  count,
  seed,
  radius = [4.5, 8],
  y = [-1.6, 3.6],
  scale = [0.85, 1.45],
}: {
  count: number;
  seed: number;
  radius?: [number, number];
  y?: [number, number];
  scale?: [number, number];
}): Placement[] {
  const rand = mulberry32(seed);
  const [rMin, rMax] = radius;
  const [yMin, yMax] = y;
  const [sMin, sMax] = scale;
  // Golden angle gives an even angular spread without a gridded look.
  const golden = Math.PI * (3 - Math.sqrt(5));
  const start = rand() * Math.PI * 2;

  return Array.from({ length: count }, (_, i) => {
    const angle = start + i * golden + (rand() - 0.5) * 0.4;
    const r = rMin + rand() * (rMax - rMin);
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const py = yMin + rand() * (yMax - yMin);

    // Face the centre (a plane's +z normal should point back at the origin).
    const ry = Math.atan2(-x, -z);
    const rx = (rand() - 0.5) * 0.18;
    const rz = (rand() - 0.5) * 0.14;

    return {
      position: [x, py, z],
      rotation: [rx, ry, rz],
      scale: sMin + rand() * (sMax - sMin),
    };
  });
}

export function scatterPortraits({
  count,
  seed,
  depth,
  spreadX = [2.2, 6],
  spreadY = 2.6,
  scale = [0.85, 1.5],
}: ScatterOptions): Placement[] {
  const rand = mulberry32(seed);
  const [zNear, zFar] = depth;
  const [xMin, xMax] = spreadX;
  const [sMin, sMax] = scale;

  return Array.from({ length: count }, (_, i) => {
    // Even-ish spread down the corridor, with jitter so it never looks gridded.
    const tz = (i + 0.5) / count;
    const jitter = (rand() - 0.5) * ((zFar - zNear) / count) * 1.1;
    const z = zNear + (zFar - zNear) * tz + jitter;

    // Alternate sides, some pulled closer to the center for variety.
    const side = rand() > 0.5 ? 1 : -1;
    const x = side * (xMin + rand() * (xMax - xMin));
    const y = (rand() - 0.5) * 2 * spreadY;

    // Turn each portrait slightly toward the center line, plus a little tilt.
    const ry = -side * (0.2 + rand() * 0.5);
    const rx = (rand() - 0.5) * 0.25;
    const rz = (rand() - 0.5) * 0.18;

    return {
      position: [x, y, z],
      rotation: [rx, ry, rz],
      scale: sMin + rand() * (sMax - sMin),
    };
  });
}
