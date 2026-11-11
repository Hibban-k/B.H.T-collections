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
  const { slug } = await params;
  const brand = await BrandService.getBrandBySlug(slug).catch(() => null);

  if (!brand) {
    return {
      title: "Brand Not Found | BHT Collections",
    };
  }

  const title = brand.metaTitle || `${brand.name} | Official Partner Catalog — BHT Collections`;
  const description =
    brand.metaDescription ||
    brand.description ||
    `Explore authentic ${brand.name} products distributed by Blanket House Trading LLC Dubai across UAE and GCC.`;

  return {
    title,
    description,
    keywords: brand.keywords || [brand.name, "UAE wholesale", "BHT Collections", "official distributor"],
    openGraph: {
      title,
      description,
      images: brand.logo ? [{ url: brand.logo }] : brand.image ? [{ url: brand.image }] : [],
    },
  };
}

export default async function BrandShowcasePage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = await BrandService.getBrandBySlug(slug).catch(() => null);

  if (!brand) {
    notFound();
  }

  // Fetch products for this brand
  let dbProducts = await ProductService.getProducts({
    brand: String(brand._id),
    status: "published",
  }).catch(() => []);

  // Fallback search by brand name if none matched directly by ID
  if (dbProducts.length === 0) {
    dbProducts = await ProductService.getProducts({
      brand: brand.name,
      status: "published",
    }).catch(() => []);
  }

  // Also match products where product.brand string or object equals brand name or ID
  if (dbProducts.length === 0) {
    const allProducts = await ProductService.getProducts({ status: "published" }).catch(() => []);
    dbProducts = allProducts.filter((p) => {
      const b = (p as any).brand;
      const bId = b?._id ? String(b._id) : String(b || "");
      const bName = b?.name ? String(b.name).toLowerCase() : String(b || "").toLowerCase();
      return bId === String(brand._id) || bName === brand.name.toLowerCase() || bName === brand.slug.toLowerCase();
    });
  }

  // Map to UI Product interface
  const products: Product[] = dbProducts.map((p) => ({
    id: p._id,
    slug: p.slug,
    nameEn: p.name,
    nameAr: p.name,
    category: (p.categorySlug || p.category || "bedding").toLowerCase() as any,
    subcategory: (p.subcategorySlug || "").toLowerCase(),
    subcategoryEn: p.subcategorySlug || "",
    subcategoryAr: p.subcategorySlug || "",
    brand: brand.name,
    brandLogo: brand.logo || "",
    price: p.salePrice || p.price || 0,
    originalPrice: p.originalPrice || (p.salePrice ? p.price : undefined),
    image: p.image || (p.images && p.images[0]) || "/collections/korean-super-soft-blanket.png",
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
