// Shown the moment someone opens the Search report, while Google's data loads.
export default function Loading() {
  const block = "animate-pulse rounded-2xl bg-white ring-1 ring-slate-200";
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-7 w-48 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-4 w-80 animate-pulse rounded bg-slate-100" />
      </div>
      <div className={`${block} h-28`} />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className={`${block} h-28`} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className={`${block} h-64`} />
        <div className={`${block} h-64`} />
      </div>
      <p className="text-center text-sm text-slate-500">
        Loading Google Search data…
      </p>
    </div>
  );
}
