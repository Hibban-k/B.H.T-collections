# BHT Collections — outside-code launch checklist

> Current consolidated guide: [COMPLETE-SEO-GUIDE.md](COMPLETE-SEO-GUIDE.md). It documents the current implementation through commit `9af5c32`, corrects superseded URL/language and seed-script guidance, and separates code completion from unverified production deployment. Older status entries below are historical.

> Latest regional decision: country-only `/ae`, `/sa`, `/qa`, `/kw`, `/bh`, `/om`; `/en` is international. Language is a cookie preference on the same URL. See [REGIONAL-TARGETING.md](REGIONAL-TARGETING.md), which supersedes earlier separate-English/Arabic URL guidance. Regional setup code is implemented; the database connection prevented installing the six country records here.

Updated: 24 November 2026
Main domain: **https://www.blankethouse.ae**

## Is the plan already implemented?

**The fixes listed as implemented in the audit report are already in the code. You do not need to implement them again. The entire audit plan is not fully complete: external setup, live verification and business-content review remain. The requested search, Arabic and lint follow-up is now implemented locally and must also be committed and deployed.**

| Area | Current evidence | What you need to do |
| --- | --- | --- |
| SEO implementation | Metadata, canonicals, redirects, product SEO, sitemap, indexing controls and listed performance fixes are implemented | Do not recreate these changes |
| Git | Local branch is now `main`, commit `c6b3ffc` — `Improve technical SEO and standardize blankethouse.ae`. Local `origin/main` matches | Confirm this commit appears on GitHub; a fresh remote check failed from this environment |
| Automated checks | Lint: 0 errors/warnings; TypeScript: passed; regression suite: 18 passed. Local build blocked by Windows EPERM on generated .next folders | Obtain a successful production deployment using the final domain |
| Production deployment | Not verified from this session | Check the hosting dashboard and live site |
| DNS, HTTPS, production environment and Search Console | Not changed or verified by this work | Complete or verify the checklist below |
| Live performance and complete user journeys | Not measured/tested successfully here because network/database access was blocked | Test after deployment |

The earlier message saying the changes were only uncommitted local work is now outdated. The repository now shows the commit on `main`. A matching local remote-tracking reference is not proof of a successful live deployment.

## 1. Confirm the correct code is being deployed

Owner: developer or hosting administrator.

- [ ] Open https://github.com/Hibban-k/B.H.T-collections and select `main`.
- [ ] Confirm commit `c6b3ffc`, or a later commit containing it, is present.
- [ ] In the hosting dashboard, confirm this repository is connected to the correct website project.
- [ ] Confirm the production branch is `main`.
- [ ] Check which commit the current production deployment uses. Do not assume a push succeeded just because the old website still opens.

The original SEO commit is already on local main. Commit and push the new follow-up changes before deploying; do not assume commit `c6b3ffc` contains the new search, Arabic or lint work.

## 2. Set the production website URL

Owner: hosting administrator. The steps below assume the existing Vercel deployment is still used. On another host, use its equivalent environment settings.

Open the project's **Settings → Environment Variables** and check the **Production** scope:

| Variable | Required action |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Set to `https://www.blankethouse.ae` |
| `NEXT_PUBLIC_APP_URL` | Legacy fallback, not required when SITE_URL is present. If already set, align it with `https://www.blankethouse.ae` to avoid future confusion |
| `AUTH_URL` | If explicitly configured in production, ensure it uses `https://www.blankethouse.ae`, not localhost or an old hostname |
| `NEXTAUTH_URL` | If retained in production, ensure it agrees with the production auth URL |
| `MONGODB_URI` | Confirm the existing production database connection is present and correct; keep it secret |
| `AUTH_SECRET` | Keep the existing production secret. Do not replace it with the example value or rotate it merely for this SEO change |

- [ ] No production site/auth URL points to localhost or either previously suggested `bhtcollections` domain.
- [ ] Existing image-upload, email and other service credentials remain configured.
- [ ] Do not copy example passwords/secrets from `.env.example` into production.
- [ ] Trigger a **fresh production build/deployment after saving variables**. Editing `.env.example` or a local `.env.local` file does not update the hosting dashboard.

Vercel environment changes apply to a new deployment. `NEXT_PUBLIC_` values also need the correct value at build time.

## 3. Verify the domain, DNS and HTTPS

Owner: domain/DNS administrator and hosting administrator.

- [ ] In the hosting project's domain settings, attach `www.blankethouse.ae` to production.
- [ ] Also attach `blankethouse.ae` so visitors using the non-WWW address reach the site.
- [ ] At the DNS provider, use the **exact current records shown by the hosting dashboard**. Do not copy a guessed IP address or CNAME from a generic tutorial.
- [ ] Confirm both domain entries show valid configuration and valid HTTPS certificates.
- [ ] Keep the canonical direction **non-WWW → WWW**. Remove any conflicting rule that redirects WWW back to non-WWW.
- [ ] Keep existing mail-related DNS records, including MX and mail verification records, unless a separate email migration is intended.

The application already contains the public apex-to-WWW redirect. A compatible hosting-level redirect can cover the whole domain, but never configure an opposite-direction redirect. The application deliberately leaves authentication/API routes out of its host redirect; test login on the WWW hostname.

Expected examples:

| Open this URL | Expected result |
| --- | --- |
| `https://blankethouse.ae/en/about` | Permanent redirect to `https://www.blankethouse.ae/en/about` |
| `http://www.blankethouse.ae/en/about` | HTTPS version loads without a loop |
| `https://www.blankethouse.ae/en/about` | Page loads; no host redirect loop |
| `https://blankethouse.ae/en/footwear?color=black` | WWW destination retains the path and query |

The root `/` can additionally redirect to `/en` or `/ar`; that language redirect is expected.

## 4. Confirm production database access

Owner: database administrator/developer.

- [ ] Confirm the Atlas cluster is available and the production database user has the intended permissions.
- [ ] Verify the hosting application's network access is allowed by the Atlas configuration. Use the actual hosting networking arrangement; do not assume one developer's IP covers production.
- [ ] Check production logs for database connection/authentication errors.
- [ ] Confirm actual products, categories and brands load from production.
- [ ] Confirm the sitemap loads its full published catalog rather than returning an error.

Database access failed from the assistant's execution environment. That does **not** prove your existing production database connection is broken. Verify production first and change access settings only if necessary.

## 5. Check the live website after deployment

Owner: developer and business owner. Use a staging/test record where possible; avoid creating a real customer order just to test.

- [ ] Homepage opens on mobile and desktop with the existing design and watermark backgrounds.
- [ ] Bedding, footwear, travel bags, brand pages and a real published product load correctly.
- [ ] Product images, gallery, filters, quick view and stock display work.
- [ ] Language switching changes the URL and page direction correctly. Record untranslated/broken Arabic text for correction.
- [ ] Admin login, logout and an authorized product edit work on the WWW domain.
- [ ] An approved test product edit refreshes generated SEO; custom SEO copy remains preserved.
- [ ] Draft/disabled product URLs are unavailable publicly.
- [ ] Order/inquiry forms and WhatsApp links work using a controlled test workflow.
- [ ] Logged-out requests to protected region-management endpoints are rejected.

Ask the developer to inspect these SEO outputs:

| Check | Expected output |
| --- | --- |
| `https://www.blankethouse.ae/robots.txt` | References `https://www.blankethouse.ae/sitemap.xml`; public storefront is not globally blocked |
| `https://www.blankethouse.ae/sitemap.xml` | Loads successfully; lists WWW public URLs and published products; no admin pages or legacy redirect URLs |
| About/product page source | Canonical identifies that page on WWW, not the homepage or an old domain |
| Product structured data | Correct name, image, price, availability and canonical URL; no invented reviews |
| Admin response headers | `X-Robots-Tag: noindex, nofollow` |

Do not manually create another sitemap or add a second canonical tag through an unrelated SEO script; those are already generated by the application.

## 6. Connect Google Search Console

Owner: business owner or SEO administrator, after the live checks pass.

- [ ] Open https://search.google.com/search-console.
- [ ] Use the existing verified property if it covers this site. Otherwise add the Domain property `blankethouse.ae` and complete Google's verification instructions.
- [ ] Add Google's verification TXT record without deleting unrelated DNS records.
- [ ] Submit `https://www.blankethouse.ae/sitemap.xml` in **Sitemaps**.
- [ ] Confirm Google can read the sitemap.
- [ ] Use URL Inspection for the homepage, one main category and one published product; run the live URL test.
- [ ] Request indexing for those representative public pages if appropriate. Do not request indexing for admin, API or draft-product URLs.
- [ ] Review indexing/canonical reports after Google recrawls the site. Submission does not guarantee indexing or a ranking increase.

If you genuinely migrated an older owned public domain, separately plan redirects for its historical URLs. The code does not redirect arbitrary former hosts just because they appeared in this conversation.

## 7. Measure performance and check business content

Owner: developer/SEO administrator for measurements; business owner for product facts.

- [ ] Record mobile and desktop results at https://pagespeed.web.dev for the homepage, a category and a product page.
- [ ] Review real-user Core Web Vitals in Search Console when sufficient data is available; a single lab run is not a field measurement.
- [ ] Keep the test URLs and dates so later results can be compared fairly.
- [ ] Confirm product sizes, materials, prices, availability and marketing claims are accurate.
- [ ] Review Arabic product/catalog content entered by admins; supply translations for source content that remains English. The previously reported source question marks were a terminal display issue.
- [ ] Use genuine product photos and real review information. Automatic SEO cannot verify inaccurate source data.

## Code follow-up status and optional future work

The requested first three items are now implemented locally. Other rows remain optional engineering work or production measurement:

| Outstanding item from the audit | Status/action |
| --- | --- |
| Search results page | Implemented locally; verify English/Arabic searches after deployment |
| Arabic UI/product labels and legal pages | Corrected/localized; verify RTL presentation after deployment. Product facts remain author-supplied |
| Existing ESLint errors | Resolved: 0 errors and 0 warnings; no lint rules disabled |
| Some homepage/brand catalog sections fetch on the client | Further server-rendering/request consolidation remains optional performance work |
| Request-time root language rendering changes caching behavior | Measure production response times before deciding further changes |
| Historical redirects after explicit product-slug edits | No slug-history storage added; requires separate implementation if needed |

## Launch sign-off

- [ ] Follow-up search/Arabic/lint changes are committed, pushed and deployed.
- [ ] Desktop/mobile search works in English and Arabic; empty, no-match and pagination cases pass.
- [ ] Admin filters, edits, image uploads and status updates still work.
- [ ] Arabic legal pages and product labels display correctly.
- [ ] Production environment uses `https://www.blankethouse.ae`.
- [ ] DNS, HTTPS and redirects work.
- [ ] Database-backed catalog and critical customer/admin flows pass.
- [ ] Sitemap, canonicals and indexing exclusions are verified live.
- [ ] Search Console has the sitemap.
- [ ] Performance measurements and remaining issues are recorded.

Only mark these boxes complete after verification. This document does not certify that the live website has already passed them.

## References

- [Vercel: adding a domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain)
- [Vercel: managing environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables)
- [MongoDB Atlas: IP access lists](https://www.mongodb.com/docs/atlas/security/ip-access-list/)
- [Google: build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- Detailed implementation findings: `IMPLEMENTATION-2026-11-24.md` in this folder.
