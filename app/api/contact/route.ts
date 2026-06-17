import { NextResponse } from "next/server";
import {
  parseContactPayload,
  saveContactToSheetDb,
  sendContactNotificationEmail,
} from "@/lib/contact";

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

  try {
    await saveContactToSheetDb(payload);
  } catch (error) {
    console.error("SheetDB contact save failed:", error);
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
