import { redirect } from "next/navigation";
import { ProductService } from "@/lib/services/product.service";

export const dynamic = "force-dynamic";

export default async function LegacyProductRedirectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = await ProductService.getProductBySlug(slug).catch(() => null);
  const cat = (product?.categorySlug || product?.category || "bedding").toLowerCase();
  redirect(`/${locale}/c=${cat}/${slug}`);
}
