export interface SubcategoryItem {
  id: string;
  nameEn: string;
  nameAr: string;
  href: string;
}

export interface MegaCategory {
  id: string;
  nameEn: string;
  nameAr: string;
  href: string;
  accentColor: string;
  iconBg: string;
  image: string;
  imageAlt: string;
  subcategories: SubcategoryItem[];
  viewAllTextEn: string;
  viewAllTextAr: string;
}

export interface SecondaryNavItem {
  id: string;
  nameEn: string;
  nameAr: string;
  href: string;
  icon: "home" | "grid" | "user" | "shield" | "mail";
  hasDropdown?: boolean;
}

export const MEGA_MENU_CATEGORIES: MegaCategory[] = [
  {
    id: "bedding",
    nameEn: "Bedding",
    nameAr: "المفروشات",
    href: "/bedding",
    accentColor: "text-bht-red",
    iconBg: "bg-bht-red",
    image: "/herosection/home-textiles.png",
    imageAlt: "Luxury Bedding, Comforters & Blankets",
    subcategories: [
      { id: "bed-sheets", nameEn: "Bed Sheets", nameAr: "ملاءات السرير", href: "/bedding?subcategory=bed-sheets" },
      { id: "duvet-covers", nameEn: "Duvet Covers", nameAr: "أغطية اللحاف", href: "/bedding?subcategory=duvet-covers" },
      { id: "pillows", nameEn: "Pillows", nameAr: "الوسائد", href: "/bedding?subcategory=pillows" },
      { id: "comforters", nameEn: "Comforters", nameAr: "الألحفة الفاخرة", href: "/bedding?subcategory=comforters" },
      { id: "blankets", nameEn: "Blankets", nameAr: "البطانيات", href: "/bedding?subcategory=blankets" },
      { id: "towels", nameEn: "Towels", nameAr: "المناشف", href: "/bedding?subcategory=towels" },
    ],
    viewAllTextEn: "View All Bedding",
    viewAllTextAr: "عرض كل المفروشات",
  },
  {
    id: "travelling",
    nameEn: "Travel Bags",
    nameAr: "حقائب السفر",
    href: "/travel-bags",
    accentColor: "text-bht-blue",
    iconBg: "bg-bht-blue",
    image: "/herosection/travel-luggage.png",
    imageAlt: "Travel Luggage, Trolleys & Bags",
    subcategories: [
      { id: "trolleys", nameEn: "Trolleys & Suitcases", nameAr: "حقائب السفر والترولي", href: "/travel-bags?subcategory=trolleys" },
      { id: "travel-bags", nameEn: "Travel Bags", nameAr: "حقائب الرحلات", href: "/travel-bags?subcategory=travel-bags" },
      { id: "backpacks", nameEn: "Backpacks", nameAr: "حقائب الظهر", href: "/travel-bags?subcategory=backpacks" },
      { id: "accessories", nameEn: "Travel Accessories", nameAr: "إكسسوارات السفر", href: "/travel-bags?subcategory=travel-accessories" },
      { id: "luggage-sets", nameEn: "Luggage Sets", nameAr: "أطقم الحقائب الكاملة", href: "/travel-bags?subcategory=luggage-sets" },
    ],
    viewAllTextEn: "View All Travel Bags",
    viewAllTextAr: "عرض كل حقائب السفر",
  },
  {
    id: "footwear",
    nameEn: "Footwear",
    nameAr: "الأحذية",
    href: "/footwear",
    accentColor: "text-bht-green",
    iconBg: "bg-bht-green",
    image: "/fotware/footwear.png",
    imageAlt: "Men's, Women's & Athletic Footwear",
    subcategories: [
      { id: "mens", nameEn: "Men's Footwear", nameAr: "أحذية رجالية", href: "/footwear?subcategory=mens-footwear" },
      { id: "womens", nameEn: "Women's Footwear", nameAr: "أحذية نسائية", href: "/footwear?subcategory=womens-footwear" },
      { id: "kids", nameEn: "Kids' Footwear", nameAr: "أحذية أطفال", href: "/footwear?subcategory=kids-footwear" },
      { id: "sports", nameEn: "Sports Shoes", nameAr: "أحذية رياضية", href: "/footwear?subcategory=sports-shoes" },
      { id: "casual", nameEn: "Casual Shoes", nameAr: "أحذية كاجوال", href: "/footwear?subcategory=casual-shoes" },
    ],
    viewAllTextEn: "View All Footwear",
    viewAllTextAr: "عرض كل الأحذية",
  },
];

export const SECONDARY_NAV_ITEMS: SecondaryNavItem[] = [
  { id: "home", nameEn: "Home", nameAr: "الرئيسية", href: "/", icon: "home" },
  { id: "collection", nameEn: "Collection", nameAr: "التشكيلة", href: "/bedding", icon: "grid", hasDropdown: true },
  { id: "about", nameEn: "About Us", nameAr: "من نحن", href: "/about", icon: "user" },
  { id: "brands", nameEn: "Brand & Clients", nameAr: "العلامات التجارية والعملاء", href: "/brands", icon: "shield" },
  { id: "contact", nameEn: "Contact Us", nameAr: "اتصل بنا", href: "/contact", icon: "mail" },
];
