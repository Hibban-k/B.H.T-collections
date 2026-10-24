import { NextResponse } from "next/server";
import { ProductService } from "@/lib/services/product.service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;
  const homepage = searchParams.get("homepage") === "true" ? true : undefined;
  const collection = searchParams.get("collection") === "true" ? true : undefined;
  const featured = searchParams.get("featured") === "true" ? true : undefined;
  const search = searchParams.get("search") || undefined;

  try {
    let products = await ProductService.getProducts({
      status: "published",
      categorySlug: category,
      showOnHomepage: homepage,
      showOnCollection: collection,
      featured,
      search,
    });

    // Enforce max 4 products per main category on home screen
    if (homepage) {
      const categoryCounts: Record<string, number> = {};
      products = products.filter((p) => {
        const cat = `${p.category || ""} ${p.categorySlug || ""}`.toLowerCase();
        let main = "bedding";
        if (cat.includes("travel") || cat.includes("bag") || cat.includes("trolley") || cat.includes("trolly") || cat.includes("luggage")) {
          main = "travel-bags";
        } else if (cat.includes("footwear") || cat.includes("shoe") || cat.includes("slipper") || cat.includes("flip-flop") || cat.includes("clog")) {
          main = "footwear";
        }
        categoryCounts[main] = (categoryCounts[main] || 0) + 1;
        return categoryCounts[main] <= 4;
      });
    }

    return NextResponse.json({ products });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to fetch products";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
