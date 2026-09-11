import { getAbsoluteUrl } from "./urls";
import type { IProduct } from "@/lib/db/models/Product";
import type { SerializedProduct } from "@/lib/repositories/product.repository";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Blanket House Trading L.L.C. (BHT Collections)",
    url: getAbsoluteUrl(""),
    logo: getAbsoluteUrl("/bht-logo.jpg"),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+971 4 2266 095",
      contactType: "customer service",
      areaServed: ["AE", "OM", "QA", "BH", "KW", "SA"],
      availableLanguage: ["en", "ar"],
    },
  };
}

export function generateProductSchema(product: SerializedProduct) {
  const url = getAbsoluteUrl(`/collections/${product.categorySlug}/${product.slug}`);
  const images = [getAbsoluteUrl(product.image), ...product.images.map(getAbsoluteUrl)];
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: images,
    url,
    sku: product._id.toString(),
    category: product.category,
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "AED",
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability: (product.stock ?? 0) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "B.H.T. Collections",
      },
    },
    ...(product.rating > 0 && product.reviewCount > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewCount,
      },
    }),
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

export function generateItemListSchema(items: SerializedProduct[], url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url,
    numberOfItems: items.length,
    itemListElement: items.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: getAbsoluteUrl(`/collections/${product.categorySlug}/${product.slug}`),
    })),
  };
}

export function generateFaqSchema(faqItems: { question: string; answer: string }[]) {
  if (!faqItems || faqItems.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
