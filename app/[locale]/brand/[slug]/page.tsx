import { constructRegionalMetadata as constructMetadata } from "@/lib/seo/regional-metadata";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandShowcaseView } from "@/components/brand/BrandShowcaseView";
import { BrandService } from "@/lib/services/brand.service";
import { ProductService } from "@/lib/services/product.service";
import { Product } from "@/data/productsData";

export const dynamic = "force-dynamic";

interface BrandPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const brand = await BrandService.getBrandBySlug(slug).catch(() => null);

  if (!brand || !brand.isActive) {
    return {
      title: "Brand Not Found | BHT Collections",
    };
  }

  const title = brand.metaTitle || `${brand.name} | Official Partner Catalog — BHT Collections`;
  const description =
    brand.metaDescription ||
    brand.description ||
    `Explore ${brand.name} products at BHT Collections in Dubai.`;

  return constructMetadata({ title, description, path: `/${locale}/brand/${brand.slug}`, image: brand.logo || brand.image });
}

export default async function BrandShowcasePage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = await BrandService.getBrandBySlug(slug).catch(() => null);

  if (!brand || !brand.isActive) {
    notFound();
  }

  const brandIdStr = String(brand._id);
  const brandNameLower = (brand.name || "").trim().toLowerCase();
  const brandSlugLower = (brand.slug || slug || "").trim().toLowerCase();

  // 1. Fetch published products specifically linked to this brand's ObjectId (selective grid projection)
  let dbProducts = await ProductService.getGridProducts({
    brand: brandIdStr,
    status: "published",
  }).catch(() => []);

  // 2. If no products matched by direct brand ObjectId, check if any published product has
  // a brand field matching this brand's ID, name, or slug (e.g., if populated or stored as name)
  if (dbProducts.length === 0) {
    const allPublished = await ProductService.getGridProducts({ status: "published" }).catch(() => []);
    dbProducts = allPublished.filter((p) => {
      const b = p.brand;
      if (!b) return false;

      // Brand as populated object { _id, name, slug }
      if (typeof b === "object" && b !== null) {
        const bId = b._id ? String(b._id) : "";
        const bName = b.name ? String(b.name).trim().toLowerCase() : "";
        const bSlug = b.slug ? String(b.slug).trim().toLowerCase() : "";
        return bId === brandIdStr || (bName && bName === brandNameLower) || (bSlug && bSlug === brandSlugLower);
      }

      // Brand as string or ObjectId hex
      const bStr = String(b).trim();
      const bLower = bStr.toLowerCase();
      return bStr === brandIdStr || (bLower && (bLower === brandNameLower || bLower === brandSlugLower));
    });
  }

  // Map to UI Product interface
  const products: Product[] = dbProducts.map((p) => ({
    id: p._id,
    slug: p.slug,
    nameEn: p.name,
    nameAr: p.name,
    category: (p.categorySlug || p.category || "bedding").toLowerCase() as Product["category"],
    subcategory: (p.subcategorySlug || "").toLowerCase(),
    subcategoryEn: p.subcategorySlug || "",
    subcategoryAr: p.subcategorySlug || "",
    brand: brand.name,
    brandLogo: brand.logo || "",
    price: p.salePrice || p.price || 0,
    originalPrice: p.originalPrice || (p.salePrice ? p.price : undefined),
    image: p.image || (p.images && p.images[0]) || "/logo/logo.png",
    inStock: p.stock > 0,
    isNew: false,
    isFeatured: Boolean(p.featured),
    colorVariants: p.colors || [],
    sizes: p.sizes || [],
    rating: p.rating || 5,
    reviewsCount: p.reviewCount || 1,
    descriptionEn: p.description || "",
    descriptionAr: p.description || "",
    featuresEn: p.materials || [],
    featuresAr: p.materials || [],
  }));

  return (
    <BrandShowcaseView
      brand={JSON.parse(JSON.stringify(brand))}
      products={JSON.parse(JSON.stringify(products))}
    />
  );
}
