const stats = [
  { value: "1,000+", label: "Students helped" },
  { value: "9.8/10", label: "Average rating, 39 surveys" },
  { value: "97%", label: "Would recommend to a friend" },
  { value: "66 + 10", label: "U.S. and Canadian dental schools" },
];

export function StatsStrip() {
  return (
    <section className="border-b border-[#E4E9F2] bg-white">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-4 gap-y-7 px-4 py-9 sm:gap-6 sm:py-11 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="border-l border-[#E4E9F2] pl-4 sm:pl-5">
            <b className="block text-[28px] sm:text-[34px] leading-none font-extrabold tracking-[-0.02em] text-[#0B1B3A]">
              {stat.value}
            </b>
            <span className="mt-1 block text-sm text-[#5B6782]">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
