export interface TestimonialItem {
  id: string;
  rating: number;
  quoteEn: string;
  quoteAr: string;
  authorEn: string;
  authorAr: string;
  locationEn: string;
  locationAr: string;
}

export const INTRO_TRUST_BOX = {
  titleEn: "A Promise of Trust",
  titleAr: "وعد بالثقة والالتزام",
  contentEn: "At BHT Collections, we believe great service begins with trust. Every product and every interaction reflects our commitment to quality, care and customer satisfaction.",
  contentAr: "في بيت البطانيات للتجارة ذ.م.م، نؤمن بأن الخدمة الراقية تبدأ من الثقة. كل منتج وكل تعامل يجسد التزامنا الأصيل بالجودة والاهتمام ورضا العملاء التام.",
};

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "rev-1",
    rating: 5,
    quoteEn: "The product quality was excellent, and the overall shopping experience was smooth and easy.",
    quoteAr: "جودة المنتجات ممتازة للغاية، وتجربة التسوق كانت سلسة ومريحة بكل المقاييس.",
    authorEn: "Verified Customer",
    authorAr: "عميل موثق",
    locationEn: "Dubai, UAE",
    locationAr: "دبي، الإمارات",
  },
  {
    id: "rev-2",
    rating: 5,
    quoteEn: "Great customer service and a professional team. They made the entire process simple and convenient.",
    quoteAr: "خدمة عملاء راقية وفريق عمل متعاون ومحترف. جعلوا كل تفاصيل الشراء سهلة وممتعة.",
    authorEn: "Verified Customer",
    authorAr: "عميل موثق",
    locationEn: "Abu Dhabi, UAE",
    locationAr: "أبوظبي، الإمارات",
  },
  {
    id: "rev-3",
    rating: 5,
    quoteEn: "Good product selection, fair pricing and a pleasant experience. I would recommend checking out their collection.",
    quoteAr: "تشكيلة رائعة، وأسعار عادلة ومناسبة، وتجربة تستحق التقدير والتوصية للجميع.",
    authorEn: "Verified Customer",
    authorAr: "عميل موثق",
    locationEn: "Sharjah, UAE",
    locationAr: "الشارقة، الإمارات",
  },
  {
    id: "rev-4",
    rating: 5,
    quoteEn: "A reliable shopping experience with helpful support and good attention to customer needs.",
    quoteAr: "تجربة تسوق موثوقة مع دعم مستمر واهتمام حقيقي بأدق متطلبات العميل.",
    authorEn: "Verified Customer",
    authorAr: "عميل موثق",
    locationEn: "Al Ain, UAE",
    locationAr: "العين، الإمارات",
  },
];
