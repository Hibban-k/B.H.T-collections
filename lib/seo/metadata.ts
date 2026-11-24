import type { Metadata } from "next";
import { getAbsoluteUrl } from "./urls";

export interface MetadataInput {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
  languages?: Record<string, string>;
}

export function constructMetadata({
  title = "Blanket House Trading L.L.C. | Premium Home Textiles Dubai",
  description = "Wholesale & retail supplier of premium Korean blankets, bed linen, comforters, and hotel textiles in Dubai & across GCC.",
  image = "/logo/logo.png",
  path = "",
  noIndex = false,
  languages,
}: MetadataInput = {}): Metadata {
  const url = getAbsoluteUrl(path);


  return {
    title: { absolute: title },
    description,
    metadataBase: new URL(getAbsoluteUrl("")),
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
      ...(languages ? { languages } : {}),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
