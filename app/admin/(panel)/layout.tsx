import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin/session";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-base font-bold tracking-tight text-slate-900">
              FDP <span className="text-brand-600">Admin</span>
            </Link>
            <nav className="flex items-center gap-1 text-sm font-medium">
              <Link href="/admin" className="rounded-lg px-3 py-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                Leads
              </Link>
              <Link
                href="/admin/leads/new"
                className="rounded-lg px-3 py-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                Add lead
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" target="_blank" className="hidden rounded-lg px-3 py-1.5 text-slate-500 hover:text-slate-900 sm:block">
              View site ↗
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="rounded-lg px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {isSupabaseConfigured() ? children : <SetupNotice />}
      </main>
    </>
  );
}

function SetupNotice() {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <h1 className="text-xl font-bold text-slate-900">Connect Supabase to start</h1>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-600">
        <li>Create a free project at supabase.com.</li>
        <li>
          SQL Editor → paste <code className="rounded bg-slate-100 px-1">supabase/leads.sql</code> → Run.
        </li>
        <li>
          Project Settings → API: copy the Project URL and the secret (service_role) key into{" "}
          <code className="rounded bg-slate-100 px-1">SUPABASE_URL</code> and{" "}
          <code className="rounded bg-slate-100 px-1">SUPABASE_SECRET_KEY</code>.
        </li>
        <li>Restart the dev server (or redeploy on Vercel).</li>
      </ol>
    </div>
  );
}
