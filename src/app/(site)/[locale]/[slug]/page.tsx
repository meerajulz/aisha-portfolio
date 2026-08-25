import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@sanity-cfg/lib/client";
import {
  allPageSlugsQuery,
  pageBySlugQuery,
  projectBySlugQuery,
} from "@sanity-cfg/lib/queries";
import { localize } from "@sanity-cfg/lib/localize";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { RopeLine } from "@/components/ui/RopeLine";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { LOCALES, isActiveLocale, type Locale } from "@/lib/i18n";

/**
 * One route for every page and project.
 *
 * Adding a page = create the document, add it to the menu, publish.
 * No code, no deploy. That is the entire point of the architecture.
 */

export async function generateStaticParams() {
  const pages = await sanityFetch<any[]>({ query: allPageSlugsQuery, tags: ["page"] });
  return pages.flatMap((page) =>
    LOCALES.flatMap((locale) => {
      const slug = page.slug?.[locale]?.current;
      return slug && !page.isHome ? [{ locale, slug }] : [];
    }),
  );
}

async function load(locale: Locale, slug: string) {
  const page = await sanityFetch<any>({
    query: pageBySlugQuery,
    params: { locale, slug },
    tags: ["page"],
  });
  if (page) return { kind: "page" as const, doc: page };

  const project = await sanityFetch<any>({
    query: projectBySlugQuery,
    params: { locale, slug },
    tags: ["project"],
  });
  if (project) return { kind: "project" as const, doc: project };

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isActiveLocale(locale)) return {};

  const result = await load(locale, slug);
  if (!result) return {};

  const { doc } = result;
  const title = localize<string>(doc.seo?.metaTitle, locale) ?? localize<string>(doc.title, locale);

  return {
    title,
    description: localize<string>(doc.seo?.metaDescription, locale),
    robots: doc.seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isActiveLocale(locale)) notFound();

  const result = await load(locale, slug);
  if (!result) notFound();

  if (result.kind === "project") {
    return <ProjectDetail project={result.doc} locale={locale} />;
  }

  return (
    <div className="relative">
      <RopeLine segments={result.doc.sections?.length ?? 4} />
      <SectionRenderer sections={result.doc.sections} locale={locale} />
    </div>
  );
}
