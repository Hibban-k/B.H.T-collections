# Technical SEO Action Plan: B.H.T. Collections

This document outlines the prioritized execution steps to resolve the technical SEO gaps identified in the full audit.

## Phase 1: High Priority (Immediate Execution) ✅ COMPLETED

### 1. Security Headers Configuration ✅
**Status:** Completed. Injected `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, and `Referrer-Policy` into `next.config.ts`.

### 2. Sitemap Completeness ✅
**Status:** Completed. Updated `app/sitemap.ts` to dynamically crawl the new `Region` database and inject the proper `/[region]/collections/...` paths, as well as the programmatic `/collections/hotel-collection` path.

---

## Phase 2: Medium Priority (Within 1 Month)

### 3. AI Crawler Directives (robots.txt)
**Issue:** AI bots are actively scraping e-commerce sites. Your intent must be explicitly defined in `robots.ts`.
**Action:**
- Edit `app/robots.ts`.
- Add explicit blocks for large-scale data scrapers (e.g., `Bytespider`, `CCBot`) to save server bandwidth.
- Allow or disallow OpenAI (`GPTBot`) depending on brand visibility strategy.
- Retain `allow: "/"` for standard Search Engine bots (`Googlebot`, `Bingbot`).

### 4. Category Page Pagination Architecture
**Issue:** Category pages currently render all products in a single DOM structure without limits.
**Action:**
- Update `app/collections/[category]/page.tsx` to read a `?page=N` search parameter.
- Update `ProductService.getProducts()` to support MongoDB `skip` and `limit`.
- Implement `rel="next"` and `rel="prev"` canonical links in the metadata to ensure search engines crawl paginated links correctly.

---

## Phase 3: Low Priority & Enhancements (Backlog)

### 5. Voice Search Optimization (AEO)
**Issue:** FAQ schema exists but isn't explicitly flagged for voice search engines (Google Assistant, Siri, Alexa).
**Action:**
- Edit `lib/seo/schema.ts`.
- Update `generateFaqSchema` to inject the `speakable` property, targeting the CSS selectors of the FAQ answers.

### 6. IndexNow Implementation
**Issue:** Reliance solely on XML sitemaps delays indexing on alternative search engines (Bing, Yahoo, Naver).
**Action:**
- Generate an IndexNow API key.
- Create an API route (`app/api/seo/indexnow/route.ts`) that triggers a ping to `api.indexnow.org` whenever a product's status changes in MongoDB.

