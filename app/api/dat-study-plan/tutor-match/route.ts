import { NextResponse } from "next/server";
import { sendTutorMatchEmail } from "@/lib/dat-study-plan/email";
import { planUrl, requestTutorMatch } from "@/lib/dat-study-plan/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const token = body && typeof body === "object" ? (body as { token?: unknown }).token : null;
  if (typeof token !== "string") {
    return NextResponse.json({ error: "Missing plan." }, { status: 400 });
  }

  try {
    const match = await requestTutorMatch(token);
    if (!match) {
      return NextResponse.json({ error: "We could not find that plan." }, { status: 404 });
    }

    try {
      await sendTutorMatchEmail({ ...match, planUrl: planUrl(token) });
    } catch (error) {
      console.error("Tutor match email failed:", error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Tutor match save failed:", error);
    return NextResponse.json({ error: "We could not send that request. Please try again." }, { status: 502 });
  }
}
