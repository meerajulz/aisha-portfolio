import Link from "next/link";
import { localize } from "@sanity-cfg/lib/localize";
import { resolveLink } from "@/lib/links";
import type { Locale } from "@/lib/i18n";

export function Footer({ nav, settings, locale }: { nav: any; settings: any; locale: Locale }) {
  return (
    <footer className="border-t border-[var(--color-rule)]/20 px-6 py-14 md:px-16">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6">
        <p className="label">
          © {new Date().getFullYear()} {settings?.siteName}
        </p>
        <ul className="flex flex-wrap gap-6">
          {(nav?.footer ?? []).map((item: any, i: number) => (
            <li key={i}>
              <Link href={resolveLink(item, locale)} className="label hover:text-[var(--color-accent)]">
                {localize<string>(item.label, locale)}
              </Link>
            </li>
          ))}
          {(settings?.social ?? []).map((s: any, i: number) => (
            <li key={`s${i}`}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="label hover:text-[var(--color-accent)]"
              >
                {s.platform}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
