import "server-only";
import { createHash } from "node:crypto";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Lead, LeadSource, LeadStatus } from "@/lib/leads/shared";
import { LEAD_STATUSES } from "@/lib/leads/shared";

export type NewLead = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  source: LeadSource;
  status?: LeadStatus;
  notes?: string;
};

export type LeadUpdate = Partial<
  Pick<Lead, "name" | "email" | "phone" | "subject" | "message" | "status" | "notes">
>;

const TABLE = "leads";
const LEAD_COLUMNS =
  "id, created_at, updated_at, name, email, phone, subject, message, source, status, notes";

/**
 * Same email + subject + message → same key. Used so re-importing the sheet
 * (which the contact form also writes to) never creates duplicates.
 */
export function leadDedupeKey(lead: { name: string; email: string; subject: string; message: string }) {
  const norm = (s: string) => s.trim().replace(/\s+/g, " ").toLowerCase();
  const who = norm(lead.email) || norm(lead.name);
  return createHash("sha256")
    .update([who, norm(lead.subject), norm(lead.message)].join("\n"))
    .digest("hex");
}

function toRow(lead: NewLead) {
  return {
    name: lead.name.trim(),
    email: lead.email.trim(),
    phone: lead.phone?.trim() ?? "",
    subject: lead.subject.trim(),
    message: lead.message.trim(),
    source: lead.source,
    status: lead.status ?? "new",
    notes: lead.notes?.trim() ?? "",
    dedupe_key: leadDedupeKey(lead),
  };
}

/**
 * Saves a website form submission. Returns false (without throwing) when
 * Supabase is not configured yet, so the forms keep working on SheetDB alone.
 */
export async function saveLeadFromForm(lead: NewLead): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  const { error } = await getSupabase()
    .from(TABLE)
    .upsert(toRow(lead), { onConflict: "dedupe_key", ignoreDuplicates: true });

  if (error) throw new Error(`Supabase insert failed: ${error.message}`);
  return true;
}

export async function createLead(lead: NewLead): Promise<string> {
  const { data, error } = await getSupabase()
    .from(TABLE)
    .insert({ ...toRow(lead), dedupe_key: null })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  return data.id as string;
}

export type LeadListFilters = {
  status?: LeadStatus;
  source?: LeadSource;
  q?: string;
  sort?: "newest" | "oldest";
  page: number;
  pageSize: number;
};

/** Strip characters that have meaning in PostgREST filter syntax. */
function sanitizeSearch(q: string): string {
  return q.replace(/[^\p{L}\p{N}@.\-+' ]/gu, " ").replace(/\s+/g, " ").trim();
}

export async function listLeads(filters: LeadListFilters): Promise<{ leads: Lead[]; total: number }> {
  let query = getSupabase().from(TABLE).select(LEAD_COLUMNS, { count: "exact" });

  if (filters.status) query = query.eq("status", filters.status);
  if (filters.source) query = query.eq("source", filters.source);

  const q = filters.q ? sanitizeSearch(filters.q) : "";
  if (q) {
    const like = `*${q}*`;
    query = query.or(
      `name.ilike.${like},email.ilike.${like},subject.ilike.${like},message.ilike.${like},notes.ilike.${like}`,
    );
  }

  const from = (filters.page - 1) * filters.pageSize;
  const { data, error, count } = await query
    .order("created_at", { ascending: filters.sort === "oldest" })
    .range(from, from + filters.pageSize - 1);

  if (error) throw new Error(error.message);
  return { leads: (data ?? []) as Lead[], total: count ?? 0 };
}

export async function countLeadsByStatus(): Promise<Record<LeadStatus | "all", number>> {
  const supabase = getSupabase();
  const counts = await Promise.all(
    LEAD_STATUSES.map(async (status) => {
      const { count, error } = await supabase
        .from(TABLE)
        .select("id", { count: "exact", head: true })
        .eq("status", status);
      if (error) throw new Error(error.message);
      return [status, count ?? 0] as const;
    }),
  );

  const byStatus = Object.fromEntries(counts) as Record<LeadStatus, number>;
  const all = counts.reduce((sum, [, n]) => sum + n, 0);
  return { ...byStatus, all };
}

export async function getLead(id: string): Promise<Lead | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;

  const { data, error } = await getSupabase().from(TABLE).select(LEAD_COLUMNS).eq("id", id).maybeSingle();

  if (error) throw new Error(error.message);
  return (data as Lead | null) ?? null;
}

export async function updateLead(id: string, update: LeadUpdate): Promise<void> {
  const { error } = await getSupabase().from(TABLE).update(update).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteLead(id: string): Promise<void> {
  const { error } = await getSupabase().from(TABLE).delete().eq("id", id);
  if (error) throw new Error(error.message);
}

/** Minimal RFC 4180 CSV parser (quoted fields, "" escapes, newlines inside quotes). */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        quoted = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      quoted = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

/**
 * Reads one sheet row as Name / Email / Subject / Message. Google's append has
 * drifted over time, so later rows start further right (D, G, J … AH) instead
 * of column A. Rows whose data all sits in A–D are read normally; otherwise the
 * four fields start at the first filled column.
 */
function readSheetRow(cells: string[]) {
  const values = cells.map((c) => c.trim());
  const filled = values.flatMap((v, i) => (v ? [i] : []));
  if (filled.length === 0) return null;

  const start = filled.every((i) => i <= 3) ? 0 : filled[0];
  const [name = "", email = "", subject = "", message = ""] = values.slice(start, start + 4);
  return { name, email, subject, message };
}

/**
 * Sheet leads have no timestamps. Give each a fixed time from its row number
 * (row 2 oldest, last row newest) so the dashboard keeps sheet order, and
 * anything arriving from the website later always sorts above them.
 */
const SHEET_EPOCH = Date.UTC(2020, 0, 1);

export function sheetRowCreatedAt(rowNumber: number): string {
  return new Date(SHEET_EPOCH + rowNumber * 60_000).toISOString();
}

/**
 * Pulls every row from the Google Sheet (CSV export — the sheet must be
 * viewable by link) and inserts the ones not in Supabase yet.
 */
export async function importLeadsFromSheet(): Promise<{ found: number; imported: number }> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) throw new Error("GOOGLE_SHEET_ID is not set.");
  const gid = process.env.GOOGLE_SHEET_GID ?? "0";

  const res = await fetch(
    `https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/export?format=csv&gid=${encodeURIComponent(gid)}`,
    { cache: "no-store", redirect: "follow" },
  );
  if (!res.ok || !res.headers.get("content-type")?.includes("text/csv")) {
    throw new Error(
      `Could not read the Google Sheet (${res.status}). Make sure "Anyone with the link" can view it.`,
    );
  }

  const rows = parseCsv(await res.text());

  // Same lead twice in the sheet → keep the lower (newer) row.
  const byKey = new Map<string, ReturnType<typeof toRow> & { created_at: string }>();
  rows.slice(1).forEach((cells, i) => {
    const lead = readSheetRow(cells);
    if (!lead || !(lead.name || lead.email || lead.message)) return;
    const row = { ...toRow({ ...lead, source: "sheet" }), created_at: sheetRowCreatedAt(i + 2) };
    byKey.delete(row.dedupe_key);
    byKey.set(row.dedupe_key, row);
  });

  const toInsert = [...byKey.values()];
  if (toInsert.length === 0) return { found: 0, imported: 0 };

  const { data, error } = await getSupabase()
    .from(TABLE)
    .upsert(toInsert, { onConflict: "dedupe_key", ignoreDuplicates: true })
    .select("id");

  if (error) throw new Error(error.message);
  return { found: toInsert.length, imported: data?.length ?? 0 };
}
