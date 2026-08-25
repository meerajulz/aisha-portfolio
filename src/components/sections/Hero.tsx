import Image from "next/image";
import Link from "next/link";
import { localize } from "@sanity-cfg/lib/localize";
import { urlForImage } from "@sanity-cfg/lib/image";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { resolveLink } from "@/lib/links";
import type { Locale } from "@/lib/i18n";

/**
 * The hero is a thesis: her name, one line, one action — set on paper, with
 * the photograph full-bleed below rather than behind the text.
 *
 * Overlaying dark type on a photograph works on a dark site because the
 * gradient only ever has to darken. On paper it has to lighten the image,
 * which washes out exactly the photographs this site exists to show.
 */
export function Hero({ data, locale }: { data: any; locale: Locale }) {
  const heading = localize<string>(data.heading, locale);
  const standfirst = localize<string>(data.standfirst, locale);
  const image = data.media?.image;
  const video = data.media?.video;
  const cta = data.cta;

  return (
    <section className="pt-32 md:pt-40">
      <div className="mx-auto max-w-6xl px-6 md:px-16">
        <h1 className="display max-w-4xl text-[length:var(--text-display)]">{heading}</h1>
        {standfirst && (
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--color-fg-muted)]">
            {standfirst}
          </p>
        )}
        {cta?.label && (
          <Link
            href={resolveLink(cta, locale)}
            className="mt-10 inline-flex items-center gap-3 border-b border-[var(--color-accent)] pb-1 text-sm text-[var(--color-accent)] transition-colors hover:border-[var(--color-fg)] hover:text-[var(--color-fg)]"
          >
            {localize<string>(cta.label, locale)}
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>

      {image?.asset && (
        <figure className="relative mt-16 aspect-[16/9] w-full md:aspect-[21/9]">
          <Image
            src={urlForImage(image).width(2400).url()}
            alt={localize<string>(image.alt, locale) ?? ""}
            fill
            priority
            placeholder={image.asset.metadata?.lqip ? "blur" : undefined}
            blurDataURL={image.asset.metadata?.lqip}
            sizes="100vw"
            className="object-cover"
          />
        </figure>
      )}

      {!image?.asset && video?.url && (
        <div className="mt-16">
          <VideoEmbed url={video.url} title={localize<string>(video.title, locale)} />
        </div>
      )}
    </section>
  );
}
