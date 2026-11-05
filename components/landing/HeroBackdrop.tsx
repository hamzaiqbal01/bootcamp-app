// The soft glows (hero-glow-*) get a darker, quieter look in dark mode; see app/theme-dark.css.
export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
      <div className="hero-glow-a absolute -top-40 -left-32 h-[480px] w-[480px] rounded-full bg-[#C2D5FF]/[0.07] blur-3xl" />
      <div className="hero-glow-b absolute top-1/4 -right-24 h-[560px] w-[560px] rounded-full bg-[#A9C4FF]/[0.25] blur-3xl" />
      <div className="hero-glow-c absolute -bottom-48 left-1/3 h-[420px] w-[420px] rounded-full bg-[#C2D5FF]/[0.30] blur-3xl" />

      <div className="absolute inset-y-0 right-0 w-[55%] bg-[radial-gradient(#1F5BD8_1px,transparent_1px)] bg-size-[22px_22px] opacity-[0.16] [mask-image:radial-gradient(ellipse_at_70%_45%,black_20%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F5BD8_1px,transparent_1px),linear-gradient(to_bottom,#1F5BD8_1px,transparent_1px)] bg-size-[88px_88px] opacity-[0.008] [mask-image:radial-gradient(ellipse_at_20%_30%,black_5%,transparent_55%)]" />

      <div className="absolute -top-28 -right-28 h-[340px] w-[340px] rounded-full border border-[#1F5BD8]/15" />
      <div className="absolute -top-12 -right-12 h-[220px] w-[220px] rounded-full border border-dashed border-[#1F5BD8]/18" />
      <div className="absolute -bottom-24 -left-24 h-[260px] w-[260px] rounded-full border border-[#1F5BD8]/12" />

      <span className="absolute top-[18%] left-[46%] h-2 w-2 rounded-full bg-[#1F5BD8]/25" />
      <span className="absolute top-[72%] left-[8%] h-1.5 w-1.5 rounded-full bg-[#1F5BD8]/22" />
      <span className="absolute bottom-[14%] left-[52%] h-2.5 w-2.5 rounded-full border border-[#1F5BD8]/25" />
      <span className="absolute top-[10%] left-[30%] h-1.5 w-1.5 rounded-full bg-[#4F8BFF]/12" />
    </div>
  );
}
