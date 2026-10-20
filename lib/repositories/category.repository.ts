import { connectToDatabase } from "@/lib/db/mongodb";
import { CategoryModel, ICategory } from "@/lib/db/models/Category";
import type { UpdateQuery } from "mongoose";

export interface SerializedCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  faq?: { question: string; answer: string }[];
  image: string;
  parentId?: string | null;
  parentSlug?: string;
  status: "active" | "disabled";
  productCount: number;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface HasId {
  _id: { toString(): string };
  parentId?: { toString(): string } | null;
}

function serialize<T extends HasId>(doc: T): SerializedCategory {
  return {
    ...doc,
    _id: doc._id.toString(),
    parentId: doc.parentId ? doc.parentId.toString() : null,
  } as unknown as SerializedCategory;
}

export class CategoryRepository {
  static async findAll(): Promise<SerializedCategory[]> {
    await connectToDatabase();
    const docs = await CategoryModel.find().sort({ createdAt: 1 }).lean();
    return (docs || []).map(serialize);
  }

  static async findById(id: string): Promise<SerializedCategory | null> {
    await connectToDatabase();
    const doc = await CategoryModel.findById(id).lean();
    return doc ? serialize(doc) : null;
  }

  static async findBySlug(slug: string, excludeId?: string): Promise<SerializedCategory | null> {
    await connectToDatabase();
    const query: any = { slug: slug.trim().toLowerCase() };
    if (excludeId) query._id = { $ne: excludeId };
    const doc = await CategoryModel.findOne(query).lean();
    return doc ? serialize(doc) : null;
  }

  static async findByName(name: string, excludeId?: string): Promise<SerializedCategory | null> {
    await connectToDatabase();
    const query: any = { name: { $regex: new RegExp(`^${name.trim()}$`, "i") } };
    if (excludeId) query._id = { $ne: excludeId };
    const doc = await CategoryModel.findOne(query).lean();
    return doc ? serialize(doc) : null;
  }

  static async create(data: Partial<ICategory>): Promise<SerializedCategory> {
    await connectToDatabase();
    const doc = await CategoryModel.create(data);
    return serialize(doc.toObject());
  }

  static async update(id: string, data: UpdateQuery<ICategory>): Promise<SerializedCategory | null> {
    await connectToDatabase();
    const doc = await CategoryModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    ).lean();
    return doc ? serialize(doc) : null;
  }

  static async delete(id: string): Promise<boolean> {
    await connectToDatabase();
    const result = await CategoryModel.findByIdAndDelete(id);
    return !!result;
  }
}
