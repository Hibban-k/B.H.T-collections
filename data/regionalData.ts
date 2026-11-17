export interface CountryPresence {
  id: string;
  nameEn: string;
  nameAr: string;
  code: string;
  href?: string;
  flagColors: {
    type: "uae" | "ksa" | "qatar" | "bahrain" | "kuwait" | "oman";
  };
}

export const REGIONAL_PRESENCE_DATA = {
  eyebrowEn: "OUR PRESENCE",
  eyebrowAr: "تواجدنا الإقليمي",
  headingEn: "From Dubai to the World",
  headingAr: "من دبي إلى كافة أنحاء العالم",
  descriptionEn: "Based in the UAE, BHT Collections brings quality products and trusted service to customers across the Middle East and beyond. We are proud to be part of your home, wherever you are.",
  descriptionAr: "انطلاقاً من دولة الإمارات العربية المتحدة، تقدم بي إتش تي كوليكشنز منتجات فائقة الجودة وخدمة موثوقة لعملائنا في شتى أرجاء الشرق الأوسط والعالم. نفتخر بأن نكون جزءاً دافئاً من كل منزل.",
  supportingEn: "Explore our collection and shop with confidence — delivered with care across the region and around the world.",
  supportingAr: "استكشف تشكيلاتنا وتسوق بثقة واطمئنان — نوصلها بكل عناية واهتمام إلى مختلف دول المنطقة والعالم.",
  dubaiImage: "/travallingbag/dubai-portfolio-circle.jpg",
  countries: [
    {
      id: "uae",
      nameEn: "UAE",
      nameAr: "الإمارات",
      code: "AE",
      flagColors: { type: "uae" },
    },
    {
      id: "saudi",
      nameEn: "SAUDI ARABIA",
      nameAr: "المملكة العربية السعودية",
      code: "SA",
      flagColors: { type: "ksa" },
    },
    {
      id: "qatar",
      nameEn: "QATAR",
      nameAr: "قطر",
      code: "QA",
      flagColors: { type: "qatar" },
    },
    {
      id: "bahrain",
      nameEn: "BAHRAIN",
      nameAr: "البحرين",
      code: "BH",
      flagColors: { type: "bahrain" },
    },
    {
      id: "kuwait",
      nameEn: "KUWAIT",
      nameAr: "الكويت",
      code: "KW",
      flagColors: { type: "kuwait" },
    },
    {
      id: "oman",
      nameEn: "OMAN",
      nameAr: "سلطنة عمان",
      code: "OM",
      flagColors: { type: "oman" },
    },
  ] as CountryPresence[],
};
