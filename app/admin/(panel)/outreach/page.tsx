import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageButtons,
  OutreachStatusSelect,
  RemoveUntouchedButton,
  UploadCsvButton,
} from "@/components/admin/outreach/OutreachBits";
import {
  BarList,
  Card,
  EmptyConnect,
  PageHeader,
  StatCard,
} from "@/components/admin/dash/ui";
import { requireAdmin } from "@/lib/admin/session";
import { isoDate, listOutreach, outreachReady } from "@/lib/outreach/server";
import {
  displayName,
  instagramUrl,
  isOutreachKind,
  isOutreachStatus,
  OUTREACH_KIND_LABELS,
  OUTREACH_KINDS,
  OUTREACH_STATUS_LABELS,
  OUTREACH_STATUSES,
  type OutreachTarget,
} from "@/lib/outreach/shared";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Outreach" };

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const one = (v: string | string[] | undefined) =>
  (Array.isArray(v) ? v[0] : v) ?? "";

function currentTime() {
  return Date.now();
}

const CONTACTED = new Set([
  "contacted",
  "followed-up",
  "replied",
  "in-progress",
  "link-live",
  "declined",
  "no-response",
]);

const short = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

const PAGE_SIZE = 50;
const SORTS = {
  newest: "Newest added",
  oldest: "Oldest added",
  followup: "Next follow-up",
  name: "Name A–Z",
} as const;
type Sort = keyof typeof SORTS;

type Cur = {
  status: string;
  kind: string;
  q: string;
  view: string;
  added: string;
  sort: Sort;
  page: number;
};

function hrefWith(cur: Cur, patch: Partial<Cur>) {
  const n = { ...cur, page: 1, ...patch };
  const sp = new URLSearchParams();
  if (n.view) sp.set("view", n.view);
  if (n.status) sp.set("status", n.status);
  if (n.added) sp.set("added", n.added);
  if (n.kind) sp.set("kind", n.kind);
  if (n.q) sp.set("q", n.q);
  if (n.sort !== "newest") sp.set("sort", n.sort);
  if (n.page > 1) sp.set("page", String(n.page));
  const qs = sp.toString();
  return `/admin/outreach${qs ? `?${qs}` : ""}`;
}

export default async function OutreachPage({ searchParams }: Props) {
  await requireAdmin();
  if (!isSupabaseConfigured()) return null;

  const header = (actions?: React.ReactNode) => (
    <PageHeader
      title="Outreach"
      subtitle="Clubs, advising offices and sites we ask for a link. Track every message and follow-up here."
      actions={actions}
    />
  );

  if (!(await outreachReady()))
    return (
      <div className="space-y-6">
        {header()}
        <EmptyConnect title="One-time setup: create the outreach table">
          <p>
            Open Supabase → <b>SQL Editor</b> → <b>New query</b>, paste
            everything from the file <code>supabase/outreach.sql</code> in the
            project, and click <b>Run</b>. Then reload this page.
          </p>
        </EmptyConnect>
      </div>
    );

  const sp = await searchParams;
  const sortParam = one(sp.sort);
  const cur: Cur = {
    status: isOutreachStatus(one(sp.status)) ? one(sp.status) : "",
    kind: isOutreachKind(one(sp.kind)) ? one(sp.kind) : "",
    q: one(sp.q).trim().slice(0, 100),
    view: one(sp.view) === "due" ? "due" : "",
    added: /^\d{4}-\d{2}-\d{2}$/.test(one(sp.added)) ? one(sp.added) : "",
    sort: sortParam in SORTS ? (sortParam as Sort) : "newest",
    page: Math.max(1, Number.parseInt(one(sp.page), 10) || 1),
  };
  const today = isoDate(currentTime());
  const all = await listOutreach();

  const isDue = (t: OutreachTarget) =>
    !!t.next_follow_up_on && t.next_follow_up_on <= today;
  const due = all
    .filter(isDue)
    .sort((a, b) =>
      (a.next_follow_up_on ?? "").localeCompare(b.next_follow_up_on ?? ""),
    );
  const counts = Object.fromEntries(
    OUTREACH_STATUSES.map((s) => [s, all.filter((t) => t.status === s).length]),
  ) as Record<(typeof OUTREACH_STATUSES)[number], number>;
  const contacted = all.filter((t) => CONTACTED.has(t.status)).length;
  const replied = all.filter((t) =>
    ["replied", "in-progress", "link-live"].includes(t.status),
  ).length;

  // Upload days (newest first) for the "Added" filter.
  const addedCounts = new Map<string, number>();
  for (const t of all) {
    const d = t.created_at.slice(0, 10);
    addedCounts.set(d, (addedCounts.get(d) ?? 0) + 1);
  }
  const addedDays = [...addedCounts.entries()].sort((a, b) =>
    b[0].localeCompare(a[0]),
  );

  const needle = cur.q.toLowerCase();
  const filtered = all
    .filter((t) => (cur.view === "due" ? isDue(t) : true))
    .filter((t) => (cur.status ? t.status === cur.status : true))
    .filter((t) => (cur.kind ? t.kind === cur.kind : true))
    .filter((t) => (cur.added ? t.created_at.startsWith(cur.added) : true))
    .filter((t) =>
      needle
        ? [t.name, t.organization, t.state, t.email, t.instagram, t.notes]
            .join(" ")
            .toLowerCase()
            .includes(needle)
        : true,
    )
    .sort((a, b) => {
      const byName = displayName(a).localeCompare(displayName(b));
      if (cur.sort === "name") return byName;
      if (cur.sort === "followup")
        return (
          (a.next_follow_up_on ?? "9999").localeCompare(
            b.next_follow_up_on ?? "9999",
          ) || byName
        );
      const byAdded = a.created_at.localeCompare(b.created_at);
      return (cur.sort === "oldest" ? byAdded : -byAdded) || byName;
    });
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(cur.page, pages);
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const actions = (
    <>
      {counts["to-contact"] ? (
        <RemoveUntouchedButton
          count={
            all.filter((t) => t.status === "to-contact" && !t.last_contacted_on)
              .length
          }
        />
      ) : null}
      <UploadCsvButton />
      <Link
        href="/admin/outreach/new"
        className="inline-flex items-center rounded-full bg-[#0B1B3A] px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
      >
        + Add target
      </Link>
    </>
  );

  return (
    <div className="space-y-6">
      {header(actions)}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard
          label="Targets"
          value={String(all.length)}
          hint={`${counts["to-contact"]} not contacted yet`}
        />
        <StatCard
          label="Contacted"
          value={String(contacted)}
          hint={
            all.length
              ? `${Math.round((contacted / all.length) * 100)}% of targets`
              : undefined
          }
        />
        <StatCard
          label="Replied"
          value={String(replied)}
          hint={
            contacted
              ? `${Math.round((replied / contacted) * 100)}% reply rate`
              : undefined
          }
        />
        <StatCard
          label="Links live"
          value={String(counts["link-live"])}
          hint="Backlinks earned"
        />
        <StatCard
          label="Follow-ups due"
          value={String(due.length)}
          hint={due.length ? "Today or overdue" : "All caught up"}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card
          title="Follow-ups due"
          subtitle="Send these today, then press Send in Gmail"
          className="lg:col-span-2"
          action={
            due.length > 6 ? (
              <Link
                href={hrefWith(cur, { view: "due", status: "" })}
                className="text-xs font-semibold text-[#1F5BD8] hover:underline"
              >
                See all {due.length} →
              </Link>
            ) : null
          }
        >
          {due.length ? (
            <ul className="divide-y divide-slate-100">
              {due.slice(0, 6).map((t) => (
                <li
                  key={t.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-2.5"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/admin/outreach/${t.id}`}
                      className="block truncate text-sm font-semibold text-slate-900 hover:text-[#1F5BD8]"
                    >
                      {displayName(t)}
                    </Link>
                    <p className="text-xs text-slate-500">
                      {OUTREACH_STATUS_LABELS[t.status]} · due{" "}
                      <span
                        className={
                          t.next_follow_up_on! < today
                            ? "font-semibold text-rose-600"
                            : ""
                        }
                      >
                        {short(t.next_follow_up_on!)}
                      </span>
                    </p>
                  </div>
                  <MessageButtons t={t} today={today} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-6 text-center text-sm text-slate-400">
              {all.length
                ? "Nothing due. Contact someone new from the list below."
                : "Upload a CSV or add a target to get started."}
            </p>
          )}
        </Card>
        <Card title="Pipeline" subtitle="Where every target is now">
          <BarList
            rows={OUTREACH_STATUSES.filter((s) => counts[s]).map((s) => ({
              label: (
                <Link
                  href={hrefWith(cur, { status: s, view: "" })}
                  className="hover:text-[#1F5BD8]"
                >
                  {OUTREACH_STATUS_LABELS[s]}
                </Link>
              ),
              value: counts[s],
            }))}
          />
        </Card>
      </div>

      <Card>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap gap-1">
            <Tab
              href={hrefWith(cur, { status: "", view: "" })}
              active={!cur.status && !cur.view}
            >
              All <span className="opacity-60">{all.length}</span>
            </Tab>
            <Tab
              href={hrefWith(cur, { view: "due", status: "" })}
              active={cur.view === "due"}
            >
              Due <span className="opacity-60">{due.length}</span>
            </Tab>
            {OUTREACH_STATUSES.filter((s) => counts[s]).map((s) => (
              <Tab
                key={s}
                href={hrefWith(cur, { status: s, view: "" })}
                active={cur.status === s}
              >
                {OUTREACH_STATUS_LABELS[s]}{" "}
                <span className="opacity-60">{counts[s]}</span>
              </Tab>
            ))}
          </div>
          <form
            action="/admin/outreach"
            className="ml-auto flex flex-wrap gap-2"
          >
            {cur.status ? (
              <input type="hidden" name="status" value={cur.status} />
            ) : null}
            {cur.view ? (
              <input type="hidden" name="view" value={cur.view} />
            ) : null}
            <select
              name="added"
              defaultValue={cur.added}
              className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-sm"
              aria-label="Date added"
            >
              <option value="">All dates added</option>
              {addedDays.map(([d, n]) => (
                <option key={d} value={d}>
                  {d === today ? "Added today" : `Added ${short(d)}`} ({n})
                </option>
              ))}
            </select>
            <select
              name="sort"
              defaultValue={cur.sort}
              className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-sm"
              aria-label="Sort"
            >
              {(Object.keys(SORTS) as Sort[]).map((k) => (
                <option key={k} value={k}>
                  {SORTS[k]}
                </option>
              ))}
            </select>
            <select
              name="kind"
              defaultValue={cur.kind}
              className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-sm"
              aria-label="Type"
            >
              <option value="">All types</option>
              {OUTREACH_KINDS.map((k) => (
                <option key={k} value={k}>
                  {OUTREACH_KIND_LABELS[k]}
                </option>
              ))}
            </select>
            <input
              name="q"
              defaultValue={cur.q}
              placeholder="Search school, club, state…"
              className="h-9 w-56 rounded-xl border border-slate-200 bg-white px-3 text-sm"
            />
            <button className="h-9 cursor-pointer rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-700">
              Filter
            </button>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="text-xs text-slate-500">
              <tr className="border-b border-slate-100">
                <th className="py-2 pr-3 font-medium">Target</th>
                <th className="py-2 pr-3 font-medium">Reach them</th>
                <th className="py-2 pr-3 font-medium">Status</th>
                <th className="py-2 pr-3 font-medium">Last message</th>
                <th className="py-2 pr-3 font-medium">Next follow-up</th>
                <th className="py-2 font-medium">Send</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((t) => (
                <tr key={t.id} className="align-middle">
                  <td className="py-2.5 pr-3">
                    <Link
                      href={`/admin/outreach/${t.id}`}
                      className="font-semibold text-slate-900 hover:text-[#1F5BD8]"
                    >
                      {t.organization || t.name}
                    </Link>
                    <p className="text-xs text-slate-500">
                      {[
                        t.organization ? t.name : "",
                        t.state,
                        `added ${short(t.created_at.slice(0, 10))}`,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </td>
                  <td className="py-2.5 pr-3 text-xs">
                    <div className="flex flex-col gap-0.5">
                      {t.instagram ? (
                        <a
                          href={instagramUrl(t.instagram)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-fuchsia-700 hover:underline"
                        >
                          {t.instagram.startsWith("@")
                            ? t.instagram
                            : `@${t.instagram}`}
                        </a>
                      ) : null}
                      {t.email ? (
                        <span className="text-slate-600">{t.email}</span>
                      ) : null}
                      {!t.instagram && !t.email ? (
                        <span className="text-slate-400">No contact yet</span>
                      ) : null}
                    </div>
                  </td>
                  <td className="py-2.5 pr-3">
                    <OutreachStatusSelect
                      key={t.status}
                      id={t.id}
                      status={t.status}
                    />
                  </td>
                  <td className="py-2.5 pr-3 text-xs text-slate-600">
                    {t.last_contacted_on ? short(t.last_contacted_on) : "—"}
                  </td>
                  <td className="py-2.5 pr-3 text-xs">
                    {t.next_follow_up_on ? (
                      <span
                        className={
                          t.next_follow_up_on < today
                            ? "font-semibold text-rose-600"
                            : t.next_follow_up_on === today
                              ? "font-semibold text-amber-700"
                              : "text-slate-600"
                        }
                      >
                        {t.next_follow_up_on === today
                          ? "Today"
                          : short(t.next_follow_up_on)}
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-2.5">
                    {["link-live", "declined"].includes(t.status) ? (
                      <span className="text-xs text-slate-400">Done</span>
                    ) : (
                      <MessageButtons t={t} today={today} />
                    )}
                  </td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-sm text-slate-400"
                  >
                    {all.length
                      ? "No targets match this filter"
                      : "No targets yet"}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
          <p className="text-slate-500">
            {filtered.length
              ? `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length}`
              : ""}
          </p>
          {pages > 1 ? (
            <div className="flex flex-wrap items-center gap-1">
              <PageLink
                href={hrefWith(cur, { page: page - 1 })}
                disabled={page === 1}
              >
                ← Prev
              </PageLink>
              {Array.from({ length: pages }, (_, i) => i + 1)
                .filter(
                  (n) => n === 1 || n === pages || Math.abs(n - page) <= 2,
                )
                .map((n, i, list) => (
                  <span key={n} className="flex items-center gap-1">
                    {i > 0 && n - list[i - 1] > 1 ? (
                      <span className="px-1 text-slate-400">…</span>
                    ) : null}
                    <PageLink
                      href={hrefWith(cur, { page: n })}
                      active={n === page}
                    >
                      {n}
                    </PageLink>
                  </span>
                ))}
              <PageLink
                href={hrefWith(cur, { page: page + 1 })}
                disabled={page === pages}
              >
                Next →
              </PageLink>
            </div>
          ) : null}
        </div>
      </Card>

      <p className="text-xs text-slate-500">
        How it works: <b>Email</b> opens Gmail
        (futuredentistpreparation@gmail.com) with the message already written.
        Press Send in Gmail. <b>DM</b> copies the message and opens their
        Instagram (paste it in a DM). The row is marked as sent right away and
        the <b>follow-up</b> button appears. If you didn&apos;t send it, click{" "}
        <b>Undo</b>. Nothing is ever sent automatically.
      </p>
    </div>
  );
}

function Tab({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
        active
          ? "bg-[#0B1B3A] text-white"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }`}
    >
      {children}
    </Link>
  );
}

function PageLink({
  href,
  active,
  disabled,
  children,
}: {
  href: string;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  if (disabled)
    return (
      <span className="rounded-lg px-3 py-1.5 text-slate-300">{children}</span>
    );
  return (
    <Link
      href={href}
      className={`rounded-lg px-3 py-1.5 font-medium ${
        active
          ? "bg-[#0B1B3A] text-white"
          : "text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
      }`}
    >
      {children}
    </Link>
  );
}
