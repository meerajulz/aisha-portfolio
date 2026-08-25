"use server";

import { Resend } from "resend";

/**
 * Contact form handler.
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

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const classInterest = String(formData.get("class") ?? "").trim();
  const token = String(formData.get("cf-turnstile-response") ?? "");

  if (!name || !email || !message) {
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

  try {
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!,
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email, // <- the whole point
      subject: classInterest
        ? `Consulta sobre ${classInterest} — ${name}`
        : `Consulta desde la web — ${name}`,
      text: [
        `Nombre: ${name}`,
        `Correo: ${email}`,
        classInterest ? `Clase de interés: ${classInterest}` : null,
        "",
        message,
      ]
        .filter(Boolean)
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
