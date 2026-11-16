import "server-only";
import { getSupabase } from "@/lib/supabase/server";
import { parseCsv } from "@/lib/leads/server";
import type {
  OutreachKind,
  OutreachStatus,
  OutreachTarget,
} from "@/lib/outreach/shared";
import {
  FOLLOW_UP_DAYS,
  isOutreachKind,
  isOutreachStatus,
  OUTREACH_KIND_LABELS,
  OUTREACH_STATUS_LABELS,
} from "@/lib/outreach/shared";

const TABLE = "outreach_targets";
const COLUMNS =
  "id, created_at, updated_at, name, organization, state, kind, status, contact_name, email, instagram, website, discount_code, link_url, last_contacted_on, next_follow_up_on, notes";

export type OutreachInput = {
  name: string;
  organization: string;
  state: string;
  kind: OutreachKind;
  status: OutreachStatus;
  contact_name: string;
  email: string;
  instagram: string;
  website: string;
  discount_code: string;
  link_url: string;
  last_contacted_on: string | null;
  next_follow_up_on: string | null;
  notes: string;
};

const dedupeKey = (organization: string, name: string) =>
  `${organization} | ${name}`.trim().replace(/\s+/g, " ").toLowerCase();

export const isoDate = (ms: number) => new Date(ms).toISOString().slice(0, 10);

/** True when the table exists. False means supabase/outreach.sql has not been run yet. */
export async function outreachReady(): Promise<boolean> {
  // A plain select (not head: true) so a missing table returns a real error message.
  const { error } = await getSupabase().from(TABLE).select("id").limit(1);
  if (!error) return true;
  if (
    error.code === "42P01" ||
    error.code === "PGRST205" ||
    /does not exist|schema cache/i.test(error.message)
  )
    return false;
  throw new Error(error.message);
}

export async function listOutreach(): Promise<OutreachTarget[]> {
  const { data, error } = await getSupabase()
    .from(TABLE)
    .select(COLUMNS)
    .order("created_at", { ascending: true })
    .limit(2000);
  if (error) throw new Error(error.message);
  return (data ?? []) as OutreachTarget[];
}

export async function getOutreach(id: string): Promise<OutreachTarget | null> {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const { data, error } = await getSupabase()
    .from(TABLE)
    .select(COLUMNS)
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as OutreachTarget | null) ?? null;
}

export async function createOutreach(input: OutreachInput): Promise<string> {
  const { data, error } = await getSupabase()
    .from(TABLE)
    .insert({ ...input, dedupe_key: dedupeKey(input.organization, input.name) })
    .select("id")
    .single();
  if (error) {
    if (error.code === "23505")
      throw new Error("This target is already in the tracker.");
    throw new Error(error.message);
  }
  return data.id as string;
}

export async function updateOutreach(
  id: string,
  update: Partial<OutreachInput>,
): Promise<void> {
  const patch: Record<string, unknown> = { ...update };
  if (update.organization !== undefined && update.name !== undefined)
    patch.dedupe_key = dedupeKey(update.organization, update.name);
  const { error } = await getSupabase().from(TABLE).update(patch).eq("id", id);
  if (error) {
    if (error.code === "23505")
      throw new Error("Another target already has this name.");
    throw new Error(error.message);
  }
}

export async function deleteOutreach(id: string): Promise<void> {
  const { error } = await getSupabase().from(TABLE).delete().eq("id", id);
  if (error) throw new Error(error.message);
}

/**
 * "I just sent a message": stamps today, schedules the next follow-up and moves the status along
 * (To contact → Contacted → Followed up).
 */
export async function logMessageSent(id: string, today: string) {
  const t = await getOutreach(id);
  if (!t) throw new Error("Target not found.");
  const next: OutreachStatus =
    t.status === "to-contact"
      ? "contacted"
      : t.status === "contacted"
        ? "followed-up"
        : t.status;
  const followUp = isoDate(
    Date.parse(`${today}T00:00:00Z`) + FOLLOW_UP_DAYS * 864e5,
  );
  await updateOutreach(id, {
    status: next,
    last_contacted_on: today,
    // After the follow-up there is nothing more to chase automatically.
    next_follow_up_on: next === "followed-up" ? null : followUp,
  });
}

// Which CSV header goes into which field. Headers are compared lower-case with spaces and symbols removed,
// so "Club name", "club_name" and "CLUB NAME" all match.
const HEADER_MAP: Record<string, keyof OutreachInput> = {
  university: "organization",
  school: "organization",
  college: "organization",
  organization: "organization",
  organisation: "organization",
  org: "organization",
  institution: "organization",
  clubname: "name",
  club: "name",
  name: "name",
  pagename: "name",
  target: "name",
  state: "state",
  country: "state",
  location: "state",
  instagram: "instagram",
  instagramhandle: "instagram",
  ig: "instagram",
  insta: "instagram",
  email: "email",
  clubemail: "email",
  contactemail: "email",
  emailaddress: "email",
  website: "website",
  url: "website",
  officialpageurl: "website",
  link: "website",
  pageurl: "website",
  contact: "contact_name",
  contactname: "contact_name",
  contactperson: "contact_name",
  president: "contact_name",
  code: "discount_code",
  discountcode: "discount_code",
  type: "kind",
  kind: "kind",
  status: "status",
  notes: "notes",
  note: "notes",
  comments: "notes",
};

const norm = (h: string) => h.toLowerCase().replace(/[^a-z0-9]/g, "");

/** Turns "Pre-dental club" or "club" into a kind, and "To contact" or "to-contact" into a status. */
function matchLabel<T extends string>(
  value: string,
  labels: Record<T, string>,
  isValid: (s: string) => s is T,
): T | null {
  const v = value.trim().toLowerCase();
  if (!v) return null;
  const dashed = v.replace(/\s+/g, "-");
  if (isValid(dashed)) return dashed;
  const hit = (Object.entries(labels) as [T, string][]).find(
    ([, l]) => l.toLowerCase() === v,
  );
  return hit ? hit[0] : null;
}

export type CsvImportResult = {
  rows: number;
  imported: number;
  duplicates: number;
  skipped: number;
  columns: string[];
  ignored: string[];
};

/**
 * Adds targets from a CSV file. The first row must be headers (any of the names in HEADER_MAP). Rows already
 * in the tracker (same school + name) are skipped, so the same file can be uploaded twice safely.
 */
export async function importOutreachCsv(
  text: string,
): Promise<CsvImportResult> {
  const table = parseCsv(text.replace(/^\uFEFF/, "")).filter((r) =>
    r.some((c) => c.trim()),
  );
  if (table.length < 2)
    throw new Error(
      "The file needs a header row and at least one row of data.",
    );

  const headers = table[0].map((h) => h.trim());
  const fields = headers.map((h) => HEADER_MAP[norm(h)] ?? null);
  if (!fields.includes("name") && !fields.includes("organization"))
    throw new Error(
      `Couldn't find a name column. Use headers like "University" and "Club name". Found: ${headers.join(", ")}`,
    );

  let skipped = 0;
  const byKey = new Map<string, Record<string, unknown>>();
  for (const cells of table.slice(1)) {
    const v: Partial<Record<keyof OutreachInput, string>> = {};
    fields.forEach((f, i) => {
      const cell = (cells[i] ?? "").trim();
      if (f && cell && !v[f]) v[f] = cell;
    });
    if (!v.name && !v.organization) {
      skipped++;
      continue;
    }
    const kind = matchLabel(v.kind ?? "", OUTREACH_KIND_LABELS, isOutreachKind);
    const status = matchLabel(
      v.status ?? "",
      OUTREACH_STATUS_LABELS,
      isOutreachStatus,
    );
    const row = {
      name: v.name ?? "",
      organization: v.organization ?? "",
      state: (v.state ?? "").slice(0, 30),
      kind: kind ?? "club",
      status: status ?? "to-contact",
      contact_name: v.contact_name ?? "",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email ?? "") ? v.email! : "",
      instagram: v.instagram ?? "",
      website: v.website ?? "",
      discount_code: (v.discount_code ?? "").toUpperCase(),
      notes: v.notes ?? "",
      dedupe_key: dedupeKey(v.organization ?? "", v.name ?? ""),
    };
    byKey.set(row.dedupe_key, row);
  }

  const rows = [...byKey.values()];
  let imported = 0;
  if (rows.length) {
    const { data, error } = await getSupabase()
      .from(TABLE)
      .upsert(rows, { onConflict: "dedupe_key", ignoreDuplicates: true })
      .select("id");
    if (error) throw new Error(error.message);
    imported = data?.length ?? 0;
  }
  return {
    rows: table.length - 1,
    imported,
    duplicates:
      rows.length - imported + (table.length - 1 - skipped - rows.length),
    skipped,
    columns: headers.filter((_, i) => fields[i]),
    ignored: headers.filter((h, i) => h && !fields[i]),
  };
}

/** Deletes every target still at "To contact" that was never messaged. Returns how many were removed. */
export async function deleteUntouchedOutreach(): Promise<number> {
  const { data, error } = await getSupabase()
    .from(TABLE)
    .delete()
    .eq("status", "to-contact")
    .is("last_contacted_on", null)
    .select("id");
  if (error) throw new Error(error.message);
  return data?.length ?? 0;
}
