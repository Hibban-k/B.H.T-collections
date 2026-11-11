import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import { ProductService } from "@/lib/services/product.service";
import { BrandService } from "@/lib/services/brand.service";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{
    locale: string;
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { category: rawCategory, slug } = await params;
  const category = rawCategory.replace(/^c=/, "").toLowerCase();
  const product = await ProductService.getProductBySlug(slug).catch(() => null);

  if (!product) {
    return {
      title: "Product Not Found | BHT Collections",
      description: "The requested product is not available.",
    };
  }

  const title = product.metaTitle || `${product.name} | BHT Collections — Luxury Wholesale Dubai`;
  const description =
    product.metaDescription ||
    product.shortDescription ||
    product.description?.slice(0, 160) ||
    `Shop ${product.name} in our ${category} collection from BHT Collections. Premium export quality across UAE and GCC.`;

  return {
    title,
    description,
    keywords:
      product.keywords && product.keywords.length > 0
        ? product.keywords
        : [product.name, product.category, category, "UAE wholesale", "BHT Collections"],
    openGraph: {
      title,
      description,
      images: product.image ? [{ url: product.image }] : [],
    },
  };
}

export default async function SingleProductDetailPage({ params }: ProductPageProps) {
  const { category: rawCategory, slug } = await params;
  const category = rawCategory.replace(/^c=/, "").toLowerCase();
  const product = await ProductService.getProductBySlug(slug).catch(() => null);

  if (!product) {
    notFound();
  }

  // Fetch cross-sell complementary products
  let crossSellProducts: any[] = [];
  if (product.crossSellSlugs && product.crossSellSlugs.length > 0) {
    try {
      crossSellProducts = await ProductService.getProductsBySlugs(product.crossSellSlugs);
    } catch {
      crossSellProducts = [];
    }
  }

  // Fetch related products from the same category
  let relatedProducts: any[] = [];
  try {
    const catQuery = product.categorySlug || category;
    relatedProducts = await ProductService.getRelatedProducts(catQuery, product.slug, 4);
  } catch {
    relatedProducts = [];
  }

  // Resolve brand if needed
  let brandData: any = product.brand;
  if (product.brand && typeof product.brand === "string") {
    try {
      brandData = await BrandService.getBrandById(product.brand);
    } catch {
      brandData = null;
    }
  }

  // Schema.org JSON-LD structured data for Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image || (product.images && product.images[0]),
    description: product.description || product.shortDescription,
    sku: product.sku || product.slug,
    brand: {
      "@type": "Brand",
      name: brandData?.name || "BHT Collections",
    },
    offers: {
      "@type": "Offer",
      url: `https://www.blankethouse.ae/c=${category}/${product.slug}`,
      priceCurrency: "AED",
      price: product.salePrice || product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating || 5.0,
      reviewCount: product.reviewCount || 12,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailView
        product={JSON.parse(JSON.stringify(product))}
        crossSellProducts={JSON.parse(JSON.stringify(crossSellProducts))}
        relatedProducts={JSON.parse(JSON.stringify(relatedProducts))}
        brand={JSON.parse(JSON.stringify(brandData || null))}
      />
    </>
  );
}
