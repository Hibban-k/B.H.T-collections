import { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/lib/seo/urls";
import { COLLECTION_CATEGORIES_META } from "@/data/productsData";
import { RegionService } from "@/lib/services/region.service";

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

  let regions: any[] = [];
  try {
    regions = await RegionService.getRegions();
  } catch {
    regions = [];
  }

  const regionCodes = regions.length > 0 ? regions.map((r) => r.code) : ["en", "ae"];

  regionCodes.forEach((locale) => {
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
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: getAbsoluteUrl(`/${locale}/collections`),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: getAbsoluteUrl(`/${locale}/contact`),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      }
    );

    Object.values(COLLECTION_CATEGORIES_META).forEach((cat) => {
      sitemapData.push({
        url: getAbsoluteUrl(`/${locale}/collections/${cat.id}`),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    });
  });

  return sitemapData;
}
