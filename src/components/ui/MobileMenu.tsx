"use client";

import Link from "next/link";
import { useState } from "react";
import { localize } from "@sanity-cfg/lib/localize";
import { resolveLink } from "@/lib/links";
import type { Locale } from "@/lib/i18n";

/**
 * The navigation on small screens: a hamburger button that opens a panel of
 * the same links the desktop bar shows. Hidden at `md` and up, where the
 * inline list in <Header> takes over.
 */
export function MobileMenu({ items, locale }: { items: any[]; locale: Locale }) {
  const [open, setOpen] = useState(false);

  if (!items.length) return null;

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="grid h-10 w-10 place-items-center text-[var(--color-fg)]"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          ) : (
            <>
              <path d="M4 7h16" strokeLinecap="round" />
              <path d="M4 12h16" strokeLinecap="round" />
              <path d="M4 17h16" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Principal"
          className="absolute inset-x-0 top-full border-t border-[var(--color-rule)] bg-[var(--color-bg)]"
        >
          <ul className="flex flex-col px-6 py-2">
            {items.map((item: any, i: number) => (
              <li key={i}>
                <Link
                  href={resolveLink(item, locale)}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-accent)]"
                >
                  {localize<string>(item.label, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
