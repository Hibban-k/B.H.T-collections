// app/collections/[category]/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Star, CheckCircle2, MessageCircle, Phone, Truck, RotateCcw } from "lucide-react";
import { formatAED, calculateDiscount } from "@/lib/utils";
import LogoWatermark from "@/components/ui/LogoWatermark";
import { ProductService } from "@/lib/services/product.service";

export const revalidate = 3600;

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await ProductService.getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | B.H.T. COLLECTIONS`,
    description: (product.shortDescription || product.description) + " · Premium UAE bedding from B.H.T. Collections.",
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug, category } = await params;
  const product = await ProductService.getProductBySlug(slug);
  if (!product || product.status !== "published" || product.categorySlug !== category) {
    notFound();
  }

  const related = await ProductService.getRelatedProducts(
    product.categorySlug,
    product.slug,
    4
  );

  return (
    <div className="min-h-screen bg-transparent">
      {/* Breadcrumb */}
      <div className="border-b border-[#F2EBDC] bg-[#FAFAF7]/80 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-[#64748B] flex-wrap">
          <Link href="/" className="hover:text-[#1C75BC] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-[#1C75BC] transition-colors">Collections</Link>
          <span>/</span>
          <Link href={`/collections/${product.categorySlug}`} className="hover:text-[#1C75BC] transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#0B131F] font-bold truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <div className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="relative z-10 grid md:grid-cols-2 gap-10 md:gap-16">
          {/* Image */}
          <div>
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-md border border-[#F2EBDC]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 tag-badge !bg-[#0B131F] !border-[#0B131F] text-xs">
                  {product.badge}
                </div>
              )}
              {product.originalPrice && (
                <div className="absolute top-4 right-4 tag-badge !bg-[#D92626] !border-[#D92626] text-xs shadow-sm">
                  -{calculateDiscount(product.price, product.originalPrice)}%
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img: string, i: number) => (
                  <div key={i} className="relative w-20 h-20 bg-white rounded-xl overflow-hidden border border-[#F2EBDC] shadow-xs">
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span
              className="text-[#D92626] text-xs font-bold uppercase tracking-[0.2em] mb-2"
              style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
            >
              {product.category}
            </span>

            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B131F] mb-3 leading-tight"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating || 5)
                        ? "fill-[#F59E0B] text-[#F59E0B]"
                        : "text-[#E2E8F0] fill-[#E2E8F0]"
                      }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-[#0B131F]">{product.rating || 5.0}</span>
              <span className="text-xs text-[#64748B]">({product.reviewCount || 12} customer reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 p-4 bg-white rounded-xl border border-[#F2EBDC]">
              <span className="text-2xl sm:text-3xl font-bold text-[#0B131F]">
                {formatAED(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-[#94A3B8] line-through">
                    {formatAED(product.originalPrice)}
                  </span>
                  <span className="text-xs font-bold text-[#D92626] bg-[#D92626]/10 px-2 py-0.5 rounded">
                    Save AED {product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-[#64748B] text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0B131F] mb-2.5">
                  Available Sizes
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size: string) => (
                    <span
                      key={size}
                      className="px-3.5 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs font-semibold text-[#0B131F]"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a
                href={`https://wa.me/971558879237?text=Hi%20BHT%20Collections,%20I'm%20interested%20in%20${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1"
              >
                <MessageCircle className="w-4 h-4" />
                ENQUIRE ON WHATSAPP
              </a>
              <Link
                href="/contact"
                className="btn-secondary flex-1"
              >
                <Phone className="w-4 h-4" />
                CONTACT US
              </Link>
            </div>

            {/* Delivery & Returns */}
            <div className="border border-[#F2EBDC] rounded-xl overflow-hidden divide-y divide-[#F2EBDC] bg-[#FAF8F3]">
              <div className="flex items-center gap-3 px-4 py-3">
                <Truck className="w-4 h-4 text-[#D92626] shrink-0" />
                <p className="text-xs text-[#64748B]">
                  <span className="font-bold text-[#0B131F]">Free delivery</span> on orders over AED 150 · UAE-wide
                </p>
              </div>
              <div className="flex items-center gap-3 px-4 py-3">
                <RotateCcw className="w-4 h-4 text-[#1C75BC] shrink-0" />
                <p className="text-xs text-[#64748B]">
                  <span className="font-bold text-[#0B131F]">Easy returns</span> within 14 days of delivery
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Materials & Care */}
        {product.materials && product.materials.length > 0 && (
          <div className="mt-14 border-t border-[#F2EBDC] pt-10">
            <h2
              className="text-xl font-bold text-[#0B131F] mb-5"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              Materials &amp; Care Details
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {product.materials.map((mat: string) => (
                <div key={mat} className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-[#F2EBDC] shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#1BA14B] shrink-0" />
                  <span className="text-sm font-medium text-[#64748B]">{mat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-[#F2EBDC] pt-10">
            <h2
              className="text-2xl font-bold text-[#0B131F] mb-8"
              style={{ fontFamily: "var(--font-playfair-display)" }}
            >
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((rel) => (
                <article key={rel._id}>
                  <Link
                    href={`/collections/${rel.categorySlug}/${rel.slug}`}
                    className="group block bg-white p-3 rounded-xl border border-[#F2EBDC] shadow-sm hover:shadow-md transition-all hover:border-[#1C75BC]/30"
                  >
                    <div className="relative aspect-square bg-[#FAF8F3] overflow-hidden rounded-lg mb-3">
                      <Image
                        src={rel.image}
                        alt={rel.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <h3
                      className="text-sm font-semibold text-[#0B131F] group-hover:text-[#1C75BC] transition-colors leading-snug mb-1"
                      style={{ fontFamily: "var(--font-playfair-display)" }}
                    >
                      {rel.name}
                    </h3>
                    <span className="text-sm font-bold text-[#0B131F]">
                      {formatAED(rel.price)}
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
