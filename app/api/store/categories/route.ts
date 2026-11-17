import { NextResponse } from "next/server";
import { CategoryService } from "@/lib/services/category.service";

export const revalidate = 3600; // Cache storefront categories for 1 hour (3600s) to protect Atlas connection limits

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parentSlug = searchParams.get("parent");
  const topOnly = searchParams.get("topOnly") === "true";

  try {
    const allCategories = await CategoryService.getCategories();
    let categories = allCategories.filter((c) => c.status !== "disabled");

    if (topOnly) {
      categories = categories.filter((c) => !c.parentId && !c.parentSlug);
    } else if (parentSlug) {
      categories = categories.filter((c) => c.parentSlug === parentSlug);
    }

    return NextResponse.json(
      { categories },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to fetch categories";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
