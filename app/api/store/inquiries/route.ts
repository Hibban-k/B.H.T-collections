import { NextResponse } from "next/server";
import { InquiryService } from "@/lib/services/inquiry.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, productSlug, productName } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const inquiry = await InquiryService.submitInquiry({
      name,
      email,
      phone,
      subject,
      message,
      productSlug,
      productName,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been received. Our team will contact you shortly.",
        inquiryId: inquiry._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API Inquiries POST] Error:", error);
    return NextResponse.json(
      { error: (error instanceof Error ? error.message : "Unexpected error") || "Failed to submit inquiry. Please try again." },
      { status: 500 }
    );
  }
}
