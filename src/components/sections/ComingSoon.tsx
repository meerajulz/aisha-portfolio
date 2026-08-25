import Link from "next/link";
import { localize } from "@sanity-cfg/lib/localize";
import { resolveLink } from "@/lib/links";
import type { Locale } from "@/lib/i18n";

/**
 * A placeholder page that still looks deliberate. The shop can live here
 * until it's decided, and turning it into a real page later means swapping
 * this block for others — the URL and the menu entry don't change, so
 * nothing that's been shared or indexed breaks.
 */
export function ComingSoon({ data, locale }: { data: any; locale: Locale }) {
  const cta = data.cta;

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-6 py-32 md:px-16">
      <p className="label">Próximamente</p>
      <h2 className="display mt-4 text-[length:var(--text-heading)]">
        {localize<string>(data.heading, locale)}
      </h2>
      {data.body && (
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-fg-muted)]">
          {localize<string>(data.body, locale)}
        </p>
      )}
      {cta?.label && (
        <Link
          href={resolveLink(cta, locale)}
          className="mt-10 inline-flex items-center gap-3 self-start border-b border-[var(--color-accent)] pb-1 text-sm text-[var(--color-accent)] transition-colors hover:border-[var(--color-fg)] hover:text-[var(--color-fg)]"
        >
          {localize<string>(cta.label, locale)}
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </section>
  );
}
