import { connectToDatabase } from "@/lib/db/mongodb";
import { RegionModel, IRegion } from "@/lib/db/models/Region";
import type { UpdateQuery } from "mongoose";

export interface SerializedRegion {
  _id: string;
  name: string;
  code: string;
  currency: string;
  isActive: boolean;
  metaTitleSuffix?: string;
  metaDescriptionTemplate?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface HasId {
  _id: { toString(): string };
}

function serialize<T extends HasId>(doc: T): SerializedRegion {
  return { ...doc, _id: doc._id.toString() } as unknown as SerializedRegion;
}

export class RegionRepository {
  static async findAll(includeInactive = false): Promise<SerializedRegion[]> {
    await connectToDatabase();
    const query = includeInactive ? {} : { isActive: true };
    const docs = await RegionModel.find(query).sort({ createdAt: 1 }).lean();
    return (docs || []).map(serialize);
  }

  static async findById(id: string): Promise<SerializedRegion | null> {
    await connectToDatabase();
    const doc = await RegionModel.findById(id).lean();
    return doc ? serialize(doc) : null;
  }

  static async findByCode(code: string): Promise<SerializedRegion | null> {
    await connectToDatabase();
    const doc = await RegionModel.findOne({ code, isActive: true }).lean();
    return doc ? serialize(doc) : null;
  }

  static async create(data: Partial<IRegion>): Promise<SerializedRegion> {
    await connectToDatabase();
    const doc = await RegionModel.create(data);
    return serialize(doc.toObject());
  }

  static async update(id: string, data: UpdateQuery<IRegion>): Promise<SerializedRegion | null> {
    await connectToDatabase();
    const doc = await RegionModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    ).lean();
    return doc ? serialize(doc) : null;
  }

  static async delete(id: string): Promise<boolean> {
    await connectToDatabase();
    const result = await RegionModel.findByIdAndDelete(id);
    return !!result;
  }
}
