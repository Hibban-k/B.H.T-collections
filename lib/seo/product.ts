interface ProductSeoInput {
  name: string;
  description?: string;
  shortDescription?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export function plainText(value = ""): string {
  return value.replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&").replace(/&quot;/gi, '"').replace(/&#39;/g, "'")
    .replace(/\s+/g, " ").trim();
}

function excerpt(value: string, limit: number): string {
  if (value.length <= limit) return value;
  const slice = value.slice(0, limit - 1);
  const boundary = slice.lastIndexOf(" ");
  return `${slice.slice(0, boundary > limit / 2 ? boundary : slice.length)}…`;
}

/** Extract existing facts only; long descriptions and names remain author-owned. */
export function generateProductSeo(product: ProductSeoInput) {
  const name = plainText(product.name);
  const description = plainText(product.description || product.shortDescription || name);
  const summary = description.toLowerCase().includes(name.toLowerCase()) ? description : `${name}. ${description}`;
  return {
    metaTitle: plainText(product.metaTitle) || `${excerpt(name, 42)} | BHT Collections`,
    metaDescription: plainText(product.metaDescription) || excerpt(summary, 160),
    shortDescription: plainText(product.shortDescription) || excerpt(description, 120),
    keywords: product.keywords?.length ? product.keywords : [name],
  };
}

export function productSlug(value: string): string {
  return value.normalize("NFKC").toLowerCase().trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
}
