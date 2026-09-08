"use client";

import { useActionState } from "react";
import Script from "next/script";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { status: "idle" };

const LEVELS = ["Iniciación", "Intermedio", "Avanzado"];

type Purpose = "general" | "class" | "workshop";

/**
 * One form, three jobs (general contact, class enquiry, workshop sign-up).
 * `purpose` decides the subject line and which extra fields show; the fields
 * themselves and the spam protection are shared.
 */
export function ContactForm({
  purpose = "general",
  classOptions = [],
  workshop,
  confirmation,
}: {
  purpose?: Purpose;
  classOptions?: { id: string; label: string }[];
  workshop?: string;
  confirmation?: string;
}) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initial);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const showClassPicker = purpose === "class" && classOptions.length > 0;
  const showLevel = purpose !== "general";
  const showSchedule = purpose !== "general";
  const showPeople = purpose === "workshop";
  const messageRequired = purpose !== "workshop";

  if (state.status === "sent") {
    return (
      <p className="mt-10 border-l border-[var(--color-accent)] py-2 pl-6 text-lg text-[var(--color-accent)]">
        {confirmation ||
          (purpose === "workshop"
            ? "Inscripción enviada. Te confirmaré la plaza por correo."
            : "Mensaje enviado. Te responderé lo antes posible.")}
      </p>
    );
  }

  return (
    <>
      {siteKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />}

      <form action={formAction} className="mt-10 grid gap-6">
        {/* Honeypot. Hidden from people, irresistible to bots. */}
        <div aria-hidden="true" className="absolute left-[-9999px]">
          <label htmlFor="website">No rellenar</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <input type="hidden" name="purpose" value={purpose} />
        {workshop && <input type="hidden" name="workshop" value={workshop} />}

        {workshop && (
          <p className="label border-l border-[var(--color-accent)] pl-4 text-[var(--color-accent)]">
            Inscripción · {workshop}
          </p>
        )}

        <Field id="name" name="name" label="Nombre" required />
        <Field id="email" name="email" label="Correo electrónico" type="email" required />
        <Field id="phone" name="phone" label="Teléfono / WhatsApp (opcional)" type="tel" autoComplete="tel" />

        {showClassPicker && (
          <Select id="class" name="class" label="Clase que te interesa" placeholder="Sin especificar">
            {classOptions.map((option) => (
              <option key={option.id} value={option.label} className="bg-[var(--color-bg)]">
                {option.label}
              </option>
            ))}
          </Select>
        )}

        {showLevel && (
          <Select id="level" name="level" label="Nivel de experiencia" placeholder="Sin especificar">
            {LEVELS.map((l) => (
              <option key={l} value={l} className="bg-[var(--color-bg)]">
                {l}
              </option>
            ))}
          </Select>
        )}

        {showSchedule && (
          <Field id="schedule" name="schedule" label="Disponibilidad / fechas que te van bien" />
        )}

        {showPeople && (
          <Field id="people" name="people" label="Nº de personas" type="number" min={1} />
        )}

        <div className="grid gap-2">
          <label htmlFor="message" className="label">
            {purpose === "workshop" ? "Mensaje (opcional)" : "Mensaje"}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required={messageRequired}
            className="resize-y border-b border-[var(--color-rule)]/40 bg-transparent py-3 text-[var(--color-fg)] focus:border-[var(--color-accent)] focus:outline-none"
          />
        </div>

        {siteKey && <div className="cf-turnstile" data-sitekey={siteKey} data-theme="dark" />}

        {/* Errors state what happened and what to do. They don't apologise. */}
        {state.status === "error" && (
          <p role="alert" className="text-sm text-[var(--color-accent)]">
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 justify-self-start border border-[var(--color-accent)] px-8 py-3 text-sm tracking-wide text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] disabled:opacity-50"
        >
          {pending
            ? "Enviando…"
            : purpose === "workshop"
              ? "Enviar inscripción"
              : "Enviar mensaje"}
        </button>
      </form>
    </>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  required,
  min,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  min?: number;
  autoComplete?: string;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        min={min}
        autoComplete={autoComplete}
        className="border-b border-[var(--color-rule)]/40 bg-transparent py-3 text-[var(--color-fg)] focus:border-[var(--color-accent)] focus:outline-none"
      />
    </div>
  );
}

function Select({
  id,
  name,
  label,
  placeholder,
  children,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue=""
        className="border-b border-[var(--color-rule)]/40 bg-transparent py-3 text-[var(--color-fg)] focus:border-[var(--color-accent)] focus:outline-none"
      >
        <option value="">{placeholder}</option>
        {children}
      </select>
    </div>
  );
}
