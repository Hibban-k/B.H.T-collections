import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRegion extends Document {
  name: string;
  code: string; // e.g., 'sa', 'om', 'qa'
  currency: string;
  isActive: boolean;
}

const RegionSchema = new Schema<IRegion>({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true, lowercase: true },
  currency: { type: String, default: "AED" },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const RegionModel: Model<IRegion> =
  mongoose.models.Region || mongoose.model<IRegion>("Region", RegionSchema);
