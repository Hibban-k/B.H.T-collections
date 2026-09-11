import { connectToDatabase } from "@/lib/db/mongodb";
import { RegionModel, IRegion } from "@/lib/db/models/Region";

export interface SerializedRegion {
  _id: string;
  name: string;
  code: string;
  currency: string;
  isActive: boolean;
}

export class RegionService {
  static async getRegions(): Promise<SerializedRegion[]> {
    await connectToDatabase();
    const docs = await RegionModel.find({ isActive: true }).lean();
    return docs.map(doc => ({
      ...doc,
      _id: doc._id.toString()
    })) as unknown as SerializedRegion[];
  }

  static async getRegionByCode(code: string): Promise<SerializedRegion | null> {
    await connectToDatabase();
    const doc = await RegionModel.findOne({ code, isActive: true }).lean();
    if (!doc) return null;
    return { ...doc, _id: doc._id.toString() } as unknown as SerializedRegion;
  }
}
