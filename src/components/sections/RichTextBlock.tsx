import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { localize } from "@sanity-cfg/lib/localize";
import { urlForImage } from "@sanity-cfg/lib/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/lib/i18n";

export function RichTextBlock({ data, locale }: { data: any; locale: Locale }) {
  const body = localize<any[]>(data.body, locale);
  const heading = localize<string>(data.heading, locale);
  const wide = data.width === "wide";

  if (!body?.length) return null;

  return (
    <section className={`mx-auto px-6 py-24 md:px-16 ${wide ? "max-w-5xl" : "max-w-3xl"}`}>
      {heading && <SectionHeading title={heading} />}
      <div className={`prose-rope mt-8 text-[var(--color-fg)] ${wide ? "max-w-none" : ""}`}>
        <PortableText
          value={body}
          components={{
            types: {
              siteImage: ({ value }) =>
                value?.asset ? (
                  <figure className="my-10">
                    <Image
                      src={urlForImage(value).width(1400).url()}
                      alt={localize<string>(value.alt, locale) ?? ""}
                      width={1400}
                      height={933}
                      sizes="(max-width: 768px) 100vw, 70vw"
                      className="h-auto w-full"
                    />
                    {value.credit && (
                      <figcaption className="label mt-3">{value.credit}</figcaption>
                    )}
                  </figure>
                ) : null,
            },
            marks: {
              link: ({ value, children }) => (
                <a
                  href={value?.href}
                  target={value?.newTab ? "_blank" : undefined}
                  rel={value?.newTab ? "noopener noreferrer" : undefined}
                >
                  {children}
                </a>
              ),
            },
          }}
        />
      </div>
    </section>
  );
}
