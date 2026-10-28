export interface ReviewItem {
  id: string;
  rating: number;
  text: string;
  authorName: string;
  authorPhoto?: string;
  relativeTime?: string;
  location?: string;
  source: "google" | "verified";
}

export interface ReviewResponse {
  rating: number;
  totalReviews: number;
  reviews: ReviewItem[];
  source: "google" | "fallback";
}
