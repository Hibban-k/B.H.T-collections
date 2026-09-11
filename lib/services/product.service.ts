import { ProductRepository, ProductFilter, SerializedProduct } from "@/lib/repositories/product.repository";
import { cleanImageUrl } from "@/lib/utils/image";
import type { IProduct } from "@/lib/db/models/Product";

export interface CreateProductInput {
  name: string;
  slug?: string;
  category?: string;
  categorySlug?: string;
  price: number;
  salePrice?: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  image?: string;
  images?: string[];
  description?: string;
  shortDescription?: string;
  sizes?: string[];
  colors?: string[];
  materials?: string[];
  stock?: number;
  badge?: string;
  featured?: boolean;
  bestseller?: boolean;
  showOnHomepage?: boolean;
  showOnCollection?: boolean;
  additionalCategories?: string[];
  status?: "published" | "draft" | "disabled";
}

export class ProductService {
  static async getProducts(options?: ProductFilter): Promise<SerializedProduct[]> {
    return ProductRepository.findAll(options);
  }

  static async getProductBySlug(slug: string): Promise<SerializedProduct | null> {
    return ProductRepository.findBySlug(slug);
  }

  static async getProductsBySlugs(slugs: string[]): Promise<SerializedProduct[]> {
    return ProductRepository.findBySlugs(slugs);
  }

  static async getRelatedProducts(categorySlug: string, excludeSlug: string, limit = 4) {
    return ProductRepository.findRelated(categorySlug, excludeSlug, limit);
  }

  static async getProductById(id: string): Promise<SerializedProduct | null> {
    return ProductRepository.findById(id);
  }

  static async createProduct(input: CreateProductInput): Promise<SerializedProduct> {
    const slug =
      input.slug ||
      input.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") ||
      `product-${Date.now()}`;

    const cleanImg = cleanImageUrl(input.image);
    const cleanImgs =
      input.images && input.images.length > 0
        ? input.images.map(cleanImageUrl)
        : [cleanImg];

    const productData: Partial<IProduct> = {
      name: input.name,
      slug,
      category: input.category || "Blankets",
      categorySlug: input.categorySlug || "blankets",
      price: Number(input.price) || 0,
      salePrice: input.salePrice ? Number(input.salePrice) : undefined,
      originalPrice: input.originalPrice ? Number(input.originalPrice) : undefined,
      rating: input.rating || 5.0,
      reviewCount: input.reviewCount || 1,
      image: cleanImg,
      images: cleanImgs,
      description: input.description || "",
      shortDescription:
        input.shortDescription || input.description?.slice(0, 120) || "",
      sizes: input.sizes || ["Standard"],
      colors: input.colors || ["Classic"],
      materials: input.materials || ["100% Premium Material"],
      stock: input.stock !== undefined ? Number(input.stock) : 50,
      badge: input.badge || undefined,
      featured: Boolean(input.featured),
      bestseller: Boolean(input.bestseller),
      showOnHomepage:
        input.showOnHomepage !== undefined ? Boolean(input.showOnHomepage) : true,
      showOnCollection:
        input.showOnCollection !== undefined
          ? Boolean(input.showOnCollection)
          : true,
      additionalCategories: input.additionalCategories || [],
      status: input.status || "published",
    };

    return ProductRepository.create(productData);
  }

  static async updateProduct(id: string, updates: Partial<CreateProductInput>): Promise<SerializedProduct | null> {
    const sanitized: Partial<IProduct> = { ...(updates as Partial<IProduct>) };
    if (sanitized.image) {
      sanitized.image = cleanImageUrl(sanitized.image);
    }
    if (sanitized.images && sanitized.images.length > 0) {
      sanitized.images = sanitized.images.map(cleanImageUrl);
    }
    return ProductRepository.update(id, sanitized);
  }

  static async deleteProduct(id: string): Promise<boolean> {
    return ProductRepository.delete(id);
  }
}
