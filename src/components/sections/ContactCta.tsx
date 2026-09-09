import { localize } from "@sanity-cfg/lib/localize";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { LOCALE_TAGS, type Locale } from "@/lib/i18n";

const PURPOSES = ["general", "class", "workshop"] as const;
const LABELS: Record<(typeof PURPOSES)[number], string> = {
  general: "Contacto",
  class: "Clases",
  workshop: "Workshops",
};

export function ContactCta({ data, locale }: { data: any; locale: Locale }) {
  const purpose: (typeof PURPOSES)[number] = PURPOSES.includes(data.purpose)
    ? data.purpose
    : "general";

  const classOptions = (data.classOptions ?? []).map((c: any) => ({
    id: c._id,
    label: localize<string>(c.title, locale) ?? "",
  }));

  const workshopOptions = (data.workshopOptions ?? []).map((w: any) => {
    const title = localize<string>(w.title, locale) ?? "";
    const date = w.startDate
      ? new Date(w.startDate).toLocaleDateString(LOCALE_TAGS[locale], {
          day: "numeric",
          month: "long",
        })
      : "";
    return { id: w._id, label: date ? `${title} · ${date}` : title };
  });

  return (
    <section id="contacto" className="border-t border-[var(--color-rule)]/20 bg-[var(--color-surface)]">
      <div className="mx-auto max-w-3xl px-6 py-24 md:px-16">
        <SectionHeading label={LABELS[purpose]} title={localize<string>(data.heading, locale)} />
        {data.intro && (
          <p className="mt-6 leading-relaxed text-[var(--color-fg-muted)]">
            {localize<string>(data.intro, locale)}
          </p>
        )}
        <ContactForm
          purpose={purpose}
          classOptions={classOptions}
          workshopOptions={workshopOptions}
          confirmation={localize<string>(data.confirmation, locale)}
        />
      </div>
    </section>
  );
}
