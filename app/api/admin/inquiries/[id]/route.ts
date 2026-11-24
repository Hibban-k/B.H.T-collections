import { NextResponse } from "next/server";
import { InquiryService } from "@/lib/services/inquiry.service";
import { withAuth } from "@/lib/api/helpers";

export const GET = withAuth(
  "orders:read",
  async (_req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const inquiry = await InquiryService.getInquiryById(id);
    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }
    return NextResponse.json({ inquiry });
  }
);

export const PATCH = withAuth(
  "orders:write",
  async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    try {
      const updated = await InquiryService.updateInquiryStatus(id, status);
      if (!updated) {
        return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
      }
      return NextResponse.json({ inquiry: updated });
    } catch (err) {
      return NextResponse.json({ error: (err instanceof Error ? err.message : "Unexpected error") }, { status: 400 });
    }
  }
);

export const DELETE = withAuth(
  "orders:write",
  async (_req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const success = await InquiryService.deleteInquiry(id);
    if (!success) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  }
);
