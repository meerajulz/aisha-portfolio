import type { Locale } from "@/lib/i18n";
import { Hero } from "./Hero";
import { VideoReel } from "./VideoReel";
import { FeaturedProjects } from "./FeaturedProjects";
import { Classes } from "./Classes";
import { RichTextBlock } from "./RichTextBlock";
import { ImageGrid } from "./ImageGrid";
import { ContactCta } from "./ContactCta";
import { Workshops } from "./Workshops";
import { ComingSoon } from "./ComingSoon";

/**
 * Maps a section's _type to its component.
 *
 * Adding a block type: one schema in sanity/schemas/objects/sections.ts,
 * one component, one line here. That's the whole extension surface.
 */
const REGISTRY = {
  heroSection: Hero,
  videoReelSection: VideoReel,
  featuredProjectsSection: FeaturedProjects,
  classesSection: Classes,
  richTextSection: RichTextBlock,
  imageGridSection: ImageGrid,
  workshopsSection: Workshops,
  comingSoonSection: ComingSoon,
  contactCtaSection: ContactCta,
} as const;

type Section = { _type: keyof typeof REGISTRY; _key: string } & Record<string, any>;

export function SectionRenderer({
  sections,
  locale,
}: {
  sections: Section[] | null | undefined;
  locale: Locale;
}) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section) => {
        const Component = REGISTRY[section._type] as
          | ((props: any) => React.ReactNode)
          | undefined;

        // An unknown block means the schema shipped ahead of the component.
        // Skip it rather than crashing the whole page for the visitor.
        if (!Component) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`No component registered for section type "${section._type}"`);
          }
          return null;
        }

        return <Component key={section._key} data={section} locale={locale} />;
      })}
    </>
  );
}
