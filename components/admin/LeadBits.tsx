"use client";

import { useActionState, useState, useSyncExternalStore, useTransition } from "react";
import {
  deleteLeadAction,
  importSheetAction,
  markRepliedAction,
  setLeadStatusAction,
} from "@/app/admin/actions";
import {
  gmailReplyUrl,
  LEAD_STATUS_LABELS,
  LEAD_STATUS_STYLES,
  LEAD_STATUSES,
  mailtoReplyUrl,
  type Lead,
  type LeadStatus,
} from "@/lib/leads/shared";

const noopSubscribe = () => () => {};

/** Formats a date in the viewer's own timezone (server renders the plain date). */
export function LocalTime({ iso, withTime = false }: { iso: string; withTime?: boolean }) {
  const text = useSyncExternalStore(
    noopSubscribe,
    () =>
      new Date(iso).toLocaleString(undefined, {
        dateStyle: "medium",
        ...(withTime ? { timeStyle: "short" } : {}),
      }),
    () => iso.slice(0, 10),
  );
  return <time dateTime={iso}>{text}</time>;
}

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${LEAD_STATUS_STYLES[status]}`}
    >
      {LEAD_STATUS_LABELS[status]}
    </span>
  );
}

export function StatusSelect({ id, status }: { id: string; status: LeadStatus }) {
  const [pending, startTransition] = useTransition();
  const [value, setValue] = useState(status);

  return (
    <select
      aria-label="Status"
      value={value}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as LeadStatus;
        setValue(next);
        startTransition(() => setLeadStatusAction(id, next));
      }}
      className={`cursor-pointer rounded-full border-0 py-1 pl-2.5 pr-7 text-xs font-semibold ring-1 ring-inset disabled:opacity-60 ${LEAD_STATUS_STYLES[value]}`}
    >
      {LEAD_STATUSES.map((s) => (
        <option key={s} value={s}>
          {LEAD_STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}

type ReplyLead = Pick<Lead, "id" | "name" | "email" | "subject" | "message">;

export function ReplyButtons({ lead, compact = false }: { lead: ReplyLead; compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  if (!lead.email) {
    return <span className="text-xs text-slate-400">No email</span>;
  }

  const markReplied = () => {
    void markRepliedAction(lead.id);
  };

  const base =
    "inline-flex items-center gap-1.5 rounded-lg font-semibold transition whitespace-nowrap";
  const size = compact ? "px-2.5 py-1.5 text-xs" : "px-4 py-2 text-sm";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={gmailReplyUrl(lead)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={markReplied}
        className={`${base} ${size} bg-brand-600 text-white hover:bg-brand-700`}
      >
        Reply in Gmail
      </a>
      <a
        href={mailtoReplyUrl(lead)}
        onClick={markReplied}
        className={`${base} ${size} border border-slate-300 bg-white text-slate-700 hover:border-slate-900 hover:text-slate-900`}
      >
        {compact ? "Mail app" : "Reply in mail app"}
      </a>
      {!compact && (
        <button
          type="button"
          onClick={async () => {
            await navigator.clipboard.writeText(lead.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className={`${base} ${size} text-slate-500 hover:text-slate-900`}
        >
          {copied ? "Copied!" : "Copy email"}
        </button>
      )}
    </div>
  );
}

export function ImportSheetButton() {
  const [state, action, pending] = useActionState(importSheetAction, undefined);

  return (
    <form action={action} className="flex flex-col items-end gap-1.5">
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900 disabled:opacity-60"
      >
        {pending ? "Importing…" : "Import from Google Sheet"}
      </button>
      {state?.ok && <p className="text-xs text-emerald-700">{state.ok}</p>}
      {state?.error && <p className="text-xs text-rose-700">{state.error}</p>}
    </form>
  );
}

export function DeleteLeadButton({ id, name }: { id: string; name: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (
          window.confirm(
            `Delete lead "${name || "this lead"}"? This cannot be undone.\n\nTip: for junk leads, set the status to Spam instead — deleted sheet leads come back if you import the sheet again.`,
          )
        ) {
          startTransition(() => deleteLeadAction(id));
        }
      }}
      className="rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:opacity-60"
    >
      {pending ? "Deleting…" : "Delete lead"}
    </button>
  );
}
