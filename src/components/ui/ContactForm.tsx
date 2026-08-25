"use client";

import { useActionState } from "react";
import Script from "next/script";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { status: "idle" };

export function ContactForm({
  classOptions,
  confirmation,
}: {
  classOptions: { id: string; label: string }[];
  confirmation?: string;
}) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initial);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (state.status === "sent") {
    return (
      <p className="mt-10 border-l border-[var(--color-accent)] py-2 pl-6 text-lg text-[var(--color-accent)]">
        {confirmation || "Mensaje enviado. Te responderé lo antes posible."}
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

        <Field id="name" name="name" label="Nombre" required />
        <Field id="email" name="email" label="Correo electrónico" type="email" required />

        {classOptions.length > 0 && (
          <div className="grid gap-2">
            <label htmlFor="class" className="label">
              Clase que te interesa
            </label>
            <select
              id="class"
              name="class"
              defaultValue=""
              className="border-b border-[var(--color-rule)]/40 bg-transparent py-3 text-[var(--color-fg)] focus:border-[var(--color-accent)] focus:outline-none"
            >
              <option value="">Sin especificar</option>
              {classOptions.map((option) => (
                <option key={option.id} value={option.label} className="bg-[var(--color-bg)]">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid gap-2">
          <label htmlFor="message" className="label">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
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
          {pending ? "Enviando…" : "Enviar mensaje"}
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
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
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
        className="border-b border-[var(--color-rule)]/40 bg-transparent py-3 text-[var(--color-fg)] focus:border-[var(--color-accent)] focus:outline-none"
      />
    </div>
  );
}
