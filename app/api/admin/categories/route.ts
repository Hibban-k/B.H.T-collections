import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { CategoryService } from "@/lib/services/category.service";
import { withAuth } from "@/lib/api/helpers";

export const GET = withAuth("categories:read", async () => {
  const categories = await CategoryService.getCategories(true);
  return NextResponse.json({ categories });
});

export const POST = withAuth("categories:write", async (req: Request) => {
  const body = await req.json();
  if (!body.name) {
    throw new Error("Category name is required");
  }

  const created = await CategoryService.createCategory(body);
  revalidateTag("categories", { expire: 0 });
  revalidatePath("/[locale]", "layout");
  revalidatePath("/sitemap.xml");
  return NextResponse.json({ success: true, category: created }, { status: 201 });
});
