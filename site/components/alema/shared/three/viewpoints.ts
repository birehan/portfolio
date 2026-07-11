/** A camera viewpoint: where the camera sits and what it looks at (orbit target). */
export type Viewpoint = {
  position: [number, number, number];
  target: [number, number, number];
};

/**
 * The five chapters of the story, in order. Each variant supplies one Viewpoint
 * per chapter so "Next/Prev" can glide the orbit camera to a framed shot.
 */
export const CHAPTERS = ["welcome", "letter", "poem", "you", "ending"] as const;
export type ChapterId = (typeof CHAPTERS)[number];

/**
 * Shared camera stations for every world. The camera lives *inside* a ring of
 * her portraits (eye level ~1.4), and each chapter turns to face a different
 * direction of the surrounding space, so exploring feels enveloping rather than
 * like looking at a distant diorama.
 *
 *   welcome -> looks -z (open space + her name)
 *   letter  -> looks +x
 *   poem    -> looks +z (where the poem artwork hangs)
 *   you     -> lifts up + back to take in all the portraits at once
 *   ending  -> looks -x
 */
export const RING_STATIONS: Viewpoint[] = [
  { position: [0, 1.6, 4], target: [0, 1.3, 0] },
  { position: [-3.8, 1.6, 0], target: [0, 1.3, 0] },
  // Poem chapter: sit head-on and close so the artwork fills the view.
  { position: [0, 1.3, 1.9], target: [0, 1.2, 5.4] },
  { position: [0, 3.6, 6.8], target: [0, 1.1, 0] },
  { position: [3.8, 1.7, 0], target: [0, 1.3, 0] },
];

/**
 * Where the poem artwork hangs in every world: out along +z, fairly close to
 * the centre, its face turned back toward the viewer so the "poem" chapter
 * looks right at it. Sized to the 1280x960 (4:3) image so it is never cropped.
 */
export const POEM_ANCHOR = {
  position: [0, 1.2, 5.4] as [number, number, number],
  rotation: [0, Math.PI, 0] as [number, number, number],
};
export const POEM_SIZE: [number, number] = [4.8, 3.6];

/**
 * Explicit anchor for the floating 3D story text of each chapter: where it
 * sits, and which point it should turn to face (the chapter's camera station),
 * so it always reads head-on there. The poem caption is placed *below* the
 * artwork rather than over it.
 */
export type StoryAnchor = {
  position: [number, number, number];
  faceFrom: [number, number, number];
};
export const STORY_ANCHORS: StoryAnchor[] = [
  { position: [0, 1.75, -0.3], faceFrom: [0, 1.6, 4] },
  { position: [-0.6, 1.55, 0], faceFrom: [-3.8, 1.6, 0] },
  { position: [0, -0.75, 5.1], faceFrom: [0, 1.3, 1.9] },
  { position: [0, 2.7, 2.6], faceFrom: [0, 3.6, 6.8] },
  { position: [0.6, 1.6, 0], faceFrom: [3.8, 1.7, 0] },
];
