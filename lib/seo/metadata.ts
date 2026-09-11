import type { Metadata } from "next";
import { getAbsoluteUrl } from "./urls";

interface MetadataInput {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title = "Blanket House Trading L.L.C. | Premium Home Textiles Dubai",
  description = "Wholesale & retail supplier of premium Korean blankets, bed linen, comforters, and hotel textiles in Dubai & across GCC.",
  image = "/bht-logo.jpg",
  path = "",
  noIndex = false,
}: MetadataInput = {}): Metadata {
  const url = getAbsoluteUrl(path);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: getAbsoluteUrl(image) }],
      type: "website",
      siteName: "B.H.T. Collections",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [getAbsoluteUrl(image)],
    },
    alternates: {
      canonical: url,
      languages: {
        "en-AE": getAbsoluteUrl(path),
        "en-SA": getAbsoluteUrl(`/sa${path}`),
        "x-default": getAbsoluteUrl(path),
      },
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
