import { TESTIMONIALS_DATA } from "@/data/testimonialData";
import { ReviewItem, ReviewResponse } from "@/types/review";

interface CacheEntry {
  data: ReviewResponse;
  timestamp: number;
}

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour in-memory cache
const cache: Record<string, CacheEntry> = {};

export class ReviewService {
  /**
   * Generates curated fallback reviews matching the current language
   */
  static getFallbackReviews(lang: "en" | "ar" = "en"): ReviewResponse {
    const reviews: ReviewItem[] = TESTIMONIALS_DATA.map((rev) => ({
      id: rev.id,
      rating: rev.rating,
      text: lang === "ar" ? rev.quoteAr : rev.quoteEn,
      authorName: lang === "ar" ? rev.authorAr : rev.authorEn,
      location: lang === "ar" ? rev.locationAr : rev.locationEn,
      relativeTime: lang === "ar" ? "عميل موثق" : "Verified Customer",
      source: "verified",
    }));

    return {
      rating: 5.0,
      totalReviews: 500,
      reviews: reviews.slice(0, 4),
      source: "fallback",
    };
  }

  /**
   * Fetches real reviews from Google Business Profile via Google Places API (Place Details)
   * Falls back gracefully to curated reviews if environment variables are missing or API fails.
   */
  static async getReviews(lang: "en" | "ar" = "en"): Promise<ReviewResponse> {
    const cacheKey = `reviews_${lang}`;
    const cached = cache[cacheKey];

    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }

    const apiKey =
      process.env.GOOGLE_PLACES_API_KEY ||
      process.env.GOOGLE_MAPS_API_KEY ||
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const placeId =
      process.env.GOOGLE_PLACE_ID ||
      process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

    // If Google credentials are not configured, return curated fallback reviews
    if (!apiKey || !placeId) {
      const fallback = this.getFallbackReviews(lang);
      cache[cacheKey] = { data: fallback, timestamp: Date.now() };
      return fallback;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

      const endpoint = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
        placeId
      )}&fields=name,rating,reviews,user_ratings_total&key=${encodeURIComponent(
        apiKey
      )}&language=${lang}`;

      const res = await fetch(endpoint, {
        signal: controller.signal,
        headers: { Accept: "application/json" },
        next: { revalidate: 3600 }, // Next.js fetch cache for 1 hour
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Google Places API returned HTTP ${res.status}`);
      }

      const json = await res.json();

      if (json.status !== "OK" || !json.result) {
        console.warn("Google Places API error status:", json.status, json.error_message);
        throw new Error(`Google Places error: ${json.status}`);
      }

      const googleReviews: any[] = json.result.reviews || [];
      const overallRating = Number(json.result.rating) || 5.0;
      const totalRatings = Number(json.result.user_ratings_total) || 120;

      // Filter and format Google reviews: prioritize 4-5 star reviews with text
      const formattedGoogleReviews: ReviewItem[] = googleReviews
        .filter((r) => r.text && r.text.trim().length > 0)
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .map((r, idx) => ({
          id: r.time ? `google-${r.time}-${idx}` : `google-${idx}`,
          rating: Number(r.rating) || 5,
          text: r.text.trim(),
          authorName: r.author_name || (lang === "ar" ? "عميل جوجل" : "Google Reviewer"),
          authorPhoto: r.profile_photo_url,
          relativeTime: r.relative_time_description || (lang === "ar" ? "مراجعة جوجل" : "Google Review"),
          location: "Google Business Profile",
          source: "google",
        }));

      // If Google returned fewer than 4 reviews, complement with fallback items
      const fallbackItems = this.getFallbackReviews(lang).reviews;
      const combined = [...formattedGoogleReviews];
      for (const fb of fallbackItems) {
        if (combined.length >= 4) break;
        combined.push(fb);
      }

      const response: ReviewResponse = {
        rating: overallRating,
        totalReviews: totalRatings,
        reviews: combined.slice(0, 4),
        source: "google",
      };

      cache[cacheKey] = { data: response, timestamp: Date.now() };
      return response;
    } catch (error) {
      console.error("ReviewService.getReviews failed, using fallback:", error);
      const fallback = this.getFallbackReviews(lang);
      // Cache fallback for 5 minutes so we don't retry failed network on every single request
      cache[cacheKey] = { data: fallback, timestamp: Date.now() - (CACHE_TTL_MS - 5 * 60 * 1000) };
      return fallback;
    }
  }
}
