import { NextRequest, NextResponse } from "next/server";
import { RegionService } from "@/lib/services/region.service";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const includeInactive = searchParams.get("includeInactive") === "true";
    const regions = await RegionService.getRegions(includeInactive);
    return NextResponse.json({ success: true, regions });
  } catch (error: any) {
    console.error("GET /api/admin/regions error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, code, currency, isActive, metaTitleSuffix, metaDescriptionTemplate } = body;

    if (!name || !code) {
      return NextResponse.json(
        { success: false, error: "Name and code are required." },
        { status: 400 }
      );
    }

    const region = await RegionService.createRegion({
      name,
      code,
      currency,
      isActive,
      metaTitleSuffix,
      metaDescriptionTemplate,
    });

    return NextResponse.json({ success: true, region }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/admin/regions error:", error);
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: "Region code must be unique." }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
