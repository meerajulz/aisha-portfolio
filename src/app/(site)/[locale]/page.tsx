import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity-cfg/lib/client";
import { homeQuery } from "@sanity-cfg/lib/queries";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { RopeLine } from "@/components/ui/RopeLine";
import { isActiveLocale } from "@/lib/i18n";

/**
 * The home page is not a special case — it's the page document marked
 * isHome, rendered through the same section renderer as everything else.
 * That's what keeps it editable.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isActiveLocale(locale)) notFound();

  const page = await sanityFetch<any>({ query: homeQuery, tags: ["page"] });
  if (!page) notFound();

  return (
    <div className="relative">
      <RopeLine segments={page.sections?.length ?? 4} />
      <SectionRenderer sections={page.sections} locale={locale} />
    </div>
  );
}
