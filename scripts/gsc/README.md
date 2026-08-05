# Google Search Console data pull

Pulls Search Console performance data directly, so reports can be generated locally
instead of copy-pasting from the GSC UI.

## One-time setup

1. Open [Google Cloud Console](https://console.cloud.google.com/) and select or create a project.
2. Enable the **Google Search Console API** for that project
   (APIs & Services → Library → search "Search Console API" → Enable).
3. APIs & Services → **OAuth consent screen**: choose *External*, fill in the app name and
   your email, and add your own Google account under **Test users**.
4. APIs & Services → **Credentials** → Create credentials → **OAuth client ID** →
   Application type: **Desktop app**.
5. Download the JSON and save it as `.gsc/credentials.json` in the repo root
   (the whole `.gsc/` folder is gitignored).

Alternative to step 5: set `GSC_CLIENT_ID` and `GSC_CLIENT_SECRET` as environment variables.

## Connect the account

```bash
npm run gsc:auth
```

Opens a consent URL, then stores a refresh token in `.gsc/token.json`. Run once.

## List your properties

```bash
npm run gsc:sites
```

Domain properties look like `sc-domain:futuredentistprep.com`,
URL-prefix properties look like `https://futuredentistprep.com/`.

## Pull a report

```bash
npm run gsc:pull -- --site="sc-domain:futuredentistprep.com"
```

Set `GSC_SITE_URL` to skip the `--site` flag on every run.

### Options

| Flag | Default | Meaning |
|---|---|---|
| `--site` | single property, if only one | Property to query |
| `--window` | `7` | Comparison window in days (current vs previous) |
| `--lag` | `3` | Days to step back from today; GSC data is not final immediately |
| `--min-impressions` | `50` | Threshold for the 28-day CTR kill-list |
| `--rows` | `500` | Max rows requested per dimension |

Output is printed and written to `.gsc/out/report-<date>.md` plus the raw JSON next to it.

## What the report contains

- Site pulse: clicks, impressions, CTR, average position — current window vs previous
- Top pages and top queries with per-metric deltas
- 28-day CTR kill-list: high impressions, CTR under 1.5%, position 12 or better
