"use client";

import { useEffect } from "react";
import { trackDatPlan } from "./track";

export function TrackFullView({
  weeksUntilExam,
  preparationIntensity,
  primaryPriority,
}: {
  weeksUntilExam: number;
  preparationIntensity: string;
  primaryPriority: string;
}) {
  useEffect(() => {
    trackDatPlan("dat_plan_full_viewed", { weeksUntilExam, preparationIntensity, primaryPriority });
  }, [weeksUntilExam, preparationIntensity, primaryPriority]);

  return null;
}
