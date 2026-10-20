import { CategoryRepository, SerializedCategory } from "@/lib/repositories/category.repository";
import type { ICategory } from "@/lib/db/models/Category";

export interface CreateCategoryInput {
  name: string;
  slug?: string;
  description?: string;
  longDescription?: string;
  image?: string;
  parentId?: string | null;
  parentSlug?: string;
  status?: "active" | "disabled";
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export class CategoryService {
  static async getCategories(): Promise<SerializedCategory[]> {
    return CategoryRepository.findAll();
  }

  static async getCategoryById(id: string): Promise<SerializedCategory | null> {
    return CategoryRepository.findById(id);
  }

  static async getCategoryBySlug(slug: string): Promise<SerializedCategory | null> {
    return CategoryRepository.findBySlug(slug);
  }

  static async createCategory(input: CreateCategoryInput): Promise<SerializedCategory> {
    const trimmedName = input.name?.trim() || "New Category";
    const existingName = await CategoryRepository.findByName(trimmedName);
    if (existingName) {
      throw new Error(`Category with name "${trimmedName}" already exists.`);
    }

    const slug =
      (input.slug?.trim().toLowerCase() ||
      trimmedName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")) ||
      `cat-${Date.now()}`;

    const existingSlug = await CategoryRepository.findBySlug(slug);
    if (existingSlug) {
      throw new Error(`Category with slug "${slug}" already exists.`);
    }

    const categoryData: Partial<ICategory> = {
      name: trimmedName,
      slug,
      description: input.description || "",
      longDescription: input.longDescription || "",
      image: input.image || "/collections/korean-super-soft-blanket.png",
      parentId: (input.parentId as any) || null,
      parentSlug: input.parentSlug || "",
      status: input.status || "active",
      metaTitle: input.metaTitle || "",
      metaDescription: input.metaDescription || "",
      keywords: input.keywords || [],
      productCount: 0,
    };

    return CategoryRepository.create(categoryData);
  }

  static async updateCategory(id: string, updates: Partial<CreateCategoryInput>): Promise<SerializedCategory | null> {
    if (updates.name) {
      const existingName = await CategoryRepository.findByName(updates.name.trim(), id);
      if (existingName) {
        throw new Error(`Category with name "${updates.name.trim()}" already exists.`);
      }
    }
    if (updates.slug) {
      const existingSlug = await CategoryRepository.findBySlug(updates.slug.trim().toLowerCase(), id);
      if (existingSlug) {
        throw new Error(`Category with slug "${updates.slug.trim().toLowerCase()}" already exists.`);
      }
    }

    const sanitized: Partial<ICategory> = { ...(updates as Partial<ICategory>) };
    if (sanitized.name) sanitized.name = sanitized.name.trim();
    if (sanitized.slug) sanitized.slug = sanitized.slug.trim().toLowerCase();
    return CategoryRepository.update(id, sanitized);
  }

  static async deleteCategory(id: string): Promise<boolean> {
    return CategoryRepository.delete(id);
  }
}
