import { Metadata } from "next";
import { getAbsoluteUrl } from "./urls";

interface ConstructMetadataParams {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title = "BHTCOLLECTIONS | Premium Bedding & Blankets in UAE",
  description = "Shop premium blankets, bed linen, comforters and bedspreads from BHTCOLLECTIONS. Elevate your comfort with quality home textiles delivered across the UAE.",
  image = "/bht-logo.jpg",
  path = "",
  noIndex = false,
}: ConstructMetadataParams = {}): Metadata {
  const url = getAbsoluteUrl(path);
  const absoluteImage = getAbsoluteUrl(image);

  return {
    title,
    description,
    metadataBase: new URL(getAbsoluteUrl("")),
    alternates: {
      canonical: url,
      languages: {
        'en-AE': url,
        'en-SA': getAbsoluteUrl(`/sa${path}`),
        'x-default': url,
      }
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "B.H.T. Collections",
      images: [{ url: absoluteImage }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
