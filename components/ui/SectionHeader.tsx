type SectionHeaderProps = {
  badge: string;
  title: string;
  description: string;
  align?: "center" | "left";
};

export function SectionHeader({
  badge,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={`mx-auto mb-14 max-w-[600px] ${align === "center" ? "text-center" : ""}`}
    >
      <span className="inline-flex rounded-full bg-brand-50 px-3.5 py-1.5 text-[0.8rem] font-semibold uppercase tracking-[0.05em] text-brand-700">
        {badge}
      </span>
      <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-[2.5rem]">
        {title}
      </h2>
      <p className="mt-4 text-[1.05rem] leading-[1.7] text-slate-500">{description}</p>
    </div>
  );
}
