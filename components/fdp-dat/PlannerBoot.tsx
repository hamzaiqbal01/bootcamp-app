"use client";

import { useEffect } from "react";

const SRC = "/fdp-planner/planner.js";

declare global {
  interface Window {
    __fdpPlannerBoot?: () => void;
  }
}

// planner.js fills #planner by hand, so it must run after React hydrates; a plain <script> runs first and breaks hydration.
export function PlannerBoot() {
  useEffect(() => {
    if (window.__fdpPlannerBoot) {
      window.__fdpPlannerBoot();
      return;
    }
    if (document.querySelector(`script[src="${SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
}
