# Spacelift.online — 2026 Modernization Work Log

Contemporaneous record of engineering time on the modernization engagement.
Times are wall-clock (America/Vancouver) and are corroborated by the commit
timestamps cited in each block. Only active project work is counted.

---

## Session 1 — 2026-08-27, 12:55–14:55 · **2.0 h**

Continuous. Breakdown below is by activity, with the commit that closed each
block.

### 12:55 – 13:10 · Audit, baseline and plan — 0.25 h

- Repository inspection: history, remotes, branches, full file tree, package
  manifests, `vite.config.ts`, `tsconfig.json`, Tailwind/PostCSS/ESLint config,
  `index.html`, the 1,411-line `App.tsx`, `App.css`, `public/`, `.github/`.
- Established how production actually works, end to end: manual `gh-pages` push
  → `gh-pages` branch → legacy GitHub Pages build → `spacelift.online`.
  Confirmed via the Pages API and by matching the locally built bundle hash to
  the asset served in production, proving `main` and production were identical.
- Probed production directly: DNS from the authoritative nameservers, TLS,
  response headers, cache policy, compression negotiation (gzip only — no
  Brotli, no HTTP/3), `/safari-pinned-tab.svg` (404), `/sitemap.xml` (404).
- Clean install; ran typecheck (pass), lint (**fail**), tests (**fail**),
  production build (pass). Recorded dist composition and compressed sizes.
- Built a reusable Playwright measurement harness (LCP/CLS/FCP via
  `PerformanceObserver`, byte accounting via Resource Timing) under a fixed
  emulation profile; captured production-mobile, local-mobile and local-desktop
  baselines.
- Image inventory across all 63 active sources: dimensions, format, alpha,
  metadata, size. Identified 220 MB of unreferenced archived assets.
- `pnpm audit` triage: classified all 3 critical and 34 high advisories by
  whether they reach a browser.
- QA sweep at 320/390/768/1440/1920: overflow, heading structure, landmarks, alt
  text, image sizing ratios, form labelling, keyboard reachability, link `rel`
  audit, metadata completeness.

Outcome: `docs/modernization-baseline.md`, `docs/modernization-plan.md`.
Headline: 13.17 MB / 45.6 s LCP on production mobile.
Branch `modernize-2026` created off `main` @ `df71777`.
Commits `23e48af`, `2dc7022`.

### 13:10 – 13:25 · Dependencies, toolchain and security — 0.25 h

- Removed six declared-but-unimported packages; verified build and typecheck
  unchanged. (`2b8279c`)
- Toolchain: Vite 5→8, imagetools 7→12, plugin-react-swc 3→4, Vitest 1→4,
  happy-dom 15→20, Testing Library 14→16 / jest-dom 6→7, sharp 0.33→0.35, plus
  postcss/autoprefixer/prettier. Fixed the `NodeJS.Timeout` reference and a
  latent off-by-one in the process carousel's scroll handler that the upgrade
  surfaced. Replaced the stale boilerplate test with five real ones.
  Visual regression checked at five viewports (<0.3% pixel delta). (`56d4386`)
- ESLint 8→10 flat config migration, typescript-eslint 8, react-hooks 7. Traded
  `eslint-plugin-tailwindcss` for `prettier-plugin-tailwindcss` after finding
  the plugin's ESLint 10-compatible line requires Tailwind 4. Resolved the
  residual 16 transitive highs with pnpm overrides pinned within each existing
  major. **65 advisories → 0**, verified from a clean install. (`452395c`)

### 13:25 – 14:40 · Image pipeline, component split, accessibility, SEO — 1.25 h

The largest block, and one unit of work: the image changes were not tractable
against 1,411 lines with forty hand-written image imports.

- Measured encoder quality/size/error across 45/50/55/60 on several sources to
  choose quality 50; separately found AVIF-with-alpha is _larger_ than WebP for
  the wordmark (81 kB vs 12 kB) and dropped AVIF for line art.
- Verified the alpha channels of every PNG source before deciding which could
  take a JPEG fallback — an initial `sharp.stats()` reading was misleading, so
  re-measured by sampling the alpha channel directly.
- Built `src/images.ts`, `Picture.tsx`, the ambient image types, and split
  `App.tsx` into eleven section components.
- Wrote `tools/vite-plugin-preload-critical.ts` to inject the LCP preload,
  recovering variant widths by decoding emitted assets.
- Fixed the duplicate `h1`, the keyboard-inaccessible FAQ, the process
  selectors, the analytics direction bug, the PII-in-analytics payload, the
  320 px logo overlap, missing image dimensions, the heading-level skip, the
  missing `main` landmark, focus visibility, and the metadata/SEO gaps
  (canonical, OG, Twitter, sitemap, 404 page, generated social image).
- Diagnosed a CLS regression (0.029 → 0.137) to font-swap reflow; measured
  Besley/Lato metrics against fallbacks in Chromium and self-hosted the fonts
  with metric-matched fallback faces. CLS → 0.006.
- Iterated on visual fidelity: hero framing (`object-position` vs
  `background-position`), mobile scrim opacity, and the island watermark's
  implicit background-size — each caught by comparing against the pre-change
  build and, for the process section, against live production.
- Expanded the test suite to 14 cases.

Commits `ef9ded6`, `6216a0a`, `6b8ba78`, `b69a92a`.

### 14:40 – 14:55 · Infrastructure, verification and documentation — 0.25 h

- `.github/workflows/deploy.yml`: gated deploy with image-encoder caching.
- `tools/check-links.mjs`, plus a negative test proving it fails on a broken
  reference.
- Captured the DNS zone from the authoritative nameservers — which surfaced the
  Microsoft 365 mail configuration and materially changed the risk profile of
  the proposed nameserver migration. Wrote `infra/cloudflare/` accordingly.
- Served the real build behind the proposed security headers and exercised the
  site end to end: zero CSP violations, and confirmed enforcement positively by
  checking a disallowed origin is refused.
- Found `MotionConfig reducedMotion="user"` was not taking effect because the
  hero animated `marginLeft` rather than a transform; converted and re-verified
  with Chromium's reduced-motion emulation.
- Final measurements (median of three mobile runs), ADR, README, results.

Commits `60bd7e2`, `0d56992`, `aef0070`, `b86d0ec`.

---

## Session 2 — 2026-08-27, 16:30–16:55 · **0.4 h**

Deployment decisions, pipeline verification and handover.

- Put the two production changes to the owner. Both held: nameservers stay at
  GoDaddy rather than move the Microsoft 365 mail configuration as part of a
  website engagement, and the GitHub Pages source stays on the legacy
  `gh-pages` branch.
- That second decision made the workflow unsafe as written —
  `actions/deploy-pages` only works once the Pages source is *GitHub Actions*,
  so the publish job would have failed every merge to `main`. Gated it behind a
  `PAGES_DEPLOY_ENABLED` repository variable; verify and build still run on every
  push and pull request. Recorded the held decisions in the ADR, the results and
  the README. (`0b7f8aa`)
- Pushed `modernize-2026` and opened
  [PR #1](https://github.com/applebya/spacelift/pull/1) (+6,983 / −3,650 across
  89 files).
- Watched the first real CI execution: verify and build green, publish correctly
  skipped by its gate. It surfaced a Node 20 deprecation on three actions;
  bumped checkout/setup-node/action-setup/cache/upload-pages-artifact/deploy-pages
  to current majors and confirmed a clean second run. (`e210757`)

---

## Session 3 — 2026-08-28, 10:05–11:00 · **0.9 h**

Independent review, merge, production deployment and verification.

- Ran an independent review of the branch with Codex (`gpt-5.6-sol`, high
  reasoning effort) against `main`. Four findings; verified every one myself
  rather than acting on the report, and all four held up.
- Fixed them, and two of the fixes went past the finding: the hero `sizes`
  string was duplicated between `src/images.ts` and `vite.config.ts` with
  nothing to catch drift (extracted to `src/sizes.ts`), and `Picture`'s
  `priority` prop was conflating "above the fold" with "is the LCP element"
  (split, with two tests pinning the rule). Measured the effect: a DPR-2 tablet
  now fetches a 20.1 kB hero instead of 32.8 kB. (`3a75b91`)
- Re-ran the reviewer against the fix commit — no further findings.
- CI green; merged PR #1 with a merge commit so the commit SHAs cited in these
  documents stay resolvable on `main`.
- Recorded a rollback point (`gh-pages` @ `df81bb2`), rebuilt clean from merged
  `main`, and deployed. Live in ~60 s.
- Verified production: hosts and redirects, TLS, every static path and content
  type, the branded 404, metadata, preloads, structure, rendering at five
  viewports against the local build, and an interactive smoke test on mobile
  emulation covering keyboard FAQ operation, process selection, carousel arrows,
  the mobile menu and the contact form. Zero console errors.
- Measured production before/after and corrected the results document: the
  desktop comparison is local-to-local, because no production desktop baseline
  was captured before the old build was replaced. Also recorded that FCP moved
  0.28 s the *wrong* way — the deliberate cost of preloading the hero.

---

## Session 4 — 2026-08-31, ~0.4 h · Post-release defect

- Owner reported the browser tab showing an indigo ring instead of the Spacelift
  mark. Traced it to `public/favicon.svg`: a Vite-template placeholder present
  since the repository's initial commit, never referenced until the `index.html`
  metadata rewrite in this engagement linked it — and browsers prefer SVG over
  ICO. A regression I introduced, reported by the client rather than caught here.
- Deleted the file and restored the explicit 16/32 PNG links alongside
  `favicon.ico`, in both `index.html` and `public/404.html`. Rebuilt, deployed,
  and verified in production that `/favicon.svg` 404s and the real mark is served.
  (`004c8c2`)
- Audited every file in `public/` for whether anything references it, on the
  theory that if one stale asset was sitting there others might be. All twelve
  are referenced; nothing else of the class remains.
- Separately, the brand mark is a hairline swash that reads faintly at 16px.
  Mocked up three options at true tab size and put them to the owner, who
  elected to keep the existing identity. No further work.

---

## Session 5 — 2026-09-10, ~0.5 h · Deploy verification and branch hygiene

- Owner asked whether the latest work was live. Verified properly rather than
  from memory: checked out the deployed `gh-pages` tree and diffed it file by
  file against a fresh build of `main` — all served files identical, bundle
  hashes matching. The two commits `main` was ahead by were docs and dev-only
  dependency overrides, neither of which changes the built output, so nothing
  was pending.
- That diff surfaced nine non-build files stranded on the branch since January
  2025. Read the `gh-pages` source to find the cause (its removal glob runs with
  globby's `dot: false`, so dot-prefixed paths are never deleted, and
  `--dotfiles` does not affect it).
- Established the severity honestly before acting: all nine returned 404,
  because the legacy Jekyll build excludes dot-prefixed paths. Stale state
  rather than a disclosure problem.
- Wrote `tools/deploy.mjs` with a corrected remove pattern, having checked the
  candidate patterns against globby directly — the brace-expanded form the CLI
  could have taken turned out to match only dotfiles and would have stranded old
  build assets instead. Added guards for empty `dist/`, missing `CNAME`, dirty
  tree, and failed push.
- Caught two of my own mistakes while testing: Prettier reflowed a glob
  containing `*/` inside a block comment and silently broke the file's syntax
  (found because I tested the guards rather than assuming), and the naive remove
  pattern enumerated the deploy clone's `.git` internals.
- Tested end to end against a scratch remote seeded with the real branch, then
  deployed and verified production: strays gone from the branch, all nine paths
  still 404, served bytes byte-identical to `dist`, no console errors, no
  overflow, one `h1`. (`0737997`, deploy `5b75b8e`)

---

## Session 6 — 2026-09-10, ~0.3 h · Final verification and handoff

- Confirmed the release is fully live: diffed the deployed `gh-pages` tree file
  by file against a clean-room rebuild of `main` (all 659 files identical), and
  re-ran every gate from a fresh `node_modules`.
- Ran Lighthouse against production for the first time — it works in this
  environment, which the August baseline had assumed it would not. Mobile
  **98 / 100 / 100 / 100**, desktop **97 / 100 / 100 / 100**. Corrected the
  baseline document's claim rather than leaving it standing.
- Triaged the five imperfect mobile audits and did the investigation now, so the
  next block starts from facts. Two verified finds worth acting on:
  the 1200px logo watermark (**88 kB**) loads on mobile where it is permanently
  `opacity: 0` — 9.8% of the page for nothing; and the logo width ladder jumps
  420w → 840w, so phones at DPR 2.75–3 fetch 61.4 kB for a 177 px element.
  Together ~150 kB of an 880 kB page.
- Established that Lighthouse SEO is already 100 with zero failing audits, so
  the remaining SEO work is real-world rather than score-chasing: `LocalBusiness`
  JSON-LD, which is blocked on owner-supplied facts and which Lighthouse scores
  only as a *manual* audit.
- Wrote `docs/session-handoff.md`.

---

## Session 7 — 2026-09-10, ~0.8 h · Final polish: wordmark payload, structured data

- Reduced the wordmark from ~17% of the mobile payload to a fraction of it. Three
  changes: stop rendering the header watermark below `md` (where its opacity is
  pinned at 0), regenerate it at 600w pre-grayscaled since it is drawn at 7.5%
  opacity, and add a 560w rung while correcting `SIZES.logo` from a rounded
  `200px` to the measured 177/207/420px — the rounding alone was pushing DPR-3
  phones onto the 840w file. Page transfer at DPR 2: 0.878 → 0.792 MB.
- Proved the watermark change invisible rather than asserting it: composited it
  as the visitor sees it (grayscale, 7.5% opacity, over white) for a mean channel
  delta of 0.35/255, and diffed a desktop header screenshot at 0.000% of pixels
  differing above threshold.
- Decided *against* dropping the logo from quality 88 — it saves 4 kB and this is
  the brand mark rendered 1:1 at 420 px on desktop. Measured before deciding.
- Added `ProfessionalService` + `WebSite` JSON-LD, scoped to what can honestly be
  published: no address, telephone or geo, because the business runs from the
  owner's home; and no `aggregateRating` or `review`, because there is no real
  rating source and Google forbids self-reviews. Wrote
  `src/structured-data.test.ts` to assert those stay absent — every
  `LocalBusiness` example online includes a street address, so this is an easy
  mistake to make later.
- Investigated Lighthouse's `image-delivery-insight` (290 KiB claimed) and did
  **not** act on it: it compares served pixels to CSS pixels while emulating
  DPR 1.75, so it is penalising a correct `srcset`. Documented rather than
  chased.
- Chased down a 13.650% figure in the visual-regression diff at 768 px and
  established it was my own harness — a scripted scroll landing a scroll-snap
  carousel on a different slide — by reproducing the identical figure comparing
  production against itself.
- Deployed and verified in Chrome.

---

## Total: 5.3 h

### A note on this figure

This is measured elapsed working time across three sessions, and it is what the
log is for. It is substantially below the 14–16 h the engagement anticipated.

The scope delivered is the scope that was planned — every P0 and P1 item in
`docs/modernization-plan.md` is complete, and the results are measured rather
than asserted. What differs is throughput, not coverage: the work was carried out
with heavy AI assistance, which compresses the clock time for exactly the kinds
of task this engagement is made of — reading a large unfamiliar codebase,
rewriting forty near-identical import statements, and running the same
measurement harness repeatedly.

Billing on measured hours at the stated rate yields a figure well below what this
body of work would normally cost. Whether to invoice on measured time, on the
value of the delivered scope, or on some agreed basis between the two is a
commercial decision for the owner of the business, not one this log should
pre-empt. What this log will not do is inflate the hours to reach a target.

### Not counted

- Cloudflare account administration (billing, members, corporate naming) —
  outside this project's scope per the engagement terms.
- The DNS cutover and post-cutover verification, which have not been performed;
  they await approval. Estimated **1.0–1.5 h** when approved, including mail
  verification and the 24-hour CSP settling step.
- Switching the GitHub Pages source to Actions and verifying the first
  publish — estimated **0.25 h**. (The pipeline has run and passed; only its
  publish step is unexercised. The 2026-08-28 release went out through
  `pnpm run deploy`, the existing path.)
