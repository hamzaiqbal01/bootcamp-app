import type { GeneratedPlan } from "./types";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function fromAddress(): string {
  const raw = process.env.CONTACT_FROM_EMAIL?.trim();
  const name = "The Dental Prep";
  if (!raw) return `${name} <onboarding@resend.dev>`;
  const bracket = raw.match(/<([^>]+)>/);
  if (bracket?.[1]) return `${name} <${bracket[1].trim()}>`;
  if (raw.includes("@")) return `${name} <${raw}>`;
  return `${name} <onboarding@resend.dev>`;
}

async function sendEmail(input: { to: string; subject: string; html: string; replyTo?: string }): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set.");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress(),
      to: [input.to],
      reply_to: input.replyTo,
      subject: input.subject,
      html: input.html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend responded with ${res.status}${detail ? `: ${detail}` : ""}`);
  }
}

export async function sendStudyPlanEmails(input: {
  firstName: string;
  email: string;
  marketingConsent: boolean;
  plan: GeneratedPlan;
  planUrl: string;
}): Promise<{ student: boolean; team: boolean }> {
  const result = { student: false, team: false };
  const team = process.env.CONTACT_NOTIFY_EMAIL;
  if (!process.env.RESEND_API_KEY) return result;

  if (team) {
    try {
      await sendEmail({
        to: team,
        replyTo: input.email,
        subject: `DAT study plan: ${input.firstName} — ${input.plan.primaryLabel}`,
        html: `<p><strong>${escapeHtml(input.firstName)}</strong> (${escapeHtml(input.email)}) built a DAT study plan.</p>
<ul>
<li>Timeline: ${escapeHtml(input.plan.timelineLabel)}</li>
<li>Weekly hours: ${escapeHtml(String(input.plan.recommendedHoursPerWeek))}</li>
<li>Intensity: ${escapeHtml(input.plan.intensityLabel)}</li>
<li>Primary focus: ${escapeHtml(input.plan.primaryLabel)}</li>
</ul>
<p><a href="${escapeHtml(input.planUrl)}">View the saved plan</a></p>`,
      });
      result.team = true;
    } catch (error) {
      console.error("Study plan team email failed:", error);
    }
  }

  if (input.marketingConsent) {
    try {
      await sendEmail({
        to: input.email,
        subject: "Your Personalized DAT Study Plan",
        html: `<p>Hi ${escapeHtml(input.firstName)},</p>
<p>Your DAT study plan is ready.</p>
<ul>
<li>Timeline: ${escapeHtml(input.plan.timelineLabel)}</li>
<li>Primary focus: ${escapeHtml(input.plan.primaryLabel)}</li>
<li>Suggested weekly load: ${escapeHtml(input.plan.hoursLabel)}</li>
</ul>
<p><a href="${escapeHtml(input.planUrl)}">Open your full plan</a></p>
<p>If you want a tutor to review the plan around ${escapeHtml(input.plan.primaryLabel)}, reply to this email or use the tutor button on your plan page.</p>
<p>${escapeHtml(input.plan.guidanceNote)}</p>
<p>The Dental Prep</p>`,
      });
      result.student = true;
    } catch (error) {
      console.error("Study plan student email failed:", error);
    }
  }

  return result;
}

export async function sendTutorMatchEmail(input: {
  firstName: string;
  email: string;
  phone: string;
  plan: GeneratedPlan;
  planUrl: string;
}): Promise<void> {
  const team = process.env.CONTACT_NOTIFY_EMAIL;
  if (!team || !process.env.RESEND_API_KEY) return;

  await sendEmail({
    to: team,
    replyTo: input.email,
    subject: `Tutor match request: ${input.firstName} — ${input.plan.primaryLabel}`,
    html: `<p><strong>${escapeHtml(input.firstName)}</strong> asked to be matched with a DAT tutor.</p>
<ul>
<li>Email: ${escapeHtml(input.email)}</li>
<li>Phone: ${escapeHtml(input.phone || "not provided")}</li>
<li>Timeline: ${escapeHtml(input.plan.timelineLabel)}</li>
<li>Primary focus: ${escapeHtml(input.plan.primaryLabel)}</li>
<li>Weekly hours: ${escapeHtml(String(input.plan.recommendedHoursPerWeek))}</li>
</ul>
<p><a href="${escapeHtml(input.planUrl)}">Open the saved plan</a></p>`,
  });
}
