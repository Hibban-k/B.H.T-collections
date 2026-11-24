import { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/lib/seo/urls";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/api/"],
    },
    // Admin stays crawlable so crawlers can observe its noindex response header.
    sitemap: getAbsoluteUrl("/sitemap.xml"),
  };
}
