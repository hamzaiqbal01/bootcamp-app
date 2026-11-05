import { NextResponse } from "next/server";
import {
  parseContactPayload,
  saveContactToSheetDb,
  sendContactNotificationEmail,
  type EmailAttachment,
} from "@/lib/contact";
import { saveLeadFromForm } from "@/lib/leads/server";

// Messages from the site chat widget. Text goes through the same pipeline as the contact form;
// a voice note rides along as an email attachment.
const MAX_AUDIO_BYTES = 5 * 1024 * 1024;

function extensionFor(type: string) {
  if (type.includes("mp4") || type.includes("m4a")) return "m4a";
  if (type.includes("ogg")) return "ogg";
  if (type.includes("mpeg")) return "mp3";
  return "webm";
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const email = form.get("email");
  const text = form.get("message");
  const audio = form.get("audio");
  const duration = form.get("duration");

  const hasAudio = audio instanceof File && audio.size > 0;
  if (hasAudio && (audio.size > MAX_AUDIO_BYTES || !audio.type.startsWith("audio/"))) {
    return NextResponse.json({ error: "Voice notes must be audio under 5 MB." }, { status: 400 });
  }

  const typed = typeof text === "string" ? text.trim() : "";
  const voiceLine = hasAudio
    ? `[Voice note${typeof duration === "string" && duration ? `, ${duration}` : ""} attached to the notification email]`
    : "";

  const payload = parseContactPayload({
    name: "Website chat",
    email,
    subject: hasAudio ? "Website chat (voice note)" : "Website chat",
    message: [typed, voiceLine].filter(Boolean).join("\n\n"),
  });

  if (!payload) {
    return NextResponse.json({ error: "Add a valid email and a message or voice note." }, { status: 400 });
  }

  const [sheet, db] = await Promise.allSettled([
    saveContactToSheetDb(payload),
    saveLeadFromForm({ ...payload, source: "contact" }),
  ]);

  if (sheet.status === "rejected") console.error("SheetDB chat save failed:", sheet.reason);
  if (db.status === "rejected") console.error("Supabase chat save failed:", db.reason);

  const attachments: EmailAttachment[] = hasAudio
    ? [
        {
          filename: `voice-note-${Date.now()}.${extensionFor(audio.type)}`,
          content: Buffer.from(await audio.arrayBuffer()).toString("base64"),
        },
      ]
    : [];

  let emailed = false;
  try {
    await sendContactNotificationEmail(payload, attachments);
    emailed = true;
  } catch (error) {
    console.error("Chat notification email failed:", error);
  }

  // The voice note itself only reaches the team by email, so that has to succeed when one was sent.
  const stored = sheet.status === "fulfilled" || (db.status === "fulfilled" && db.value);
  if (!stored || (hasAudio && !emailed)) {
    return NextResponse.json({ error: "Could not send your message. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
