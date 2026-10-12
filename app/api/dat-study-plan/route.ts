import { NextResponse } from "next/server";
import { sendStudyPlanEmails } from "@/lib/dat-study-plan/email";
import { parseStudyPlanRequest } from "@/lib/dat-study-plan/form";
import { planUrl, saveStudyPlan } from "@/lib/dat-study-plan/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = parseStudyPlanRequest(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const saved = await saveStudyPlan({
      study: parsed.input,
      lead: parsed.lead,
      attribution: parsed.attribution,
    });
    const url = planUrl(saved.token);
    const email = await sendStudyPlanEmails({
      firstName: parsed.lead.firstName,
      email: parsed.lead.email,
      marketingConsent: parsed.lead.marketingConsent,
      plan: saved.plan,
      planUrl: url,
    });

    return NextResponse.json({
      ok: true,
      token: saved.token,
      emailSent: email.student,
    });
  } catch (error) {
    console.error("DAT study plan save failed:", error);
    return NextResponse.json(
      { error: "We could not save your plan. Your answers are still on this page. Please try again." },
      { status: 502 },
    );
  }
}
