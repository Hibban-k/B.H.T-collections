import { BrandRepository, SerializedBrand } from "@/lib/repositories/brand.repository";
import type { IBrand } from "@/lib/db/models/Brand";

export interface CreateBrandInput {
  name: string;
  slug?: string;
  logo?: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  isActive?: boolean;
}

export class BrandService {
  static async getBrands(): Promise<SerializedBrand[]> {
    return BrandRepository.findAll();
  }

  static async getBrandById(id: string): Promise<SerializedBrand | null> {
    return BrandRepository.findById(id);
  }

  static async createBrand(input: CreateBrandInput): Promise<SerializedBrand> {
    const slug =
      input.slug ||
      input.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") ||
      `brand-${Date.now()}`;

    const brandData: Partial<IBrand> = {
      name: input.name,
      slug,
      logo: input.logo || "",
      description: input.description || "",
      metaTitle: input.metaTitle || "",
      metaDescription: input.metaDescription || "",
      keywords: input.keywords || [],
      isActive: input.isActive !== undefined ? Boolean(input.isActive) : true,
    };

    return BrandRepository.create(brandData);
  }

  static async updateBrand(id: string, updates: Partial<CreateBrandInput>): Promise<SerializedBrand | null> {
    const sanitized: Partial<IBrand> = { ...(updates as Partial<IBrand>) };
    return BrandRepository.update(id, sanitized);
  }

  static async deleteBrand(id: string): Promise<boolean> {
    return BrandRepository.delete(id);
  }
}
