export interface BrandClientItem {
  id: string;
  nameEn: string;
  nameAr: string;
  category: "all" | "bedding" | "travel" | "footwear" | "corporate";
  categoryNameEn: string;
  categoryNameAr: string;
  logo: string;
  descriptionEn: string;
  descriptionAr: string;
  href: string;
}
