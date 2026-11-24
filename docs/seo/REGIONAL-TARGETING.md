# Regional targeting and language selection

Updated: 24 November 2026. Main origin: https://www.blankethouse.ae.

This document supersedes earlier recommendations to use `/en-sa` and `/ar-sa`. The owner requested country-only paths, with language selection independent of country.

## URL and indexing model

| Market | Path prefix | Primary hreflang |
| --- | --- | --- |
| International / unspecified | `/en` | `en`, `x-default` |
| United Arab Emirates | `/ae` | `en-AE` |
| Saudi Arabia | `/sa` | `en-SA` |
| Qatar | `/qa` | `en-QA` |
| Kuwait | `/kw` | `en-KW` |
| Bahrain | `/bh` | `en-BH` |
| Oman | `/om` | `en-OM` |

- Examples: `/sa/bedding`, `/qa/footwear`, `/ae/c=bedding/product-slug`.
- A language change sets the `bht_language` cookie and refreshes the same URL. Country, page, filters and fragment stay unchanged. Server legal/search text and document direction also use that preference.
- English is the default response without a language cookie. Arabic is a visitor preference on the same country URL, **not a separate Arabic SEO URL**. Accordingly, the site does not advertise cookie-only Arabic `hreflang` alternatives.
- `/` and unscoped paths default to `/en`. There is no IP-based forced redirect. Visitors select their market explicitly; international visitors use `/en`.
- Old `/ar/...` links temporarily redirect to `/en/...` with the Arabic preference cookie, preserving the path and query. Existing country-only URLs do not change.
- Active database markets appear in the selector, sitemap and reciprocal country alternatives. Inactive/unknown country routes are unavailable. Admin/API indexing rules remain unchanged.
- Each public country page has its own canonical under the WWW domain. Search results remain noindex and outside the sitemap.

## Implemented changes

- Centralized country validation, mapping and alternate URLs in `lib/seo/locales.ts`.
- Centralized regional metadata in `lib/seo/regional-metadata.ts`; connected public page metadata and sitemap to active region records.
- Added regional landing/category copy for bedding, footwear and travel bags, plus local contact/address context using the existing company contact data. No shipping promises, local stock or certifications were invented.
- Added a market selector and retained country context in category navigation, search, product links and language changes. The regional-presence links connect to active country contact pages.
- Contact pages default to the selected country's existing contact entry. Changing country on a contact page clears the previous country query selection.
- Existing admin region title/description templates customize the English regional landing page. They do not overwrite every product's metadata.
- Added safe, repeatable database setup through `scripts/seed-regions.mjs` and `npm run db:regions`.

## Database setup: blocked here, ready to run

The authorized setup was attempted, but the application's MongoDB connection failed before any writes. The six rows are **not confirmed installed**. No existing region records were overwritten.

On a machine/deployment environment with access to the application's configured database:

```sh
# Preview missing countries without writes
npm run db:regions

# Add missing GCC countries
npm run db:regions -- --apply
```

The script uses the application's connection helper and Region model. It preserves existing names, copy, currencies and active/inactive status. Check `/admin/regions` afterward; enable any deliberately inactive country only when it is ready to publish. No catalog seeding or product/order changes are performed.

The region currency values describe the market; they do not convert prices. Existing storefront and schema prices remain AED. A real currency-conversion/pricing implementation would be a separate task.

## Keyword strategy and limits

No country search-volume dataset was supplied. The current wording is based on actual product categories and country relevance, **not measured demand**.

1. Obtain Keyword Planner or another reliable keyword export for each country and language.
2. Record the country, language, term, date range, volume source and intended page. Keep English and Arabic research separate.
3. Choose terms matching products actually sold and the page's intent. Do not repeat a country name across every sentence.
4. Update landing-page templates in the admin region editor. For page-specific titles, descriptions and visible regional text, add reviewed copy to `REGIONAL_SEO_OVERRIDES` in `lib/seo/regional-content.ts`, keyed by country, page and display language.
5. Review resulting pages with the local contact team. Do not claim local stock, local delivery times or free shipping without confirmation.
6. Measure impressions, queries and conversions by country in Search Console after deployment. This implementation does not promise rankings or traffic.

The `.ae` domain remains a strong UAE country signal. Country pages add regional relevance but do not remove the domain's association with the UAE. Same-language product catalogs can remain similar across countries; Google may consolidate some URLs despite the canonical preference.

## Verification and release checklist

- [x] ESLint passed without errors or warnings.
- [x] TypeScript passed.
- [x] 21 automated regression groups passed, including country URLs, active-market alternatives, Arabic preference without URL changes, search and existing SEO/auth checks.
- [ ] Complete a production build in the deployment environment. The latest local attempt failed with Windows EPERM creating `.next/server/app/api/admin`; lint, TypeScript and 21 regression groups passed separately.
- [ ] Run the region setup command with database connectivity and verify all six records in the admin panel.
- [ ] Confirm both language choices preserve `/sa` and other country URLs, including after reload.
- [ ] Verify country selection, category filters, search, contact details and product inquiry/order flows on mobile and desktop.
- [ ] Confirm inactive regions are excluded from live alternates/sitemap and return 404.
- [ ] Check live canonicals and English country `hreflang` tags, then submit the updated sitemap to Search Console.
- [ ] Commit, push and deploy the changes. This session has not published them.

## Guidance used

- https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- https://developers.google.com/search/docs/specialty/international/localized-versions

Country paths and language tags are separate concepts: `/sa` is a valid URL choice, but `sa` by itself is not the Saudi country-targeting `hreflang` value. The implemented value is `en-SA` for the default English response.
