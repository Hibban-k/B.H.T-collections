import { permanentRedirect } from "next/navigation";

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
    for (const value of Array.isArray(val) ? val : [val]) qs.append(key, value);
  });
  const queryString = qs.toString();
  permanentRedirect(`/${locale}/${category.toLowerCase()}${queryString ? `?${queryString}` : ""}`);
}
