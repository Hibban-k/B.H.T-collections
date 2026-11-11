import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LegacyCollectionCategoryRedirectPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; category: string }>;
  searchParams?: Promise<Record<string, string | string[]>>;
}) {
  const { locale, category } = await params;
  const resolvedQuery = searchParams ? await searchParams : {};
  const qs = new URLSearchParams();
  Object.entries(resolvedQuery).forEach(([key, val]) => {
    if (typeof val === "string") qs.set(key, val);
  });
  const queryString = qs.toString();
  redirect(`/${locale}/${category.toLowerCase()}${queryString ? `?${queryString}` : ""}`);
}
