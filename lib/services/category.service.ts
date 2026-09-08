import { CategoryRepository, SerializedCategory } from "@/lib/repositories/category.repository";
import type { ICategory } from "@/lib/db/models/Category";

export interface CreateCategoryInput {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  status?: "active" | "disabled";
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
    const slug =
      input.slug ||
      input.name
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") ||
      `cat-${Date.now()}`;

    const categoryData: Partial<ICategory> = {
      name: input.name || "New Category",
      slug,
      description: input.description || "",
      image: input.image || "/collections/korean-super-soft-blanket.png",
      status: input.status || "active",
      productCount: 0,
    };

    return CategoryRepository.create(categoryData);
  }

  static async updateCategory(id: string, updates: Partial<CreateCategoryInput>): Promise<SerializedCategory | null> {
    return CategoryRepository.update(id, updates as Partial<ICategory>);
  }

  static async deleteCategory(id: string): Promise<boolean> {
    return CategoryRepository.delete(id);
  }
}
