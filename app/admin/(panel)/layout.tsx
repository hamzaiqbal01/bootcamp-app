import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/dash/AdminNav";
import { requireAdmin } from "@/lib/admin/session";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-[#F5F7FB] lg:flex">
      {/* Sidebar (desktop) */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-[#0B1B3A] px-4 py-5 lg:flex">
        <Link href="/admin" className="flex items-center gap-2 px-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1F5BD8] text-sm font-extrabold text-white">
            F
          </span>
          <span className="text-[15px] font-bold tracking-tight text-white">
            FDP <span className="font-medium text-white/60">Admin</span>
          </span>
        </Link>
        <div className="mt-8 flex-1">
          <AdminNav variant="side" />
        </div>
        <div className="space-y-1 border-t border-white/10 pt-4 text-sm">
          <Link
            href="/admin/leads/new"
            className="block rounded-xl px-3 py-2 font-medium text-white/65 hover:bg-white/6 hover:text-white"
          >
            + Add lead
          </Link>
          <Link
            href="/"
            target="_blank"
            className="block rounded-xl px-3 py-2 font-medium text-white/65 hover:bg-white/6 hover:text-white"
          >
            View site ↗
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full rounded-xl px-3 py-2 text-left font-medium text-white/65 hover:bg-white/6 hover:text-white"
            >
              Log out
            </button>
          </form>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        {/* Top bar (mobile and tablet) */}
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <Link
              href="/admin"
              className="text-base font-bold tracking-tight text-slate-900"
            >
              FDP <span className="text-[#1F5BD8]">Admin</span>
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Log out
              </button>
            </form>
          </div>
          <div className="px-3 pb-2">
            <AdminNav variant="top" />
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {isSupabaseConfigured() ? children : <SetupNotice />}
        </main>
      </div>
    </div>
  );
}

function SetupNotice() {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <h1 className="text-xl font-bold text-slate-900">
        Connect Supabase to start
      </h1>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-600">
        <li>Create a free project at supabase.com.</li>
        <li>
          SQL Editor → paste{" "}
          <code className="rounded bg-slate-100 px-1">supabase/leads.sql</code>{" "}
          → Run.
        </li>
        <li>
          Project Settings → API: copy the Project URL and the secret
          (service_role) key into{" "}
          <code className="rounded bg-slate-100 px-1">SUPABASE_URL</code> and{" "}
          <code className="rounded bg-slate-100 px-1">SUPABASE_SECRET_KEY</code>
          .
        </li>
        <li>Restart the dev server (or redeploy on Vercel).</li>
      </ol>
    </div>
  );
}
