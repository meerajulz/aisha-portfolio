import Image from "next/image";
import { localize } from "@sanity-cfg/lib/localize";
import { urlForImage } from "@sanity-cfg/lib/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LOCALE_TAGS, type Locale } from "@/lib/i18n";

/**
 * Workshops sort themselves into upcoming and past by date, so she never has
 * to remember to archive one. An empty upcoming list is a normal state with
 * its own message, not a broken page.
 */
function formatRange(start: string, end: string | undefined, locale: Locale) {
  const tag = LOCALE_TAGS[locale];
  const s = new Date(start);
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
  if (!end) return s.toLocaleDateString(tag, opts);
  const e = new Date(end);
  const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  return sameMonth
    ? `${s.getDate()}–${e.toLocaleDateString(tag, opts)}`
    : `${s.toLocaleDateString(tag, { day: "numeric", month: "long" })} – ${e.toLocaleDateString(tag, opts)}`;
}

export function Workshops({ data, locale }: { data: any; locale: Locale }) {
  const showUpcoming = data.show === "upcoming" || data.show === "both";
  const showPast = data.show === "past" || data.show === "both";
  const upcoming = showUpcoming ? (data.upcoming ?? []) : [];
  const past = showPast ? (data.past ?? []) : [];

  return (
    <section className="mx-auto max-w-4xl px-6 py-24 md:px-16">
      <SectionHeading label="Workshops" title={localize<string>(data.heading, locale)} />
      {data.intro && (
        <p className="mt-6 max-w-2xl leading-relaxed text-[var(--color-fg-muted)]">
          {localize<string>(data.intro, locale)}
        </p>
      )}

      {showUpcoming && upcoming.length === 0 && (
        <p className="mt-12 border-l border-[var(--color-rule)] py-2 pl-6 text-[var(--color-fg-muted)]">
          {localize<string>(data.emptyMessage, locale) ??
            "Ahora mismo no hay fechas programadas."}
        </p>
      )}

      {upcoming.length > 0 && (
        <ul className="mt-12 divide-y divide-[var(--color-rule)]/50 border-t border-[var(--color-rule)]/50">
          {upcoming.map((w: any) => (
            <li key={w._id} className="grid gap-5 py-8 sm:grid-cols-[8rem_1fr] sm:gap-8">
              <div>
                <time dateTime={w.startDate} className="label block text-[var(--color-accent)]">
                  {formatRange(w.startDate, w.endDate, locale)}
                </time>
                {(w.city || w.venue) && (
                  <span className="label mt-1 block">{[w.city, w.venue].filter(Boolean).join(" · ")}</span>
                )}
              </div>
              <div>
                <h3 className="display text-2xl">{localize<string>(w.title, locale)}</h3>
                {w.description && (
                  <p className="mt-2 max-w-xl leading-relaxed text-[var(--color-fg-muted)]">
                    {localize<string>(w.description, locale)}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap items-center gap-6">
                  {w.price && <span className="label">{localize<string>(w.price, locale)}</span>}
                  {w.soldOut ? (
                    <span className="label">Plazas agotadas</span>
                  ) : (
                    <a
                      href={w.bookingUrl || "#contacto"}
                      target={w.bookingUrl ? "_blank" : undefined}
                      rel={w.bookingUrl ? "noopener noreferrer" : undefined}
                      className="border-b border-[var(--color-accent)] pb-0.5 text-sm text-[var(--color-accent)] transition-colors hover:border-[var(--color-fg)] hover:text-[var(--color-fg)]"
                    >
                      Inscribirse
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {past.length > 0 && (
        <div className="mt-20">
          <p className="label">Anteriores</p>
          <ul className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((w: any) => (
              <li key={w._id}>
                {w.image?.asset && (
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-surface)]">
                    <Image
                      src={urlForImage(w.image).width(600).url()}
                      alt={localize<string>(w.image.alt, locale) ?? ""}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <h4 className="mt-3 text-sm">{localize<string>(w.title, locale)}</h4>
                <span className="label">
                  {[new Date(w.startDate).getFullYear(), w.city].filter(Boolean).join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
