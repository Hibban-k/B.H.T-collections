import { NextResponse } from "next/server";
import { ReviewService } from "@/lib/services/review.service";

export const revalidate = 3600; // Cache responses for 1 hour

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") === "ar" ? "ar" : "en";

  try {
    const data = await ReviewService.getReviews(lang);
    return NextResponse.json(data);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to load reviews";
    console.error("API /api/store/reviews error:", msg);
    const fallback = ReviewService.getFallbackReviews(lang);
    return NextResponse.json(fallback);
  }
}
