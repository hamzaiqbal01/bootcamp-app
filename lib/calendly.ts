// Server-only helpers for the Calendly API (v2). Booking details are read with the account's
// personal access token, which works on Calendly's free plan; webhooks would need a paid plan.

export const CALENDLY_BOOKING_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/futuredentistpreparation/30min";

const API = "https://api.calendly.com";

export type CalendlyBooking = {
  name: string;
  email: string;
  /** The student's own time zone, e.g. "Asia/Karachi". */
  timezone: string;
  startTime: string;
  endTime: string;
  bookedAt: string;
  eventName: string;
  joinUrl: string | null;
  answers: { question: string; answer: string }[];
  rescheduleUrl: string | null;
  cancelUrl: string | null;
};

function token(): string {
  const value = process.env.CALENDLY_TOKEN;
  if (!value) throw new Error("CALENDLY_TOKEN is not set.");
  return value;
}

async function calendlyGet<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token()}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Calendly responded with ${res.status} for ${url}`);
  return (await res.json()) as T;
}

let ownerUri: string | null = null;

async function getOwnerUri(): Promise<string> {
  if (!ownerUri) {
    const me = await calendlyGet<{ resource: { uri: string } }>(`${API}/users/me`);
    ownerUri = me.resource.uri;
  }
  return ownerUri;
}

/**
 * Looks up a booking from the URIs the embed posts to the page. Only bookings on this account are
 * accepted, so a visitor can't make us fetch someone else's event.
 */
export async function getBooking(eventUri: string, inviteeUri: string): Promise<CalendlyBooking | null> {
  if (!eventUri.startsWith(`${API}/scheduled_events/`) || !inviteeUri.startsWith(`${eventUri}/invitees/`)) {
    return null;
  }

  const [{ resource: event }, owner] = await Promise.all([
    calendlyGet<{
      resource: {
        name: string;
        start_time: string;
        end_time: string;
        location?: { join_url?: string };
        event_memberships: { user: string }[];
      };
    }>(eventUri),
    getOwnerUri(),
  ]);

  if (!event.event_memberships.some((member) => member.user === owner)) return null;

  const { resource: invitee } = await calendlyGet<{
    resource: {
      name: string;
      email: string;
      timezone: string;
      created_at: string;
      questions_and_answers?: { question: string; answer: string }[];
      reschedule_url?: string;
      cancel_url?: string;
    };
  }>(inviteeUri);

  return {
    name: invitee.name,
    email: invitee.email,
    timezone: invitee.timezone,
    startTime: event.start_time,
    endTime: event.end_time,
    bookedAt: invitee.created_at,
    eventName: event.name,
    joinUrl: event.location?.join_url ?? null,
    answers: invitee.questions_and_answers ?? [],
    rescheduleUrl: invitee.reschedule_url ?? null,
    cancelUrl: invitee.cancel_url ?? null,
  };
}

export function formatInZone(iso: string, timeZone: string): string {
  return new Date(iso).toLocaleString("en-US", {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}
