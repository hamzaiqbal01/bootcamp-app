// Tell Bing (and other IndexNow engines such as Yandex, Seznam, Naver) which URLs are new or changed.
//
//   npm run indexnow                      -> submit every URL in the live sitemap
//   npm run indexnow -- /canada /pricing  -> submit only these paths
//
// The key is public by design: it must also be served at https://futuredentalprep.com/<key>.txt
// (public/<key>.txt). Submit after a deploy, once the changed pages are live.

const HOST = "futuredentalprep.com";
const SITE = `https://${HOST}`;
const KEY = "3a6c1eccef93f429cb752422187fc039";

async function sitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml responded ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

async function main() {
  const paths = process.argv.slice(2);
  const urlList = paths.length
    ? paths.map((path) => new URL(path, SITE).toString())
    : await sitemapUrls();

  const keyCheck = await fetch(`${SITE}/${KEY}.txt`);
  if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
    throw new Error(`Key file ${SITE}/${KEY}.txt is not live yet. Deploy first.`);
  }

  // IndexNow accepts up to 10,000 URLs per request.
  for (let i = 0; i < urlList.length; i += 10000) {
    const batch = urlList.slice(i, i + 10000);
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: batch }),
    });
    // 200 = accepted, 202 = accepted and key validation pending.
    console.log(`IndexNow: ${res.status} ${res.statusText} for ${batch.length} URLs`);
    if (res.status >= 400) {
      console.error(await res.text());
      process.exitCode = 1;
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
