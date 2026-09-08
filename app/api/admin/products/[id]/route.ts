import { NextResponse } from "next/server";
import { ProductService } from "@/lib/services/product.service";
import { withAuth } from "@/lib/api/helpers";

export const GET = withAuth("products:read", async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = await ProductService.getProductById(id);
  if (!product) throw new Error("Product not found");
  return NextResponse.json({ product });
});

export const PUT = withAuth("products:write", async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const body = await req.json();
  const updated = await ProductService.updateProduct(id, body);
  if (!updated) throw new Error("Product not found");
  return NextResponse.json({ success: true, product: updated });
});

export const DELETE = withAuth("products:write", async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const success = await ProductService.deleteProduct(id);
  if (!success) throw new Error("Product not found");
  return NextResponse.json({ success: true, message: "Product deleted" });
});
