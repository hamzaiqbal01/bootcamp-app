"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import {
  checkAdminPassword,
  createAdminSession,
  deleteAdminSession,
  isAdminConfigured,
  requireAdmin,
} from "@/lib/admin/session";
import { createLead, deleteLead, getLead, importLeadsFromSheet, updateLead } from "@/lib/leads/server";
import { isLeadStatus, type LeadStatus } from "@/lib/leads/shared";

export type ActionState = { ok?: string; error?: string } | undefined;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Something went wrong.";
}

// ---------- Auth ----------

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  if (!isAdminConfigured()) {
    return { error: "Admin is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET." };
  }

  if (!checkAdminPassword(field(formData, "password"))) {
    // Slow down password guessing
    await new Promise((r) => setTimeout(r, 1000));
    return { error: "Wrong password." };
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await deleteAdminSession();
  redirect("/admin/login");
}

// ---------- Leads ----------

function readLeadFields(formData: FormData) {
  const status = field(formData, "status");
  return {
    name: field(formData, "name"),
    email: field(formData, "email"),
    phone: field(formData, "phone"),
    subject: field(formData, "subject"),
    message: field(formData, "message"),
    notes: field(formData, "notes"),
    status: isLeadStatus(status) ? status : ("new" as LeadStatus),
  };
}

function validateLead(lead: ReturnType<typeof readLeadFields>): string | null {
  if (!lead.name && !lead.email) return "Add at least a name or an email.";
  if (lead.email && !EMAIL_RE.test(lead.email)) return "That email address doesn't look valid.";
  return null;
}

export async function createLeadAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const lead = readLeadFields(formData);
  const invalid = validateLead(lead);
  if (invalid) return { error: invalid };

  let id: string;
  try {
    id = await createLead({ ...lead, source: "manual" });
  } catch (error) {
    return { error: errorMessage(error) };
  }
  redirect(`/admin/leads/${id}`);
}

export async function updateLeadAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();

  const id = field(formData, "id");
  const lead = readLeadFields(formData);
  const invalid = validateLead(lead);
  if (invalid) return { error: invalid };

  try {
    await updateLead(id, lead);
  } catch (error) {
    return { error: errorMessage(error) };
  }

  refresh();
  return { ok: "Saved." };
}

export async function setLeadStatusAction(id: string, status: string): Promise<void> {
  await requireAdmin();
  if (!isLeadStatus(status)) throw new Error("Invalid status.");
  await updateLead(id, { status });
  refresh();
}

/** Called when you click Reply: a "new" lead becomes "contacted". */
export async function markRepliedAction(id: string): Promise<void> {
  await requireAdmin();
  const lead = await getLead(id);
  if (lead?.status === "new") {
    await updateLead(id, { status: "contacted" });
    refresh();
  }
}

export async function deleteLeadAction(id: string): Promise<void> {
  await requireAdmin();
  await deleteLead(id);
  redirect("/admin");
}

export async function importSheetAction(): Promise<ActionState> {
  await requireAdmin();

  try {
    const { found, imported } = await importLeadsFromSheet();
    refresh();
    return {
      ok:
        imported === 0
          ? `Checked ${found} rows in the sheet — everything is already imported.`
          : `Imported ${imported} new lead${imported === 1 ? "" : "s"} (of ${found} rows in the sheet).`,
    };
  } catch (error) {
    return { error: errorMessage(error) };
  }
}
