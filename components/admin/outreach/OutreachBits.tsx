"use client";

import { useActionState, useState, useTransition } from "react";
import {
  createOutreachAction,
  deleteOutreachAction,
  importCsvAction,
  logMessageSentAction,
  undoMessageSentAction,
  removeUntouchedAction,
  setOutreachStatusAction,
  updateOutreachAction,
} from "@/app/admin/outreach-actions";
import {
  gmailComposeUrl,
  instagramUrl,
  OUTREACH_KIND_LABELS,
  OUTREACH_KINDS,
  OUTREACH_STATUS_LABELS,
  OUTREACH_STATUS_STYLES,
  OUTREACH_STATUSES,
  type OutreachStatus,
  type OutreachTarget,
  outreachMessages,
} from "@/lib/outreach/shared";

export function OutreachStatusSelect({
  id,
  status,
}: {
  id: string;
  status: OutreachStatus;
}) {
  const [pending, start] = useTransition();
  const [value, setValue] = useState(status);
  return (
    <select
      aria-label="Status"
      value={value}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as OutreachStatus;
        setValue(next);
        start(() => setOutreachStatusAction(id, next));
      }}
      className={`cursor-pointer rounded-full border-0 py-1 pr-7 pl-2.5 text-xs font-semibold ring-1 ring-inset disabled:opacity-60 ${OUTREACH_STATUS_STYLES[value]}`}
    >
      {OUTREACH_STATUSES.map((s) => (
        <option key={s} value={s}>
          {OUTREACH_STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}

const btn =
  "inline-flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold transition disabled:opacity-60";

type MsgTarget = Pick<
  OutreachTarget,
  | "id"
  | "name"
  | "organization"
  | "discount_code"
  | "contact_name"
  | "email"
  | "instagram"
  | "status"
  | "last_contacted_on"
  | "next_follow_up_on"
>;

type Snapshot = Pick<
  OutreachTarget,
  "status" | "last_contacted_on" | "next_follow_up_on"
>;

const ACTIVE = new Set(["to-contact", "contacted", "followed-up"]);

/**
 * One button per target. Email opens Gmail with the message already written (you press Send there);
 * DM copies the message and opens their Instagram. The click is logged as sent straight away (today's
 * date, follow-up in 7 days) and the row switches to the follow-up button. "Undo" puts it back if you
 * didn't actually send it. Nothing is ever sent from here.
 */
export function MessageButtons({
  t,
  today,
  size = "sm",
}: {
  t: MsgTarget;
  today: string;
  size?: "sm" | "md";
}) {
  const [undo, setUndo] = useState<Snapshot | null>(null);
  const [pending, start] = useTransition();
  const m = outreachMessages(t);
  const followUp = t.status === "contacted" || t.status === "followed-up";
  const pad = size === "md" ? "px-3.5 py-2 text-sm" : "";

  function logSent() {
    setUndo({
      status: t.status,
      last_contacted_on: t.last_contacted_on,
      next_follow_up_on: t.next_follow_up_on,
    });
    start(() => logMessageSentAction(t.id));
  }
  const undoLink = undo ? (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        const prev = undo;
        setUndo(null);
        start(() => undoMessageSentAction(t.id, prev));
      }}
      className="cursor-pointer text-[11px] font-semibold text-slate-500 underline hover:text-slate-900 disabled:opacity-50"
    >
      Undo
    </button>
  ) : null;

  if (!ACTIVE.has(t.status))
    return <span className="text-xs text-slate-400">No message needed</span>;
  if (t.status === "followed-up")
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-emerald-700">
          ✓ Follow-up sent
          {t.last_contacted_on ? ` ${shortDate(t.last_contacted_on)}` : ""}
        </span>
        {undoLink}
      </div>
    );

  // Copy / DM text: the short Instagram version (the email has its own Gmail link).
  const text = followUp ? m.dmFollowUp : m.dm;
  async function copyText() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      window.prompt("Copy this message:", text);
    }
  }
  const gmail = t.email
    ? gmailComposeUrl(
        t.email,
        followUp ? `Re: ${m.emailSubject}` : m.emailSubject,
        followUp ? m.followUp : m.emailBody,
      )
    : "";
  const main = `${btn} ${pad} ${followUp ? "bg-amber-500 hover:bg-amber-600" : "bg-[#1F5BD8] hover:bg-[#1a4fbd]"} text-white`;

  const note = followUp
    ? t.last_contacted_on === today
      ? "First message sent today"
      : t.last_contacted_on
        ? `First message ${shortDate(t.last_contacted_on)}`
        : ""
    : "";

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex items-center gap-2">
        {gmail ? (
          <a
            href={gmail}
            target="_blank"
            rel="noopener noreferrer"
            onClick={logSent}
            title="Opens Gmail with the email written. Press Send in Gmail."
            className={main}
          >
            ✉ {followUp ? "Email follow-up" : "Email"}
          </a>
        ) : t.instagram ? (
          <a
            href={instagramUrl(t.instagram)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              void copyText();
              logSent();
            }}
            title="Copies the message and opens their Instagram. Paste it in a DM."
            className={main}
          >
            {followUp ? "DM follow-up" : "DM"}
          </a>
        ) : (
          <button
            type="button"
            onClick={() => {
              void copyText();
              logSent();
            }}
            title="Copies the message. Find them and send it yourself."
            className={`${btn} ${pad} border border-slate-300 bg-white text-slate-700 hover:border-slate-900`}
          >
            Copy message
          </button>
        )}
        {gmail && t.instagram ? (
          <a
            href={instagramUrl(t.instagram)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              void copyText();
              logSent();
            }}
            title="Copies the message and opens their Instagram instead"
            className="text-xs font-semibold text-fuchsia-700 hover:underline"
          >
            or DM
          </a>
        ) : null}
      </div>
      {note || undoLink ? (
        <span className="flex items-center gap-2 text-[11px] text-slate-400">
          {note}
          {undoLink}
        </span>
      ) : null}
    </div>
  );
}

const shortDate = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

/** Full message texts with copy buttons (detail page). */
export function MessagePreview({ t }: { t: MsgTarget }) {
  const m = outreachMessages(t);
  const [copied, setCopied] = useState<string | null>(null);
  const blocks: [string, string, string][] = [
    ["dm", "Instagram DM", m.dm],
    ["subject", "Email subject", m.emailSubject],
    ["email", "Email", m.emailBody],
    ["follow", "Email follow-up (7 days later)", m.followUp],
    ["dmfollow", "DM follow-up (7 days later)", m.dmFollowUp],
  ];
  return (
    <div className="space-y-4">
      {blocks.map(([k, title, text]) => (
        <div key={k}>
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
              {title}
            </p>
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(text);
                setCopied(k);
                setTimeout(() => setCopied(null), 1500);
              }}
              className="cursor-pointer text-xs font-semibold text-[#1F5BD8] hover:underline"
            >
              {copied === k ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <pre className="max-h-64 overflow-auto rounded-xl bg-slate-50 p-3 font-sans text-[13px] whitespace-pre-wrap text-slate-700 ring-1 ring-slate-200">
            {text}
          </pre>
        </div>
      ))}
      {!t.discount_code ? (
        <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800">
          Add a discount code (for example {codeHint(t)}) so you can see which
          club sends students.
        </p>
      ) : null}
    </div>
  );
}

function codeHint(t: Pick<OutreachTarget, "organization" | "name">) {
  const words = (t.organization || t.name)
    .replace(/[^A-Za-z ]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !/^(of|the|at|and|university|college)$/i.test(w));
  return `${
    words
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 6) || "CLUB"
  }10`;
}

const CSV_TEMPLATE = `University,Club name,State,Instagram,Email,Website,Contact,Code,Type,Notes
UC Santa Cruz,Pre-Dental Society,CA,@ucscpredental,club@example.edu,https://example.edu/club,Sarah (president),UCSC10,Pre-dental club,Found on the school's club page
`;

/** Upload a CSV: the list is added to the tracker (rows already there are skipped). */
export function UploadCsvButton() {
  const [state, action, pending] = useActionState(importCsvAction, undefined);
  return (
    <form action={action} className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-2">
        <a
          href={`data:text/csv;charset=utf-8,${encodeURIComponent(CSV_TEMPLATE)}`}
          download="outreach-template.csv"
          className="text-xs font-semibold text-[#1F5BD8] hover:underline"
        >
          CSV template
        </a>
        <label
          className={`inline-flex cursor-pointer items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900 ${pending ? "pointer-events-none opacity-60" : ""}`}
        >
          {pending ? "Uploading…" : "⬆ Upload CSV"}
          <input
            type="file"
            name="file"
            accept=".csv,text/csv"
            className="sr-only"
            onChange={(e) => {
              if (e.currentTarget.files?.length)
                e.currentTarget.form?.requestSubmit();
            }}
          />
        </label>
      </div>
      {state?.ok && (
        <p className="max-w-sm text-right text-xs text-emerald-700">
          {state.ok}
        </p>
      )}
      {state?.error && (
        <p className="max-w-sm text-right text-xs text-rose-700">
          {state.error}
        </p>
      )}
    </form>
  );
}

export function DeleteOutreachButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (
          window.confirm(
            `Delete "${name}" from the tracker? This cannot be undone.`,
          )
        )
          start(() => deleteOutreachAction(id));
      }}
      className="cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:opacity-60"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}

const input =
  "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#1F5BD8] focus:ring-2 focus:ring-[#1F5BD8]/15";
const label = "mb-1.5 block text-sm font-medium text-slate-700";

export function OutreachForm({ t }: { t?: OutreachTarget }) {
  const [state, action, pending] = useActionState(
    t ? updateOutreachAction : createOutreachAction,
    undefined,
  );
  const text = (
    name: keyof OutreachTarget,
    title: string,
    placeholder?: string,
    type = "text",
  ) => (
    <div>
      <label htmlFor={name} className={label}>
        {title}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={(t?.[name] as string | null) ?? ""}
        placeholder={placeholder}
        className={input}
      />
    </div>
  );

  return (
    <form action={action} className="space-y-5">
      {t ? <input type="hidden" name="id" value={t.id} /> : null}
      <div className="grid gap-5 sm:grid-cols-2">
        {text("organization", "School / organization", "UC Santa Cruz")}
        {text("name", "Club or page name", "Pre-Dental Society")}
        <div>
          <label htmlFor="kind" className={label}>
            Type
          </label>
          <select
            id="kind"
            name="kind"
            defaultValue={t?.kind ?? "club"}
            className={input}
          >
            {OUTREACH_KINDS.map((k) => (
              <option key={k} value={k}>
                {OUTREACH_KIND_LABELS[k]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status" className={label}>
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={t?.status ?? "to-contact"}
            className={input}
          >
            {OUTREACH_STATUSES.map((s) => (
              <option key={s} value={s}>
                {OUTREACH_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>
        {text("state", "State / country", "CA")}
        {text("contact_name", "Contact person", "Club president's name")}
        {text("email", "Email", "club@school.edu", "email")}
        {text("instagram", "Instagram", "@clubhandle")}
        {text("website", "Website / page", "https://…", "url")}
        {text("discount_code", "Discount code", "Leave empty to create one")}
        {text("link_url", "Our link lives at", "https://…/resources", "url")}
        {text("last_contacted_on", "Last message sent", undefined, "date")}
        {text("next_follow_up_on", "Next follow-up", undefined, "date")}
      </div>
      <div>
        <label htmlFor="notes" className={label}>
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          defaultValue={t?.notes}
          placeholder="e.g. President is Sarah, wants a free website first…"
          className={input}
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="cursor-pointer rounded-full bg-[#0B1B3A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
        >
          {pending ? "Saving…" : t ? "Save changes" : "Add target"}
        </button>
        {state?.ok && <p className="text-sm text-emerald-700">{state.ok}</p>}
        {state?.error && (
          <p role="alert" className="text-sm text-rose-700">
            {state.error}
          </p>
        )}
      </div>
    </form>
  );
}

/** Clears every target that is still "To contact" and was never messaged (e.g. before uploading a new list). */
export function RemoveUntouchedButton({ count }: { count: number }) {
  const [pending, start] = useTransition();
  if (!count) return null;
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (
          window.confirm(
            `Remove ${count} targets that are still "To contact" and were never messaged? Targets you have contacted stay. This cannot be undone.`,
          )
        )
          start(() => removeUntouchedAction());
      }}
      className="cursor-pointer rounded-full px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-60"
    >
      {pending ? "Removing…" : `Remove ${count} untouched`}
    </button>
  );
}
