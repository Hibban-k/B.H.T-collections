import { NextResponse } from "next/server";
import { BrandService } from "@/lib/services/brand.service";

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    const brands = await BrandService.getBrands();
    const activeBrands = brands.filter((b) => b.isActive !== false);
    return NextResponse.json({ brands: activeBrands });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to fetch brands";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
