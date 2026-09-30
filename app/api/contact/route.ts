import { NextResponse } from "next/server";
import {
  parseContactPayload,
  saveContactToSheetDb,
  sendContactNotificationEmail,
} from "@/lib/contact";
import { saveLeadFromForm } from "@/lib/leads/server";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const payload = parseContactPayload(body);

  if (!payload) {
    return NextResponse.json({ error: "Missing or invalid form fields." }, { status: 400 });
  }

  // Save to the Google Sheet (SheetDB) and the admin database (Supabase).
  // The submission succeeds if at least one of them stored it.
  const [sheet, db] = await Promise.allSettled([
    saveContactToSheetDb(payload),
    saveLeadFromForm({ ...payload, source: "contact" }),
  ]);

  if (sheet.status === "rejected") console.error("SheetDB contact save failed:", sheet.reason);
  if (db.status === "rejected") console.error("Supabase contact save failed:", db.reason);

  if (sheet.status === "rejected" && !(db.status === "fulfilled" && db.value)) {
    return NextResponse.json(
      { error: "Could not save your message. Please try again." },
      { status: 502 },
    );
  }

  try {
    await sendContactNotificationEmail(payload);
  } catch (error) {
    console.error("Contact notification email failed:", error);
  }

  return NextResponse.json({ ok: true });
}
