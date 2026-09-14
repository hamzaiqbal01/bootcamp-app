import fs from "node:fs";
import path from "node:path";
import { loadAuthorizedClient, searchConsole, OUT_DIR, ensureDir } from "./config.mjs";

const SITE = "sc-domain:futuredentalprep.com";
const SITEMAP = process.argv[2] ?? "https://futuredentalprep.com/sitemap.xml";

const xml = await fetch(SITEMAP).then((r) => r.text());
const urls = [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map((m) => m[1].trim());

const api = searchConsole(loadAuthorizedClient());
const results = [];

function classify(row) {
  const coverage = row.coverage ?? "";
  const verdict = row.verdict ?? "";
  const indexed =
    verdict === "PASS" ||
    coverage === "Submitted and indexed" ||
    coverage === "Indexed, not submitted in sitemap";
  return indexed ? "indexed" : "not_indexed";
}

for (let i = 0; i < urls.length; i++) {
  const url = urls[i];
  process.stderr.write(`[${i + 1}/${urls.length}] ${url}\n`);
  try {
    const { data } = await api.urlInspection.index.inspect({
      requestBody: { inspectionUrl: url, siteUrl: SITE },
    });
    const ixs = data.inspectionResult?.indexStatusResult ?? {};
    results.push({
      url,
      verdict: ixs.verdict ?? null,
      coverage: ixs.coverageState ?? null,
      indexingState: ixs.indexingState ?? null,
      pageFetch: ixs.pageFetchState ?? null,
      googleCanonical: ixs.googleCanonical ?? null,
      userCanonical: ixs.userCanonical ?? null,
      lastCrawl: ixs.lastCrawlTime ?? null,
      robots: ixs.robotsTxtState ?? null,
      status: classify({ verdict: ixs.verdict, coverage: ixs.coverageState }),
    });
  } catch (error) {
    results.push({ url, error: error.message, status: "error" });
  }
}

ensureDir(OUT_DIR);
const stamp = new Date().toISOString().slice(0, 10);
const outPath = path.join(OUT_DIR, `index-audit-${stamp}.json`);
const notIndexed = results.filter((r) => r.status !== "indexed");
fs.writeFileSync(
  outPath,
  JSON.stringify(
    {
      site: SITE,
      sitemap: SITEMAP,
      generated: new Date().toISOString(),
      total: results.length,
      indexed: results.filter((r) => r.status === "indexed").length,
      notIndexed: notIndexed.length,
      results,
    },
    null,
    2,
  ),
);

console.log(JSON.stringify({ outPath, total: results.length, notIndexed }, null, 2));
