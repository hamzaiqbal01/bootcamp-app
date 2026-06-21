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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://futuredentistprep.com";
  const logoUrl = `${siteUrl}/images/logo.png`;
  const now = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full",
    timeStyle: "short",
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Form Message</title>
</head>
<body style="margin:0;padding:0;background:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td align="center" style="background:linear-gradient(135deg,#4F46E5 0%,#7C3AED 100%);border-radius:16px 16px 0 0;padding:32px 40px;">
              <img src="${logoUrl}" alt="Future Dentist Prep" width="56" height="56"
                style="display:block;border-radius:12px;margin:0 auto 16px;" />
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">
                Future Dentist Prep
              </h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.80);font-size:13px;">
                Contact Form Notification
              </p>
            </td>
          </tr>

          <!-- Alert bar -->
          <tr>
            <td style="background:#4F46E5;padding:10px 40px;">
              <p style="margin:0;color:#ffffff;font-size:13px;text-align:center;">
                📬 &nbsp;New message received &mdash; ${now} (ET)
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">

              <h2 style="margin:0 0 24px;font-size:18px;font-weight:700;color:#0F172A;">
                Message Details
              </h2>

              <!-- Data table -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="border-collapse:collapse;border:1px solid #E2E8F0;border-radius:10px;overflow:hidden;">
                <tr style="background:#F8FAFC;">
                  <td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;width:28%;font-size:12px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:0.06em;">
                    Field
                  </td>
                  <td style="padding:12px 16px;border-bottom:1px solid #E2E8F0;font-size:12px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:0.06em;">
                    Value
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;border-bottom:1px solid #E2E8F0;font-size:13px;font-weight:600;color:#475569;">
                    Name
                  </td>
                  <td style="padding:14px 16px;border-bottom:1px solid #E2E8F0;font-size:14px;color:#0F172A;font-weight:500;">
                    ${escapeHtml(payload.name)}
                  </td>
                </tr>
                <tr style="background:#FAFAFA;">
                  <td style="padding:14px 16px;border-bottom:1px solid #E2E8F0;font-size:13px;font-weight:600;color:#475569;">
                    Email
                  </td>
                  <td style="padding:14px 16px;border-bottom:1px solid #E2E8F0;font-size:14px;color:#4F46E5;">
                    <a href="mailto:${escapeHtml(payload.email)}" style="color:#4F46E5;text-decoration:none;font-weight:500;">
                      ${escapeHtml(payload.email)}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;font-size:13px;font-weight:600;color:#475569;">
                    Subject
                  </td>
                  <td style="padding:14px 16px;font-size:14px;color:#0F172A;font-weight:500;">
                    ${escapeHtml(payload.subject)}
                  </td>
                </tr>
              </table>

              <!-- Message box -->
              <h3 style="margin:28px 0 10px;font-size:13px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:0.06em;">
                Message
              </h3>
              <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-left:4px solid #4F46E5;border-radius:0 8px 8px 0;padding:18px 20px;">
                <p style="margin:0;font-size:15px;line-height:1.7;color:#1E293B;">
                  ${escapeHtml(payload.message).replaceAll("\n", "<br />")}
                </p>
              </div>

              <!-- CTA button -->
              <div style="margin-top:32px;text-align:center;">
                <a href="mailto:${escapeHtml(payload.email)}?subject=Re: ${escapeHtml(payload.subject)}"
                  style="display:inline-block;background:#4F46E5;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:13px 32px;border-radius:10px;">
                  Reply to ${escapeHtml(payload.name)} &rarr;
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F8FAFC;border:1px solid #E2E8F0;border-top:none;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#94A3B8;line-height:1.6;">
                This email was sent automatically when a visitor submitted the contact form at
                <a href="${siteUrl}" style="color:#4F46E5;text-decoration:none;">${siteUrl}</a>.<br />
                &copy; ${new Date().getFullYear()} Future Dentist Prep. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

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
