import Link from "next/link";
import { localize } from "@sanity-cfg/lib/localize";
import { resolveLink } from "@/lib/links";
import { LOCALES, LOCALE_LABELS, localePath, type Locale } from "@/lib/i18n";
import { MobileMenu } from "@/components/ui/MobileMenu";

export function Header({
  nav,
  siteName,
  locale,
}: {
  nav: any;
  siteName?: string;
  locale: Locale;
}) {
  const items = nav?.main ?? [];

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-16">
        <Link href={localePath(locale, "/")} className="display text-lg text-[var(--color-fg)]">
          {siteName}
        </Link>

        <nav aria-label="Principal" className="flex items-center gap-8">
          <ul className="hidden gap-8 md:flex">
            {items.map((item: any, i: number) => (
              <li key={i}>
                <Link
                  href={resolveLink(item, locale)}
                  className="text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
                >
                  {localize<string>(item.label, locale)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Only renders once a second language goes live. */}
          {LOCALES.length > 1 && (
            <ul className="flex gap-3">
              {LOCALES.map((l) => (
                <li key={l}>
                  <Link
                    href={localePath(l, "/")}
                    hrefLang={l}
                    aria-current={l === locale ? "true" : undefined}
                    className={`label ${l === locale ? "text-[var(--color-accent)]" : ""}`}
                  >
                    {l}
                  </Link>
                  <span className="sr-only">{LOCALE_LABELS[l]}</span>
                </li>
              ))}
            </ul>
          )}

          <MobileMenu items={items} locale={locale} />
        </nav>
      </div>
    </header>
  );
}
