import Image from "next/image";
import { localize } from "@sanity-cfg/lib/localize";
import { urlForImage } from "@sanity-cfg/lib/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryCarousel } from "@/components/ui/GalleryCarousel";
import type { Locale } from "@/lib/i18n";

export function ImageGrid({ data, locale }: { data: any; locale: Locale }) {
  const images = (data.images ?? []).filter((image: any) => image.asset);

  // Many images: heading stays aligned with the page text, but the carousel
  // itself runs full-bleed — edge to edge, no side padding.
  if (images.length > 3) {
    return (
      <section className="py-24">
        {data.heading && (
          <div className="mx-auto mb-12 max-w-6xl px-6 md:px-16">
            <SectionHeading title={localize<string>(data.heading, locale)} />
          </div>
        )}
        <GalleryCarousel
          images={images.map((image: any) => ({
            src: urlForImage(image).width(1200).url(),
            alt: localize<string>(image.alt, locale) ?? "",
            width: image.asset?.metadata?.dimensions?.width ?? 1200,
            height: image.asset?.metadata?.dimensions?.height ?? 1500,
            credit: image.credit,
          }))}
        />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-16">
      {data.heading && <SectionHeading title={localize<string>(data.heading, locale)} />}
      <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>figure]:mb-6">
        {images.map((image: any, i: number) => {
          const dims = image.asset?.metadata?.dimensions;
          return (
            <figure key={i} className="break-inside-avoid">
              <Image
                src={urlForImage(image).width(900).url()}
                alt={localize<string>(image.alt, locale) ?? ""}
                width={dims?.width ?? 900}
                height={dims?.height ?? 1200}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                placeholder={image.asset.metadata?.lqip ? "blur" : undefined}
                blurDataURL={image.asset.metadata?.lqip}
                className="h-auto w-full"
              />
              {image.credit && <figcaption className="label mt-2">{image.credit}</figcaption>}
            </figure>
          );
        })}
      </div>
    </section>
  );
}
