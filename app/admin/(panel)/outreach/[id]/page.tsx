import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  DeleteOutreachButton,
  MessageButtons,
  MessagePreview,
  OutreachForm,
  OutreachStatusSelect,
} from "@/components/admin/outreach/OutreachBits";
import { Card } from "@/components/admin/dash/ui";
import { requireAdmin } from "@/lib/admin/session";
import { getOutreach, isoDate } from "@/lib/outreach/server";
import {
  displayName,
  instagramUrl,
  OUTREACH_KIND_LABELS,
} from "@/lib/outreach/shared";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Outreach target" };

type Props = { params: Promise<{ id: string }> };

const long = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

function currentTime() {
  return Date.now();
}

export default async function OutreachTargetPage({ params }: Props) {
  await requireAdmin();
  if (!isSupabaseConfigured()) return null;
  const { id } = await params;
  const t = await getOutreach(id);
  if (!t) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/admin/outreach"
        className="text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        ← All outreach
      </Link>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {displayName(t)}
              </h1>
              <OutreachStatusSelect
                key={t.status}
                id={t.id}
                status={t.status}
              />
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {[OUTREACH_KIND_LABELS[t.kind], t.state, t.contact_name]
                .filter(Boolean)
                .join(" · ")}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {t.instagram ? (
                <a
                  href={instagramUrl(t.instagram)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fuchsia-700 hover:underline"
                >
                  Instagram {t.instagram}
                </a>
              ) : null}
              {t.email ? (
                <span className="break-all text-slate-700">{t.email}</span>
              ) : null}
              {t.website ? (
                <a
                  href={t.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1F5BD8] hover:underline"
                >
                  Website ↗
                </a>
              ) : null}
              {t.link_url ? (
                <a
                  href={t.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  Our link ↗
                </a>
              ) : null}
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Last message:{" "}
              {t.last_contacted_on ? long(t.last_contacted_on) : "not yet"} ·
              Next follow-up:{" "}
              {t.next_follow_up_on ? long(t.next_follow_up_on) : "none"}
            </p>
          </div>
          <MessageButtons t={t} today={isoDate(currentTime())} size="md" />
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-5">
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:col-span-3">
          <h2 className="mb-5 text-lg font-bold text-slate-900">Details</h2>
          <OutreachForm key={t.updated_at} t={t} />
        </section>
        <Card
          title="Messages for this target"
          subtitle="Filled in with their name and discount code"
          className="lg:col-span-2"
        >
          <MessagePreview t={t} />
        </Card>
      </div>

      <div className="flex justify-end">
        <DeleteOutreachButton id={t.id} name={displayName(t)} />
      </div>
    </div>
  );
}
