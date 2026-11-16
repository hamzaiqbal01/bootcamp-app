// Shared by the Search page (server) and its filter bar (client).

export const RANGE_PRESETS = [
  { id: "1d", label: "1 day", days: 1 },
  { id: "7d", label: "7 days", days: 7 },
  { id: "28d", label: "28 days", days: 28 },
  { id: "3m", label: "3 months", days: 91 },
  { id: "6m", label: "6 months", days: 182 },
  { id: "12m", label: "12 months", days: 365 },
  { id: "16m", label: "16 months", days: 486 },
] as const;

export const COUNTRY_OPTIONS: [string, string][] = [
  ["usa", "United States"],
  ["can", "Canada"],
  ["ind", "India"],
  ["pak", "Pakistan"],
  ["gbr", "United Kingdom"],
  ["aus", "Australia"],
  ["phl", "Philippines"],
  ["nga", "Nigeria"],
  ["are", "UAE"],
  ["sau", "Saudi Arabia"],
];

export const DEVICE_OPTIONS: [string, string][] = [
  ["MOBILE", "Mobile"],
  ["DESKTOP", "Desktop"],
  ["TABLET", "Tablet"],
];

export type SearchFilterState = {
  range: string;
  start: string;
  end: string;
  q: string;
  page: string;
  country: string;
  device: string;
};
