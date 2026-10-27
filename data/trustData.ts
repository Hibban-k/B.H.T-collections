export interface TrustFeature {
  id: string;
  iconName: "truck" | "handshake" | "shield-check";
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

export const TRUST_FEATURES: TrustFeature[] = [
  {
    id: "timely-delivery",
    iconName: "truck",
    titleEn: "Timely Delivery",
    titleAr: "التوصيل في الموعد المحدد",
    descEn: "We prioritize efficient order processing and dependable delivery to help your products reach you on time across the UAE.",
    descAr: "نولي الأولوية لمعالجة الطلبات بكفاءة والتوصيل الموثوق لضمان وصول مشترياتك في وقتها في جميع أنحاء الإمارات.",
  },
  {
    id: "price-match",
    iconName: "handshake",
    titleEn: "Price Match Guarantee",
    titleAr: "ضمان أفضل الأسعار والقيمة",
    descEn: "We strive to offer competitive prices and fair value, helping you shop confidently with pricing that meets your expectations.",
    descAr: "نحرص على تقديم أسعار تنافسية وقيمة حقيقية، لتتسوق بكل ثقة مع أسعار تلائم توقعاتك وتضمن رضاك.",
  },
  {
    id: "strong-accountability",
    iconName: "shield-check",
    titleEn: "Strong Accountability",
    titleAr: "مسؤولية وشفافية مطلقة",
    descEn: "We take responsibility for our service, value transparent communication and work to build lasting relationships with every customer.",
    descAr: "نتحمل كامل المسؤولية عن خدماتنا، ونؤمن بالتواصل الشفاف لبناء علاقات وثيقة ودائمة مع كل عميل.",
  },
];
