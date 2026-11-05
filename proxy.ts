import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Only the real domain should be indexed. The Vercel URLs (production alias and previews) serve the same
// pages and were showing up in Google, so any other host gets a noindex header. Local development is left alone.
const INDEXABLE_HOSTS = new Set(["futuredentalprep.com", "www.futuredentalprep.com"]);

function shouldNoindex(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();
  if (!host || host === "localhost" || host === "127.0.0.1" || host.endsWith(".localhost")) return false;
  return !INDEXABLE_HOSTS.has(host);
}

function withIndexing(request: NextRequest, response: NextResponse) {
  if (shouldNoindex(request)) response.headers.set("X-Robots-Tag", "noindex, nofollow");
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
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
