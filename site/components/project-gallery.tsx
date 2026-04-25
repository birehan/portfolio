"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative aspect-[16/10] overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface-2)] hover:border-[var(--accent)] transition-colors focus-visible:outline-none"
          >
            <Image
              src={src}
              alt={`${title} – screenshot ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] grid place-items-center bg-black/85 backdrop-blur p-4"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-md bg-white/10 text-white hover:bg-white/20"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(null);
            }}
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative w-full max-w-6xl max-h-[90vh] aspect-[16/10]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[open]}
              alt={`${title} – fullscreen ${open + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
