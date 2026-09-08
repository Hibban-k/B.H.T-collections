import { NextResponse } from "next/server";
import { CategoryService } from "@/lib/services/category.service";
import { withAuth } from "@/lib/api/helpers";

export const PUT = withAuth("categories:write", async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const body = await req.json();
  const updated = await CategoryService.updateCategory(id, body);
  if (!updated) throw new Error("Category not found");
  return NextResponse.json({ success: true, category: updated });
});

export const DELETE = withAuth("categories:write", async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const success = await CategoryService.deleteCategory(id);
  if (!success) throw new Error("Category not found");
  return NextResponse.json({ success: true, message: "Category deleted" });
});
