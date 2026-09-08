"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/**
 * Autoplaying, muted, looping background video — decorative, not a player.
 *
 * Vimeo's `background=1` strips all UI and covers the frame on its own; the
 * YouTube fallback fakes the same look with mute/loop/no-controls. The poster
 * image sits underneath so there is always something on screen while the embed
 * loads, and is all that shows for visitors who ask for reduced motion.
 *
 * A single pause/play button lets visitors stop the motion. We drive the
 * embeds over postMessage instead of loading each provider's full SDK.
 */

type Provider = "vimeo" | "youtube";

function parse(url: string): { provider: Provider; id: string } | null {
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeo) return { provider: "vimeo", id: vimeo[1] };
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/i);
  if (yt) return { provider: "youtube", id: yt[1] };
  return null;
}

function backgroundSrc(provider: Provider, id: string) {
  return provider === "vimeo"
    ? `https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&dnt=1`
    : `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1`;
}

/** Fire a play/pause command at the embed without loading its SDK. */
function command(iframe: HTMLIFrameElement | null, provider: Provider, play: boolean) {
  const win = iframe?.contentWindow;
  if (!win) return;
  const message =
    provider === "vimeo"
      ? JSON.stringify({ method: play ? "play" : "pause" })
      : JSON.stringify({ event: "command", func: play ? "playVideo" : "pauseVideo", args: "" });
  win.postMessage(message, "*");
}

export function BackgroundVideo({
  url,
  title,
  posterUrl,
  posterAlt,
  posterBlur,
}: {
  url: string;
  title?: string;
  posterUrl?: string;
  posterAlt?: string;
  posterBlur?: string;
}) {
  const parsed = parse(url);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(true);

  const poster = posterUrl ? (
    <Image
      src={posterUrl}
      alt={posterAlt ?? ""}
      fill
      priority
      placeholder={posterBlur ? "blur" : undefined}
      blurDataURL={posterBlur}
      sizes="100vw"
      className="object-cover"
    />
  ) : null;

  // Unparseable link: fall back to the poster so the hero is never empty.
  if (!parsed) return poster;

  const toggle = () => {
    const next = !playing;
    command(iframeRef.current, parsed.provider, next);
    setPlaying(next);
  };

  return (
    <>
      {poster}
      {/* Scaled to always cover: width fills, height overflows and is cropped,
          so a 16:9 video fully covers the wider 21:9 frame. Vimeo's background
          mode covers within the iframe too, so both providers stay full-bleed. */}
      <iframe
        ref={iframeRef}
        src={backgroundSrc(parsed.provider, parsed.id)}
        title={title || "Vídeo de fondo"}
        allow="autoplay; fullscreen; picture-in-picture"
        aria-hidden="true"
        tabIndex={-1}
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-video h-auto min-h-full w-full min-w-full -translate-x-1/2 -translate-y-1/2 motion-reduce:hidden"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pausar vídeo" : "Reproducir vídeo"}
        className="absolute bottom-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:hidden"
      >
        {playing ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </>
  );
}
