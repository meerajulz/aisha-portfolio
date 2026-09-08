import Image from "next/image";

/**
 * Autoplaying, muted, looping background video — decorative, not a player.
 *
 * Vimeo's `background=1` strips all UI and covers the frame on its own; the
 * YouTube fallback fakes the same look with mute/loop/no-controls. The poster
 * image sits underneath so there is always something on screen while the embed
 * loads, and is all that shows for visitors who ask for reduced motion.
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
    : `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0`;
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

  if (!parsed) {
    // Unparseable link: fall back to the poster so the hero is never empty.
    return posterUrl ? (
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
  }

  return (
    <>
      {posterUrl && (
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
      )}
      {/* Scaled to always cover: width fills, height overflows and is cropped,
          so a 16:9 video fully covers the wider 21:9 frame. Vimeo's background
          mode covers within the iframe too, so both providers stay full-bleed. */}
      <iframe
        src={backgroundSrc(parsed.provider, parsed.id)}
        title={title || "Vídeo de fondo"}
        allow="autoplay; fullscreen; picture-in-picture"
        aria-hidden="true"
        tabIndex={-1}
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-video h-auto min-h-full w-full min-w-full -translate-x-1/2 -translate-y-1/2 motion-reduce:hidden"
      />
    </>
  );
}
