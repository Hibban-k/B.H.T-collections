import { NextResponse } from "next/server";
import { InquiryService } from "@/lib/services/inquiry.service";
import { withAuth } from "@/lib/api/helpers";

export const GET = withAuth("orders:read", async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") || undefined;
  const search = searchParams.get("search") || undefined;

  const inquiries = await InquiryService.getInquiries({
    status,
    search,
  });

  return NextResponse.json({ inquiries });
});
