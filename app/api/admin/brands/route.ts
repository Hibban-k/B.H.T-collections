import { NextResponse } from "next/server";
import { BrandService } from "@/lib/services/brand.service";
import { withAuth } from "@/lib/api/helpers";

export const GET = withAuth("brands:read", async () => {
  const brands = await BrandService.getBrands();
  return NextResponse.json({ brands });
});

export const POST = withAuth("brands:write", async (req: Request) => {
  const body = await req.json();
  if (!body.name) {
    throw new Error("Brand name is required");
  }

  const created = await BrandService.createBrand(body);
  return NextResponse.json({ success: true, brand: created }, { status: 201 });
});
