import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { BrandService } from "@/lib/services/brand.service";
import { withAuth } from "@/lib/api/helpers";

export const PUT = withAuth("brands:write", async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = await params;
  const body = await req.json();

  const updated = await BrandService.updateBrand(id, body);
  if (!updated) {
    throw new Error("Brand not found");
  }


  revalidateTag("brands", { expire: 0 });
  revalidatePath("/[locale]", "layout");
  revalidatePath("/sitemap.xml");
  return NextResponse.json({ success: true, brand: updated });
});

export const DELETE = withAuth("brands:write", async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = await params;
  const success = await BrandService.deleteBrand(id);

  if (!success) {
    throw new Error("Brand not found");
  }


  revalidateTag("brands", { expire: 0 });
  revalidatePath("/[locale]", "layout");
  revalidatePath("/sitemap.xml");
  return NextResponse.json({ success: true });
});
