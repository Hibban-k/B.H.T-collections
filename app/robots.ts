import { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/lib/seo/urls";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/en/", "/ae/"],
      disallow: ["/api/"],
    },
    sitemap: getAbsoluteUrl("/sitemap.xml"),
  };
}
