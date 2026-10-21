import { connectToDatabase as dbConnect } from "@/lib/db/mongodb";
import { BrandModel, IBrand } from "@/lib/db/models/Brand";

export interface SerializedBrand {
  _id: string;
  name: string;
  slug: string;
  category?: string;
  categorySlug?: string;
  categoryId?: string | null;
  logo?: string;
  image?: string;
  pdfUrl?: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export class BrandRepository {
  private static serialize(doc: any): SerializedBrand {
    const obj = doc.toObject();
    return {
      ...obj,
      _id: obj._id.toString(),
      categoryId: obj.categoryId ? obj.categoryId.toString() : null,
      createdAt: obj.createdAt.toISOString(),
      updatedAt: obj.updatedAt.toISOString(),
    };
  }

  static async findAll(): Promise<SerializedBrand[]> {
    await dbConnect();
    const brands = await BrandModel.find().sort({ createdAt: -1 });
    return brands.map(this.serialize);
  }

  static async findById(id: string): Promise<SerializedBrand | null> {
    await dbConnect();
    const brand = await BrandModel.findById(id);
    return brand ? this.serialize(brand) : null;
  }

  static async findBySlug(slug: string, excludeId?: string): Promise<SerializedBrand | null> {
    await dbConnect();
    const query: any = { slug: slug.trim().toLowerCase() };
    if (excludeId) query._id = { $ne: excludeId };
    const brand = await BrandModel.findOne(query);
    return brand ? this.serialize(brand) : null;
  }

  static async findByName(name: string, excludeId?: string): Promise<SerializedBrand | null> {
    await dbConnect();
    const query: any = { name: { $regex: new RegExp(`^${name.trim()}$`, "i") } };
    if (excludeId) query._id = { $ne: excludeId };
    const brand = await BrandModel.findOne(query);
    return brand ? this.serialize(brand) : null;
  }

  static async create(data: Partial<IBrand>): Promise<SerializedBrand> {
    await dbConnect();
    const newBrand = new BrandModel(data);
    await newBrand.save();
    return this.serialize(newBrand);
  }

  static async update(id: string, data: Partial<IBrand>): Promise<SerializedBrand | null> {
    await dbConnect();
    const updated = await BrandModel.findByIdAndUpdate(id, data, { new: true });
    return updated ? this.serialize(updated) : null;
  }

  static async delete(id: string): Promise<boolean> {
    await dbConnect();
    const result = await BrandModel.findByIdAndDelete(id);
    return result !== null;
  }
}
