"use client";

import { useActionState } from "react";
import { createLeadAction, updateLeadAction } from "@/app/admin/actions";
import { LEAD_STATUS_LABELS, LEAD_STATUSES, type Lead } from "@/lib/leads/shared";

const input =
  "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";
const label = "mb-1.5 block text-sm font-medium text-slate-700";

type Props = { lead?: Lead };

export function LeadForm({ lead }: Props) {
  const [state, action, pending] = useActionState(lead ? updateLeadAction : createLeadAction, undefined);

  return (
    <form action={action} className="space-y-5">
      {lead && <input type="hidden" name="id" value={lead.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Name</label>
          <input id="name" name="name" defaultValue={lead?.name} className={input} />
        </div>
        <div>
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" defaultValue={lead?.email} className={input} />
        </div>
        <div>
          <label htmlFor="phone" className={label}>Phone</label>
          <input id="phone" name="phone" type="tel" defaultValue={lead?.phone} className={input} />
        </div>
        <div>
          <label htmlFor="status" className={label}>Status</label>
          <select id="status" name="status" defaultValue={lead?.status ?? "new"} className={input}>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {LEAD_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="subject" className={label}>Subject</label>
        <input id="subject" name="subject" defaultValue={lead?.subject} className={input} />
      </div>

      <div>
        <label htmlFor="message" className={label}>Message</label>
        <textarea id="message" name="message" rows={6} defaultValue={lead?.message} className={input} />
      </div>

      <div>
        <label htmlFor="notes" className={label}>
          Private notes <span className="font-normal text-slate-400">(only you see these)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          defaultValue={lead?.notes}
          placeholder="e.g. Called on Monday, wants DAT tutoring in January…"
          className={input}
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-[#0B1020] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
        >
          {pending ? "Saving…" : lead ? "Save changes" : "Add lead"}
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
