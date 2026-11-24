import { auth } from "@/lib/auth/auth";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { RegionService } from "@/lib/services/region.service";

export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  try {
    const params = await props.params;
    const id = params.id;
    const body = await req.json();

    const region = await RegionService.updateRegion(id, body);
    if (!region) {
      return NextResponse.json({ success: false, error: "Region not found." }, { status: 404 });
    }

    revalidatePath("/[locale]", "layout");
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ success: true, region });
  } catch (error) {
    console.error("PUT /api/admin/regions/[id] error:", error);
    if (typeof error === "object" && error !== null && "code" in error && error.code === 11000) {
      return NextResponse.json({ success: false, error: "Region code must be unique." }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: (error instanceof Error ? error.message : "Unexpected error") }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  try {
    const params = await props.params;
    const id = params.id;
    const success = await RegionService.deleteRegion(id);

    if (!success) {
      return NextResponse.json({ success: false, error: "Region not found." }, { status: 404 });
    }

    revalidatePath("/[locale]", "layout");
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/regions/[id] error:", error);
    return NextResponse.json({ success: false, error: (error instanceof Error ? error.message : "Unexpected error") }, { status: 500 });
  }
}
