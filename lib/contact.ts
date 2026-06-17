export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function parseContactPayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const { name, email, subject, message } = body as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string"
  ) {
    return null;
  }

  const trimmed = {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
  };

  if (!trimmed.name || !trimmed.email || !trimmed.subject || !trimmed.message) {
    return null;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) {
    return null;
  }

  return trimmed;
}

export async function saveContactToSheetDb(payload: ContactPayload): Promise<void> {
  const url =
    process.env.SHEETDB_CONTACT_API_URL ??
    process.env.NEXT_PUBLIC_SHEETDB_CONTACT_API_URL ??
    "https://sheetdb.io/api/v1/oykcpy8fcfsmz";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [
        {
          Name: payload.name,
          Email: payload.email,
          Subject: payload.subject,
          Message: payload.message,
        },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`SheetDB responded with ${res.status}`);
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendContactNotificationEmail(
  payload: ContactPayload,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFY_EMAIL;

  if (!apiKey || !to) {
    return;
  }

  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Future Dentist Prep <onboarding@resend.dev>";

  const html = `
    <h2>New contact form message</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(payload.message).replaceAll("\n", "<br />")}</p>
  `.trim();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject: `Contact form: ${payload.subject}`,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend responded with ${res.status}${detail ? `: ${detail}` : ""}`);
  }
}
