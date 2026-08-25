import { localize } from "@sanity-cfg/lib/localize";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/lib/i18n";

const LEVEL_LABELS: Record<string, Record<Locale, string>> = {
  beginner: { es: "Iniciación", ca: "Iniciació", en: "Beginner" },
  intermediate: { es: "Intermedio", ca: "Intermedi", en: "Intermediate" },
  advanced: { es: "Avanzado", ca: "Avançat", en: "Advanced" },
  all: { es: "Todos los niveles", ca: "Tots els nivells", en: "All levels" },
};

/**
 * Reads from the same `class` documents that feed the contact form dropdown.
 * She adds a class once and it appears in both places.
 */
export function Classes({ data, locale }: { data: any; locale: Locale }) {
  const classes = data.classes ?? [];
  const intro = localize<string>(data.intro, locale);

  return (
    <section className="mx-auto max-w-4xl px-6 py-24 md:px-16">
      <SectionHeading label="Clases" title={localize<string>(data.heading, locale)} />
      {intro && (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-fg-muted)]">
          {intro}
        </p>
      )}

      <ul className="mt-14 divide-y divide-[var(--color-rule)]/25 border-t border-[var(--color-rule)]/25">
        {classes.map((item: any) => (
          <li key={item._id} className="grid gap-4 py-8 md:grid-cols-[1fr_auto] md:gap-10">
            <div>
              <h3 className="display text-2xl text-[var(--color-fg)]">
                {localize<string>(item.title, locale)}
              </h3>
              {item.description && (
                <p className="mt-3 max-w-xl leading-relaxed text-[var(--color-fg-muted)]">
                  {localize<string>(item.description, locale)}
                </p>
              )}
            </div>
            {/* Practical information set in mono so it reads as practical. */}
            <dl className="flex flex-wrap gap-x-8 gap-y-2 md:flex-col md:text-right">
              {item.level && (
                <div>
                  <dt className="sr-only">Nivel</dt>
                  <dd className="label">{LEVEL_LABELS[item.level]?.[locale]}</dd>
                </div>
              )}
              {item.duration && (
                <div>
                  <dt className="sr-only">Duración</dt>
                  <dd className="label">{localize<string>(item.duration, locale)}</dd>
                </div>
              )}
              {item.price && (
                <div>
                  <dt className="sr-only">Precio</dt>
                  <dd className="label text-[var(--color-accent)]">
                    {localize<string>(item.price, locale)}
                  </dd>
                </div>
              )}
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}
