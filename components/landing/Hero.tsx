import Link from "next/link";
import { Fragment } from "react";
import { HeroBackdrop } from "@/components/landing/HeroBackdrop";
import { HeroCoachCluster } from "@/components/landing/HeroCoachCluster";

const faces = [
  { initials: "JR", color: "#1F5BD8" },
  { initials: "MM", color: "#0B1B3A" },
  { initials: "EN", color: "#14804A" },
  { initials: "CJ", color: "#6B4FD8" },
];

// One line per coach photo, in the same order as the photos in HeroCoachCluster; they rotate together.
const coachMessages = [
  <Fragment key="dr-chastain">
    Learn from{" "}
    <strong className="font-semibold text-[#0B1B3A]">Dr. Todd Chastain, DMD</strong>, a dentist with 35 years in
    practice and faculty at UAB School of Dentistry and the University of North Alabama. Get 1-on-1 help with your
    application and interviews from a mentor whose students have earned their place in dental school.
  </Fragment>,
  <Fragment key="celina-yang">
    Learn from <strong className="font-semibold text-[#0B1B3A]">Celina (Chaeyun) Yang</strong>, a University of
    Pennsylvania dental student who scored <strong className="font-semibold text-[#0B1B3A]">25 AA on the DAT</strong>{" "}
    and earned seven dental school interviews. Get 1-on-1 help with DAT prep, personal statements, secondaries, and
    interviews.
  </Fragment>,
  <Fragment key="hansuja-chaurasia">
    Learn from <strong className="font-semibold text-[#0B1B3A]">Hansuja Chaurasia</strong>, a dental student at the
    University of Connecticut School of Dental Medicine with experience as a private tutor and advisor. Get 1-on-1
    help with DAT prep and your dental school application.
  </Fragment>,
  <Fragment key="neil-desai">
    Learn from <strong className="font-semibold text-[#0B1B3A]">Neil Desai</strong>, a D1 dental student at Case
    Western Reserve University School of Dental Medicine who scored{" "}
    <strong className="font-semibold text-[#0B1B3A]">24 AA on the DAT</strong>, including a perfect 30 in Chemistry.
    Get 1-on-1 help with every DAT section, from biology and chemistry to PAT, QR, and reading comprehension.
  </Fragment>,
];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100dvh-6.125rem)] flex-col overflow-hidden border-b border-[#E4E9F2] bg-gradient-to-b from-[#F4F7FD] to-white lg:h-[calc(100dvh-6.125rem)]">
      <HeroBackdrop />
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-wrap items-center gap-8 px-4 py-4 sm:px-6 lg:h-full lg:flex-nowrap lg:items-stretch lg:gap-16 lg:px-8 lg:py-3">
        <div className="flex min-w-0 flex-1 basis-[500px] flex-col justify-center gap-6 lg:gap-8">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D5DDEA] bg-white py-1.5 pr-3.5 pl-1.5 text-[13.5px] font-semibold text-[#0B1B3A]">
            <b className="rounded-full bg-[#EEF3FE] px-2.5 py-0.5 text-xs font-bold text-[#1F5BD8]">New</b>
            Free DAT study plan generator
          </p>
          <h1 className="text-[clamp(30px,2.7vw,39px)] leading-[1.28] font-extrabold tracking-[-0.03em] [word-spacing:0.1em] text-[#0B1B3A]">
            <span className="lg:block">Expert DAT Tutoring and</span>{" "}
            <span className="lg:block">
              Dental School <span className="text-[#1F5BD8]">Admissions Consulting</span>
            </span>
          </h1>
          <HeroCoachCluster messages={coachMessages} />
          <div className="flex flex-wrap gap-3">
            <Link
              href="/schedule"
              className="inline-flex min-h-[50px] items-center gap-2 rounded-full bg-[#1F5BD8] px-7 text-[15px] font-bold text-white shadow-[0_6px_16px_-6px_rgba(31,91,216,0.55)] hover:bg-[#1747AC]"
            >
              Book a free 15-min call
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href="#services"
              className="inline-flex min-h-[50px] items-center rounded-full border border-[#D5DDEA] bg-white px-7 text-[15px] font-bold text-[#0B1B3A] hover:border-[#0B1B3A]"
            >
              Explore services
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <div className="flex" aria-hidden>
              {faces.map((face) => (
                <span
                  key={face.initials}
                  className="-ml-2.5 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-[13px] font-bold text-white first:ml-0"
                  style={{ background: face.color }}
                >
                  {face.initials}
                </span>
              ))}
            </div>
            <p className="text-sm leading-snug text-[#5B6782]">
              <span className="tracking-[2px] text-[#E7A400]">★★★★★</span>
              <br />
              <strong className="text-[#0B1B3A]">9.8/10</strong> from 39 surveyed students · <strong className="text-[#0B1B3A]">1,000+</strong> pre-dents helped
            </p>
          </div>
        </div>

        <div className="fdp-dat mx-auto w-[480px] max-w-full shrink-0 lg:mx-0 lg:h-full">
          <div className="hero-visual">
            <div
              className="stage"
              role="img"
              aria-label="Sample DAT study plan: week 10 of 18, 56 days to test day, weekly hours split across the DAT sections, today's tasks being checked off, this week added to Google Calendar, and study resources such as DAT Bootcamp and DAT Booster."
            >
              <div className="stage-inner anim" aria-hidden="true">
                <div className="card-back" />
                <div className="plan-card">
                  <div className="pc-head">
                    <div className="pc-title">
                      <span className="pc-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2F49D1" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
                          <path d="M3.5 10h17M8 3v4M16 3v4" />
                        </svg>
                      </span>
                      <div>
                        <div className="pc-name hd">My DAT Study Plan</div>
                        <div className="pc-sub">Target 21 AA · 14 hrs/week</div>
                      </div>
                    </div>
                    <span className="status-pill">
                      <span className="status-dot a-live" />
                      On track
                    </span>
                  </div>

                  <div className="pc-row">
                    <div className="ring-wrap">
                      <svg width="88" height="88" viewBox="0 0 112 112">
                        <circle cx="56" cy="56" r="46" fill="none" stroke="#EDF0F7" strokeWidth="10" />
                        <circle
                          className="a-ring"
                          cx="56"
                          cy="56"
                          r="46"
                          fill="none"
                          stroke="#1E5BDB"
                          strokeWidth="10"
                          strokeLinecap="round"
                          strokeDasharray="289"
                          strokeDashoffset="128"
                          transform="rotate(-90 56 56)"
                        />
                      </svg>
                      <div className="ring-center">
                        <span className="ring-num hd">56</span>
                        <span className="ring-lbl">days to DAT</span>
                      </div>
                    </div>
                    <div className="phases-mini">
                      <div className="pc-label-row">
                        <span className="pc-label">Plan phases</span>
                        <span className="week-tag a-mark">Week 10 of 18</span>
                      </div>
                      <div className="phase-track">
                        <div style={{ flex: 8 }}>
                          <div className="a-fillA" style={{ height: "100%", background: "#7FA0EE" }} />
                        </div>
                        <div style={{ flex: 5 }}>
                          <div className="a-fillB" style={{ height: "100%", width: "40%", background: "#1E5BDB" }} />
                        </div>
                        <div style={{ flex: 4 }} />
                        <div style={{ flex: 1 }} />
                      </div>
                      <div className="phase-labels">
                        <span style={{ flex: 8 }}>Content</span>
                        <span style={{ flex: 5 }} className="now">
                          Practice
                        </span>
                        <span style={{ flex: 4 }}>Full-lengths</span>
                        <span style={{ flex: 1, textAlign: "right" }}>Review</span>
                      </div>
                    </div>
                  </div>

                  <div className="pc-section">
                    <div className="pc-label-row">
                      <span className="pc-label">This week by section</span>
                      <span className="pc-meta">14 hrs</span>
                    </div>
                    <div className="bars">
                      <span className="focus">
                        Orgo <span className="focus-tag">FOCUS</span>
                      </span>
                      <div className="track">
                        <div className="a-barF" style={{ width: "100%", background: "#1E5BDB" }} />
                      </div>
                      <span className="hrs-swap">
                        <span className="a-hrsA">2.5h</span>
                        <span className="a-hrsB">3.5h</span>
                      </span>

                      <span>Biology</span>
                      <div className="track">
                        <div className="a-bar d1" style={{ width: "86%", background: "#2F49D1" }} />
                      </div>
                      <span className="hrs-cell a-hrs">3h</span>

                      <span>PAT</span>
                      <div className="track">
                        <div className="a-bar d2" style={{ width: "72%", background: "#5B79E6" }} />
                      </div>
                      <span className="hrs-cell a-hrs">2.5h</span>

                      <span>Gen Chem</span>
                      <div className="track">
                        <div className="a-bar d3" style={{ width: "57%", background: "#7FA0EE" }} />
                      </div>
                      <span className="hrs-cell a-hrs">2h</span>

                      <span>QR · RC</span>
                      <div className="track">
                        <div className="a-bar d4" style={{ width: "86%", background: "#A9BEF3" }} />
                      </div>
                      <span className="hrs-cell a-hrs">3h</span>
                    </div>
                  </div>

                  <div className="pc-section" style={{ gap: 8 }}>
                    <span className="pc-label">Today · Tuesday</span>
                    <div className="task">
                      <span className="task-check">
                        <span className="tick a-tick">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12.5l4.5 4.5L19 7.5" />
                          </svg>
                        </span>
                      </span>
                      <span className="a-strike">Orgo · SN1 vs SN2, 25 questions</span>
                    </div>
                    <div className="task">
                      <span className="task-check">
                        <span className="tick a-tick d7">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12.5l4.5 4.5L19 7.5" />
                          </svg>
                        </span>
                      </span>
                      <span className="a-strike d7">PAT · 30 keyholes, timed</span>
                    </div>
                    <div className="task">
                      <span className="task-progress a-prog" />
                      <span>RC · 1 passage + review</span>
                      <span className="task-time">40 min</span>
                    </div>
                  </div>
                </div>

                <div className="float float-score a-pop1">
                  <span className="ic">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 16l5-5 4 4 7-7M15 8h5v5" />
                    </svg>
                  </span>
                  <div>
                    <small>Full-length #2</small>
                    <b className="hd">19 → 21 AA</b>
                  </div>
                </div>

                <div className="float float-adapt a-pop2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9DB6FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 11a8 8 0 0 0-14.5-4.6L4 8M4 4v4h4M4 13a8 8 0 0 0 14.5 4.6L20 16M20 20v-4h-4" />
                  </svg>
                  <div>
                    <small>Plan adjusted</small>
                    <b>+1 hr Orgo this week</b>
                  </div>
                </div>

                <div className="float float-cal a-pop3">
                  <span className="ic">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="3.5" y="5" width="17" height="15.5" rx="2.2" fill="#fff" stroke="#1A73E8" strokeWidth="1.7" />
                      <path d="M3.5 9.5h17" stroke="#1A73E8" strokeWidth="1.7" />
                      <path d="M8 3.2v4M16 3.2v4" stroke="#EA4335" strokeWidth="1.7" strokeLinecap="round" />
                      <rect x="7" y="12.2" width="3.2" height="3.2" rx="0.6" fill="#34A853" />
                      <rect x="12" y="12.2" width="3.2" height="3.2" rx="0.6" fill="#FBBC04" />
                    </svg>
                  </span>
                  <div>
                    <small>Google Calendar</small>
                    <b className="hd">Add this week</b>
                  </div>
                </div>

                <div className="float float-res a-pop4">
                  <span className="ic">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E5BDB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 5.5h10.5A2.5 2.5 0 0 1 18 8v12.5H7.5A2.5 2.5 0 0 1 5 18V5.5z" />
                      <path d="M8 5.5V4.2A1.2 1.2 0 0 1 9.2 3H19a1 1 0 0 1 1 1v13.2" />
                      <path d="M8.5 10h6M8.5 13.5h6" />
                    </svg>
                  </span>
                  <div>
                    <small>Your resources</small>
                    <b className="hd">Bootcamp · Booster</b>
                  </div>
                </div>
              </div>
            </div>

            <a href="/dat-study-plan-generator" className="hero-visual-link">
              Sample plan · Build yours in about 2 minutes
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
