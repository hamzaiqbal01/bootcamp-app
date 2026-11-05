import { NextResponse } from "next/server";
import { formatInZone, getBooking } from "@/lib/calendly";
import { saveContactToSheetDb, sendContactNotificationEmail } from "@/lib/contact";
import { saveLeadFromForm } from "@/lib/leads/server";

// The /schedule page posts the URIs from Calendly's "event scheduled" message here. We look the
// booking up with our own token and record who booked, when, for what time, and in which time zone.
const TEAM_TIMEZONE = "America/New_York";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { eventUri, inviteeUri, source } = (body ?? {}) as Record<string, unknown>;
  if (typeof eventUri !== "string" || typeof inviteeUri !== "string") {
    return NextResponse.json({ error: "Missing booking reference." }, { status: 400 });
  }

  let booking;
  try {
    booking = await getBooking(eventUri, inviteeUri);
  } catch (error) {
    console.error("Calendly lookup failed:", error);
    return NextResponse.json({ error: "Could not read the booking." }, { status: 502 });
  }
  if (!booking) {
    return NextResponse.json({ error: "Unknown booking." }, { status: 404 });
  }

  const lines = [
    `Meeting: ${booking.eventName}`,
    `Meeting time (team): ${formatInZone(booking.startTime, TEAM_TIMEZONE)}`,
    `Meeting time (student): ${formatInZone(booking.startTime, booking.timezone)}`,
    `Student time zone: ${booking.timezone}`,
    `Booked at: ${formatInZone(booking.bookedAt, TEAM_TIMEZONE)}`,
    booking.joinUrl ? `Meeting link: ${booking.joinUrl}` : null,
    typeof source === "string" && source ? `Booked from: ${source}` : null,
    ...booking.answers.map((qa) => `${qa.question}\n${qa.answer}`),
  ].filter(Boolean);

  const payload = {
    name: booking.name,
    email: booking.email,
    subject: `Calendly booking · ${formatInZone(booking.startTime, TEAM_TIMEZONE)}`,
    message: lines.join("\n\n"),
  };

  const [sheet, db] = await Promise.allSettled([
    saveContactToSheetDb(payload),
    saveLeadFromForm({ ...payload, source: "contact" }),
  ]);
  if (sheet.status === "rejected") console.error("SheetDB booking save failed:", sheet.reason);
  if (db.status === "rejected") console.error("Supabase booking save failed:", db.reason);

  try {
    await sendContactNotificationEmail(payload);
  } catch (error) {
    console.error("Booking notification email failed:", error);
  }

  return NextResponse.json({
    ok: true,
    booking: {
      name: booking.name,
      startTime: booking.startTime,
      timezone: booking.timezone,
      joinUrl: booking.joinUrl,
    },
  });
}
