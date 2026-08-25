/**
 * Eyebrow + title. The eyebrow is only rendered when it says something the
 * title doesn't — a label that just repeats the heading is decoration.
 */
export function SectionHeading({ label, title }: { label?: string; title?: string }) {
  if (!title) return null;
  const showLabel = label && label.toLowerCase() !== title.toLowerCase();

  return (
    <header>
      {showLabel && <p className="label mb-4">{label}</p>}
      <h2 className="display text-[length:var(--text-heading)] text-[var(--color-fg)]">
        {title}
      </h2>
    </header>
  );
}
