import { NextResponse } from "next/server";
import { CategoryService } from "@/lib/services/category.service";

export const revalidate = 60; // Cache for 60 seconds

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

    return NextResponse.json({ categories });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to fetch categories";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
