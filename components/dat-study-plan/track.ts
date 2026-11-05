import { track, trackLead } from "@/lib/analytics";

export function trackDatPlan(
  event: string,
  params?: Record<string, string | number>,
) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as Window & {
    dataLayer?: Record<string, unknown>[];
  };
  analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? [];
  analyticsWindow.dataLayer.push({ event, ...params });
  track(event, params);
  if (event === "dat_plan_lead_submitted") trackLead("dat_study_plan");
}
