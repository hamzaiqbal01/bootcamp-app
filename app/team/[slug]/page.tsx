import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { CoachIntroVideo } from "@/components/landing/home/CoachIntroVideo";
import { coaches, getCoach } from "@/lib/data/coaches";
import { Breadcrumbs } from "@/components/seo/JsonLd";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--fdp-head",
});

const PLACEHOLDER = "/images/hero-coaches/profile-placeholder.svg";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return coaches.map((coach) => ({ slug: coach.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const coach = getCoach(slug);
  if (!coach) return { title: "Coach not found" };
  return {
    title: coach.name,
    description: `${coach.name}, ${coach.title}. ${coach.text}`,
    alternates: { canonical: `/team/${coach.id}` },
  };
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default async function TeamProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const coach = getCoach(slug);
  if (!coach) notFound();

  const badges = [coach.badge, ...(coach.extraBadges ?? [])];
  const otherCoaches = coaches.filter((other) => other.id !== coach.id);

  return (
    <div className={`${jakarta.className} ${jakarta.variable}`}>
      <Header />
      <Breadcrumbs
        trail={[
          { name: "Team", path: "/#team" },
          { name: coach.name, path: `/team/${coach.id}` },
        ]}
      />
      <main>
        <section className="relative overflow-hidden bg-[#F6F8FC] pt-8 pb-16 sm:pt-10 sm:pb-24">
          <div
            className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-[#1F5BD8]/10 blur-3xl"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/#team"
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#5B6782] transition-colors hover:text-[#0B1B3A]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All coaches
            </Link>

            <div className="mt-6 grid items-start gap-10 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-14">
              <div className="lg:sticky lg:top-28">
                <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] sm:aspect-[4/3] lg:aspect-[4/5] bg-[#E6ECF8] shadow-[0_30px_60px_-36px_rgba(11,27,58,0.55)]">
                  <img
                    src={coach.photo ?? PLACEHOLDER}
                    alt={coach.photo ? coach.name : ""}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: coach.photo ? coach.photoPosition : "center" }}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0B1B3A]/60 to-transparent" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 pr-4">
                    {badges.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex items-center rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#0B1B3A] shadow-sm backdrop-blur"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  {coach.introVideo ? (
                    <>
                      <span className="absolute bottom-7 left-5 text-[13px] font-semibold text-white">
                        Watch {coach.name.split(",")[0]}&rsquo;s intro
                      </span>
                      <CoachIntroVideo video={coach.introVideo} coachName={coach.name} />
                    </>
                  ) : null}
                </div>
              </div>

              <div className="lg:pt-2">
                <span className="inline-flex rounded-full bg-[#E8EFFD] px-3 py-1 text-[12px] font-bold tracking-[0.06em] text-[#1F5BD8] uppercase">
                  {coach.role}
                </span>
                <h1 className="mt-4 text-[clamp(32px,4.4vw,48px)] leading-[1.05] font-extrabold tracking-[-0.03em] text-[#0B1B3A]">
                  {coach.name}
                </h1>
                <p className="mt-3 text-[17px] text-[#5B6782]">{coach.title}</p>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {coach.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-[#E4E9F2] bg-white px-4 py-4 shadow-[0_10px_24px_-22px_rgba(11,27,58,0.5)] sm:px-5"
                    >
                      <div className="text-[clamp(20px,2.4vw,28px)] leading-none font-extrabold tracking-[-0.02em] text-[#0B1B3A]">
                        {stat.value}
                      </div>
                      <div className="mt-2 text-[12.5px] leading-snug text-[#5B6782]">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <h2 className="mt-10 text-[13px] font-bold tracking-[0.1em] text-[#8A93A3] uppercase">About</h2>
                <p className="mt-3 text-[17px] leading-[1.75] text-[#33415C]">{coach.text}</p>

                <h2 className="mt-10 text-[13px] font-bold tracking-[0.1em] text-[#8A93A3] uppercase">Can help you with</h2>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {coach.focusAreas.map((area) => (
                    <li
                      key={area}
                      className="flex items-center gap-3 rounded-xl border border-[#E4E9F2] bg-white px-4 py-3 text-[15px] font-semibold text-[#0B1B3A]"
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#E8EFFD] text-[#1F5BD8]">
                        <CheckIcon />
                      </span>
                      {area}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-col gap-5 rounded-[22px] bg-[#0B1B3A] p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
                  <div>
                    <p className="text-[18px] font-extrabold">Not sure where to start?</p>
                    <p className="mt-1 text-[14px] text-white/70">
                      Book a free 15-minute call and we&rsquo;ll match you with the right coach.
                    </p>
                  </div>
                  <Link
                    href="/schedule"
                    className="inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-full bg-[#1F5BD8] px-6 text-[15px] font-bold text-white transition-colors hover:bg-[#3A72E8]"
                  >
                    Book a free call
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {otherCoaches.length > 0 ? (
          <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-[clamp(24px,3vw,32px)] font-extrabold tracking-[-0.02em] text-[#0B1B3A]">
                Meet the rest of the team
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {otherCoaches.map((other) => (
                  <Link
                    key={other.id}
                    href={`/team/${other.id}`}
                    className="group flex items-center gap-4 rounded-2xl border border-[#E4E9F2] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#C9D6EE] hover:shadow-[0_18px_36px_-28px_rgba(11,27,58,0.5)]"
                  >
                    {other.photo ? (
                      <img
                        src={other.photo}
                        alt=""
                        className="h-16 w-16 shrink-0 rounded-full object-cover"
                        style={{ objectPosition: other.photoPosition }}
                      />
                    ) : (
                      <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#0B1B3A] text-lg font-extrabold text-white">
                        {other.initials}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-[16px] font-extrabold text-[#0B1B3A]">{other.name}</p>
                      <p className="mt-0.5 text-[13px] text-[#5B6782]">{other.role}</p>
                    </div>
                    <svg
                      className="ml-auto shrink-0 text-[#8A93A3] transition group-hover:translate-x-0.5 group-hover:text-[#1F5BD8]"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden
                    >
                      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
