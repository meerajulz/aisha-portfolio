import { defineField, defineType } from "sanity";
import { ALL_LOCALES, DEFAULT_LOCALE, LOCALE_LABELS } from "../../src/lib/i18n";

/**
 * Field-level localization.
 *
 * Every translatable field becomes an object with one slot per language,
 * so the editor sees all languages inside a single document instead of
 * juggling parallel documents that drift out of sync.
 *
 * Only the default language is required. Untranslated fields fall back to
 * it at render time (see resolveLocalized in sanity/lib/localize.ts), which
 * is what lets Catalan and English be filled in gradually rather than all
 * at once before launch.
 */
function localizedFields(of: string, extra: Record<string, unknown> = {}) {
  return ALL_LOCALES.map((locale) =>
    defineField({
      name: locale,
      title: LOCALE_LABELS[locale],
      type: of,
      validation: locale === DEFAULT_LOCALE ? (r) => r.required() : undefined,
      ...extra,
    }),
  );
}

export const localeString = defineType({
  name: "localeString",
  title: "Texto",
  type: "object",
  fields: localizedFields("string"),
  options: { collapsible: true, collapsed: false },
});

export const localeText = defineType({
  name: "localeText",
  title: "Texto largo",
  type: "object",
  fields: localizedFields("text", { rows: 3 }),
  options: { collapsible: true, collapsed: false },
});

export const localeRichText = defineType({
  name: "localeRichText",
  title: "Contenido",
  type: "object",
  fields: localizedFields("richText"),
  options: { collapsible: true, collapsed: false },
});

export const localeSlug = defineType({
  name: "localeSlug",
  title: "Dirección de la página",
  type: "object",
  fields: ALL_LOCALES.map((locale) =>
    defineField({
      name: locale,
      title: LOCALE_LABELS[locale],
      type: "slug",
      options: { source: (doc: any) => doc?.title?.[locale], maxLength: 96 },
      validation: locale === DEFAULT_LOCALE ? (r) => r.required() : undefined,
    }),
  ),
  options: { collapsible: true, collapsed: true },
});
