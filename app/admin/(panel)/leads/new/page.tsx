import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/admin/LeadForm";
import { requireAdmin } from "@/lib/admin/session";

export const metadata: Metadata = {
  title: "Add lead",
};

export default async function AdminNewLeadPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <Link href="/admin" className="text-sm font-medium text-slate-500 hover:text-slate-900">
        ← All leads
      </Link>
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="mb-1 text-2xl font-bold tracking-tight text-slate-900">Add lead</h1>
        <p className="mb-6 text-sm text-slate-500">For leads that came in by phone, DM, or email.</p>
        <LeadForm />
      </section>
    </div>
  );
}
