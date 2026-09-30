import { NextResponse } from "next/server";
import { saveContactToSheetDb, sendContactNotificationEmail } from "@/lib/contact";
import { saveLeadFromForm } from "@/lib/leads/server";
import { parseTutorApplyPayload, tutorApplyToContact } from "@/lib/tutor-apply";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = parseTutorApplyPayload(body);
  if (!parsed) {
    return NextResponse.json({ error: "Missing or invalid form fields." }, { status: 400 });
  }

  const payload = tutorApplyToContact(parsed);

  // Save to the Google Sheet (SheetDB) and the admin database (Supabase).
  // The submission succeeds if at least one of them stored it.
  const [sheet, db] = await Promise.allSettled([
    saveContactToSheetDb(payload),
    saveLeadFromForm({ ...payload, phone: parsed.phone, source: "tutor-apply" }),
  ]);

  if (sheet.status === "rejected") console.error("SheetDB tutor apply save failed:", sheet.reason);
  if (db.status === "rejected") console.error("Supabase tutor apply save failed:", db.reason);

  if (sheet.status === "rejected" && !(db.status === "fulfilled" && db.value)) {
    return NextResponse.json(
      { error: "Could not save your application. Please try again." },
      { status: 502 },
    );
  }

  try {
    await sendContactNotificationEmail(payload);
  } catch (error) {
    console.error("Tutor apply notification email failed:", error);
    return NextResponse.json(
      { error: "Application saved, but the notification email failed. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
