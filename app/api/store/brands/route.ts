import { NextResponse } from "next/server";
import { BrandService } from "@/lib/services/brand.service";

export const revalidate = 3600; // Cache storefront brands for 1 hour (3600s) to protect Atlas connection limits

export async function GET() {
  try {
    const brands = await BrandService.getBrands();
    const activeBrands = brands.filter((b) => b.isActive !== false);
    return NextResponse.json(
      { brands: activeBrands },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to fetch brands";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
