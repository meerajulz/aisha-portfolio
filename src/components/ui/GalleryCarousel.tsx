"use client";

import Image from "next/image";
import { useRef } from "react";

type Slide = { src: string; alt: string; width: number; height: number; credit?: string };

/**
 * Horizontal, swipeable image carousel used for project galleries with many
 * images, where the masonry grid gets unwieldy. Scroll-snap drives the swipe
 * on touch; the arrow buttons page by one viewport on larger screens.
 */
export function GalleryCarousel({ images }: { images: Slide[] }) {
  const track = useRef<HTMLUListElement>(null);

  const page = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <div className="group relative w-full">
      <ul
        ref={track}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, i) => (
          <li
            key={i}
            className="w-[85%] shrink-0 snap-center sm:w-[48%] lg:w-[32%]"
          >
            <figure>
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 32vw"
                className="h-auto w-full"
              />
              {img.credit && <figcaption className="label mt-2">{img.credit}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => page(-1)}
        aria-label="Imagen anterior"
        className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-bg)]/80 text-[var(--color-fg)] shadow backdrop-blur transition hover:bg-[var(--color-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] md:left-6"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => page(1)}
        aria-label="Imagen siguiente"
        className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-[var(--color-bg)]/80 text-[var(--color-fg)] shadow backdrop-blur transition hover:bg-[var(--color-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] md:right-6"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
