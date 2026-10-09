import { connectToDatabase } from "@/lib/db/mongodb";
import { ProductModel, IProduct } from "@/lib/db/models/Product";
import type { UpdateQuery } from "mongoose";

export interface ProductFilter {
  status?: string;
  categorySlug?: string;
  showOnHomepage?: boolean;
  showOnCollection?: boolean;
  featured?: boolean;
  search?: string;
}

export interface SerializedProduct {
  _id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  salePrice?: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  shortDescription: string;
  sizes: string[];
  colors: string[];
  materials: string[];
  stock: number;
  badge?: string;
  featured: boolean;
  bestseller: boolean;
  showOnHomepage: boolean;
  showOnCollection: boolean;
  crossSellSlugs?: string[];
  additionalCategories?: string[];
  brand?: any;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  status: "published" | "draft" | "disabled";
  createdAt: Date;
  updatedAt: Date;
}

function buildMongoFilter(options?: ProductFilter): Record<string, unknown> {
  const filter: Record<string, unknown> = {};
  if (!options) return filter;

  if (options.status) filter.status = options.status;
  if (options.categorySlug) {
    filter.$or = [
      { categorySlug: options.categorySlug },
      { additionalCategories: options.categorySlug }
    ];
  }
  if (options.showOnHomepage !== undefined) filter.showOnHomepage = options.showOnHomepage;
  if (options.showOnCollection !== undefined) filter.showOnCollection = options.showOnCollection;
  if (options.featured !== undefined) filter.featured = options.featured;
  if (options.search) {
    // If $or already exists (from categorySlug), we must use $and to combine them
    const searchOr = [
      { name: { $regex: options.search, $options: "i" } },
      { description: { $regex: options.search, $options: "i" } },
    ];
    if (filter.$or) {
      filter.$and = [{ $or: filter.$or }, { $or: searchOr }];
      delete filter.$or;
    } else {
      filter.$or = searchOr;
    }
  }
  return filter;
}

interface HasId {
  _id: { toString(): string };
}

function serialize<T extends HasId>(doc: T): SerializedProduct {
  return { ...doc, _id: doc._id.toString() } as unknown as SerializedProduct;
}

export class ProductRepository {
  static async findAll(options?: ProductFilter): Promise<SerializedProduct[]> {
    await connectToDatabase();
    const filter = buildMongoFilter(options);
    const docs = await ProductModel.find(filter).sort({ createdAt: -1 }).lean();
    return (docs || []).map(serialize);
  }

  static async findById(id: string): Promise<SerializedProduct | null> {
    await connectToDatabase();
    const doc = await ProductModel.findById(id).lean();
    return doc ? serialize(doc) : null;
  }

  static async findBySlug(slug: string): Promise<SerializedProduct | null> {
    await connectToDatabase();
    const doc = await ProductModel.findOne({ slug }).lean();
    return doc ? serialize(doc) : null;
  }

  static async findBySlugs(slugs: string[]): Promise<SerializedProduct[]> {
    if (!slugs || slugs.length === 0) return [];
    await connectToDatabase();
    const docs = await ProductModel.find({ slug: { $in: slugs }, status: "published" }).lean();
    return docs.map(serialize);
  }

  static async findRelated(categorySlug: string, excludeSlug: string, limit = 4): Promise<SerializedProduct[]> {
    await connectToDatabase();
    const docs = await ProductModel.find({
      categorySlug,
      slug: { $ne: excludeSlug },
      status: "published"
    }).limit(limit).lean();
    return (docs || []).map(serialize);
  }

  static async create(data: Partial<IProduct>): Promise<SerializedProduct> {
    await connectToDatabase();
    const doc = await ProductModel.create(data);
    return serialize(doc.toObject());
  }

  static async update(id: string, data: UpdateQuery<IProduct>): Promise<SerializedProduct | null> {
    await connectToDatabase();
    const doc = await ProductModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    ).lean();
    return doc ? serialize(doc) : null;
  }

  static async delete(id: string): Promise<boolean> {
    await connectToDatabase();
    const result = await ProductModel.findByIdAndDelete(id);
    return !!result;
  }
}
