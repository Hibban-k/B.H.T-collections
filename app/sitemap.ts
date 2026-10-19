import { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/lib/seo/urls";
import { COLLECTION_CATEGORIES_META } from "@/data/productsData";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapData: MetadataRoute.Sitemap = [
    {
      url: getAbsoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: getAbsoluteUrl("/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/brands"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl("/collections"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl("/contact"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  Object.values(COLLECTION_CATEGORIES_META).forEach((cat) => {
    sitemapData.push({
      url: getAbsoluteUrl(`/collections/${cat.id}`),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  return sitemapData;
}
