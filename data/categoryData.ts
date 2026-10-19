export interface CategoryContainer {
  id: string;
  categoryNameEn: string;
  categoryNameAr: string;
  brandName: string;
  brandLogo: string;
  brandLogoClean?: string;
  productImage: string;
  href: string;
  subtitleEn?: string;
  subtitleAr?: string;
}

export const CATEGORY_SHOWCASE_ITEMS: CategoryContainer[] = [
  {
    id: "bedding-card",
    categoryNameEn: "BEDDING",
    categoryNameAr: "المفروشات",
    brandName: "ROYALON 3D",
    brandLogo: "/brandlogo/brand-7-white.png",
    brandLogoClean: "/brandlogo/brand-7-clean.png",
    productImage: "/badding/bht-comforters.jpg",
    href: "/collections/bedding",
    subtitleEn: "Hana • Damas Gold • Royalon 3D",
    subtitleAr: "هناء • داماس جولد • رويالون 3D",
  },
  {
    id: "travelling-card",
    categoryNameEn: "TRAVEL BAGS",
    categoryNameAr: "حقائب السفر",
    brandName: "INFINITY PARIS",
    brandLogo: "/brandlogo/brand-4-white.png",
    brandLogoClean: "/brandlogo/brand-4-clean.png",
    productImage: "/herosection/travel-luggage.png",
    href: "/collections/travel-bags",
    subtitleEn: "Infinity Paris • TravelGo",
    subtitleAr: "إنفينيتي باريس • ترافل جو",
  },
  {
    id: "footwear-card",
    categoryNameEn: "FOOTWEAR",
    categoryNameAr: "الأحذية",
    brandName: "MAGICWALK",
    brandLogo: "/brandlogo/brand-1-white.png",
    brandLogoClean: "/brandlogo/brand-1-clean.png",
    productImage: "/fotware/footwear.png",
    href: "/collections/footwear",
    subtitleEn: "MagicWalk • Adda",
    subtitleAr: "ماجيك ووك • أدا",
  },
];
