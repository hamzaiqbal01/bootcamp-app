import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteLeadButton, LocalTime, ReplyButtons, StatusBadge } from "@/components/admin/LeadBits";
import { LeadForm } from "@/components/admin/LeadForm";
import { requireAdmin } from "@/lib/admin/session";
import { getLead } from "@/lib/leads/server";
import { LEAD_SOURCE_LABELS } from "@/lib/leads/shared";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Lead",
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminLeadPage({ params }: Props) {
  await requireAdmin();
  if (!isSupabaseConfigured()) return null;

  const { id } = await params;
  const lead = await getLead(id);
  if (!lead) notFound();

  return (
    <div className="space-y-6">
      <Link href="/admin" className="text-sm font-medium text-slate-500 hover:text-slate-900">
        ← All leads
      </Link>

      {/* Summary + reply */}
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">{lead.name || "(no name)"}</h1>
              <StatusBadge status={lead.status} />
            </div>
            <p className="mt-1 break-all text-slate-600">{lead.email || "No email"}</p>
            {lead.phone && <p className="text-slate-600">{lead.phone}</p>}
            <p className="mt-2 text-xs text-slate-400">
              {LEAD_SOURCE_LABELS[lead.source]} ·{" "}
              {lead.source === "sheet" ? (
                "no date in sheet"
              ) : (
                <>
                  received <LocalTime iso={lead.created_at} withTime />
                </>
              )}{" "}
              · last updated <LocalTime iso={lead.updated_at} withTime />
            </p>
          </div>
          <ReplyButtons lead={lead} />
        </div>

        {(lead.subject || lead.message) && (
          <div className="mt-6 rounded-xl border-l-4 border-brand-500 bg-slate-50 px-5 py-4">
            {lead.subject && <p className="font-semibold text-slate-900">{lead.subject}</p>}
            <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{lead.message}</p>
          </div>
        )}
      </section>

      {/* Edit */}
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="mb-5 text-lg font-bold text-slate-900">Edit lead</h2>
        {/* Remount when status changes elsewhere (e.g. Reply marks it Contacted) */}
        <LeadForm key={lead.status} lead={lead} />
      </section>

      <div className="flex justify-end">
        <DeleteLeadButton id={lead.id} name={lead.name} />
      </div>
    </div>
  );
}
