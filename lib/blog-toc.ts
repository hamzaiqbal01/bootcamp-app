export type TocHeading = {
  id: string;
  text: string;
};

/** Stable heading id for in-page TOC anchors */
export function slugifyHeading(text: string): string {
  return text
    .replaceAll(/\*\*/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function extractH2Headings(content: string): TocHeading[] {
  const seen = new Map<string, number>();
  const headings: TocHeading[] = [];

  for (const line of content.split("\n")) {
    if (!line.startsWith("## ")) continue;
    const text = line.slice(3).trim().replaceAll(/\*\*/g, "");
    if (!text) continue;

    let id = slugifyHeading(text);
    const count = seen.get(id) ?? 0;
    if (count > 0) id = `${id}-${count + 1}`;
    seen.set(slugifyHeading(text), count + 1);

    headings.push({ id, text });
  }

  return headings;
}
