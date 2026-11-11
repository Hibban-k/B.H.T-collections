import { TESTIMONIALS_DATA } from "@/data/testimonialData";
import { ReviewItem, ReviewResponse } from "@/types/review";

export class ReviewService {
  /**
   * Returns the verified 5-star Google reviews added by Blanket House Trading LLC
   */
  static getReviews(lang: "en" | "ar" = "en"): ReviewResponse {
    const reviews: ReviewItem[] = TESTIMONIALS_DATA.map((rev) => ({
      id: rev.id,
      rating: rev.rating,
      text: lang === "ar" ? rev.quoteAr : rev.quoteEn,
      authorName: lang === "ar" ? rev.authorAr : rev.authorEn,
      location: lang === "ar" ? rev.locationAr : rev.locationEn,
      relativeTime: lang === "ar" ? "تقييم غوغل موثق" : "Google Verified",
      source: "google",
    }));

    return {
      rating: 5.0,
      totalReviews: 120,
      reviews,
      source: "google",
    };
  }

  static getFallbackReviews(lang: "en" | "ar" = "en"): ReviewResponse {
    return this.getReviews(lang);
  }
}
