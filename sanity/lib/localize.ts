import { DEFAULT_LOCALE, type Locale } from "../../src/lib/i18n";

type Localized<T> = Partial<Record<Locale, T>> | null | undefined;

/**
 * Falls back to the default language when a translation is missing.
 *
 * This is what lets Catalan and English be filled in gradually: an
 * untranslated page renders in Spanish rather than rendering blank.
 */
export function localize<T>(field: Localized<T>, locale: Locale): T | undefined {
  if (!field) return undefined;
  return field[locale] ?? field[DEFAULT_LOCALE];
}

/** True when every translatable slot for this locale is filled. */
export function isTranslated<T>(field: Localized<T>, locale: Locale): boolean {
  return Boolean(field && field[locale]);
}
