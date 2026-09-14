import { NextResponse } from "next/server";
import { saveContactToSheetDb, sendContactNotificationEmail } from "@/lib/contact";
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

  try {
    await saveContactToSheetDb(payload);
  } catch (error) {
    console.error("SheetDB tutor apply save failed:", error);
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
