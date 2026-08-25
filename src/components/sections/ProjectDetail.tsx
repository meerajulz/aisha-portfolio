import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { localize } from "@sanity-cfg/lib/localize";
import { urlForImage } from "@sanity-cfg/lib/image";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import type { Locale } from "@/lib/i18n";

export function ProjectDetail({ project, locale }: { project: any; locale: Locale }) {
  const body = localize<any[]>(project.body, locale);

  return (
    <article>
      <header className="pt-32 md:pt-40">
        <div className="mx-auto max-w-4xl px-6 md:px-16">
          <h1 className="display text-[length:var(--text-heading)]">
            {localize<string>(project.title, locale)}
          </h1>
          <div className="mt-4 flex flex-wrap gap-6">
            {project.year && <span className="label">{project.year}</span>}
            {project.collaborators && <span className="label">{project.collaborators}</span>}
          </div>
        </div>
        {project.cover?.asset && (
          <figure className="relative mt-12 aspect-[16/9] w-full">
            <Image
              src={urlForImage(project.cover).width(2400).url()}
              alt={localize<string>(project.cover.alt, locale) ?? ""}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </figure>
        )}
      </header>

      {body?.length ? (
        <div className="mx-auto max-w-3xl px-6 py-20 md:px-16">
          <div className="prose-rope">
            <PortableText value={body} />
          </div>
        </div>
      ) : null}

      {project.videos?.length ? (
        <div className="mx-auto grid max-w-5xl gap-10 px-6 pb-20 md:px-16">
          {project.videos.map((video: any, i: number) => (
            <VideoEmbed
              key={i}
              url={video.url}
              title={localize<string>(video.title, locale)}
              posterUrl={video.poster?.asset ? urlForImage(video.poster).width(1400).url() : undefined}
            />
          ))}
        </div>
      ) : null}

      {project.gallery?.length ? (
        <div className="mx-auto max-w-6xl columns-1 gap-6 px-6 pb-24 sm:columns-2 md:px-16 [&>figure]:mb-6">
          {project.gallery.map((image: any, i: number) => (
            <figure key={i} className="break-inside-avoid">
              <Image
                src={urlForImage(image).width(1000).url()}
                alt={localize<string>(image.alt, locale) ?? ""}
                width={image.asset?.metadata?.dimensions?.width ?? 1000}
                height={image.asset?.metadata?.dimensions?.height ?? 1400}
                sizes="(max-width: 640px) 100vw, 50vw"
                className="h-auto w-full"
              />
            </figure>
          ))}
        </div>
      ) : null}
    </article>
  );
}
