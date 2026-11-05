import { Plus_Jakarta_Sans } from "next/font/google";
import { PlannerBoot } from "@/components/fdp-dat/PlannerBoot";
import { HeroBackdrop } from "@/components/landing/HeroBackdrop";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--fdp-head",
});

export function DatPlanner() {
  return (
    <div className={`fdp-dat page-cream relative isolate overflow-hidden ${jakarta.variable}`}>
      <HeroBackdrop />
      <div className="planner-main" id="planner">
        <div className="intro" id="intro">
          <span className="eyebrow">FREE DAT TOOL</span>
          <h1 className="hd">Build your DAT study plan</h1>
          <p className="intro-meta">
            <span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
              Free
            </span>
            <span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
              About 2 minutes
            </span>
            <span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
              See your plan before giving an email
            </span>
          </p>
        </div>

        <div className="progress">
          <nav className="stepper" id="stepper" aria-label="Progress" />
          <div className="bar-bg" aria-hidden="true">
            <div className="bar-fill" id="progressFill" style={{ width: "0%" }} />
          </div>
        </div>

        <div className="layout" id="wizard">
          <div className="form-col">
            <div className="card" id="stepBody" aria-live="polite" />
            <div className="actions" id="actions" />
          </div>
          <aside className="preview" id="preview" aria-label="Your plan so far" />
        </div>

        <div className="result" id="result" hidden />
      </div>
      <PlannerBoot />
    </div>
  );
}
