import Image from "next/image";
import { localize } from "@sanity-cfg/lib/localize";
import { urlForImage } from "@sanity-cfg/lib/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/lib/i18n";

export function ImageGrid({ data, locale }: { data: any; locale: Locale }) {
  const images = data.images ?? [];

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-16">
      {data.heading && <SectionHeading title={localize<string>(data.heading, locale)} />}
      <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>figure]:mb-6">
        {images.map((image: any, i: number) => {
          const dims = image.asset?.metadata?.dimensions;
          if (!image.asset) return null;
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
