"use client";

import { useState } from "react";
import { Lightbox, type LightboxImage } from "../Lightbox";
import { gallery, poem } from "../../content";

type Active = { images: readonly LightboxImage[]; index: number } | null;

/**
 * Shared lightbox state for the immersive variants. Portraits open the full set
 * of her photos (with navigation); the poem opens on its own. Returns handlers
 * to pass to the 3D frames plus the ready-to-render <Lightbox/> overlay.
 */
export function useAlemaLightbox() {
  const images = gallery.images;
  const [active, setActive] = useState<Active>(null);

  return {
    openPortrait: (index: number) => setActive({ images, index }),
    openPoem: () =>
      setActive({
        images: [{ src: poem.image, caption: poem.title, alt: poem.alt }],
        index: 0,
      }),
    lightbox: (
      <Lightbox
        images={active?.images ?? images}
        index={active ? active.index : null}
        onClose={() => setActive(null)}
        onNavigate={(i) => setActive((a) => (a ? { ...a, index: i } : a))}
      />
    ),
  };
}
