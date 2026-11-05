import { TeamCarousel } from "@/components/landing/home/TeamCarousel";
import { coaches } from "@/lib/data/coaches";

export function HomeTeam() {
  return (
    <section id="team" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 flex max-w-[720px] flex-col items-center gap-3.5 text-center">
          <p className="text-[13px] font-bold tracking-[0.1em] text-[#1F5BD8] uppercase">
            Our team
          </p>
          <h2 className="text-[clamp(28px,3.4vw,40px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-[#0B1B3A]">
            Coached by dentists and dental students
          </h2>
          <p className="text-lg text-[#5B6782]">
            People who went through the same process recently and know what admissions committees look for. Your specialist is matched after the free call.
          </p>
        </div>
        <TeamCarousel coaches={coaches} />
      </div>
    </section>
  );
}
