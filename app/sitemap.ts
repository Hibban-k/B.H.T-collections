import type { MetadataRoute } from "next";
import { getAbsoluteUrl, getProductPath } from "@/lib/seo/urls";
import { ProductService } from "@/lib/services/product.service";
import { BrandService } from "@/lib/services/brand.service";
import { CategoryService } from "@/lib/services/category.service";
import { RegionService } from "@/lib/services/region.service";
// Read current publication state at request time; builds must not depend on Atlas.
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Surface backend failures instead of caching an incomplete successful sitemap.
  const [products, brands, categories, regions] = await Promise.all([
    ProductService.getProducts({ status: "published", select: "slug categorySlug category updatedAt" }),
    BrandService.getBrands(), CategoryService.getCategories(), RegionService.getRegions(),
  ]);
  const locales = [...new Set(["en", "ar", ...regions.map(r => r.code)])];
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    const add = (path: string, updatedAt?: string | Date) => entries.push({
      url: getAbsoluteUrl(path), ...(updatedAt ? { lastModified: new Date(updatedAt) } : {}),
    });
    for (const path of ["", "/about", "/brands", "/contact", "/privacy", "/terms", "/refund-policy"]) add("/" + locale + path);
    const slugs = new Set(["bedding", "travel-bags", "footwear", ...categories.filter(c => c.status === "active").map(c => c.slug)]);
    for (const slug of slugs) {
      const category = categories.find(c => c.slug === slug);
      if (category?.status !== "disabled") add("/" + locale + "/" + encodeURIComponent(slug), category?.updatedAt);
    }
    for (const brand of brands) if (brand.isActive && brand.slug) add("/" + locale + "/brand/" + encodeURIComponent(brand.slug), brand.updatedAt);
    for (const product of products) if (product.slug) add(getProductPath(product, locale), product.updatedAt);
  }
  return [...new Map(entries.map(entry => [entry.url, entry])).values()];
}
