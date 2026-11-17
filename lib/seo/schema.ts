import { getAbsoluteUrl } from "./urls";
import type { SerializedProduct } from "@/lib/repositories/product.repository";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Blanket House Trading L.L.C.",
    url: getAbsoluteUrl(""),
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

export function generateItemListSchema(products: SerializedProduct[], categoryUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: categoryUrl,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: getAbsoluteUrl(`/c=${product.categorySlug}/${product.slug}`),
      name: product.name,
    })),
  };
}

export function generateProductSchema(product: SerializedProduct) {
  const cat = (product.categorySlug || product.category || "bedding").toLowerCase();
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images && product.images.length > 0
      ? product.images.map((img) => getAbsoluteUrl(img))
      : [getAbsoluteUrl(product.image)],
    description: product.description || product.shortDescription,
    sku: product.sku || product.slug,
    brand: {
      "@type": "Brand",
      name: typeof product.brand === "object" && product.brand?.name ? product.brand.name : "BHT Collections",
    },
    offers: {
      "@type": "Offer",
      url: getAbsoluteUrl(`/c=${cat}/${product.slug}`),
      priceCurrency: "AED",
      price: product.salePrice || product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: (product.stock ?? 0) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
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
            reviewCount: product.reviewCount || 1,
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
