/**
 * ============================================================================
 *  ALEMA — EDIT EVERYTHING HERE
 * ============================================================================
 *  This is the single place to change the words and pictures of the whole
 *  experience. You do NOT need to touch any other file.
 *
 *  - To change the love letter: edit `loveLetter.paragraphs`.
 *  - To change the closing message: edit `ending`.
 *  - To change the poem image: replace `/public/meri/meri_test.jpg`.
 *  - To change the gallery photos: replace files in `/public/meri/` and/or
 *    edit the `gallery` array below.
 *  - To change the song: replace `music.videoId` with a YouTube video id.
 * ============================================================================
 */

/**
 * SHA-256 hash of the unlock password. The plaintext password is never written
 * in the source — only this hash — and the entered value is hashed in-browser
 * and compared. (On a fully static site nothing client-side is truly secret,
 * but this keeps the password out of the readable source / bundle strings.)
 */
export const PASSWORD_HASH =
  "0ae6d19c57abebc9418cc677045749924fcf83342890b2522203167b8247417a";

/** Copy shown on the password / unlock screen. */
export const gate = {
  eyebrow: "For Alema",
  title: "My love, this little world was made only for you.",
  subtitle:
    "Enter the password to unlock what my heart has been waiting to tell you.",
  placeholder: "Our secret",
  button: "Unlock",
  // Shown when the password is wrong — kept sweet, never like an error.
  wrongMessage: "Not quite, my love \u2764\ufe0f",
  hint: "Think about the blessed day the world received the most beautiful soul\u2026 the day you came into this world.",
} as const;

/** The romantic welcome / hero. */
export const hero = {
  eyebrow: "Welcome home, my architect",
  name: "Alema",
  // A short line under her name.
  tagline: "You design beautiful spaces \u2014 so I built one for your heart.",
  scrollCue: "Scroll, my love",
} as const;

/**
 * =========================  YOUR LOVE LETTER  =============================
 * Replace these paragraphs with your own words. Each string is one paragraph.
 * =========================================================================
 */
export const loveLetter = {
  title: "A Letter For You",
  paragraphs: [
    "My dearest Alema, every place I have ever loved was only a rough sketch until I met you. You are the light that makes every room feel like home, the proportion that makes everything else make sense.",
    "You see the world the way an architect does \u2014 in lines, in light, in the quiet spaces between things. And somehow, in all your blueprints and dreams, you made room for me. I will spend my life being grateful for that.",
    "This little world is my way of saying what I sometimes struggle to say out loud: that you are my favorite masterpiece, my calm and my wonder, the structure that holds up all my happiness.",
  ],
  signature: "Forever yours \u2014 with all my heart",
} as const;

/** A short line that floats mid-journey, among her scattered portraits. */
export const interlude = {
  line: "Wherever I look in this little world\u2026 there you are.",
} as const;

/** The poem you wrote, shown as a framed artwork. */
export const poem = {
  eyebrow: "Written for you",
  title: "The Poem",
  caption: "Some things are too big for a caption. Read slowly, my love.",
  image: "/meri/meri_test.jpg",
  alt: "A poem written for Alema",
} as const;

/**
 * Alema's portraits. These are scattered through the 3D world (not shown as a
 * gallery). Captions are optional and hidden on the floating frames; they only
 * appear softly in the lightbox when a portrait is opened. Add/remove freely.
 */
export const gallery = {
  eyebrow: "You",
  title: "You",
  images: [
    { src: "/meri/meri1.jpg", caption: "You" },
    { src: "/meri/meri2.jpg", caption: "Your smile" },
    { src: "/meri/meri3.jpg", caption: "Your light" },
    { src: "/meri/meri4.jpg", caption: "Beautiful" },
    { src: "/meri/meri5.jpg", caption: "My love" },
    { src: "/meri/meri6.jpg", caption: "Your eyes" },
    { src: "/meri/meri7.jpg", caption: "My Alema" },
    { src: "/meri/meri8.jpg", caption: "Forever you" },
  ],
} as const;

/** The final, closing message. */
export const ending = {
  eyebrow: "One last thing",
  title: "I love you, Alema",
  message:
    "Thank you for being the most beautiful soul the world has ever received. Every day with you is a place I never want to leave. Happy day of you \u2014 today, and always.",
  signature: "\u2764\ufe0f",
} as const;

/** Background music. `videoId` is the YouTube video id to play/embed. */
export const music = {
  videoId: "WjB3vNONHUM",
  title: "Our song",
} as const;

export type GalleryImage = (typeof gallery.images)[number];
