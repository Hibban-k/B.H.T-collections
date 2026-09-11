# SEO Control Document

## Business Information
* **Company**: Blanket House Trading L.L.C. (B.H.T. Collections)
* **Domain**: Premium bedding, linens, comforters, travel luggage, and labour camp supplies
* **Headquarters**: Dubai, UAE
* **Regional Presence**: UAE, Oman, Qatar, Bahrain, Kuwait, Saudi Arabia
* **Base URL Source**: `NEXT_PUBLIC_SITE_URL`

## URL Structure
* **Homepage**: `/`
* **Categories Listing**: `/collections`
* **Category Page**: `/collections/[categorySlug]`
* **Product Page**: `/collections/[categorySlug]/[productSlug]`
* **Contact Page**: `/contact`

## Indexability Rules
* All public products (`status: "published"`) are indexable.
* Draft or disabled products (`status: "draft" | "disabled"`) are `noindex`.
* All public categories (`status: "active"`) are indexable.
* Admin paths (`/admin/*`) and API routes (`/api/*`) are `noindex`.

## Metadata & Canonical Rules
* **MetadataBase**: Derived from `NEXT_PUBLIC_SITE_URL`.
* **Canonical**: Every indexable page MUST have a canonical URL referencing its absolute path.
* **Title Format**: Page Name | B.H.T. Collections
* **Open Graph / Twitter**: Use absolute URLs. Default Open Graph image from `NEXT_PUBLIC_SITE_URL/bht-logo.jpg`.

## Schema Rules
* **Organization**: Placed on Homepage. Includes contact point for Dubai HQ and logo.
* **Product**: Includes Offer schema. Price from database. Availability based on stock (`InStock` if > 0 else `OutOfStock`). Uses absolute URL.
* **BreadcrumbList**: Homepage -> Collections -> [Category] -> [Product]. Used on Category and Product pages.
* **CollectionPage / ItemList**: For `/collections/[categorySlug]`.

## International SEO
* Currently using unified English presence covering GCC. 
* Future: Support hreflang implementation for localized GCC domains/paths.

## AEO / GEO Rules
* Clearly expose product specifications, materials, and sizes in the DOM.
* Explicit tables or semantic lists for product specs.

## Sitemap & Robots
* `app/sitemap.ts` generated dynamically from published products/categories.
* `app/robots.ts` excludes `/admin` and `/api`.

## Caching
* Use Next.js native ISR (`revalidate = 3600`) for public pages. Product updates from CMS will eventually trigger revalidation.
