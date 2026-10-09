import { connectToDatabase as dbConnect } from "@/lib/db/mongodb";
import { BrandModel, IBrand } from "@/lib/db/models/Brand";

export interface SerializedBrand {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
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

  static async findBySlug(slug: string): Promise<SerializedBrand | null> {
    await dbConnect();
    const brand = await BrandModel.findOne({ slug });
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
