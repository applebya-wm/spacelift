# Session handoff — spacelift.online

**Written:** 2026-09-10 · **State:** modernization complete and deployed; next block is SEO + Lighthouse polish.

Read this first, then [`modernization-results.md`](./modernization-results.md) for what changed and why.

---

## 1. Where everything stands

|                                        |                                                                |
| -------------------------------------- | -------------------------------------------------------------- |
| `main`                                 | `8012a5e` — local and origin in sync, working tree clean       |
| `gh-pages`                             | `5b75b8e` = "Deploy 0737997"                                   |
| Deployed tree vs fresh build of `main` | **all 659 files byte-identical**                               |
| Pending site changes                   | **none** (`main` is 1 commit ahead; docs only)                 |
| CI on `main`                           | green                                                          |
| `pnpm audit`                           | clean, including `--prod`                                      |
| Production                             | apex 200, `http`→301→https, `www`→301→apex, cert to 2026-10-27 |

**Live Lighthouse, 2026-09-10, against production:**

|         | Perf   | A11y    | Best practices | SEO     |
| ------- | ------ | ------- | -------------- | ------- |
| Mobile  | **98** | **100** | **100**        | **100** |
| Desktop | **97** | **100** | **100**        | **100** |

Mobile Core Web Vitals: FCP 1.5 s · **LCP 2.2 s** · TBT 0 ms · **CLS 0** · SI 1.5 s.

Reproduce with:

```sh
npx lighthouse@13.4.1 https://spacelift.online/ --output=json \
  --output-path=/tmp/lh-mobile.json --chrome-flags="--headless=new" --quiet
npx lighthouse@13.4.1 https://spacelift.online/ --preset=desktop --output=json \
  --output-path=/tmp/lh-desktop.json --chrome-flags="--headless=new" --quiet
```

Lighthouse _does_ run in this environment, contrary to what the baseline document
assumed back in August. The baseline's LCP/CLS figures came from a hand-rolled
Playwright harness instead; both are legitimate, but Lighthouse is the right
tool now that the target is a score.

---

## 2. Next block: SEO and a near-perfect Lighthouse report

### Read this before planning SEO work

**Lighthouse SEO is already 100/100 — 10 of 10 audits passing, 0 failing.**
There is no Lighthouse SEO work left to do. Anything further is real-world SEO,
not score-chasing, and the honest list is short:

- **`LocalBusiness` structured data.** Lighthouse's `structured-data` audit is
  _manual_ — it never scores, so adding schema will not move the number. It is
  still the single most valuable real SEO improvement available for a
  service-area business, because it feeds Google's local pack and rich results.
  **Blocked on the owner:** needs confirmed service area, business hours, phone,
  and postal address. Do not invent these. Ask, then implement
  `LocalBusiness` + `AggregateRating` (there are nine real testimonials on the
  page) as JSON-LD.
- **Google Business Profile** is almost certainly worth more to this business
  than anything in the codebase. Out of our scope, worth saying once to the owner.
- Nothing else. The metadata, canonical, OG/Twitter, sitemap, robots and
  crawlability work is done and verified.

If the ask is "improve SEO", the useful answer is likely "SEO is done
technically; here is the one thing that needs your input, and here is where the
real remaining lever is (Google Business Profile)."

### Performance: the remaining 2 points, and what actually blocks them

Lighthouse mobile lists five imperfect audits. Ranked by real value, with the
investigation already done:

**① `cache-insight` — 820 KiB. Blocked on the held DNS decision.**
Every asset is served with `cacheLifetimeMs=600000` — GitHub Pages' fixed
`max-age=600`, applied even to content-hashed immutable files. This is the
single largest Lighthouse item and **it cannot be fixed in the repository.** It
is exactly what the staged Cloudflare cache rules address
(`infra/cloudflare/cache-rules.md`, 1-year immutable on `/assets/*`). The owner
held the nameserver change on 2026-08-27 because the zone also carries the
business's Microsoft 365 email. Say so plainly rather than attempting a
workaround; there isn't one on GitHub Pages.

**② The wordmark is ~17% of the mobile payload. Fixable now, no blockers.**
Two verified findings:

- `logoWatermark` (1200w, **88.0 kB**) loads on mobile and is **invisible**
  there. Confirmed in a real browser: `opacity: 0`, and it can never become
  visible because `watermarkOpacity` interpolates from `isMobile ? 0 : 0.075`
  to `0`. That is 88 kB — **9.8% of the 0.88 MB page** — for nothing. It should
  not render below `md` at all. Note it is also only ever 7.5% opaque _and_
  grayscaled on desktop, so its quality setting is far higher than it needs.
- The logo width ladder is `240 / 420 / 840`, and the jump from 420w (24.6 kB)
  to 840w (**61.4 kB**) is 2.5× the bytes. The mobile wordmark displays at
  **177 CSS px**; at DPR 2.75–3 (Pixel 5, most modern Android) the browser
  correctly picks 840w. Verified:

  | DPR  | chosen variant     |
  | ---- | ------------------ |
  | 2    | 420w (24.6 kB)     |
  | 2.75 | **840w (61.4 kB)** |
  | 3    | **840w (61.4 kB)** |

  A ~560–600w rung would serve those devices properly. Also revisit
  `quality=88` — it was chosen for line-art crispness, but 177 px display
  probably does not need it.

  Together these two are roughly **150 kB of a 880 kB page**.

**③ `image-delivery-insight` — 290 KiB.** Flags specific gallery images as
larger than displayed: `real-estate-1` (57 kB, 34 kB wasted), `couch`,
`business-1/3/5`, `real-estate-5`, `home-2`. Worth checking whether the gallery
`sizes` and width ladder need the same treatment as the logo. Be careful here —
`SIZES.gallery` was already corrected once during review, and the values were
derived by _measuring the rendered element_, not by reading class names. Measure
again before changing.

**④ `unused-javascript` — 113 KiB, of which only 41 KiB is ours.**
75 KiB is `googletagmanager.com/gtag/js` (42% unused) — third-party, not
fixable short of dropping or self-proxying GA, which is the owner's call. The
remaining 41 KiB (39% of our bundle) is largely `motion`. Code-splitting it
behind the fold is the long-standing P2 item.

**⑤ `render-blocking-insight` — the CSS bundle, 5.8 kB.** Inlining it is
possible but it is 5.8 kB on a page that already paints at 1.5 s; low value,
real risk of breaking the preload ordering the build injects.

### An honest note on "near-perfect"

The report is already 98/100/100/100 mobile and 97/100/100/100 desktop. Three
categories are maxed. Reaching 100 on performance means shaving ~0.2 s off a
2.2 s LCP while the largest available lever (cache lifetimes) is deliberately
switched off. ② is genuinely worth doing on its own merits — 150 kB is 150 kB.
The rest is diminishing, and a 98 that is honestly measured is worth more than a
100 achieved by gaming the run. Set expectations accordingly rather than
promising 100.

---

## 3. Working in this repo — things that will bite you

These cost time this engagement. All verified.

**`NODE_OPTIONS` is poisoned in this shell.** It points at a preload script in a
temp dir that gets cleaned up between sessions, so _every_ `node`/`pnpm` command
dies with `Cannot find module '…/restore-node-options.cjs'`. It looks exactly
like a code failure and is not. Start with:

```sh
unset NODE_OPTIONS
```

**Prettier will silently break block comments containing globs.** A `/* … */`
comment containing `.*/**` has a `*/` in it, which terminates the comment early
and produces a syntax error _after formatting_. `tools/deploy.mjs` uses `//`
line comments throughout for exactly this reason. If you write glob patterns in
comments, use `//`.

**A cold build takes ~50 s; warm is ~1 s.** `vite-imagetools` caches by content
hash in `node_modules/.cache/imagetools` (26 MB). Deleting `node_modules` costs
you a full re-encode of 645 image variants. CI caches this directory explicitly.

**`sizes` values must be _measured_, not read off Tailwind classes.** The hero
was declared `50vw` and was actually 33 vw between 768–1279 px, because its
column sits beside a `md:flex-[2] xl:flex-1` sibling. Load the page and measure
`getBoundingClientRect().width` across viewports before trusting any `sizes`
string. `SIZES` lives in `src/sizes.ts`, imported by _both_ `src/images.ts` and
`vite.config.ts` — the preload's `imagesizes` and the element's `sizes` must be
identical or the browser preloads one candidate and requests another.

**Exactly one image may be `priority`.** `Picture` has `priority` (the LCP
element: eager + `fetchpriority=high` + sync decode) and `eager` (above the
fold, browser's own priority). Two tests enforce that only one image is
high-priority; don't "fix" them by relaxing the assertion.

**`pnpm run deploy` is a script, not the CLI.** `tools/deploy.mjs` exists
because `gh-pages -d dist` never deletes dot-prefixed files from the branch (its
removal glob runs with globby's `dot: false`). It guards against an empty
`dist/`, a missing `dist/CNAME` (which would drop the custom domain), a dirty
tree, and a failed push. Read its header comment before changing it.

**Deploy verification that actually proves something:**

```sh
TMP=$(mktemp -d); git archive origin/gh-pages | tar -x -C "$TMP"
diff -rq "$TMP" dist && echo identical; rm -rf "$TMP"
```

---

## 4. Commands

```sh
unset NODE_OPTIONS         # first, always
pnpm install
pnpm verify                # typecheck + lint + format:check + tests — what CI runs
pnpm build                 # ~50 s cold, ~1 s warm
pnpm serve                 # preview the production build
pnpm check:links           # verify every reference in dist/ resolves
pnpm deploy                # build, then publish dist/ to gh-pages
pnpm generate:brand-assets # regenerate og-image.jpg + wordmark.png
```

---

## 5. Held by owner decision — do not change without asking

|                              | Status                                                                                                                                                                                                                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DNS / nameservers**        | **Held.** Zone carries the business's Microsoft 365 email (MX, SPF, autodiscover, Lync/Teams CNAMEs + SRVs). Config staged in `infra/cloudflare/`; runbook verifies mail with real messages _before_ the site. Read `infra/cloudflare/dns-inventory.md` before touching anything DNS. |
| **GitHub Pages source**      | **Held** on the legacy `gh-pages` branch. Publish job gated behind a `PAGES_DEPLOY_ENABLED` repo variable so it cannot fail `main`. Releases go out via `pnpm run deploy`.                                                                                                            |
| **Brand mark**               | Owner chose to keep the existing hairline gold swash after seeing three alternatives mocked at true tab size. Not a bug; do not "improve" it.                                                                                                                                         |
| **Repo visibility**          | Public, not private as the original brief assumed. Flagged; owner's call.                                                                                                                                                                                                             |
| Contact-form spam protection | Out of scope — product decision.                                                                                                                                                                                                                                                      |
| DKIM / DMARC                 | Absent from the zone. Real gap, but an email decision, not a website one.                                                                                                                                                                                                             |

---

## 6. Time and billing

**4.2 h** measured across five sessions, itemised in
[`worklog-2026-modernization.md`](./worklog-2026-modernization.md) and
corroborated by commit timestamps. Rate CAD $150/h.

The log is deliberately not padded to the 14–16 h the engagement anticipated.
Scope is complete; throughput was high because the work was AI-assisted. How to
bill that is the owner's commercial decision and has been put to them; it should
not be pre-empted here.

Not yet performed, if approved later: DNS cutover incl. mail verification
(**1.0–1.5 h**), Pages source switch and first automated publish (**0.25 h**).

---

## 7. Suggested next-session order

1. `unset NODE_OPTIONS`, `pnpm install`, `pnpm verify` — confirm the baseline is green.
2. Re-run both Lighthouse profiles and diff against §1. Scores drift as
   dependencies and Chrome change; measure, don't assume.
3. **Ask the owner** for the `LocalBusiness` facts (service area, hours, phone,
   address) — it blocks the only real SEO item, so ask early.
4. Do ② — the invisible mobile watermark and the logo width ladder. Verified,
   unblocked, ~150 kB.
5. Investigate ③ by measuring the gallery elements before changing any `sizes`.
6. Re-measure, deploy, verify production with the `diff -rq` check above.
7. Report honestly on where the score landed, including what remains blocked by
   the held DNS decision.

Also worth raising, unprompted and small: there is **no scheduled dependency
check**. The audit drifted from 0 to 2 advisories within 13 days of release and
was only caught because `verify` happened to be re-run. Dependabot or a weekly
cron on the existing workflow is ~20 minutes.
