type SectionHeaderProps = {
  badge: string;
  title: string;
  description: string;
  align?: "center" | "left";
  titleAs?: "h1" | "h2";
};

export function SectionHeader({
  badge,
  title,
  description,
  align = "center",
  titleAs = "h2",
}: SectionHeaderProps) {
  const Title = titleAs;
  return (
    <div
      className={`mx-auto mb-14 max-w-[600px] ${align === "center" ? "text-center" : ""}`}
    >
      <span className="inline-flex rounded-full bg-brand-50 px-3.5 py-1.5 text-[0.8rem] font-semibold uppercase tracking-[0.05em] text-brand-700">
        {badge}
      </span>
      <Title className="mt-4 text-4xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-[2.5rem]">
        {title}
      </Title>
      <p className="mt-4 text-[1.05rem] leading-[1.7] text-slate-500">{description}</p>
    </div>
  );
}
