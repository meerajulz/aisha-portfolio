"use server";

import { Resend } from "resend";

/**
 * Form handler for every form on the site — general contact, class enquiries
 * and workshop sign-ups. They all email the same inbox; the `purpose` field
 * only changes the subject line and which extra fields are included.
 *
 * reply-to is set to the visitor's address, so she opens the email and hits
 * Reply. No dashboard, no login, no new tool to learn.
 *
 * Three layers of spam protection, because a form that emails a real person
 * will find bots within weeks:
 *   1. honeypot   — invisible field; bots fill it, humans can't see it
 *   2. Turnstile  — Cloudflare's challenge, invisible for real humans
 *   3. rate limit — per IP, in-memory (see note below)
 */

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory rate limiting resets on cold start. Fine at this traffic level;
// move to Upstash Redis if the site ever gets busy enough to matter.
const attempts = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return true;
  recent.push(now);
  attempts.set(ip, recent);
  return false;
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: ip,
    }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

export type ContactState = { status: "idle" | "sent" | "error"; message?: string };

const SUBJECTS = {
  general: (name: string) => `Consulta desde la web — ${name}`,
  class: (name: string, extra?: string) =>
    `Clase${extra ? `: ${extra}` : ""} — ${name}`,
  workshop: (name: string, extra?: string) =>
    `Inscripción${extra ? `: ${extra}` : ""} — ${name}`,
} as const;

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const ip = "unknown"; // Populate from headers() in the route if you need real IPs.

  // 1. Honeypot — a real person never sees this field.
  if (formData.get("website")) {
    // Report success to the bot rather than revealing the trap.
    return { status: "sent" };
  }

  if (rateLimited(ip)) {
    return {
      status: "error",
      message: "Has enviado varios mensajes seguidos. Inténtalo de nuevo en un rato.",
    };
  }

  const purposeRaw = String(formData.get("purpose") ?? "general");
  const purpose = (["general", "class", "workshop"] as const).includes(purposeRaw as never)
    ? (purposeRaw as "general" | "class" | "workshop")
    : "general";

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const classInterest = String(formData.get("class") ?? "").trim();
  const workshop = String(formData.get("workshop") ?? "").trim();
  const level = String(formData.get("level") ?? "").trim();
  const schedule = String(formData.get("schedule") ?? "").trim();
  const people = String(formData.get("people") ?? "").trim();
  const token = String(formData.get("cf-turnstile-response") ?? "");

  // Name and email are always required; a message is required unless it's a
  // workshop sign-up (there, the workshop + contact details are enough).
  if (!name || !email || (!message && purpose !== "workshop")) {
    return { status: "error", message: "Faltan datos. Revisa el formulario." };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { status: "error", message: "Esa dirección de correo no parece válida." };
  }

  // 2. Turnstile
  if (process.env.TURNSTILE_SECRET_KEY) {
    const ok = await verifyTurnstile(token, ip);
    if (!ok) {
      return { status: "error", message: "No hemos podido verificar el envío. Recarga la página." };
    }
  }

  const topic = purpose === "workshop" ? workshop : classInterest;
  const subject = SUBJECTS[purpose](name, topic || undefined);

  try {
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!,
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email, // <- the whole point
      subject,
      text: [
        `Tipo: ${{ general: "Contacto general", class: "Clase", workshop: "Inscripción a workshop" }[purpose]}`,
        workshop ? `Workshop: ${workshop}` : null,
        classInterest ? `Clase de interés: ${classInterest}` : null,
        `Nombre: ${name}`,
        `Correo: ${email}`,
        phone ? `Teléfono: ${phone}` : null,
        level ? `Nivel: ${level}` : null,
        schedule ? `Disponibilidad: ${schedule}` : null,
        people ? `Nº de personas: ${people}` : null,
        message ? "" : null,
        message || null,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    });
    return { status: "sent" };
  } catch {
    return {
      status: "error",
      message: "No hemos podido enviar el mensaje. Escríbenos directamente por correo.",
    };
  }
}
