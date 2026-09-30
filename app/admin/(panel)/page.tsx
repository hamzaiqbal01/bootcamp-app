import type { Metadata } from "next";
import Link from "next/link";
import { ImportSheetButton, LocalTime, ReplyButtons, StatusSelect } from "@/components/admin/LeadBits";
import { requireAdmin } from "@/lib/admin/session";
import { countLeadsByStatus, listLeads } from "@/lib/leads/server";
import {
  isLeadSource,
  isLeadStatus,
  LEAD_SOURCE_LABELS,
  LEAD_SOURCES,
  LEAD_STATUS_LABELS,
  LEAD_STATUSES,
  type LeadSource,
  type LeadStatus,
} from "@/lib/leads/shared";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Leads",
};

const PAGE_SIZE = 50;

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function one(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

type Sort = "newest" | "oldest";

function hrefWith(
  current: { status?: LeadStatus; source?: LeadSource; q?: string; sort?: Sort; page?: number },
  patch: Partial<{ status: LeadStatus | undefined; source: LeadSource | undefined; q: string; page: number }>,
) {
  const next = { ...current, page: 1, ...patch };
  const params = new URLSearchParams();
  if (next.status) params.set("status", next.status);
  if (next.source) params.set("source", next.source);
  if (next.q) params.set("q", next.q);
  if (next.sort === "oldest") params.set("sort", "oldest");
  if (next.page && next.page > 1) params.set("page", String(next.page));
  const qs = params.toString();
  return qs ? `/admin?${qs}` : "/admin";
}

export default async function AdminLeadsPage({ searchParams }: Props) {
  await requireAdmin();
  if (!isSupabaseConfigured()) return null;

  const sp = await searchParams;
  const status = isLeadStatus(one(sp.status)) ? (one(sp.status) as LeadStatus) : undefined;
  const source = isLeadSource(one(sp.source)) ? (one(sp.source) as LeadSource) : undefined;
  const q = one(sp.q).trim().slice(0, 100);
  const sort: Sort = one(sp.sort) === "oldest" ? "oldest" : "newest";
  const page = Math.max(1, Number.parseInt(one(sp.page), 10) || 1);
  const current = { status, source, q, sort, page };

  const [{ leads, total }, counts] = await Promise.all([
    listLeads({ status, source, q, sort, page, pageSize: PAGE_SIZE }),
    countLeadsByStatus(),
  ]);
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Leads</h1>
          <p className="mt-1 text-sm text-slate-500">
            Every contact form message and tutor application, {sort === "oldest" ? "oldest" : "newest"} first.
          </p>
        </div>
        <ImportSheetButton />
      </div>

      {/* Status tabs with counts */}
      <div className="flex flex-wrap gap-2">
        <StatusTab href={hrefWith(current, { status: undefined })} active={!status} label="All" count={counts.all} />
        {LEAD_STATUSES.map((s) => (
          <StatusTab
            key={s}
            href={hrefWith(current, { status: s })}
            active={status === s}
            label={LEAD_STATUS_LABELS[s]}
            count={counts[s]}
          />
        ))}
      </div>

      {/* Search + source filter (plain GET form, works without JS) */}
      <form action="/admin" className="flex flex-col gap-2 sm:flex-row">
        {status && <input type="hidden" name="status" value={status} />}
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search name, email, subject, message, notes…"
          className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
        <select
          name="source"
          defaultValue={source ?? ""}
          aria-label="Source"
          className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500"
        >
          <option value="">All sources</option>
          {LEAD_SOURCES.map((s) => (
            <option key={s} value={s}>
              {LEAD_SOURCE_LABELS[s]}
            </option>
          ))}
        </select>
        <select
          name="sort"
          defaultValue={sort}
          aria-label="Sort"
          className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
        <button type="submit" className="rounded-xl bg-[#0B1020] px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
          Search
        </button>
        {(q || source || sort === "oldest") && (
          <Link
            href={hrefWith({ status }, {})}
            className="rounded-xl px-4 py-2.5 text-center text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            Clear
          </Link>
        )}
      </form>

      {/* Leads table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        {leads.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-semibold text-slate-900">No leads found</p>
            <p className="mt-1 text-sm text-slate-500">
              {counts.all === 0
                ? "Click “Import from Google Sheet” to bring in your existing leads."
                : "Try a different search or filter."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Lead</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Received</th>
                  <th className="px-4 py-3">Reply</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="align-top hover:bg-slate-50/70">
                    <td className="max-w-[220px] px-4 py-3">
                      <Link href={`/admin/leads/${lead.id}`} className="font-semibold text-slate-900 hover:text-brand-600">
                        {lead.name || "(no name)"}
                      </Link>
                      <div className="truncate text-slate-500">{lead.email || "—"}</div>
                    </td>
                    <td className="max-w-[380px] px-4 py-3">
                      <Link href={`/admin/leads/${lead.id}`} className="block">
                        {lead.subject && <div className="truncate font-medium text-slate-800">{lead.subject}</div>}
                        <div className="line-clamp-2 text-slate-500">{lead.message || "—"}</div>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <StatusSelect key={lead.status} id={lead.id} status={lead.status} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                      {lead.source === "sheet" ? (
                        <span title="Imported from the Google Sheet (no date saved there)">From sheet</span>
                      ) : (
                        <LocalTime iso={lead.created_at} />
                      )}
                      <div className="text-xs text-slate-400">{LEAD_SOURCE_LABELS[lead.source]}</div>
                    </td>
                    <td className="px-4 py-3">
                      <ReplyButtons lead={lead} compact />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>
            Page {page} of {pages} · {total} leads
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <Link href={hrefWith(current, { page: page - 1 })} className="rounded-lg bg-white px-3 py-1.5 ring-1 ring-slate-200 hover:ring-slate-400">
                ← Previous
              </Link>
            )}
            {page < pages && (
              <Link href={hrefWith(current, { page: page + 1 })} className="rounded-lg bg-white px-3 py-1.5 ring-1 ring-slate-200 hover:ring-slate-400">
                Next →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusTab({ href, active, label, count }: { href: string; active: boolean; label: string; count: number }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
        active ? "bg-[#0B1020] text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-slate-400"
      }`}
    >
      {label}
      <span className={`rounded-full px-1.5 text-xs ${active ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>{count}</span>
    </Link>
  );
}
