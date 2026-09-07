import { NextResponse } from "next/server";
import { getProducts } from "@/lib/db/store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;
  const homepage = searchParams.get("homepage") === "true" ? true : undefined;
  const collection = searchParams.get("collection") === "true" ? true : undefined;
  const featured = searchParams.get("featured") === "true" ? true : undefined;
  const search = searchParams.get("search") || undefined;

  try {
    const products = await getProducts({
      status: "published",
      categorySlug: category,
      showOnHomepage: homepage,
      showOnCollection: collection,
      featured,
      search,
    });
    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch products" }, { status: 500 });
  }
}
