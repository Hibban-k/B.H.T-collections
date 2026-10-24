import { ProductRepository, ProductFilter, SerializedProduct } from "@/lib/repositories/product.repository";
import { cleanImageUrl } from "@/lib/utils/image";
import type { IProduct } from "@/lib/db/models/Product";
import type { IProductVariant } from "@/lib/db/models/Product";

export interface CreateProductInput {
  name: string;
  slug?: string;
  sku?: string;
  category?: string;
  categorySlug?: string;
  subcategoryId?: string | null;
  subcategorySlug?: string;
  price: number;
  salePrice?: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  brand?: string;
  image?: string;
  images?: string[];
  description?: string;
  shortDescription?: string;
  sizes?: string[];
  colors?: string[];
  materials?: string[];
  variants?: IProductVariant[];
  stock?: number;
  badge?: string;
  featured?: boolean;
  bestseller?: boolean;
  showOnHomepage?: boolean;
  showOnCollection?: boolean;
  additionalCategories?: string[];
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
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
    const trimmedName = input.name.trim();
    const existingName = await ProductRepository.findByName(trimmedName);
    if (existingName) {
      throw new Error(`Product with name "${trimmedName}" already exists.`);
    }

    const slug =
      (input.slug?.trim().toLowerCase() ||
      trimmedName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")) ||
      `product-${Date.now()}`;

    const existingSlug = await ProductRepository.findBySlug(slug);
    if (existingSlug) {
      throw new Error(`Product with slug "${slug}" already exists.`);
    }

    const shouldBeOnHomepage = Boolean(input.featured || input.showOnHomepage);
    if (shouldBeOnHomepage) {
      const catCheck = input.categorySlug || input.category || "bedding";
      const count = await ProductRepository.countFeaturedOrHomepage(catCheck);
      if (count >= 4) {
        throw new Error(
          `A maximum of 4 products in main category "${input.category || catCheck}" can be featured/shown on the home screen. More than 4 is restricted.`
        );
      }
    }

    const cleanImg = cleanImageUrl(input.image);
    const cleanImgs =
      input.images && input.images.length > 0
        ? input.images.map(cleanImageUrl)
        : [cleanImg];

    const productData: Partial<IProduct> = {
      name: trimmedName,
      slug,
      sku: input.sku ? input.sku.trim().toUpperCase() : undefined,
      category: input.category || "Blankets",
      categorySlug: input.categorySlug || "blankets",
      subcategoryId: (input.subcategoryId as any) || undefined,
      subcategorySlug: input.subcategorySlug || "",
      price: Number(input.price) || 0,
      salePrice: input.salePrice ? Number(input.salePrice) : undefined,
      originalPrice: input.originalPrice ? Number(input.originalPrice) : undefined,
      rating: input.rating || 5.0,
      reviewCount: input.reviewCount || 1,
      brand: input.brand ? (input.brand as any) : undefined,
      image: cleanImg,
      images: cleanImgs,
      description: input.description || "",
      shortDescription:
        input.shortDescription || input.description?.slice(0, 120) || "",
      sizes: input.sizes || ["Standard"],
      colors: input.colors || ["Classic"],
      materials: input.materials || ["100% Premium Material"],
      variants: input.variants || [],
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
      metaTitle: input.metaTitle || "",
      metaDescription: input.metaDescription || "",
      keywords: input.keywords || [],
      status: input.status || "published",
    };

    return ProductRepository.create(productData);
  }

  static async updateProduct(id: string, updates: Partial<CreateProductInput>): Promise<SerializedProduct | null> {
    if (updates.name) {
      const existingName = await ProductRepository.findByName(updates.name.trim(), id);
      if (existingName) {
        throw new Error(`Product with name "${updates.name.trim()}" already exists.`);
      }
    }
    if (updates.slug) {
      const existingSlug = await ProductRepository.findBySlug(updates.slug.trim().toLowerCase(), id);
      if (existingSlug) {
        throw new Error(`Product with slug "${updates.slug.trim().toLowerCase()}" already exists.`);
      }
    }

    if (updates.featured === true || updates.showOnHomepage === true) {
      const existingProduct = await ProductRepository.findById(id);
      const catCheck = updates.categorySlug || updates.category || existingProduct?.categorySlug || existingProduct?.category || "bedding";
      const count = await ProductRepository.countFeaturedOrHomepage(catCheck, id);
      if (count >= 4) {
        throw new Error(
          `A maximum of 4 products in main category "${updates.category || existingProduct?.category || catCheck}" can be featured/shown on the home screen. More than 4 is restricted.`
        );
      }
    }

    const sanitized: Partial<IProduct> = { ...(updates as Partial<IProduct>) };
    if (sanitized.name) sanitized.name = sanitized.name.trim();
    if (sanitized.slug) sanitized.slug = sanitized.slug.trim().toLowerCase();
    if (sanitized.image) {
      sanitized.image = cleanImageUrl(sanitized.image);
    }
    if (Array.isArray(sanitized.images)) {
      sanitized.images = sanitized.images.map(cleanImageUrl);
      if (!sanitized.image && sanitized.images.length > 0) {
        sanitized.image = sanitized.images[0];
      }
    }
    return ProductRepository.update(id, sanitized);
  }

  static async deleteProduct(id: string): Promise<boolean> {
    return ProductRepository.delete(id);
  }
}
