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
- `/` and unscoped paths (including product links) temporarily redirect using Vercel IP country detection to an active GCC market. Non-GCC, unknown, inactive and unavailable markets fall back to `/en`. Explicit `/en` and country-prefixed links remain accessible without geolocation redirects. Responses use private/no-store caching. Other hosting providers fall back to `/en` until a trusted geolocation integration is configured.
- Old `/ar/...` links temporarily redirect to `/en/...` with the Arabic preference cookie, preserving the path and query. Existing country-only URLs do not change.
- Active database markets appear in the sitemap and reciprocal country alternatives. Inactive/unknown country routes are unavailable. Admin/API indexing rules remain unchanged.
- Each public country page has its own canonical under the WWW domain. Search results remain noindex and outside the sitemap.

## Implemented changes

- Centralized country validation, mapping and alternate URLs in `lib/seo/locales.ts`.
- Centralized regional metadata in `lib/seo/regional-metadata.ts`; connected public page metadata and sitemap to active region records.
- Regional landing/category titles and descriptions remain in metadata only. Removed the added market/contact strip from the navigation; the existing storefront design is retained. No shipping promises, local stock or certifications were invented.
- Removed the added market selector and retained country context in category navigation, search, product links and language changes. The regional-presence links connect to active country contact pages.
- Contact pages default to the selected country's existing contact entry.
- Existing admin region title/description templates customize the English regional landing page. Single-product metadata preserves authored product facts and adds country context to the title, description, Open Graph/Twitter metadata and keyword list. Product content, headings, prices and schema facts remain unchanged. Meta keywords are not a Google ranking signal.
- Manage the six country records through the existing `/admin/regions` screen. Seed scripts were removed in the subsequent repository update.

## Database verification

Database connectivity is unavailable in this environment, so the six active records are not confirmed. In `/admin/regions`, verify ae, sa, qa, kw, bh and om exist and activate only countries ready to publish. The removed seed script and `db:regions` command should no longer be used. No database writes were made during these corrections.

The region currency values describe the market; they do not convert prices. Existing storefront and schema prices remain AED. A real currency-conversion/pricing implementation would be a separate task.

## Keyword strategy and limits

No country search-volume dataset was supplied. The current wording is based on actual product categories and country relevance, **not measured demand**.

1. Obtain Keyword Planner or another reliable keyword export for each country and language.
2. Record the country, language, term, date range, volume source and intended page. Keep English and Arabic research separate.
3. Choose terms matching products actually sold and the page's intent. Do not repeat a country name across every sentence.
4. Update landing-page templates in the admin region editor. For page-specific titles, descriptions and descriptions, add reviewed copy to `REGIONAL_SEO_OVERRIDES` in `lib/seo/regional-content.ts`, keyed by country, page and display language.
5. Review resulting pages with the local contact team. Do not claim local stock, local delivery times or free shipping without confirmation.
6. Measure impressions, queries and conversions by country in Search Console after deployment. This implementation does not promise rankings or traffic.

The `.ae` domain remains a strong UAE country signal. Country pages add regional relevance but do not remove the domain's association with the UAE. Same-language product catalogs can remain similar across countries; Google may consolidate some URLs despite the canonical preference.

## Verification and release checklist

- [x] ESLint passed without errors or warnings.
- [x] TypeScript passed.
- [x] 24 automated regression groups passed, including country URLs, active-market alternatives, Arabic preference without URL changes, search and existing SEO/auth checks.
- [ ] Complete the final production build on deployment. A build before the product-loop correction passed (with database connectivity warnings); the final attempt was blocked by Windows EPERM creating `.next/types/app/[locale]/search`. ESLint, TypeScript and all 24 regression groups passed separately.
- [ ] Verify all six country records and their active status in the admin panel.
- [ ] Confirm both language choices preserve `/sa` and other country URLs, including after reload.
- [ ] Verify unscoped IP redirects from GCC and non-GCC connections, explicit country links, category filters, search, contact details and product inquiry/order flows on mobile and desktop.
- [ ] Confirm inactive regions are excluded from live alternates/sitemap and return 404.
- [ ] Check live canonicals and English country `hreflang` tags, then submit the updated sitemap to Search Console.
- [ ] Commit, push and deploy the changes. This session has not published them.

## Guidance used

- https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- https://developers.google.com/search/docs/specialty/international/localized-versions

Country paths and language tags are separate concepts: `/sa` is a valid URL choice, but `sa` by itself is not the Saudi country-targeting `hreflang` value. The implemented value is `en-SA` for the default English response.

## Admin authorization correction

Auth.js invokes supplied middleware even when the authorized callback returns false. The callback now returns an explicit 307 login redirect for missing/invalid/expired sessions. Regression coverage uses the installed Auth.js implementation with signed valid and expired tokens; login remains accessible without a redirect loop, and valid sessions can access admin pages.

Geolocation reference: https://vercel.com/docs/headers/request-headers#x-vercel-ip-country

## Product self-redirect correction

The reported live Marwa product URL returned HTTP 308 with Location equal to its own path. The product page now compares the canonical target with the actual request pathname supplied and overwritten by proxy.ts, rather than relying only on reconstructed dynamic parameters. Tests cover canonical requests, encoded category URLs, wrong categories, spoofed headers, and arrival at a stable canonical page. Shared product links also retain the current country instead of using the display language. These changes require deployment before the live loop can be retested.
