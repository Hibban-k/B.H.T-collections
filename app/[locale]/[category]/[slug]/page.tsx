import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, permanentRedirect } from "next/navigation";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import { ProductService, getPublishedProduct } from "@/lib/services/product.service";
import { constructRegionalMetadata as constructMetadata } from "@/lib/seo/regional-metadata";
import { getProductPath } from "@/lib/seo/urls";
import { generateProductSeo } from "@/lib/seo/product";
import { generateProductSchema, generateBreadcrumbSchema, serializeJsonLd } from "@/lib/seo/schema";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ locale: string; category: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getPublishedProduct(slug);
  if (!product) notFound();
  const seo = generateProductSeo(product);
  return constructMetadata({ title: seo.metaTitle, description: seo.metaDescription,
    productName: product.name, keywords: seo.keywords,
    image: product.image, path: getProductPath(product, locale) });
}

export default async function ProductPage({ params }: Props) {
  const { locale, category, slug } = await params;
  const product = await getPublishedProduct(slug);
  if (!product) notFound();
  const path = getProductPath(product, locale);
  const requestPath = (await headers()).get("x-bht-pathname")
    || "/" + locale + "/" + encodeURIComponent(category).replace("%3D", "=") + "/" + encodeURIComponent(slug);
  if (requestPath !== path) permanentRedirect(path);
  const [crossSellProducts, relatedProducts] = await Promise.all([
    ProductService.getProductsBySlugs(product.crossSellSlugs || []).catch(() => []),
    ProductService.getRelatedProducts(product.categorySlug, product.slug, 4).catch(() => []),
  ]);
  const schemas = [generateProductSchema(product, locale), generateBreadcrumbSchema([
    { name: "Home", path: "/" + locale },
    { name: product.category, path: "/" + locale + "/" + encodeURIComponent(product.categorySlug) },
    { name: product.name, path },
  ])];
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schemas) }} />
    <ProductDetailView product={JSON.parse(JSON.stringify(product))}
      crossSellProducts={JSON.parse(JSON.stringify(crossSellProducts))}
      relatedProducts={JSON.parse(JSON.stringify(relatedProducts))}
      brand={JSON.parse(JSON.stringify(product.brand || null))} />
  </>;
}
