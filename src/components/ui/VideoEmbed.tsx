"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Facade pattern: shows a poster and only loads the iframe on click.
 *
 * Three unlazy embeds on a home page will wreck the Lighthouse score, and a
 * portfolio gets judged on how it feels in the first two seconds.
 *
 * Vimeo is the default provider — see sanity/schemas/objects/videoEmbed.ts
 * for why. Swapping in Mux later means changing only this file.
 */

type Provider = "vimeo" | "youtube";

function parse(url: string): { provider: Provider; id: string } | null {
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeo) return { provider: "vimeo", id: vimeo[1] };
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/i);
  if (yt) return { provider: "youtube", id: yt[1] };
  return null;
}

function embedSrc(provider: Provider, id: string) {
  return provider === "vimeo"
    ? `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1&title=0&byline=0&portrait=0`
    : `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
}

export function VideoEmbed({
  url,
  title,
  posterUrl,
}: {
  url: string;
  title?: string;
  posterUrl?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const parsed = parse(url);

  if (!parsed) return null;

  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden bg-[var(--color-surface)]">
        <iframe
          src={embedSrc(parsed.provider, parsed.id)}
          title={title || "Vídeo"}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <figure>
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={title ? `Reproducir: ${title}` : "Reproducir vídeo"}
        className="group relative block aspect-video w-full overflow-hidden bg-[var(--color-surface)]"
      >
        {posterUrl && (
          <Image
            src={posterUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        )}
        <span className="absolute inset-0 flex items-center justify-center">
          {/* Filled disc, not an outline: the play control has to survive
              landing on any photograph, light or dark. */}
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-bg)]/90 shadow-sm transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5 fill-[var(--color-accent)]">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </button>
      {title && <figcaption className="label mt-3">{title}</figcaption>}
    </figure>
  );
}
