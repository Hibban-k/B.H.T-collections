import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBrand extends Document {
  name: string;
  slug: string;
  category?: string;
  categorySlug?: string;
  categoryId?: mongoose.Types.ObjectId;
  logo?: string;
  image?: string;
  pdfUrl?: string;
  description?: string;
  // SEO fields
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BrandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true, trim: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true, trim: true, lowercase: true },
    category: { type: String, default: "" },
    categorySlug: { type: String, default: "", index: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", default: null },
    logo: { type: String, default: "" },
    image: { type: String, default: "" },
    pdfUrl: { type: String, default: "" },
    description: { type: String, default: "" },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    keywords: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const BrandModel: Model<IBrand> =
  mongoose.models.Brand || mongoose.model<IBrand>("Brand", BrandSchema);
