import { loadAuthorizedClient, searchConsole } from "./config.mjs";

const api = searchConsole(loadAuthorizedClient());
const { data } = await api.sites.list();
const sites = data.siteEntry ?? [];

if (sites.length === 0) {
  console.log("No Search Console properties found for this Google account.");
} else {
  console.log("Properties you can query:\n");
  for (const site of sites) {
    console.log(`  ${site.siteUrl}   (${site.permissionLevel})`);
  }
  console.log(`\nUse one with: npm run gsc:pull -- --site="${sites[0].siteUrl}"`);
}
