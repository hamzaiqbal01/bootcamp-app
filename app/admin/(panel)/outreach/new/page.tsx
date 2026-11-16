import type { Metadata } from "next";
import Link from "next/link";
import { OutreachForm } from "@/components/admin/outreach/OutreachBits";
import { requireAdmin } from "@/lib/admin/session";

export const metadata: Metadata = { title: "Add outreach target" };

export default async function NewOutreachPage() {
  await requireAdmin();
  return (
    <div className="space-y-6">
      <Link
        href="/admin/outreach"
        className="text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        ← All outreach
      </Link>
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="mb-1 text-2xl font-bold tracking-tight text-slate-900">
          Add outreach target
        </h1>
        <p className="mb-6 text-sm text-slate-500">
          A club, advising office, blog or page you want a link from.
        </p>
        <OutreachForm />
      </section>
    </div>
  );
}
