"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/session";
import {
  createOutreach,
  deleteOutreach,
  deleteUntouchedOutreach,
  importOutreachCsv,
  isoDate,
  logMessageSent,
  type OutreachInput,
  updateOutreach,
} from "@/lib/outreach/server";
import { isOutreachKind, isOutreachStatus } from "@/lib/outreach/shared";

export type OutreachActionState = { ok?: string; error?: string } | undefined;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const field = (fd: FormData, k: string) => {
  const v = fd.get(k);
  return typeof v === "string" ? v.trim() : "";
};
const message = (e: unknown) =>
  e instanceof Error ? e.message : "Something went wrong.";
const today = () => isoDate(Date.now());

function readInput(fd: FormData): OutreachInput | string {
  const kind = field(fd, "kind");
  const status = field(fd, "status");
  const followUp = field(fd, "next_follow_up_on");
  const lastSent = field(fd, "last_contacted_on");
  const input: OutreachInput = {
    name: field(fd, "name"),
    organization: field(fd, "organization"),
    state: field(fd, "state").toUpperCase().slice(0, 30),
    kind: isOutreachKind(kind) ? kind : "club",
    status: isOutreachStatus(status) ? status : "to-contact",
    contact_name: field(fd, "contact_name"),
    email: field(fd, "email"),
    instagram: field(fd, "instagram"),
    website: field(fd, "website"),
    discount_code: field(fd, "discount_code").toUpperCase(),
    link_url: field(fd, "link_url"),
    last_contacted_on: DATE_RE.test(lastSent) ? lastSent : null,
    next_follow_up_on: DATE_RE.test(followUp) ? followUp : null,
    notes: field(fd, "notes"),
  };
  if (!input.name && !input.organization)
    return "Add a name or a school / organization.";
  if (input.email && !EMAIL_RE.test(input.email))
    return "That email address doesn't look valid.";
  return input;
}

export async function createOutreachAction(
  _prev: OutreachActionState,
  fd: FormData,
): Promise<OutreachActionState> {
  await requireAdmin();
  const input = readInput(fd);
  if (typeof input === "string") return { error: input };
  let id: string;
  try {
    id = await createOutreach(input);
  } catch (e) {
    return { error: message(e) };
  }
  redirect(`/admin/outreach/${id}`);
}

export async function updateOutreachAction(
  _prev: OutreachActionState,
  fd: FormData,
): Promise<OutreachActionState> {
  await requireAdmin();
  const input = readInput(fd);
  if (typeof input === "string") return { error: input };
  try {
    await updateOutreach(field(fd, "id"), input);
  } catch (e) {
    return { error: message(e) };
  }
  refresh();
  return { ok: "Saved." };
}

export async function setOutreachStatusAction(id: string, status: string) {
  await requireAdmin();
  if (!isOutreachStatus(status)) throw new Error("Invalid status.");
  // Once they reply (or it's finished) there is nothing to chase.
  const done = ["replied", "link-live", "declined", "no-response"].includes(
    status,
  );
  await updateOutreach(
    id,
    done ? { status, next_follow_up_on: null } : { status },
  );
  refresh();
}

export async function logMessageSentAction(id: string) {
  await requireAdmin();
  await logMessageSent(id, today());
  refresh();
}

/** Puts a target back the way it was before "sent" was logged (the Undo link). */
export async function undoMessageSentAction(
  id: string,
  prev: {
    status: string;
    last_contacted_on: string | null;
    next_follow_up_on: string | null;
  },
) {
  await requireAdmin();
  if (!isOutreachStatus(prev.status)) throw new Error("Invalid status.");
  const date = (d: string | null) => (d && DATE_RE.test(d) ? d : null);
  await updateOutreach(id, {
    status: prev.status,
    last_contacted_on: date(prev.last_contacted_on),
    next_follow_up_on: date(prev.next_follow_up_on),
  });
  refresh();
}

export async function deleteOutreachAction(id: string) {
  await requireAdmin();
  await deleteOutreach(id);
  redirect("/admin/outreach");
}

export async function importCsvAction(
  _prev: OutreachActionState,
  fd: FormData,
): Promise<OutreachActionState> {
  await requireAdmin();
  const file = fd.get("file");
  if (!(file instanceof File) || file.size === 0)
    return { error: "Choose a .csv file first." };
  if (file.size > 900_000)
    return { error: "That file is too big. Keep it under about 5,000 rows." };
  try {
    const r = await importOutreachCsv(await file.text());
    refresh();
    const parts = [
      `Added ${r.imported} of ${r.rows} rows.`,
      r.duplicates ? `${r.duplicates} were already in the list.` : "",
      r.skipped ? `${r.skipped} had no name and were skipped.` : "",
      r.ignored.length ? `Ignored columns: ${r.ignored.join(", ")}.` : "",
    ];
    return { ok: parts.filter(Boolean).join(" ") };
  } catch (e) {
    return { error: message(e) };
  }
}

export async function removeUntouchedAction(): Promise<void> {
  await requireAdmin();
  await deleteUntouchedOutreach();
  refresh();
}
