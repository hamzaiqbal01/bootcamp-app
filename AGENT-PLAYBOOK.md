# Agent playbook — Future Dental Prep + Dental School Secondary

Give this file to an agent (this repo **or** the secondary-site repo). Implement only the section that matches the open project. Do not invent a third brand. Do not shut down old domains.

**Owner Google account** already has these Search Console properties:

- `sc-domain:futuredentalprep.com` (canonical site after migrate)
- `sc-domain:futuredentistprep.com` (old; 301 + GSC Change of Address — do not delete)
- `sc-domain:dentalschoolsecondary.com` (satellite: secondary essays / school database)d
- Also on the same account (ignore unless asked): `facedoctoralex.com`, `toolverse.space`
  dDA

---

## 0. Which repo is this?

| Repo                                            | Live site                               | Role                                                                        |
| ----------------------------------------------- | --------------------------------------- | --------------------------------------------------------------------------- |
| **bootcamp-app** (this file lives here)         | `https://futuredentalprep.com`          | DAT + admissions blog + consulting. ~95% of organic clicks.                 |
| **dental school secondary** (separate codebase) | `https://www.dentalschoolsecondary.com` | Secondary applications + `/database/[school]` pages. Low traffic; seasonal. |

Brand name on FDP: **Future Dental Prep** (do not rename to Dentist Path).  
Phone was removed from Contact/Footer/privacy — do not add it back.

---

## 1. Facts already done (do not redo)

### Domain migrate (FDP)

- New domain **bought**: `futuredentalprep.com` (Namecheap).
- Vercel **bootcamp-app**: both new names Valid; apex = Production; `www.futuredentalprep.com` → 308 → apex.
- Old `futuredentistprep.com` still on the same Vercel project (required for 301s).
- Namecheap DNS (new only): `A @ 216.198.79.1`, `CNAME www` → Vercel-recommended host (or `cname.vercel-dns.com`).
- Code: canonicals/sitemap/robots/OG/JSON-LD/contact fallback → `https://futuredentalprep.com`.
- `vercel.json`: 301 from `futuredentistprep.com` and `www.futuredentistprep.com` → `https://futuredentalprep.com/:path*`.
- Dashboard: `www.futuredentistprep.com` should redirect to `futuredentalprep.com` (not only to old apex).
- Deployed; old URLs redirect to new; **paths/slugs unchanged**.
- GSC: new Domain property verified; sitemap `https://futuredentalprep.com/sitemap.xml` Success (~53 URLs); **Change of Address** old → new submitted. **Never click Cancel move. Never delete old GSC property. Renew old domain 12–24 months.**
- AdSense: **not applied yet.** Slots exist but stay empty until env is set.

### GSC last pull (data through ~2026-08-25; migrate was 2026-08-28)

**FDP old property** `sc-domain:futuredentistprep.com` (19–25 Aug):

- ~**317 clicks / 7d**, ~38.8k impressions, CTR ~0.82%, avg pos ~8.1.
- Top pages: DAT score guide, 200–600 scale, GPA requirements, acceptance rates, prerequisites.
- Kill-list (28d, high impr / CTR &lt; 1.5% / pos ≤ 12): BCP science-GPA+math **~0.10% CTR**; conversion-chart queries often **0% CTR**; GPA/timeline/score-guide CTR &lt; 1%.

**FDP new property** `sc-domain:futuredentalprep.com`: **0** in that window (expected). Recheck 1–2 weeks after migrate.

**Secondary** `sc-domain:dentalschoolsecondary.com`:

- ~**12 clicks / 7d** (was 29 the week before), ~716 impr, avg pos ~20.
- Sitemap ~**84 URLs** (Success) — mostly thin `/database/*` school pages (pos often 30–60).
- Blogs that can rank: secondary cost, when schools send secondaries, do-all-schools-have-secondaries, NYU questions, how to write essays.

---

## 2. Install GSC pull in a repo (this project already has it)

Scripts live in `scripts/gsc/` (`auth.mjs`, `sites.mjs`, `pull.mjs`, `config.mjs`). Token/credentials stay in **gitignored** `.gsc/`.

### 2a. If this is bootcamp-app

Already wired. `package.json` scripts:

```json
"gsc:auth": "node scripts/gsc/auth.mjs",
"gsc:sites": "node scripts/gsc/sites.mjs",
"gsc:pull": "node scripts/gsc/pull.mjs"
```

Dev dependency: `googleapis`. `.gitignore` must include `/.gsc`.

### 2b. If this is the secondary-site repo (copy from bootcamp-app)

1. Copy the whole folder `scripts/gsc/` from bootcamp-app.
2. `npm install -D googleapis` (match bootcamp-app major if possible).
3. Add the three npm scripts above to `package.json`.
4. Add `/.gsc` to `.gitignore`.
5. One-time Google Cloud (skip if `.gsc/credentials.json` already exists on this machine):
   - Cloud Console → enable **Search Console API**
   - OAuth consent (External) + your Google as test user
   - Credentials → OAuth client → **Desktop app** → save JSON as `.gsc/credentials.json`
6. Either copy `.gsc/credentials.json` **and** `.gsc/token.json` from bootcamp-app (same Google user), **or** run auth again:

```bash
npm run gsc:auth
```

Open the printed URL, approve, wait until “Search Console connected.” If you see `invalid_grant`, run `gsc:auth` again.

7. Confirm properties:

```bash
npm run gsc:sites
```

### 2c. Pull commands (PowerShell: keep the `--`)

```bash
npm run gsc:sites

npm run gsc:pull -- --site="sc-domain:futuredentistprep.com" --window=7
npm run gsc:pull -- --site="sc-domain:futuredentalprep.com" --window=7
npm run gsc:pull -- --site="sc-domain:dentalschoolsecondary.com" --window=7
```

Flags: `--window=7` (default), `--lag=3`, `--min-impressions=50`, `--rows=500`.

Reports write to `.gsc/out/report-<domain>-<date>.md` (do not commit). Read the markdown; use kill-list + query mapping to change **titles / H1 / first 80 words / FAQ JSON-LD** — not to thin-out more pages.

**After migrate:** treat `futuredentalprep.com` as the growth property. Keep pulling the old domain until clicks there go near zero (301 working).

---

## 3. Implement on bootcamp-app (FDP) — priority order

Do not start AdSense or a second rebrand until Phase 0 is stable.

### Phase 0 — migrate settle (now → ~6 weeks)

- Keep 301s and old domain on Vercel.
- Vercel env (optional but do it): `NEXT_PUBLIC_SITE_URL=https://futuredentalprep.com`
- Update when touching them: GBP, LinkedIn, YouTube, Typeform, Resend domain verify / `CONTACT_FROM_EMAIL`.
- GSC: watch **new** property Performance. Old clicks down + new clicks up = success.
- **Do not** apply AdSense until the new property shows real clicks for several days (safer: 4–8 weeks). Apply only `https://futuredentalprep.com`.
- **Do not** add `llms.txt` during the move (Google does not use it for ranking).

### Phase 1 — CTR (biggest organic win; do this first)

Goal: same impressions, more clicks. Target ~500–800 clicks/week before chasing 10× content.

Work in `lib/data/blog.ts` titles/descriptions/H1/lead + matching FAQ in `app/blog/[slug]/page.tsx`. Keep slugs **unchanged**.

| Priority | Slug                                             | GSC problem                                                             |
| -------- | ------------------------------------------------ | ----------------------------------------------------------------------- |
| 1        | `aadsas-bcp-gpa-explained`                       | Science GPA + math / BCP — high impr, ~0.10% CTR, pos ~5                |
| 2        | `dat-scoring-scale-200-600` + `dat-score-guide`  | “DAT conversion chart”, “420/460 DAT to old score” — high impr, ~0% CTR |
| 3        | `dental-school-gpa-requirements`                 | “can I get in with 3.0 GPA”                                             |
| 4        | `dental-school-application-timeline` / Fall 2027 | timeline queries, CTR &lt; 1%                                           |

After 14 days: `gsc:pull` new domain (and old until empty). If CTR did not move, iterate title — do not change URL.

### Phase 2 — content (months 3–9)

One substantial post per week, not 50 thin posts. Stay in DAT / AADSAS / GPA / Casper / FAP. **Do not** expand to MCAT or “all doctor tests.”

Hub-and-spoke: one strong conversion-chart hub; do **not** create doorway pages for every score number.

Internal links between related posts. Typeform / schedule CTAs stay.

### Phase 3 — toward ~3,000 clicks/week (12–24 months)

Backlinks already drafted in past chats (GBP, Bing, LinkedIn, YouTube, etc.). Rank 8 → 3–4. Then AdSense $400–700/month is plausible; until then ads are ~$20–40/month at current volume.

**10× is not a 2-month sprint.** Domain move will dip 1–8 weeks first.

### Monetization (FDP) — implement in this order

1. **Consulting/tutoring leads** (Typeform) — primary revenue. Never replace CTAs with ads.
2. **Affiliate** (optional): DAT Destroyer, Crack DAT PAT, Anki — review posts only, tag if provided (`futuredentist-20` was discussed). Disclose. Keep Typeform.
3. **AdSense** after approval + new domain has traffic:
   - Ads **only** on blog posts (already: in-article horizontal + end rectangle via `BlogAdSense`).
   - **Not** on `/`, `/schedule`, contact, privacy, service/package pages.
   - Vercel: `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-…`, slot env, `ADSENSE_PUB_ID` for `app/ads.txt/route.ts`.
   - Never click your own ads.

### Code map (FDP)

| Thing                              | Where                                                              |
| ---------------------------------- | ------------------------------------------------------------------ |
| Blog posts                         | `lib/data/blog.ts`                                                 |
| Post page + FAQ JSON-LD + ad slots | `app/blog/[slug]/page.tsx`                                         |
| Canonical host                     | `app/layout.tsx` `metadataBase`, `app/sitemap.ts`, `app/robots.ts` |
| Old → new 301                      | `vercel.json`                                                      |
| Ads                                | `components/ads/BlogAdSense.tsx`, `BlogAdSenseLoader.tsx`          |
| ads.txt                            | `app/ads.txt/route.ts`                                             |
| Contact emails                     | `lib/contact.ts`                                                   |
| GSC                                | `scripts/gsc/*`                                                    |

After code changes in this repo, if `graphify` is on PATH: `graphify update .` (AST only). If the command is missing, skip.

Read `node_modules/next/dist/docs/` before using unfamiliar Next APIs (this app is Next 16).

---

## 4. Implement on dental-school-secondary repo

This is a **satellite**, not the 10× engine. Do not steal all weekly hours from FDP Phase 1.

### GSC

Same as §2. Pull `sc-domain:dentalschoolsecondary.com`. Canonical URLs in reports are often `https://www.dentalschoolsecondary.com/...` (www). Do not fight www vs apex unless you intentionally standardize with 301 + matching canonicals (one hop, like FDP).

### SEO work (priority)

1. **CTR on blogs that already rank ~pos 5–8:**
   - when dental schools send secondaries
   - secondary application cost
   - do all dental schools have secondaries
2. **Database pages:** 84 sitemap URLs ≠ traffic. Thin templates at pos 30–60. Proper work = each school page unique (current-cycle prompts or “no secondary”, fee, timing, deadline). Do not mass-generate empty shells.
3. **Cross-links:** FDP blog (AADSAS/secondaries) → this site’s matching school or guide; this site → FDP schedule/Typeform. Same owner, complementary intent.
4. **Do not** put AdSense here until the site has meaningful clicks (today ~12/week). Monetize via secondary-editing leads.

Seasonal: strong in AADSAS cycle (roughly May–Jan), weak in spring.

---

## 5. Hard rules for any agent

- No new domain migrate unless the user explicitly asks again.
- No deleting `futuredentistprep.com` or its GSC property.
- No maintenance page on the old FDP domain.
- No AdSense on the old hostname.
- No commit of `.gsc/`, `.env`, credentials, or `token.json`.
- No commit unless the user asks.
- Do not use `git commit --amend` or force-push unless the user explicitly asks and the usual safety rules pass.
- Verify UI in the browser when you change layout/routing/ads (user rule).

---

## 6. Copy-paste first message for a new agent

```
Read AGENT-PLAYBOOK.md in this repo (or the file I attached).

Repo: [bootcamp-app | secondary site].
Task: [e.g. Phase 1 CTR on BCP + DAT conversion posts | copy GSC scripts and pull dentalschoolsecondary.com | unique content on school database pages].

Follow the playbook order. Pull GSC before guessing keywords. Do not apply AdSense or change domains unless I say so.
```
