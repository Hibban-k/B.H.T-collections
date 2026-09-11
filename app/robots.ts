import { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/lib/seo/urls";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: getAbsoluteUrl("/sitemap.xml"),
  };
}
