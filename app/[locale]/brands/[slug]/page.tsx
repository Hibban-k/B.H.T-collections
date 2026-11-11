import { redirect } from "next/navigation";

export default async function BrandsRedirectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  redirect(`/${locale}/brand/${slug}`);
}
