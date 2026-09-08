import { localize } from "@sanity-cfg/lib/localize";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import type { Locale } from "@/lib/i18n";

export function ContactCta({ data, locale }: { data: any; locale: Locale }) {
  const purpose = data.purpose === "class" ? "class" : "general";
  const classOptions = (data.classOptions ?? []).map((c: any) => ({
    id: c._id,
    label: localize<string>(c.title, locale) ?? "",
  }));

  return (
    <section id="contacto" className="border-t border-[var(--color-rule)]/20 bg-[var(--color-surface)]">
      <div className="mx-auto max-w-3xl px-6 py-24 md:px-16">
        <SectionHeading
          label={purpose === "class" ? "Clases" : "Contacto"}
          title={localize<string>(data.heading, locale)}
        />
        {data.intro && (
          <p className="mt-6 leading-relaxed text-[var(--color-fg-muted)]">
            {localize<string>(data.intro, locale)}
          </p>
        )}
        <ContactForm
          purpose={purpose}
          classOptions={classOptions}
          confirmation={localize<string>(data.confirmation, locale)}
        />
      </div>
    </section>
  );
}
