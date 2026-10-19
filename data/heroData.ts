export interface HeroSlide {
  id: string;
  category: string;
  eyebrowEn: string;
  eyebrowAr: string;
  headingEn: string;
  headingAr: string;
  descriptionEn: string;
  descriptionAr: string;
  ctaTextEn: string;
  ctaTextAr: string;
  destination: string;
  image: string;
  alt: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-blankets",
    category: "Blankets",
    eyebrowEn: "ELEVATE YOUR EVERYDAY",
    eyebrowAr: "ارتقِ بتفاصيل يومك",
    headingEn: "Comfort That Feels Like Home",
    headingAr: "راحة تمنحك دفء المنزل",
    descriptionEn: "Softness, warmth, and comfort in every layer.",
    descriptionAr: "نعومة فائقة، ودفء، وراحة استثنائية في كل طبقة.",
    ctaTextEn: "EXPLORE BLANKETS",
    ctaTextAr: "اكتشف تشكيلة البطانيات",
    destination: "/collections/blankets",
    image: "/herosection/home-textiles.png",
    alt: "Premium BHT Blankets & Comforters",
  },
  {
    id: "slide-footwear",
    category: "Footwear",
    eyebrowEn: "STEP INTO STYLE",
    eyebrowAr: "خطوات مفعمة بالأناقة",
    headingEn: "Comfort Meets Confidence",
    headingAr: "حيث تجتمع الراحة مع الثقة",
    descriptionEn: "Everyday comfort with timeless style.",
    descriptionAr: "راحة يومية لا تضاهى وتصاميم تواكب كل الأوقات.",
    ctaTextEn: "EXPLORE FOOTWEAR",
    ctaTextAr: "اكتشف تشكيلة الأحذية",
    destination: "/collections/footwear",
    image: "/herosection/footwear.png",
    alt: "BHT High Performance & Lifestyle Footwear",
  },
  {
    id: "slide-trolleys",
    category: "Trolleys",
    eyebrowEn: "TRAVEL BEYOND ORDINARY",
    eyebrowAr: "سافر بأسلوب لا مثيل له",
    headingEn: "Every Journey in Style",
    headingAr: "كل رحلة تبدأ بأناقة",
    descriptionEn: "Smart design for effortless travel.",
    descriptionAr: "تصميم ذكي لتجربة سفر مريحة وسلسة في كل وجهة.",
    ctaTextEn: "EXPLORE TROLLEYS",
    ctaTextAr: "اكتشف حقائب السفر",
    destination: "/collections/trolleys",
    image: "/herosection/travel-luggage.png",
    alt: "Premium Travel Trolley Luggage Collection",
  },
];
