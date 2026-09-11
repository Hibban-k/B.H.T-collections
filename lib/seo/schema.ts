import { getAbsoluteUrl } from "./urls";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Blanket House Trading L.L.C.",
    url: getAbsoluteUrl(),
    logo: getAbsoluteUrl("/bht-logo.jpg"),
    description: "Leading wholesale and retail supplier of luxury home textiles, Korean blankets, and hotel collections in Dubai, UAE.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    sameAs: [
      "https://facebook.com/bhtcollections",
      "https://instagram.com/bhtcollections",
    ],
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

export function generateItemListSchema(products: any[], categoryUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: categoryUrl,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: getAbsoluteUrl(`/collections/${product.categorySlug}/${product.slug}`),
      name: product.name,
    })),
  };
}

export function generateProductSchema(product: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [getAbsoluteUrl(product.image)],
    description: product.description || product.shortDescription,
    sku: product.slug,
    offers: {
      "@type": "Offer",
      url: getAbsoluteUrl(`/collections/${product.categorySlug}/${product.slug}`),
      priceCurrency: "AED",
      price: product.price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Blanket House Trading L.L.C.",
      },
    },
    ...(product.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount || 12,
          },
        }
      : {}),
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
