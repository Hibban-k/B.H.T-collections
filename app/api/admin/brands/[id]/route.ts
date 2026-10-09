import { NextResponse } from "next/server";
import { BrandService } from "@/lib/services/brand.service";
import { withAuth } from "@/lib/api/helpers";

export const PUT = withAuth("brands:write", async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = await params;
  const body = await req.json();

  const updated = await BrandService.updateBrand(id, body);
  if (!updated) {
    throw new Error("Brand not found");
  }

  return NextResponse.json({ success: true, brand: updated });
});

export const DELETE = withAuth("brands:write", async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = await params;
  const success = await BrandService.deleteBrand(id);

  if (!success) {
    throw new Error("Brand not found");
  }

  return NextResponse.json({ success: true });
});
