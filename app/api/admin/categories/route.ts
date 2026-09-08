import { NextResponse } from "next/server";
import { CategoryService } from "@/lib/services/category.service";
import { withAuth } from "@/lib/api/helpers";

export const GET = withAuth("categories:read", async () => {
  const categories = await CategoryService.getCategories();
  return NextResponse.json({ categories });
});

export const POST = withAuth("categories:write", async (req: Request) => {
  const body = await req.json();
  if (!body.name) {
    throw new Error("Category name is required");
  }

  const created = await CategoryService.createCategory(body);
  return NextResponse.json({ success: true, category: created }, { status: 201 });
});
