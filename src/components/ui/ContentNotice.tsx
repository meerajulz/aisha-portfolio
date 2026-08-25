"use client";

import { useEffect, useState } from "react";

/**
 * A brief notice on first visit, not an age gate.
 *
 * Remembered in localStorage, so it appears once per browser. Only renders
 * if she turns it on in Ajustes — she knows her audience better than we do.
 */
const KEY = "content-notice-accepted";

export function ContentNotice({ body, acceptLabel }: { body?: string; acceptLabel?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  if (!visible || !body) return null;

  function accept() {
    localStorage.setItem(KEY, "1");
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Aviso"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-surface)]/95 px-6 backdrop-blur-sm"
    >
      <div className="max-w-md text-center">
        <p className="leading-relaxed text-[var(--color-fg)]">{body}</p>
        <button
          type="button"
          onClick={accept}
          autoFocus
          className="mt-8 border border-[var(--color-accent)] px-8 py-3 text-sm tracking-wide text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)]"
        >
          {acceptLabel || "Entrar"}
        </button>
      </div>
    </div>
  );
}
