import Image from "next/image";
import Link from "next/link";
import { localize } from "@sanity-cfg/lib/localize";
import { urlForImage } from "@sanity-cfg/lib/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { localePath, type Locale } from "@/lib/i18n";

export function FeaturedProjects({ data, locale }: { data: any; locale: Locale }) {
  const projects = data.projects ?? [];

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-16">
      <SectionHeading label="Trabajos" title={localize<string>(data.heading, locale)} />
      <ul className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project: any) => {
          const slug = project.slug?.[locale]?.current ?? project.slug?.es?.current;
          if (!slug) return null;
          return (
            <li key={project._id}>
              <Link href={localePath(locale, `/${slug}`)} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-surface)]">
                  {project.cover?.asset && (
                    <Image
                      src={urlForImage(project.cover).width(800).url()}
                      alt={localize<string>(project.cover.alt, locale) ?? ""}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder={project.cover.asset.metadata?.lqip ? "blur" : undefined}
                      blurDataURL={project.cover.asset.metadata?.lqip}
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="display text-xl text-[var(--color-fg)]">
                    {localize<string>(project.title, locale)}
                  </h3>
                  {project.year && <span className="label shrink-0">{project.year}</span>}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
