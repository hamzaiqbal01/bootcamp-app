// Structured data (JSON-LD) helpers. Rendered on the server so crawlers and AI search see it without JavaScript.

export const SITE_URL = "https://futuredentalprep.com";
const ORG_ID = `${SITE_URL}/#organization`;

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; "<" is escaped so a value can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Site-wide brand entity. Add social profile URLs to `sameAs` once they are confirmed. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": ORG_ID,
  name: "Future Dental Prep",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-fdp.png`,
  description:
    "Dental school admissions consulting and 1-on-1 DAT tutoring from dentists and dental students: personal statements, AADSAS review, secondaries, school lists and interview prep.",
  email: "futuredentistpreparation@gmail.com",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "futuredentistpreparation@gmail.com",
    url: `${SITE_URL}/contact`,
    availableLanguage: ["English"],
  },
  areaServed: ["US", "CA"],
  knowsAbout: ["Dental Admission Test (DAT)", "ADEA AADSAS", "Dental school admissions", "Dental school interviews"],
  sameAs: [] as string[],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Future Dental Prep",
  url: SITE_URL,
  publisher: { "@id": ORG_ID },
  inLanguage: "en-US",
};

export type Crumb = { name: string; path: string };

/** BreadcrumbList for a page. Pass the trail without "Home"; it is added first. */
export function breadcrumbSchema(trail: Crumb[]) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return <JsonLd data={breadcrumbSchema(trail)} />;
}

/** Reference to the site organization, for `provider` / `publisher` fields. */
export const organizationRef = { "@id": ORG_ID };
