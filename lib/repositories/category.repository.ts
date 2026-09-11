import { connectToDatabase } from "@/lib/db/mongodb";
import { CategoryModel, ICategory } from "@/lib/db/models/Category";
import type { UpdateQuery } from "mongoose";

export interface SerializedCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  status: "active" | "disabled";
  productCount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface HasId {
  _id: { toString(): string };
}

function serialize<T extends HasId>(doc: T): SerializedCategory {
  return { ...doc, _id: doc._id.toString() } as unknown as SerializedCategory;
}

import { categories as mockCategories } from "@/lib/data";

export class CategoryRepository {
  static async findAll(): Promise<SerializedCategory[]> {
    try {
      await connectToDatabase();
      const docs = await CategoryModel.find().sort({ createdAt: 1 }).lean();
      if (docs && docs.length > 0) {
        return docs.map(serialize);
      }
    } catch (error) {
      console.warn("CategoryRepository.findAll falling back to mock data:", error);
    }

    return mockCategories.map((c) => ({
      ...c,
      _id: c.id,
      status: "active" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    })) as unknown as SerializedCategory[];
  }

  static async findById(id: string): Promise<SerializedCategory | null> {
    try {
      await connectToDatabase();
      const doc = await CategoryModel.findById(id).lean();
      if (doc) return serialize(doc);
    } catch (error) {
      console.warn("CategoryRepository.findById falling back to mock data:", error);
    }

    const c = mockCategories.find((item) => item.id === id);
    if (!c) return null;
    return {
      ...c,
      _id: c.id,
      status: "active" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as unknown as SerializedCategory;
  }

  static async findBySlug(slug: string): Promise<SerializedCategory | null> {
    try {
      await connectToDatabase();
      const doc = await CategoryModel.findOne({ slug }).lean();
      if (doc) return serialize(doc);
    } catch (error) {
      console.warn("CategoryRepository.findBySlug falling back to mock data:", error);
    }

    const c = mockCategories.find((item) => item.slug === slug);
    if (!c) return null;
    return {
      ...c,
      _id: c.id,
      status: "active" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as unknown as SerializedCategory;
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
