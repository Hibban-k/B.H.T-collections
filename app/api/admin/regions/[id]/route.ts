import { NextRequest, NextResponse } from "next/server";
import { RegionService } from "@/lib/services/region.service";

export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const id = params.id;
    const body = await req.json();

    const region = await RegionService.updateRegion(id, body);
    if (!region) {
      return NextResponse.json({ success: false, error: "Region not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, region });
  } catch (error: any) {
    console.error("PUT /api/admin/regions/[id] error:", error);
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: "Region code must be unique." }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const id = params.id;
    const success = await RegionService.deleteRegion(id);

    if (!success) {
      return NextResponse.json({ success: false, error: "Region not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/admin/regions/[id] error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
