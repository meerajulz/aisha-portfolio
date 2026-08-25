import { localePath, type Locale } from "./i18n";

/** Resolves a CMS linkItem to an href, in the right language. */
export function resolveLink(link: any, locale: Locale): string {
  if (!link) return "#";
  if (link.kind === "external") return link.href ?? "#";
  const slug = link.page?.slug?.[locale]?.current ?? link.page?.slug?.es?.current;
  return slug ? localePath(locale, `/${slug}`) : localePath(locale, "/");
}
