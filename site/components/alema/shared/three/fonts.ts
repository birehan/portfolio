/**
 * Font-file URLs for the in-world 3D text (drei/troika <Text>). troika needs a
 * real font file (not a `next/font` CSS variable), so these OFL fonts are
 * bundled under `public/fonts/` and served from the site root.
 *
 * IMPORTANT: troika-three-text parses TTF/OTF and WOFF (v1) only; it does NOT
 * support WOFF2 (Brotli). Feeding it a .woff2 makes `preloadFont` never resolve,
 * which suspends drei's <Text> forever and blanks the whole canvas. Keep these
 * as .woff (v1) / .ttf.
 *
 *   display        Playfair Display 700  -> her name, titles, ending
 *   displayItalic  Playfair Display italic -> tagline, poem caption
 *   body           Cormorant Garamond    -> letter paragraphs + eyebrows
 *   script         Great Vibes           -> script accents / signature
 */
export const FONTS = {
  display: "/fonts/playfair-700.woff",
  displayItalic: "/fonts/playfair-italic.woff",
  body: "/fonts/cormorant-400.woff",
  script: "/fonts/great-vibes.woff",
} as const;
