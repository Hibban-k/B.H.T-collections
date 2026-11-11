import { NextResponse } from "next/server";
import { ReviewService } from "@/lib/services/review.service";

export const dynamic = "force-static";
export const revalidate = 86400; // Cache for 24h

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") === "ar" ? "ar" : "en";
  const data = ReviewService.getReviews(lang);
  return NextResponse.json(data);
}
