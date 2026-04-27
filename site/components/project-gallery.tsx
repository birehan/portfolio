"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  const n = images.length;
  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + n) % n);
    },
    [n],
  );

  useEffect(() => {
    if (n <= 1) return;
    const onKey = (e: KeyboardEvent) => {
      if (open !== null) return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [n, go, open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (n === 0) return null;

  const arrowBtnClass =
    "h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-xl border-2 border-[var(--border)] bg-[var(--surface)] text-[var(--text)] shadow-sm hover:bg-[var(--surface-2)] hover:border-[var(--accent)]";

  const track = (
    <div className="relative aspect-[16/9] md:aspect-[2/1] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]">
      <div
        className="flex h-full w-full transition-transform duration-300 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpen(i)}
            className="relative min-w-full shrink-0 h-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-inset"
            aria-label={`View screenshot ${i + 1} of ${n} full screen`}
          >
            <Image
              src={src}
              alt={`${title}, screenshot ${i + 1} of ${n}`}
              fill
              priority={i === 0}
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-top"
            />
          </button>
        ))}
      </div>
    </div>
  );

  const dots =
    n > 1 ? (
      <div
        className="flex justify-center gap-2 pt-1"
        aria-label="Slide indicators"
      >
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`Go to image ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
              i === index
                ? "bg-[var(--accent)] scale-110"
                : "bg-[var(--muted)]/45 hover:bg-[var(--muted)]",
            )}
          />
        ))}
      </div>
    ) : null;

  return (
    <>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={`${title} image gallery`}
        className="w-full"
      >
        {n > 1 ? (
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className={arrowBtnClass}
              onClick={() => go(-1)}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.25} />
            </Button>

            <div className="min-w-0 flex-1 flex flex-col gap-3">
              {track}
              {dots}
            </div>

            <Button
              type="button"
              variant="secondary"
              size="icon"
              className={arrowBtnClass}
              onClick={() => go(1)}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.25} />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {track}
            {dots}
          </div>
        )}
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
              alt={`${title}, fullscreen ${open + 1}`}
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
