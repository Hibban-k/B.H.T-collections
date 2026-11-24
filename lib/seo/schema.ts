import { getProductPath, getAbsoluteUrl } from "./urls";
import { plainText } from "./product";
import type { SerializedProduct } from "@/lib/repositories/product.repository";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Blanket House Trading L.L.C.",
    url: getAbsoluteUrl(""),
    logo: getAbsoluteUrl("/logo/logo.png"),
    description: "Bedding, footwear and travel bags from Blanket House Trading LLC in Dubai, UAE.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path),
    })),
  };
}

export function generateItemListSchema(products: SerializedProduct[], categoryUrl: string, locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: categoryUrl,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: getAbsoluteUrl(getProductPath(product, locale)),
      name: product.name,
    })),
  };
}

export function generateProductSchema(product: SerializedProduct, locale = "en") {
  const variant = product.variants?.[0];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images && product.images.length > 0
      ? product.images.map((img) => getAbsoluteUrl(img))
      : [getAbsoluteUrl(product.image)],
    description: plainText(product.description || product.shortDescription),
    url: getAbsoluteUrl(getProductPath(product, locale)),
    sku: product.sku || product.slug,
    ...(typeof product.brand === "object" && product.brand?.name ? {
      brand: { "@type": "Brand", name: product.brand.name },
    } : {}),
    offers: {
      "@type": "Offer",
      url: getAbsoluteUrl(getProductPath(product, locale)),
      priceCurrency: "AED",
      price: variant?.salePrice ?? variant?.price ?? product.salePrice ?? product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: (variant?.stock ?? product.stock ?? 0) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Blanket House Trading L.L.C.",
      },
    },
    // Legacy rating fields contain seeded defaults, so omit unverified review markup.
  };
}

export function generateFaqSchema(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** Prevent product content from closing the JSON-LD script element. */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
