import { refreshGscAction } from "@/app/admin/actions";
import { EmptyConnect } from "@/components/admin/dash/ui";
import type { GscConnection } from "@/lib/admin/gsc";

export function RefreshGscButton() {
  return (
    <form action={refreshGscAction}>
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 hover:ring-slate-400"
      >
        ↻ Refresh Google data
      </button>
    </form>
  );
}

export function ConnectionNote({ connection }: { connection: GscConnection }) {
  if (connection === "service-account") return null;
  if (connection === "local")
    return (
      <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800 ring-1 ring-amber-200">
        Using the local Search Console login from this computer. On the live
        site, set GOOGLE_SERVICE_ACCOUNT_KEY.
      </p>
    );
  return null;
}

export function GscNotConnected({ error }: { error?: string }) {
  return (
    <EmptyConnect title="Google Search Console is not connected">
      <p>
        Add a Google service account key as{" "}
        <code className="rounded bg-slate-100 px-1">
          GOOGLE_SERVICE_ACCOUNT_KEY
        </code>{" "}
        (in Vercel and .env.local), and add the service account&apos;s email in
        Search Console → Settings → Users and permissions as a <b>Restricted</b>{" "}
        user.
      </p>
      {error ? <p className="text-xs text-rose-600">Error: {error}</p> : null}
    </EmptyConnect>
  );
}
