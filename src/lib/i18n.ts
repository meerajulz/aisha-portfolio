/**
 * Locale configuration.
 *
 * To launch a new language: move it from PLANNED_LOCALES into LOCALES.
 * Nothing else needs to change — routing, the language switcher, hreflang
 * tags and the Sanity fields are already built for all three.
 */

export const ALL_LOCALES = ["es", "ca", "en"] as const;
export type Locale = (typeof ALL_LOCALES)[number];

/** Languages currently live on the site. */
export const LOCALES: readonly Locale[] = ["es"];

/** Translatable in Sanity, but not yet routable. */
export const PLANNED_LOCALES: readonly Locale[] = ["ca", "en"];

/** The default locale is served without a URL prefix: /clases, not /es/clases */
export const DEFAULT_LOCALE: Locale = "es";

export const LOCALE_LABELS: Record<Locale, string> = {
  es: "Español",
  ca: "Català",
  en: "English",
};

/** BCP-47 tags for <html lang> and hreflang. */
export const LOCALE_TAGS: Record<Locale, string> = {
  es: "es-ES",
  ca: "ca-ES",
  en: "en",
};

export function isLocale(value: string): value is Locale {
  return (ALL_LOCALES as readonly string[]).includes(value);
}

export function isActiveLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Build a path for a locale, omitting the prefix for the default. */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return locale === DEFAULT_LOCALE ? clean : `/${locale}${clean}`;
}
