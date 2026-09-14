import { schools, type School } from "./schools";
import { getSchoolDetail } from "./school-details";

export function groupSchoolsByState(list: School[] = schools): { state: string; schools: School[] }[] {
  const map = new Map<string, School[]>();
  for (const school of list) {
    const current = map.get(school.state) ?? [];
    current.push(school);
    map.set(school.state, current);
  }
  return [...map.entries()].map(([state, stateSchools]) => ({
    state,
    schools: stateSchools,
  }));
}

export function schoolQuestionCount(slug: string): number {
  return getSchoolDetail(slug)?.questions.length ?? 0;
}

export function uniqueStates(): string[] {
  return [...new Set(schools.map((school) => school.state))];
}

export function filterSchools(query: string, state?: string | null): School[] {
  const q = query.trim().toLowerCase();
  return schools.filter((school) => {
    if (state && school.state !== state) return false;
    if (!q) return true;
    return (
      school.name.toLowerCase().includes(q) ||
      school.abbr.toLowerCase().includes(q) ||
      school.state.toLowerCase().includes(q) ||
      school.short.toLowerCase().includes(q)
    );
  });
}
