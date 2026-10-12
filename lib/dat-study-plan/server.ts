import "server-only";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/server";
import type { LeadStatus } from "@/lib/leads/shared";
import { generateDatStudyPlan } from "./generate";
import { scoreLead } from "./lead-score";
import { leadSummaryText } from "./summary";
import type { Attribution, GeneratedPlan, LeadDetails, PublicStudyPlan, StudyPlanInput } from "./types";

const TABLE = "dat_study_plan_leads";

export type SavedStudyPlan = {
  id: string;
  token: string;
  plan: GeneratedPlan;
  score: number;
  band: "low" | "warm" | "high";
};

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://futuredentalprep.com";
}

export function planUrl(token: string): string {
  return `${siteUrl()}/dat-study-plan-generator/plan/${token}`;
}

function assertConfigured() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }
}

async function upsertAdminLead(input: {
  lead: LeadDetails;
  subject: string;
  message: string;
  notes: string;
}): Promise<string> {
  const supabase = getSupabase();
  const email = input.lead.email.toLowerCase();
  const { data: existing, error: readError } = await supabase
    .from("leads")
    .select("id, status")
    .eq("email", email)
    .eq("source", "dat-study-plan")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (readError) throw new Error(readError.message);

  if (existing?.id) {
    const { error } = await supabase
      .from("leads")
      .update({
        name: input.lead.firstName,
        phone: input.lead.phone,
        subject: input.subject,
        message: input.message,
        notes: input.notes,
      })
      .eq("id", existing.id);
    if (error) throw new Error(error.message);
    return existing.id as string;
  }

  const { data, error } = await supabase
    .from("leads")
    .insert({
      name: input.lead.firstName,
      email,
      phone: input.lead.phone,
      subject: input.subject,
      message: input.message,
      source: "dat-study-plan",
      status: "new" satisfies LeadStatus,
      notes: input.notes,
      dedupe_key: null,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  return data.id as string;
}

export async function saveStudyPlan(input: {
  study: StudyPlanInput;
  lead: LeadDetails;
  attribution: Attribution;
}): Promise<SavedStudyPlan> {
  assertConfigured();
  const plan = generateDatStudyPlan(input.study);
  const { score, band } = scoreLead(input.study, plan, {
    phone: input.lead.phone,
    marketingConsent: input.lead.marketingConsent,
  });
  const message = leadSummaryText(input.study, plan, score, band);
  const subject = `DAT study plan — ${plan.primaryLabel}`;
  const adminLeadId = await upsertAdminLead({
    lead: input.lead,
    subject,
    message,
    notes: `Lead score ${score} (${band}).`,
  });

  const { data, error } = await getSupabase()
    .from(TABLE)
    .insert({
      first_name: input.lead.firstName,
      email: input.lead.email.toLowerCase(),
      phone: input.lead.phone,
      country: input.lead.country,
      scheduled_dat: input.study.scheduledDat,
      dat_date: input.study.datDate,
      planned_dat_window: input.study.plannedDatWindow,
      started_studying: input.study.startedStudying,
      diagnostic_taken: input.study.diagnosticTaken,
      score_format: input.study.scoreFormat,
      overall_score: input.study.overallScore,
      biology_score: input.study.sectionScores.biology,
      general_chemistry_score: input.study.sectionScores.generalChemistry,
      organic_chemistry_score: input.study.sectionScores.organicChemistry,
      perceptual_ability_score: input.study.sectionScores.perceptualAbility,
      reading_comprehension_score: input.study.sectionScores.readingComprehension,
      quantitative_reasoning_score: input.study.sectionScores.quantitativeReasoning,
      biology_confidence: input.study.sectionConfidence.biology,
      general_chemistry_confidence: input.study.sectionConfidence.generalChemistry,
      organic_chemistry_confidence: input.study.sectionConfidence.organicChemistry,
      perceptual_ability_confidence: input.study.sectionConfidence.perceptualAbility,
      reading_comprehension_confidence: input.study.sectionConfidence.readingComprehension,
      quantitative_reasoning_confidence: input.study.sectionConfidence.quantitativeReasoning,
      target_score: input.study.targetScore,
      current_status: input.study.currentStatus,
      weekday_availability: input.study.weekdayAvailability,
      weekend_availability: input.study.weekendAvailability,
      preferred_study_days: input.study.preferredStudyDays,
      preferred_rest_day: input.study.preferredRestDay,
      current_resources: input.study.currentResources,
      biggest_challenges: input.study.biggestChallenges,
      days_until_exam: plan.daysUntilExam,
      weeks_until_exam: plan.weeksUntilExam,
      recommended_hours_per_week: plan.recommendedHoursPerWeek,
      preparation_intensity: plan.preparationIntensity,
      primary_priority: plan.primaryPriority,
      secondary_priority: plan.secondaryPriority,
      generated_plan: plan,
      lead_score: score,
      lead_band: band,
      utm_source: input.attribution.utmSource,
      utm_medium: input.attribution.utmMedium,
      utm_campaign: input.attribution.utmCampaign,
      utm_content: input.attribution.utmContent,
      utm_term: input.attribution.utmTerm,
      landing_page: input.attribution.landingPage,
      referrer: input.attribution.referrer,
      marketing_consent: input.lead.marketingConsent,
      admin_lead_id: adminLeadId,
    })
    .select("id, access_token")
    .single();

  if (error) throw new Error(error.message);

  return {
    id: data.id as string,
    token: data.access_token as string,
    plan,
    score,
    band,
  };
}

export async function getPublicStudyPlan(token: string): Promise<PublicStudyPlan | null> {
  if (!/^[0-9a-f-]{36}$/i.test(token) || !isSupabaseConfigured()) return null;

  const { data, error } = await getSupabase()
    .from(TABLE)
    .select("first_name, access_token, generated_plan, tutor_match_requested")
    .eq("access_token", token)
    .maybeSingle();

  if (error || !data?.generated_plan) return null;

  return {
    firstName: data.first_name as string,
    token: data.access_token as string,
    plan: data.generated_plan as GeneratedPlan,
    tutorRequested: Boolean(data.tutor_match_requested),
  };
}

export type AdminStudyPlan = {
  datDate: string | null;
  weeks: number | null;
  target: number | null;
  primary: string | null;
  resources: string[];
  weekday: string | null;
  weekend: string | null;
  score: number | null;
  band: string | null;
  createdAt: string;
};

export async function getStudyPlanForAdminLead(leadId: string): Promise<AdminStudyPlan | null> {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await getSupabase()
    .from(TABLE)
    .select(
      "dat_date, weeks_until_exam, target_score, primary_priority, current_resources, weekday_availability, weekend_availability, lead_score, lead_band, created_at",
    )
    .eq("admin_lead_id", leadId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;

  return {
    datDate: (data.dat_date as string | null) ?? null,
    weeks: data.weeks_until_exam == null ? null : Number(data.weeks_until_exam),
    target: data.target_score == null ? null : Number(data.target_score),
    primary: (data.primary_priority as string | null) ?? null,
    resources: Array.isArray(data.current_resources) ? (data.current_resources as string[]) : [],
    weekday: (data.weekday_availability as string | null) ?? null,
    weekend: (data.weekend_availability as string | null) ?? null,
    score: data.lead_score == null ? null : Number(data.lead_score),
    band: (data.lead_band as string | null) ?? null,
    createdAt: data.created_at as string,
  };
}

export async function requestTutorMatch(token: string): Promise<{ email: string; firstName: string; phone: string; plan: GeneratedPlan } | null> {
  if (!/^[0-9a-f-]{36}$/i.test(token)) return null;
  assertConfigured();

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select("id, email, first_name, phone, generated_plan, admin_lead_id, tutor_match_requested")
    .eq("access_token", token)
    .maybeSingle();

  if (error || !data) return null;

  if (!data.tutor_match_requested) {
    const { error: updateError } = await supabase.from(TABLE).update({ tutor_match_requested: true }).eq("id", data.id);
    if (updateError) throw new Error(updateError.message);

    if (data.admin_lead_id) {
      const { data: lead } = await supabase.from("leads").select("notes").eq("id", data.admin_lead_id).maybeSingle();
      const notes = `${lead?.notes ? `${lead.notes}\n` : ""}Requested a DAT tutor match.`;
      await supabase.from("leads").update({ notes }).eq("id", data.admin_lead_id);
    }
  }

  return {
    email: data.email as string,
    firstName: data.first_name as string,
    phone: (data.phone as string) ?? "",
    plan: data.generated_plan as GeneratedPlan,
  };
}
