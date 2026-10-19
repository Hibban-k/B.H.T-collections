export interface ShowcaseProduct {
  id: string;
  nameEn: string;
  nameAr: string;
  subtitleEn?: string;
  subtitleAr?: string;
  image: string;
  href: string;
  brandName: string;
  brandLogo?: string;
}

export interface DistributorBrand {
  id: string;
  name: string;
  logo?: string;
}

export interface ShowcaseCategoryTab {
  id: "bedding" | "travelling" | "footwear";
  nameEn: string;
  nameAr: string;
  products: ShowcaseProduct[];
  distributorLogos?: DistributorBrand[];
}

export const SHOWCASE_TABS_DATA: ShowcaseCategoryTab[] = [
  {
    id: "bedding",
    nameEn: "BEDDING",
    nameAr: "المفروشات",
    products: [
      {
        id: "bed-1",
        nameEn: "Royalon 3D Luxury Comforter Set",
        nameAr: "طقم لحاف رويالون 3D الفاخر",
        image: "/badding/bht-bed-sheets.jpg",
        href: "/collections/bedding/cotton-bed-sheets",
        brandName: "ROYALON 3D",
        brandLogo: "/brandlogo/brand-7-clean.png",
      },
      {
        id: "bed-2",
        nameEn: "Damas Gold Signature Bedding Ensemble",
        nameAr: "تشكيلة داماس جولد الفاخرة للمفروشات",
        image: "/badding/bht-comforters.jpg",
        href: "/collections/bedding/royal-comforter",
        brandName: "DAMAS GOLD",
        brandLogo: "/brandlogo/brand-6-clean.png",
      },
      {
        id: "bed-3",
        nameEn: "Hana Soft Touch Microfiber Blanket",
        nameAr: "بطانية هناء مايكروفايبر فائقة النعومة",
        image: "/herosection/home-textiles.png",
        href: "/collections/bedding/microfiber-blankets",
        brandName: "HANA",
        brandLogo: "/brandlogo/brand-5-clean.png",
      },
      {
        id: "bed-4",
        nameEn: "Damas Gold Royal Satin Bedspread",
        nameAr: "مفرش سرير داماس جولد الملكي",
        image: "/badding/brand-damas.jpg",
        href: "/collections/bedding/damas-ensemble",
        brandName: "DAMAS GOLD",
        brandLogo: "/brandlogo/brand-6-clean.png",
      },
      {
        id: "bed-5",
        nameEn: "Royalon 3D Embossed Satin Quilt",
        nameAr: "لحاف رويالون 3D ساتان منقوش",
        image: "/badding/brand-royalon.jpg",
        href: "/collections/bedding/royalon-satin-quilt",
        brandName: "ROYALON 3D",
        brandLogo: "/brandlogo/brand-7-clean.png",
      },
    ],
  },
  {
    id: "travelling",
    nameEn: "TRAVEL BAGS",
    nameAr: "حقائب السفر",
    products: [
      {
        id: "trv-1",
        nameEn: "Infinity Paris 3-Piece Hardside Trolley Set",
        nameAr: "طقم حقائب إنفينيتي باريس 3 قطع",
        image: "/herosection/travel-luggage.png",
        href: "/collections/travel-bags/infinity-3-piece",
        brandName: "INFINITY PARIS",
        brandLogo: "/brandlogo/brand-4-clean.png",
      },
      {
        id: "trv-2",
        nameEn: "TravelGo Expandable Spinner Suitcase",
        nameAr: "حقيبة ترافل جو الدوارة القابلة للتوسيع",
        image: "/travallingbag/brand-travelgo.jpg",
        href: "/collections/travel-bags/travelgo-spinner",
        brandName: "TRAVELGO",
        brandLogo: "/brandlogo/brand-3-clean.png",
      },
      {
        id: "trv-3",
        nameEn: "Infinity Paris Executive Carry-On Trolley",
        nameAr: "حقيبة كابينة إنفينيتي باريس الفاخرة",
        image: "/travallingbag/brand-infinity.jpg",
        href: "/collections/travel-bags/executive-duffle",
        brandName: "INFINITY PARIS",
        brandLogo: "/brandlogo/brand-4-clean.png",
      },
      {
        id: "trv-4",
        nameEn: "TravelGo Lightweight Cabin Suitcase",
        nameAr: "حقيبة كابينة ترافل جو خفيفة الوزن",
        image: "/herosection/travel-luggage.png",
        href: "/collections/travel-bags/cabin-trolley",
        brandName: "TRAVELGO",
        brandLogo: "/brandlogo/brand-3-clean.png",
      },
      {
        id: "trv-5",
        nameEn: "Infinity Paris Heavy-Duty Polycarbonate Trolley",
        nameAr: "حقيبة إنفينيتي باريس بولي كربونات فائقة التحمل",
        image: "/travallingbag/brand-infinity.jpg",
        href: "/collections/travel-bags/polycarbonate-suitcase",
        brandName: "INFINITY PARIS",
        brandLogo: "/brandlogo/brand-4-clean.png",
      },
    ],
  },
  {
    id: "footwear",
    nameEn: "FOOTWEAR",
    nameAr: "الأحذية",
    products: [
      {
        id: "ft-1",
        nameEn: "Adda Premium Casual Comfort Sandals",
        nameAr: "صندل أدا المريح للاستخدام اليومي",
        image: "/fotware/footwear.png",
        href: "/collections/footwear/cushioning-sneakers",
        brandName: "ADDA",
        brandLogo: "/brandlogo/brand-2-clean.png",
      },
      {
        id: "ft-2",
        nameEn: "MagicWalk Dynamic Cushioning Sports Sneakers",
        nameAr: "حذاء رياضي ماجيك ووك عالي الأداء",
        image: "/fotware/brand-magicwalk.jpg",
        href: "/collections/footwear/magicwalk-comfort",
        brandName: "MAGICWALK",
        brandLogo: "/brandlogo/brand-1-clean.png",
      },
      {
        id: "ft-3",
        nameEn: "Adda Lightweight Daily Slippers",
        nameAr: "شبشب أدا الكاجوال خفيف الوزن",
        image: "/herosection/footwear.png",
        href: "/collections/footwear/street-runner",
        brandName: "ADDA",
        brandLogo: "/brandlogo/brand-2-clean.png",
      },
      {
        id: "ft-4",
        nameEn: "MagicWalk Air Cushion Walking Shoes",
        nameAr: "أحذية ماجيك ووك الهوائية المريحة للمشي",
        image: "/fotware/footwear.png",
        href: "/collections/footwear/breathable-knit",
        brandName: "MAGICWALK",
        brandLogo: "/brandlogo/brand-1-clean.png",
      },
      {
        id: "ft-5",
        nameEn: "Adda Active Slip-On Outdoor Slides",
        nameAr: "سلايدز أدا للأنشطة الخارجية",
        image: "/fotware/brand-magicwalk.jpg",
        href: "/collections/footwear/everyday-loafers",
        brandName: "ADDA",
        brandLogo: "/brandlogo/brand-2-clean.png",
      },
    ],
  },
];
