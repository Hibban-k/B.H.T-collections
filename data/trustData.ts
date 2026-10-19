export interface TrustFeature {
  id: string;
  iconName: "truck" | "users" | "handshake" | "shield-check" | "warehouse" | "sparkles";
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
    id: "sales-team",
    iconName: "users",
    titleEn: "Vibrant and Professional Sales Team",
    titleAr: "فريق مبيعات متميز ومحترف",
    descEn: "Our dedicated sales team provides friendly, knowledgeable assistance to help you find the right products for your business and lifestyle.",
    descAr: "يقدم فريقنا المتخصص دعماً ودوداً وخبيراً لمساعدتك في العثور على المنتجات المثالية التي تلبي تطلعاتك وأسلوب حياتك.",
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
  {
    id: "warehouse-capacity",
    iconName: "warehouse",
    titleEn: "50,000+ SQFT Warehouse Capacity",
    titleAr: "مستودعات تتجاوز 50,000 قدم مربع",
    descEn: "Our 50,000+ square-foot warehouse capacity supports organized inventory management and efficient product availability.",
    descAr: "تتيح طاقتنا التخزينية الواسعة إدارة دقيقة للمخزون وتوفيراً مستمراً وسريعاً لجميع المنتجات والتشكيلات.",
  },
  {
    id: "continuous-innovation",
    iconName: "sparkles",
    titleEn: "Continuous Innovation with Latest Market Products",
    titleAr: "ابتكار متواصل وتشكيلات عصرية",
    descEn: "We continuously explore emerging market trends and evolving product ranges to bring customers relevant and up-to-date choices.",
    descAr: "نستكشف أحدث اتجاهات السوق العالمية لنقدم لعملائنا خيارات متجددة وتصاميم تواكب أحدث المعايير.",
  },
];
