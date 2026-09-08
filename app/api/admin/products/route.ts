import { NextResponse } from "next/server";
import { ProductService } from "@/lib/services/product.service";
import { withAuth } from "@/lib/api/helpers";

export const GET = withAuth("products:read", async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const products = await ProductService.getProducts({
    status: searchParams.get("status") || undefined,
    categorySlug: searchParams.get("categorySlug") || undefined,
    search: searchParams.get("search") || undefined,
  });
  return NextResponse.json({ products });
});

export const POST = withAuth("products:write", async (req: Request) => {
  const body = await req.json();
  if (!body.name || !body.price) {
    throw new Error("Product name and price are required");
  }

  const created = await ProductService.createProduct(body);
  return NextResponse.json({ success: true, product: created }, { status: 201 });
});
