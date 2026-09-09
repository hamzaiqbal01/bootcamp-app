const base =
  "inline-flex items-center justify-center rounded-2xl font-semibold tracking-[-0.01em] transition disabled:cursor-not-allowed disabled:opacity-60";

export const btn = {
  primary: `${base} bg-[#0B1020] text-white hover:bg-stone-800`,
  outline: `${base} border border-stone-300 bg-transparent text-stone-900 hover:border-stone-900 hover:bg-stone-900 hover:text-white`,
  inverse: `${base} bg-white text-[#0B1020] hover:bg-stone-100`,
  ghost: `${base} border border-white/25 bg-transparent text-white hover:border-white/45 hover:bg-white/10`,
};

export const btnSize = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-6 py-3.5 text-base",
  lg: "px-8 py-3.5 text-base",
};
