import { localize } from "@sanity-cfg/lib/localize";
import { urlForImage } from "@sanity-cfg/lib/image";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/lib/i18n";

export function VideoReel({ data, locale }: { data: any; locale: Locale }) {
  const videos = data.videos ?? [];

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-16">
      <SectionHeading label="Vídeo" title={localize<string>(data.heading, locale)} />
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {videos.map((video: any, i: number) => (
          <div key={i} className={i === 0 && videos.length > 2 ? "md:col-span-2" : ""}>
            <VideoEmbed
              url={video.url}
              title={localize<string>(video.title, locale)}
              posterUrl={
                video.poster?.asset ? urlForImage(video.poster).width(1200).url() : undefined
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
}
