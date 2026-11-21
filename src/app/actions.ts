"use server"

import { contactSchema, type ContactInput } from "@/lib/contact-schema"

export type ContactResult = { ok: true } | { ok: false; error: string }

/**
 * Contact form server action.
 *
 * Sends the message with Resend when RESEND_API_KEY and CONTACT_TO_EMAIL are set
 * (CONTACT_FROM_EMAIL optional). Without them it logs the message in development
 * and reports a failure in production, so messages are never silently dropped.
 */
export async function sendContactMessage(input: ContactInput): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: "Some fields are invalid." }
  const { name, email, subject, message } = parsed.data

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] (not sent: RESEND_API_KEY / CONTACT_TO_EMAIL not set)", { name, email, subject, message })
      return { ok: true }
    }
    return { ok: false, error: "The contact form isn't configured yet." }
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    })
    if (!res.ok) return { ok: false, error: "The mail service rejected the message." }
    return { ok: true }
  } catch {
    return { ok: false, error: "Couldn't reach the mail service." }
  }
}
