import { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/lib/seo/urls";
import { ProductService } from "@/lib/services/product.service";
import { CategoryService } from "@/lib/services/category.service";
import { RegionService } from "@/lib/services/region.service";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapData: MetadataRoute.Sitemap = [
    {
      url: getAbsoluteUrl("/en"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    }
  ];

  const regions = await RegionService.getRegions();
  const activeCategories = (await CategoryService.getCategories()).filter(c => c.status === "active");
  const products = await ProductService.getProducts({ status: "published" });

  // Main UAE Categories (Default En)
  activeCategories.forEach((category) => {
    sitemapData.push({
      url: getAbsoluteUrl(`/en/collections/${category.slug}`),
      lastModified: category.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  // Dynamic Region Categories
  regions.forEach((region) => {
    activeCategories.forEach((category) => {
      sitemapData.push({
        url: getAbsoluteUrl(`/${region.code}/collections/${category.slug}`),
        lastModified: category.updatedAt || new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });
  });

  // Fetch products (Default En)
  products.forEach((product) => {
    sitemapData.push({
      url: getAbsoluteUrl(`/en/collections/${product.categorySlug}/${product.slug}`),
      lastModified: product.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  });

  return sitemapData;
}
