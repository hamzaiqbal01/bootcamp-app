import { NextResponse } from "next/server";
import {
  parseContactPayload,
  saveContactToSheetDb,
  sendContactNotificationEmail,
  type ContactPayload,
} from "@/lib/contact";
import { blogHasLeadForm } from "@/lib/blog-lead";
import { getPostBySlug } from "@/lib/data/blog";
import { saveLeadFromForm } from "@/lib/leads/server";

async function saveBlogLead(lead: ContactPayload) {
  try {
    return await saveLeadFromForm({ ...lead, source: "blog-guide" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (!message.includes("leads_source_check")) throw error;
    // Live table still rejects blog-guide until supabase/blog-lead-source.sql is run.
    return saveLeadFromForm({
      ...lead,
      source: "contact",
      notes: "Blog guide form. Run supabase/blog-lead-source.sql to label these as Blog guide.",
    });
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const record = body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  const payload = parseContactPayload(body);
  const page = typeof record?.page === "string" ? record.page : "";
  const demoCall = record?.intent === "demo-call" && Boolean(getPostBySlug(page));

  if (!payload || (!blogHasLeadForm(page) && !demoCall)) {
    return NextResponse.json({ error: "Missing or invalid form fields." }, { status: 400 });
  }

  const lead = {
    ...payload,
    subject: demoCall ? `Free demo tutor (${page})` : `${payload.subject} (${page})`,
    message: `${payload.message}\n\nPage: /blog/${page}`,
  };

  const [sheet, db] = await Promise.allSettled([
    saveContactToSheetDb(lead),
    saveBlogLead(lead),
  ]);

  if (sheet.status === "rejected") console.error("SheetDB blog lead save failed:", sheet.reason);
  if (db.status === "rejected") console.error("Supabase blog lead save failed:", db.reason);

  if (sheet.status === "rejected" && !(db.status === "fulfilled" && db.value)) {
    return NextResponse.json(
      { error: "Could not save that. Please try again." },
      { status: 502 },
    );
  }

  try {
    await sendContactNotificationEmail(lead);
  } catch (error) {
    console.error("Blog lead email failed:", error);
  }

  return NextResponse.json({ ok: true });
}
