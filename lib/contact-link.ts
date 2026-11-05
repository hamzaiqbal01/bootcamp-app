/**
 * Link to the contact form with a package pre-selected, e.g. /contact?package=Personal%20Statement%20Gold%20(%24474).
 * The contact page reads it to prefill the subject and message. /contact keeps its own canonical, so these URLs
 * are not indexed as separate pages.
 */
export function contactLinkForPackage(name: string, price?: string) {
  const label = price ? `${name} (${price})` : name;
  return `/contact?package=${encodeURIComponent(label)}`;
}
