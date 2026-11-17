import { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/lib/seo/urls";
import { COLLECTION_CATEGORIES_META } from "@/data/productsData";
import { ProductService } from "@/lib/services/product.service";
import { BrandService } from "@/lib/services/brand.service";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapData: MetadataRoute.Sitemap = [
    {
      url: getAbsoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  const locales = ["en", "ar"];

  // Fetch dynamic products and brands
  let products: any[] = [];
  let brands: any[] = [];

  try {
    const [fetchedProducts, fetchedBrands] = await Promise.all([
      ProductService.getProducts({ status: "published" }),
      BrandService.getBrands(),
    ]);
    products = fetchedProducts || [];
    brands = fetchedBrands || [];
  } catch (err) {
    console.error("[Sitemap] Error fetching dynamic catalog entries:", err);
  }

  locales.forEach((locale) => {
    // 1. Core localized static pages
    sitemapData.push(
      {
        url: getAbsoluteUrl(`/${locale}`),
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: getAbsoluteUrl(`/${locale}/about`),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: getAbsoluteUrl(`/${locale}/brands`),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.85,
      },
      {
        url: getAbsoluteUrl(`/${locale}/collections`),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.85,
      },
      {
        url: getAbsoluteUrl(`/${locale}/contact`),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      }
    );

    // 2. Collection categories
    Object.values(COLLECTION_CATEGORIES_META).forEach((cat) => {
      sitemapData.push({
        url: getAbsoluteUrl(`/${locale}/${cat.id}`),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.85,
      });
      sitemapData.push({
        url: getAbsoluteUrl(`/${locale}/collections/${cat.id}`),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });

    // 3. Dynamic Brands
    brands.forEach((brand) => {
      if (brand.slug) {
        sitemapData.push({
          url: getAbsoluteUrl(`/${locale}/brand/${brand.slug}`),
          lastModified: brand.updatedAt ? new Date(brand.updatedAt) : new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    });

    // 4. Dynamic Products
    products.forEach((product) => {
      if (product.slug) {
        const cat = (product.categorySlug || product.category || "bedding").toLowerCase();
        sitemapData.push({
          url: getAbsoluteUrl(`/${locale}/c=${cat}/${product.slug}`),
          lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
          changeFrequency: "daily",
          priority: 0.9,
        });
      }
    });
  });

  return sitemapData;
}
