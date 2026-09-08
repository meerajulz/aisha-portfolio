"use client";

import { useState } from "react";
import { ContactForm } from "@/components/ui/ContactForm";

/**
 * Shown for workshops that have no external booking link: a button that opens
 * an inline sign-up form pre-filled with the workshop, so the email tells her
 * exactly which one the person means.
 */
export function WorkshopSignup({ workshop }: { workshop: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="border-b border-[var(--color-accent)] pb-0.5 text-sm text-[var(--color-accent)] transition-colors hover:border-[var(--color-fg)] hover:text-[var(--color-fg)]"
      >
        {open ? "Cerrar" : "Inscribirse"}
      </button>

      {open && (
        <div className="mt-2 w-full basis-full">
          <ContactForm purpose="workshop" workshop={workshop} />
        </div>
      )}
    </>
  );
}
