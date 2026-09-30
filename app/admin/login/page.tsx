import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { isAdmin } from "@/lib/admin/session";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
          Future Dental Prep
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Admin sign in</h1>
        <p className="mb-6 mt-1 text-sm text-slate-500">Leads dashboard</p>
        <LoginForm />
      </div>
    </main>
  );
}
