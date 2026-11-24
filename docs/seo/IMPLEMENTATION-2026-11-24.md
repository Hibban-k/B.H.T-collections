# BHT Collections: technical SEO implementation report

Date: 24 November 2026
Confirmed production origin: https://www.blankethouse.ae

## Scope and evidence

Inspected the tracked route inventory, SEO helpers, shared storefront components, product create/update flow, repository projections, model defaults, auth guards, cache invalidation, image references and build configuration. The source inventory contains 158 tracked TypeScript/JavaScript files, 15 localized public page modules, 8 admin pages and 24 API routes. Source review and regression tests are not a substitute for crawling a populated production catalog.

No database migrations, production record edits, dependency additions, deployment or authentication-provider changes were performed. Existing page layouts, brand watermark backgrounds, CSS palette and product content remain in place. New helper logic is centralized; most storefront component edits only replace the Link import with a locale-aware wrapper.

## Prioritized findings and action status

| Priority | Finding | Implementation/status |
| --- | --- | --- |
| Critical | Three conflicting host sources and hard-coded product offer/share URLs | One origin resolver; confirmed .ae default and environment example; apex/HTTP WWW redirects use 308 and preserve queries. Production hosting configuration still requires verification. |
| Critical | Draft/disabled products accessible by slug | Published-only storefront reader; missing/unpublished products use notFound, including legacy product URLs. Admin lookup behavior remains available. |
| Critical | Product JSON-LD allowed script-closing content and invented ratings | Safe serialization escapes less-than characters; removed unverified aggregate ratings and unknown brand attribution. |
| Critical | Region-management API handlers had no authentication guard | Existing auth session checked before all GET/POST/PUT/DELETE region handlers; anonymous calls return 401. No changes to session provider or credentials. |
| High | Child pages inherited the locale homepage canonical; duplicated title suffixes | Explicit metadata per public page with self-canonical, OG URL/image, Twitter metadata and language alternates. Absolute titles prevent suffix duplication. |
| High | Legacy product route displayed an unrelated collection | Resolve the actual published product and permanently redirect to its canonical path; unknown products return notFound. |
| High | Sitemap listed root/collection redirects, omitted legal and dynamic category pages, fabricated last-modified times | Only canonical static pages, active categories/brands, published products and active configured regions; real timestamps only; deduplicated URLs. Runtime errors propagate instead of producing a successful partial sitemap. |
| High | Admin pages had no reliable indexing exclusion | X-Robots-Tag noindex/nofollow for admin and API paths. Admin remains crawlable so crawlers can observe noindex; authentication still controls access. API crawling remains disallowed in robots. |
| High | Product SEO fields empty unless manually supplied | Factual title, description, short summary and keyword generation on create/update. Render-time fallback supports existing records. Manual text is preserved; recognized generated text refreshes when source facts change. |
| High | Grid projection omitted stock, subcategories, sizes and colors used by filters/UI | Restored consumed fields; collection stock indicators now reflect stock rather than always claiming availability. This correctness fix can increase grid payload. |
| High | Brand/category edits left cached navigation stale | Invalidate corresponding data tags and affected pages/sitemap after writes; admin list reads bypass storefront cache. Product and region writes invalidate affected pages too. |
| Medium | Metadata and product page repeated the same database lookup | React request-scoped cache shares the published product lookup; cross-sell and related reads run concurrently. No stale public product cache introduced. |
| Medium | Internal links redirected to locale routes | Shared StoreLink resolves current locale directly and normalizes legacy collection links. Category navigation and alias redirects preserve selection/query data. |
| Medium | Nested html/body tags and Arabic initialization from localStorage | One root document; request-derived lang/dir; language initialized from route and switcher changes the route. Supported configured regions remain available. |
| Medium | Modal code included on first render | Quick-view and order modals dynamically imported and mounted when opened. |
| Medium | Small images requested full-viewport candidates; broken local asset references | Added sizes to nine storefront image sites. Missing blanket fallback now uses the existing logo; missing bedsheet reference uses the existing bedsheet asset. No actual product photography was altered. |
| Medium | Google Fonts CSS discovery depended on a CSS @import | Same font families/weights loaded from root head with preconnect; display=swap retained. Fonts remain externally hosted. |
| Medium | Hero carousel had three H1s | First slide H1, subsequent slides H2; dedicated selector preserves the original headline size. |
| Low | Search/name input treated as regular expressions | Escaped literal product search and exact-name matching without changing the API contract. |

## Product SEO behavior

- The product name remains the visible H1 and image alt text; gallery images retain an ordinal suffix. No visual characteristics are guessed from filenames.
- Long descriptions remain author-owned. Short descriptions and meta descriptions are derived from supplied title/description facts, with HTML removed and sensible length limits.
- Generated titles target 60 characters and meta descriptions 160; manual overrides are not silently truncated.
- Keywords contain the actual product name by default. They are not keyword-stuffed and are not promoted as a Google ranking factor.
- New slugs support Unicode letters/numbers. Renaming a product does not automatically change its existing slug. An explicit admin slug change still changes the URL; historical-slug redirects would need persisted history and were not introduced under the no-schema-change constraint.
- Schema uses the canonical localized URL, external image URLs without corrupting them, real product details, and the initially selected variant's price/stock when present. It does not invent ratings/reviews or unknown brand names.
- Existing records were not bulk rewritten. Their metadata fallback works on render, and saved fields refresh on the next appropriate admin edit.

## Route coverage

| Route family | Intended behavior |
| --- | --- |
| / | Existing language-preference redirect to /en or /ar; excluded from sitemap |
| /[locale] | Homepage canonical and organization schema; region metadata overrides retained |
| /[locale]/about, brands, contact, privacy, terms, refund-policy | Unique page canonical and social metadata |
| /[locale]/[category] | Active/default category; canonical clean category path; c= alias redirects preserving filters |
| /[locale]/c=[category]/[slug] | Published product, canonical metadata, product + breadcrumb schema |
| /[locale]/products/[slug] and /[locale]/collections/[category]/[slug] | 308 to actual published product, or notFound |
| /[locale]/collections and /[locale]/collections/[category] | Permanent redirects; category query parameters retained |
| /[locale]/brand/[slug] | Active brand catalog and canonical metadata |
| /[locale]/brands/[slug] | Permanent redirect to singular brand route |
| /admin and descendants | Existing authentication; noindex response headers |
| /api/admin/* | Existing permission guards except region endpoints, now session-guarded; noindex headers |
| /api/store/* and /api/auth/* | Existing API/auth contracts retained; noindex headers; not in sitemap |
| /robots.txt | Public crawling allowed; API crawl restriction and canonical sitemap URL |
| /sitemap.xml | Dynamic catalog-backed sitemap; a database outage is an error, not a partial index |

## Performance evidence and limitations

| Measure | Before | After | Evidence |
| --- | --- | --- | --- |
| Repeated product lookup in metadata + page | 2 calls | 1 per request/render | React cache boundary; source verification |
| Related/cross-sell fetch sequence | Sequential | Concurrent | Promise.all; source verification |
| Missing sizes on storefront fill-image sites | 9 | 0 | Static source scan |
| Hero H1 elements | 3 slides using H1 | 1 H1 | Source verification |
| Modal startup imports | Eager | Deferred until open | Dynamic imports plus conditional mounting |
| Font CSS discovery | CSS import after stylesheet | Root-head stylesheet + preconnect | Source verification; same fonts |
| LCP / INP / CLS / Lighthouse | Not measured | Not measured | Browser/local HTTP blocked; no fabricated speed scores |

Request-derived html language uses headers() at the root, so pages render on demand rather than relying on the Full Route Cache. Existing category/brand data caches remain. This is a deliberate correctness tradeoff; measure production TTFB before claiming a net speed improvement. Sitemap uses request-time data and a narrow product projection; very large catalogs may eventually require paginated sitemaps.

## Tests and build

| Check | Result |
| --- | --- |
| npm run build (prior implementation, before final domain correction) | PASS, exit 0; compilation 12.1s, TypeScript phase 8.1s. Database connectivity warnings occurred; this is not a live catalog test. |
| npx tsc --noEmit | PASS, exit 0 after final code edits |
| npm run test:seo | PASS, 14/14 regression groups, including 12 informational-page locale/canonical cases |
| npm run lint | FAIL on existing project debt: baseline 134 errors / 28 warnings; final 127 errors / 28 warnings |
| Generated production robots.txt | Previous build verified; rebuild to regenerate robots.txt for the corrected domain https://www.blankethouse.ae |
| git diff --check | PASS |
| Populated browser/HTTP and admin/order end-to-end checks | BLOCKED by local network access and Atlas connectivity |

Regression tests use in-memory fixtures and mocks, never production writes. They cover origin/redirect behavior, multilingual metadata, generated SEO updates and manual overrides, publication filtering, JSON-LD safety, sitemap inclusion, and anonymous region API protection. No comparable pre-change production build timing or before/after CWV measurements were available.

Browser/HTTP limitation: local CLI connections failed with EACCES; the browser preview timed out. MongoDB Atlas could not be reached from this execution environment. Consequently, populated catalog, authenticated admin CRUD, order/WhatsApp flows, image CDN responses, live status codes and visual regression could not be exercised end to end.

## Remaining issues / deployment steps

1. Set NEXT_PUBLIC_SITE_URL=https://www.blankethouse.ae in the production build environment. The local .env.local still uses localhost intentionally. Assign both blankethouse.ae and www.blankethouse.ae to the hosting project with valid TLS. This task did not change DNS or deploy. Verify host redirects and submit the WWW sitemap in Search Console after deployment.
2. Restore authorized database connectivity for staging/live verification. A passing build does not prove catalog availability; database-backed fallbacks logged connection errors here.
3. Existing Arabic source strings contain corrupted/question-mark text, and some product/legal text is English in both locales. Supply accurate translations before claiming complete Arabic SEO coverage.
4. Existing navigation search targets /search, but no dedicated search page exists. This remains a functional gap; adding a search results experience was not mixed into this SEO patch.
5. Homepage featured products and the brands grid still fetch some catalog data on the client. Server-rendering these sections and consolidating header catalog fetches are follow-up performance opportunities.
6. Existing lint debt remains across admin, UI and service code. Unused dependencies/assets were not deleted without sufficient evidence. Broad remote image host patterns remain because active external image origins could not be inventoried from the database.
7. Legacy rating/material/stock defaults and some visible marketing claims still need a business-content review. Unverified review schema was removed, but no historical product data was altered.
8. Full-route cache tradeoff, external fonts, large original hero assets and client bundle behavior require production measurements. No ranking, traffic, indexing or CWV improvement is guaranteed by code changes alone.

Indexing reference: https://developers.google.com/search/docs/crawling-indexing/block-indexing (robots blocking can prevent crawlers seeing noindex).

## Files changed

- .env.example
- app/[locale]/[category]/[slug]/page.tsx
- app/[locale]/[category]/page.tsx
- app/[locale]/about/page.tsx
- app/[locale]/brand/[slug]/page.tsx
- app/[locale]/brands/[slug]/page.tsx
- app/[locale]/brands/page.tsx
- app/[locale]/collections/[category]/[slug]/page.tsx
- app/[locale]/collections/[category]/page.tsx
- app/[locale]/collections/page.tsx
- app/[locale]/contact/page.tsx
- app/[locale]/layout.tsx
- app/[locale]/page.tsx
- app/[locale]/privacy/page.tsx
- app/[locale]/products/[slug]/page.tsx
- app/[locale]/refund-policy/page.tsx
- app/[locale]/terms/page.tsx
- app/admin/categories/page.tsx
- app/admin/layout.tsx
- app/admin/products/page.tsx
- app/api/admin/brands/[id]/route.ts
- app/api/admin/brands/route.ts
- app/api/admin/categories/[id]/route.ts
- app/api/admin/categories/route.ts
- app/api/admin/products/[id]/route.ts
- app/api/admin/products/route.ts
- app/api/admin/regions/[id]/route.ts
- app/api/admin/regions/route.ts
- app/globals.css
- app/layout.tsx
- app/robots.ts
- app/sitemap.ts
- components/about/AboutPastFatherSection.tsx
- components/about/AboutPresentDarkSection.tsx
- components/brand/BrandShowcaseView.tsx
- components/brands/BrandClientCard.tsx
- components/brands/BrandClientGrid.tsx
- components/category-showcase/ShopByCategory.tsx
- components/collection/CategoryTabsNav.tsx
- components/collection/CollectionPageView.tsx
- components/collection/ProductCard.tsx
- components/collection/QuickViewModal.tsx
- components/collection/RelatedCollections.tsx
- components/featured-products/FeaturedProducts.tsx
- components/footer/Footer.tsx
- components/header/CollectionDropdown.tsx
- components/header/MobileNav.tsx
- components/header/PrimaryNav.tsx
- components/header/SecondaryNav.tsx
- components/hero/HeroCarousel.tsx
- components/order/OrderModal.tsx
- components/product/ProductDetailView.tsx
- components/regional-presence/RegionalPresence.tsx
- components/ticker/AnnouncementTicker.tsx
- context/LanguageContext.tsx
- lib/repositories/product.repository.ts
- lib/seo/metadata.ts
- lib/seo/schema.ts
- lib/seo/urls.ts
- lib/services/category.service.ts
- lib/services/product.service.ts
- lib/utils/image.ts
- next.config.ts
- package.json
- proxy.ts
- components/common/StoreLink.tsx
- docs/seo/IMPLEMENTATION-2026-11-24.md
- lib/seo/product.ts
- scripts/seo-regression.mjs

## Final domain correction

The user confirmed https://www.blankethouse.ae as the main domain. Updated the shared origin fallback, production environment example and regression assertions. The previous production build predates this correction; deploy a fresh build with NEXT_PUBLIC_SITE_URL=https://www.blankethouse.ae. Local development environment remains unchanged.
