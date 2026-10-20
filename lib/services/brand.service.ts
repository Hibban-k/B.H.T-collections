import { BrandRepository, SerializedBrand } from "@/lib/repositories/brand.repository";
import type { IBrand } from "@/lib/db/models/Brand";

export interface CreateBrandInput {
  name: string;
  slug?: string;
  logo?: string;
  image?: string;
  pdfUrl?: string;
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
    const trimmedName = input.name.trim();
    const existingName = await BrandRepository.findByName(trimmedName);
    if (existingName) {
      throw new Error(`Brand with name "${trimmedName}" already exists.`);
    }

    const slug =
      (input.slug?.trim().toLowerCase() ||
      trimmedName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")) ||
      `brand-${Date.now()}`;

    const existingSlug = await BrandRepository.findBySlug(slug);
    if (existingSlug) {
      throw new Error(`Brand with slug "${slug}" already exists.`);
    }

    const brandData: Partial<IBrand> = {
      name: trimmedName,
      slug,
      logo: input.logo || "",
      image: input.image || "",
      pdfUrl: input.pdfUrl || "",
      description: input.description || "",
      metaTitle: input.metaTitle || "",
      metaDescription: input.metaDescription || "",
      keywords: input.keywords || [],
      isActive: input.isActive !== undefined ? Boolean(input.isActive) : true,
    };

    return BrandRepository.create(brandData);
  }

  static async updateBrand(id: string, updates: Partial<CreateBrandInput>): Promise<SerializedBrand | null> {
    if (updates.name) {
      const existingName = await BrandRepository.findByName(updates.name.trim(), id);
      if (existingName) {
        throw new Error(`Brand with name "${updates.name.trim()}" already exists.`);
      }
    }
    if (updates.slug) {
      const existingSlug = await BrandRepository.findBySlug(updates.slug.trim().toLowerCase(), id);
      if (existingSlug) {
        throw new Error(`Brand with slug "${updates.slug.trim().toLowerCase()}" already exists.`);
      }
    }

    const sanitized: Partial<IBrand> = { ...(updates as Partial<IBrand>) };
    if (sanitized.name) sanitized.name = sanitized.name.trim();
    if (sanitized.slug) sanitized.slug = sanitized.slug.trim().toLowerCase();
    return BrandRepository.update(id, sanitized);
  }

  static async deleteBrand(id: string): Promise<boolean> {
    return BrandRepository.delete(id);
  }
}
