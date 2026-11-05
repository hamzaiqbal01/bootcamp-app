import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CONSENT_COUNTRIES, REGION_COOKIE } from "@/lib/analytics";

// Only the real domain should be indexed. The Vercel URLs (production alias and previews) serve the same
// pages and were showing up in Google, so any other host gets a noindex header. Local development is left alone.
const INDEXABLE_HOSTS = new Set([
  "futuredentalprep.com",
  "www.futuredentalprep.com",
]);

function shouldNoindex(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();
  if (
    !host ||
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".localhost")
  )
    return false;
  return !INDEXABLE_HOSTS.has(host);
}

// Visitors from the EEA, UK and Switzerland must agree before analytics cookies are set. Vercel sends the
// visitor's country; we pass "eu" or "other" to the browser in a small cookie so the consent banner and the
// GA4 loader know whether to ask first. Nothing personal is stored in it.
function withRegion(request: NextRequest, response: NextResponse) {
  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase();
  if (!country) return;
  const region = CONSENT_COUNTRIES.has(country) ? "eu" : "other";
  if (request.cookies.get(REGION_COOKIE)?.value === region) return;
  response.cookies.set(REGION_COOKIE, region, {
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
    secure: true,
  });
}

function withIndexing(request: NextRequest, response: NextResponse) {
  if (shouldNoindex(request))
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  withRegion(request, response);
  return response;
}

export function proxy(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") {
    return withIndexing(request, NextResponse.next());
  }

  const { pathname } = request.nextUrl;

  // Keep the maintenance page itself, the admin panel + static assets reachable
  if (
    pathname === "/maintenance" ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/ads.txt"
  ) {
    return withIndexing(request, NextResponse.next());
  }

  const url = request.nextUrl.clone();
  url.pathname = "/maintenance";
  return withIndexing(request, NextResponse.rewrite(url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
