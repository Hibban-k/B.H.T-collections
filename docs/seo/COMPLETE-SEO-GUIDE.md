# BHT Collections — Complete SEO implementation and maintenance guide

**Website:** https://www.blankethouse.ae  
**Prepared:** 24 November 2026  
**Source reviewed:** repository through commit `9af5c32`  
**Purpose:** explain what was implemented, why it matters, where it lives, how to maintain it, and what remains outside the code.

This is the current consolidated guide. It supersedes conflicting instructions in earlier audit reports, particularly `/ar` indexing, language-based URL switching, the added market selector, seed commands, test counts and release status. Historical reports remain useful as an audit trail.

## 1. Status at a glance

The SEO foundation and subsequent routing/authentication corrections are implemented in the repository. This does **not** certify that the latest commit is deployed, all six database regions are active, or Google has indexed the changes.

| Area | Implemented | Not established or not implemented |
| --- | --- | --- |
| Technical SEO | Canonical origin, per-page metadata, redirects, sitemap, robots rules, publication filtering | Full production crawl and post-deployment verification |
| On-page SEO | Titles, descriptions, heading correction, internal links, factual product defaults | Comprehensive editorial rewrite or keyword research campaign |
| Product/ecommerce SEO | Automatic SEO on save, published-only pages, product/breadcrumb schema | Merchant Center setup, historical slug redirect storage, complete variant schema |
| Regional SEO | Six GCC route codes, regional metadata, country alternates, initial IP routing | Confirmation of active database records or measured country search demand |
| Language | English/Arabic display preference, Arabic UI/legal corrections, RTL | Separate indexable Arabic URLs or translated database catalog |
| Performance | Request reuse, concurrent reads, deferred modals, image sizing, cache invalidation | Measured improvements to LCP, INP, CLS, traffic or conversion |
| Local/off-page SEO | Existing contact context and Organization markup | Google Business Profile work, citations, outreach, backlinks or review collection |
| Security-related correctness | Admin login redirects, region API guards, safe JSON-LD serialization | A comprehensive security audit |

The existing visual design, logo watermark backgrounds and product presentation are preserved. The newly added market/contact strip was removed at the owner's request. Regional wording is now applied to metadata rather than an extra visible section.

## 2. Technical SEO: URLs, crawling and indexing

### 2.1 One canonical domain

**What changed:** URL generation uses one origin resolver. The production default is `https://www.blankethouse.ae`. The main environment override is `NEXT_PUBLIC_SITE_URL`; `NEXT_PUBLIC_APP_URL` remains a fallback.

**Why:** metadata, product offers, shared links and sitemap entries should not disagree about the website's preferred hostname.

**Where:** `lib/seo/urls.ts`, `.env.example`, `proxy.ts`.

The public configured apex/HTTP URL redirects permanently to HTTPS WWW using 308, retaining its path and query. The helper deliberately excludes API/admin host redirection and does not redirect unrelated preview hosts. DNS, valid certificates and any hosting-level redirects still need to agree with the code. An opposite WWW-to-apex hosting rule can create a loop.

### 2.2 Canonical metadata per page

**What changed:** public pages generate their own canonical, title, description, Open Graph and Twitter metadata rather than inheriting the homepage canonical. Absolute title metadata avoids repeated site-name suffixes.

**Where:** `lib/seo/metadata.ts`, `lib/seo/regional-metadata.ts`, and `generateMetadata` in public page modules such as `app/[locale]/about/page.tsx`.

For example, a Saudi product page identifies its own `/sa/c=bedding/product-slug` URL. Social previews use the product image and corresponding title/description. Open Graph and Twitter metadata control sharing previews; they are not evidence of a ranking improvement.

Canonicals communicate a preferred URL. They do not force Google to index every regional version. Similar country catalogs can still be consolidated by search engines.

### 2.3 Sitemap

**Where:** `app/sitemap.ts`, served at `/sitemap.xml`.

The sitemap includes the international storefront and active supported country storefronts, informational/legal pages, active categories and brands, and published products. It deduplicates URLs, uses real available update dates, and supplies reciprocal country alternatives. It excludes admin, API, search-result and legacy redirect URLs.

Catalog reads run concurrently and product fields are narrowly selected for this job. The sitemap is generated from current data. A database failure surfaces as an error rather than returning a misleading successful partial sitemap. Very large catalogs may later need sitemap splitting.

### 2.4 Robots and private pages

**Where:** `app/robots.ts`, `next.config.ts`, `app/admin/layout.tsx`, search metadata and authentication guards.

| Page type | Current treatment |
| --- | --- |
| Intended public storefront | Crawling allowed; indexable metadata |
| Search results | `noindex, follow`; excluded from sitemap |
| Admin | Authentication plus `X-Robots-Tag: noindex, nofollow` |
| API | `X-Robots-Tag: noindex, nofollow`; `/api/` disallowed in robots |
| Draft/disabled/missing product | Public product reader rejects it; route invokes `notFound()` |
| Inactive/unsupported market | Not advertised in country alternatives; unavailable market layout |

Admin is not blocked in robots so a crawler can see the noindex response. Robots rules are not access control. API robots blocking can also prevent a crawler from observing a noindex header; authenticated API guards provide actual protection. No separate customer-account system was added or certified by this work.

### 2.5 Redirects and the product loop

**Where:** `proxy.ts`, `lib/seo/urls.ts`, canonical and legacy product route files.

Legacy product routes resolve the actual published product and redirect to its canonical route. Category aliases and legacy brand/collection routes redirect to their intended destination instead of displaying unrelated content. Relevant category filters are retained by their alias handlers.

The reported live Marwa product URL was confirmed to return **HTTP 308 with Location equal to the same URL**. The correction makes the proxy overwrite an internal `x-bht-pathname` request header with the actual pathname. The product page compares that pathname with its canonical destination instead of relying solely on reconstructed dynamic parameters. This prevents a canonical request redirecting to itself. Tests cover canonical requests, encoded category paths, incorrect categories and spoofed incoming path headers.

The live loop was observed before deployment of the correction. A successful live retest after deployment has not been recorded here.

## 3. On-page SEO and content

| Improvement | What it does | Main location |
| --- | --- | --- |
| Page titles/descriptions | Distinguishes page purpose and supplies search/social text | `lib/seo/metadata.ts`, public page modules |
| Homepage heading hierarchy | First hero slide uses H1; later slide titles use H2 with existing styling retained | `components/hero/HeroCarousel.tsx`, `app/globals.css` |
| Product heading | Uses the actual product name rather than an invented keyword heading | `components/product/ProductDetailView.tsx` |
| Internal navigation | Preserves current market and reduces avoidable locale redirects | `components/common/StoreLink.tsx`, `lib/seo/urls.ts` |
| Product sharing | Uses the current country route, not the display-language code | `components/product/ProductDetailView.tsx` |
| Image alt text | Uses actual product names and gallery identifiers; does not guess visual properties | Product/detail/search components |
| Arabic corrections | Fixes product-label discrepancies and localizes legal/search text | Product detail, legal/search pages, language context |

Long product descriptions remain author-owned. The system does not research materials, invent certifications, promise delivery times, manufacture reviews or produce a unique long-form description for every country. Accurate source content is still required.

The standalone search page is server rendered, returns published products only, uses literal matching, and includes bounded pagination and empty/error states. It accepts at most 120 query characters, displays up to 24 products per page, and caps page number at 100. This improves navigation; search-result URLs are intentionally not SEO landing pages.

**Where:** `app/[locale]/search/page.tsx`, `lib/repositories/product.repository.ts`, desktop/mobile header search.

## 4. Automatic product SEO: exactly what happens

**Main files:** `lib/seo/product.ts`, `lib/services/product.service.ts`, `app/[locale]/[category]/[slug]/page.tsx`.

### When an admin creates a product

1. The product name and supplied facts are used as inputs.
2. A new slug is normalized from the supplied slug or name, allowing Unicode letters/numbers and hyphen separators. Duplicate checks remain in the service.
3. If no custom SEO title is supplied, the helper excerpts the name to 42 characters and adds ` | BHT Collections`.
4. If no custom meta description is supplied, the helper derives a plain-text summary from the existing description/short description/name, up to 160 characters.
5. A missing short description is derived from supplied content, up to 120 characters.
6. Keywords default to the actual product name if no list is supplied.
7. The service saves the resulting SEO fields with the product. The public page also has a render-time fallback for older records.

### When an admin edits a product

Recognized automatically generated fields can refresh when the source facts change. Custom fields are preserved; generated/custom detection compares existing values with the previous generated defaults, so it is a heuristic rather than a stored authorship flag. Renaming a product does not automatically change its existing URL. An explicit slug edit can change it, but there is no historical-slug redirect table.

HTML is removed from generated snippets. Manual SEO overrides are not silently truncated. Regional additions are applied afterward, so final regional titles/descriptions can exceed the base generation lengths. Those lengths are implementation choices, not guaranteed search-result display limits.

### Regional product example

Illustrative input: name `Blue blanket`, description `Cotton`.

| Field | International `/en` | Saudi `/sa` |
| --- | --- | --- |
| Generated title | Blue blanket \| BHT Collections | Blue blanket \| BHT Collections \| Saudi Arabia |
| Generated description | Blue blanket. Cotton | Saudi Arabia: Blue blanket. Cotton |
| Keywords | Blue blanket | Blue blanket; Blue blanket Saudi Arabia |
| Visible product name/description | Existing catalog content | Same catalog content |
| Currency | AED | AED |

This example is not an actual catalog claim. Regional metadata does not establish local stock, local prices, delivery coverage or search volume. Product keywords are passed into metadata, but **Google does not use the meta-keywords tag for ranking or indexing**. Useful keyword work still depends on accurate page intent, titles and content—not filling that tag.

## 5. Structured data and ecommerce SEO

**Where:** `lib/seo/schema.ts`; rendered by homepage, category and product page modules.

| Schema | Implemented information |
| --- | --- |
| Organization | Business name, canonical website, existing logo and Dubai/UAE address context |
| Product | Product name, images, plain-text description, canonical URL, SKU and known populated brand |
| Offer | AED price, actual availability, seller and canonical product URL |
| BreadcrumbList | Ordered page hierarchy with absolute URLs |
| ItemList | Category product links and names |

The first variant's price/stock is used when supplied, matching the initial selection logic. Zero sale prices are preserved through nullish checks. Unknown brands and unverified aggregate reviews are omitted rather than fabricated. JSON-LD serialization escapes `<` so product content cannot close the script element.

A FAQ schema helper exists, but its existence does not mean every page has FAQ markup or qualifies for FAQ search features. No Merchant Center feed/account setup, shipping/return merchant-policy schema, or complete ProductGroup variant implementation is claimed. Structured data should be tested against the real live product; markup alone does not guarantee a rich result.

## 6. GCC regional targeting and language

**Main files:** `lib/seo/locales.ts`, `lib/seo/regional-content.ts`, `lib/seo/regional-metadata.ts`, `lib/services/region.service.ts`, `app/[locale]/layout.tsx`, `app/sitemap.ts`.

| Audience | Route | Default English hreflang |
| --- | --- | --- |
| International / fallback | `/en` | `en` and `x-default` |
| United Arab Emirates | `/ae` | `en-AE` |
| Saudi Arabia | `/sa` | `en-SA` |
| Qatar | `/qa` | `en-QA` |
| Kuwait | `/kw` | `en-KW` |
| Bahrain | `/bh` | `en-BH` |
| Oman | `/om` | `en-OM` |

Only active supported database markets are advertised. Manage and verify these records at `/admin/regions`. Database connectivity prevented confirming all six here. The old seed scripts were removed from the repository; do not run the obsolete `db:regions` instructions.

### Initial IP-based routing

On Vercel, an unscoped request such as `/` or `/c=bedding/product-slug` uses the platform's IP country header. A matching active GCC country receives a temporary 307 redirect to its route. Other countries, unknown locations, inactive markets and lookup failures fall back to `/en`. Query strings are retained and redirect responses use private/no-store caching.

Explicit `/ae`, `/sa` and `/en` URLs are not redirected to a different market based on IP. This keeps direct links and crawler access available. This is country matching, not distance-based “nearest office” detection. VPNs can affect the detected country. Other hosting platforms require a trusted equivalent integration; the code otherwise falls back to `/en`.

### Language stays separate

`context/LanguageContext.tsx` stores the display choice in `bht_language` and refreshes the same country URL. `lib/seo/request-language.ts` and root/layout code apply the language and direction. Switching English to Arabic on `/sa/bedding` keeps `/sa/bedding`.

English is the default. Arabic is a cookie-dependent view, not a separate Arabic SEO URL; no `ar-SA` or other Arabic alternate is advertised. Old `/ar/...` requests redirect temporarily to `/en/...` and set the Arabic preference. This implements the requested URL scheme, but it is not a complete separately indexable Arabic catalog strategy.

### Where regional wording is controlled

- General landing/category wording: `lib/seo/regional-content.ts`.
- Reviewed country/page/language overrides: `REGIONAL_SEO_OVERRIDES` in that file.
- English market homepage templates: existing admin region fields `metaTitleSuffix` and `metaDescriptionTemplate`; `{{region_name}}` is replaced with the country name.
- Product country additions: `lib/seo/regional-metadata.ts`.

No search-volume dataset was provided. The wording is factual regional targeting, not a claim that selected phrases have high search volume. The `.ae` domain also retains a UAE association; adding GCC routes does not turn it into a country-neutral domain.

## 7. Speed and maintainability

| Change | Location | Benefit and limitation |
| --- | --- | --- |
| Shared published-product lookup | `lib/services/product.service.ts` | React request cache reuses the metadata/page lookup; not a cross-request product cache |
| Concurrent related/cross-sell reads | Product page module | Removes sequential waiting for independent queries |
| Brand/category data caches | Brand/category services | Reuses storefront data; admin reads retain fresh behavior |
| Cache invalidation after edits | Admin product/category/brand/region API handlers | Refreshes affected storefront layouts, sitemap and applicable cache tags |
| Deferred quick-view/order code | Collection and product view components | Avoids eagerly loading modal code before it is needed |
| Responsive image sizes | Storefront image components | Gives image optimization more accurate display widths |
| Image formats/cache configuration | `next.config.ts` | AVIF/WebP support and image cache lifetime; not proof of lower LCP |
| Font discovery/preconnect | `app/layout.tsx`, `app/globals.css` | Earlier discovery with existing fonts and swap behavior retained |
| Search safety and limits | Repository and search page | Escapes regex input and limits returned work |
| Type/lint cleanup | Admin/storefront components, forms and API wrappers | More explicit types and cleaner effects; no lint rules disabled |

Correctness took priority over smaller payloads: fields needed by filters and stock displays were restored to product grids. Request-based language rendering can reduce full-route caching opportunities. External fonts, some client-fetched sections, large source images and repeated catalog requests remain measurement-led optimization opportunities. No database index migration, custom compression layer, broad dependency removal or wholesale rendering rewrite was performed.

### Measured evidence versus inferred benefit

Earlier source review recorded three hero-slide H1s reduced to one and responsive sizing added at nine missing image sites. Request reuse, concurrent reads and deferred imports are verified implementation changes. They are not measured end-user speed gains.

**Before/after Lighthouse, LCP, INP, CLS, real-user TTFB, conversion and traffic measurements are unavailable. No numerical improvement is claimed.**

## 8. Admin correctness and operational protection

**Where:** `lib/auth/auth.config.ts`, `proxy.ts`, region API handlers and existing auth wrappers.

The installed Auth.js behavior meant returning `false` from `authorized` did not stop a supplied middleware from continuing. The callback now returns an explicit 307 login response for missing, invalid or expired sessions. It preserves the destination in `callbackUrl`, leaves login reachable for anonymous visitors and redirects authenticated visitors away from login. Tests use the installed Auth.js implementation with signed valid and expired JWTs.

Region-management API requests are session-guarded before database access. Existing role/permission behavior elsewhere is retained. No authentication provider, production secret or database schema was replaced. This is a targeted access-control correction, not a complete security certification.

## 9. SEO work that was not done

| SEO discipline | Remaining work | Suggested owner |
| --- | --- | --- |
| Local SEO | Verify/maintain real Google Business Profile locations, business details and genuine customer reviews | Business owner/local SEO manager |
| Off-page SEO | Relevant earned links, business citations and supplier/partner mentions | Marketing/SEO team |
| Keyword research | Collect country/language search-demand data and map terms to relevant categories/products | SEO specialist |
| Editorial/content SEO | Improve accurate product descriptions, comparisons and useful buying guidance where needed | Business/product team |
| Arabic SEO | Supply accurate catalog translations; reconsider separate language URLs only if independent indexing is required | Business translator/developer |
| Analytics | Verify Search Console and conversion analytics; collect a baseline and monitor changes | Owner/analytics specialist |
| Merchant visibility | Evaluate product-feed and Merchant Center requirements against actual selling arrangements | Ecommerce manager |
| AI/answer discovery | Useful structured facts are present, but no separate AI visibility audit, citation monitoring or answer-ranking result is claimed | Content/SEO team |

No backlinks, profiles, external accounts, paid campaigns or search-platform submissions were created by these code changes.

## 10. Where to make future changes

| Need | Edit or manage here |
| --- | --- |
| Production hostname | Hosting `NEXT_PUBLIC_SITE_URL`; origin logic in `lib/seo/urls.ts` |
| Global metadata behavior | `lib/seo/metadata.ts` |
| Regional titles/descriptions and alternatives | `lib/seo/regional-metadata.ts`, `lib/seo/regional-content.ts` |
| Country availability | `/admin/regions`; Region service/repository |
| Automatic product copy/slug rules | `lib/seo/product.ts`, `lib/services/product.service.ts` |
| Individual product SEO | Existing admin product editor and product data |
| Product page canonical behavior | `app/[locale]/[category]/[slug]/page.tsx`, `proxy.ts` |
| Structured data | `lib/seo/schema.ts` and its page callers |
| Sitemap/robots | `app/sitemap.ts`, `app/robots.ts` |
| Country-preserving internal links | `components/common/StoreLink.tsx`, `lib/seo/urls.ts` |
| Language preference | `context/LanguageContext.tsx`, `lib/seo/request-language.ts` |
| Admin redirect behavior | `lib/auth/auth.config.ts` |
| Regression checks | `scripts/seo-regression.mjs` |

The canonical product route's filesystem name is `[category]`; the public URL includes `c=` in that segment. For example, `/ae/c=bedding/example` is handled by `app/[locale]/[category]/[slug]/page.tsx`.

## 11. Tests and verification record

These are the latest recorded checks from the implementation session, not newly measured production results:

| Check | Recorded result |
| --- | --- |
| `npm run test:seo` | 24 regression groups passed |
| ESLint | Passed, no reported errors or warnings |
| `npx tsc --noEmit --pretty false` | Passed |
| `git diff --check` | Passed; line-ending notices were not content errors |
| Build before the product-loop correction | Passed with MongoDB connectivity warnings |
| Final build attempt after the correction | Blocked by Windows EPERM creating `.next/types/app/[locale]/search` |
| Live Marwa URL before corrected deployment | Confirmed self-redirect/too-many-redirects |
| Live Marwa URL after corrected deployment | Not verified |
| Full real database/admin/order/browser verification | Incomplete; Atlas access unavailable in this environment |
| Core Web Vitals / ranking uplift | Not measured |

Regression coverage includes origin normalization, locale routing, geo fallback, product metadata and publication rules, structured data, sitemap inclusion, search bounds/errors, Arabic/legal behavior, auth failures and the product redirect chain. Most tests use fixtures/mocks; the auth redirect test uses the installed Auth.js library. Passing these checks does not prove live database, CDN, DNS or customer workflows.

## 12. Deployment and outside-code checklist

### Critical — release and functionality

- [ ] Confirm the production deployment contains commit `9af5c32` or a newer commit with these fixes. Local commit presence does not prove a successful push or deployment.
- [ ] Complete a production build in the deployment environment.
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://www.blankethouse.ae` before building. Align explicitly configured auth URLs; retain existing secrets and service credentials.
- [ ] Attach both apex and WWW domains with valid HTTPS. Use the exact DNS records provided by the hosting dashboard. Confirm no opposing redirect rule.
- [ ] Open the reported Marwa URL and a second product directly; confirm they render without self-redirects. Test encoded and legacy product links too.
- [ ] Verify logged-out admin access redirects to login, login has no loop, and valid sessions retain access.
- [ ] Verify catalog, images, search, filters, product edits, uploads and controlled inquiry/order flows.

### High — discovery and regional correctness

- [ ] Confirm all intended GCC records exist and are active in `/admin/regions`.
- [ ] Test initial unscoped visits from GCC and non-GCC locations. Explicit country links must remain accessible.
- [ ] Confirm switching language keeps the country URL and gives correct direction/text.
- [ ] Check live sitemap completeness, robots output, self-canonicals and reciprocal English country alternatives.
- [ ] Confirm draft/disabled products and inactive regions are unavailable publicly.
- [ ] Verify the Search Console property for `blankethouse.ae`; submit `https://www.blankethouse.ae/sitemap.xml` and inspect representative home/category/product URLs.
- [ ] Validate representative live product structured data and inspect any errors against actual catalog facts.

### Medium — measurement and content

- [ ] Record dated mobile/desktop PageSpeed results for fixed home/category/product URLs; review field data when available.
- [ ] Record Search Console impressions, queries, clicks and country/page breakdowns before comparing later periods.
- [ ] Review materials, dimensions, pricing, stock, shipping/return statements and legacy review claims with the business.
- [ ] Supply genuine Arabic catalog translations and country keyword research if those are future priorities.

### Optional future engineering

- [ ] Introduce historical slug redirects if explicit URL edits become common.
- [ ] Consider server rendering remaining client-fetched catalog sections and consolidating repeated requests after measurement.
- [ ] Inventory real image hosts before narrowing broad image allowlists; optimize source assets only with visual approval.
- [ ] Consider sitemap splitting and targeted database indexing when actual catalog size/query evidence justifies it.

## 13. Maintenance routine

**On each product edit:** verify factual source text, custom metadata, availability and images; avoid unnecessary slug changes. Check one rendered page after significant template changes.

**On each release:** run the SEO regression suite, lint, TypeScript and production build; verify representative public, admin and legacy URLs on the deployed version.

**Monthly:** review Search Console indexing/canonical issues, query trends, broken links, sitemap health and performance data. Prioritize confirmed user or crawler problems over adding more tags.

## 14. References and related documents

Implementation descriptions above are based on the repository. The following official references explain the boundaries of SEO behavior:

- [Google: supported meta tags and meta-keywords limitation](https://developers.google.com/search/docs/crawling-indexing/special-tags)
- [Google: managing regional and multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Google: locale-adaptive crawling limitations](https://developers.google.com/search/docs/specialty/international/locale-adaptive-pages)
- [Google: canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: build and submit sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: structured-data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Vercel: request headers used for country detection](https://vercel.com/docs/headers/request-headers)

Related repository documents: `REGIONAL-TARGETING.md`, `IMPLEMENTATION-2026-11-24.md`, `OUTSIDE-CODE-CHECKLIST.md`. Use this guide's current decisions and status when older reports disagree.
