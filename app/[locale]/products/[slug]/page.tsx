import { notFound, permanentRedirect } from "next/navigation";
import { getPublishedProduct } from "@/lib/services/product.service";
import { getProductPath } from "@/lib/seo/urls";
export const dynamic = "force-dynamic";
export default async function LegacyProductPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const product = await getPublishedProduct(slug);
  if (!product) notFound();
  permanentRedirect(getProductPath(product, locale));
}
