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
  type: "primary" | "secondary";
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
}

function serialize<T extends HasId>(doc: T): SerializedCategory {
  return { ...doc, _id: doc._id.toString() } as unknown as SerializedCategory;
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

  static async findBySlug(slug: string): Promise<SerializedCategory | null> {
    await connectToDatabase();
    const doc = await CategoryModel.findOne({ slug }).lean();
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
