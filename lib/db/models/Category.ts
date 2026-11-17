import mongoose, { Schema, Document, Model } from "mongoose";
import { noBase64Validator } from "@/lib/db/validators";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  faq?: { question: string; answer: string }[];
  image: string;
  parentId?: mongoose.Types.ObjectId | ICategory | null;
  parentSlug?: string;
  status: "active" | "disabled";
  productCount: number;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true, trim: true, lowercase: true },
    description: { type: String, default: "" },
    longDescription: { type: String, default: "" },
    faq: [{ question: String, answer: String }],
    image: { type: String, default: "", validate: noBase64Validator },
    parentId: { type: Schema.Types.ObjectId, ref: "Category", default: null },
    parentSlug: { type: String, default: "" },
    status: { type: String, enum: ["active", "disabled"], default: "active" },
    productCount: { type: Number, default: 0 },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    keywords: { type: [String], default: [] },
  },
  { timestamps: true }
);

CategorySchema.index({ status: 1, slug: 1 });
CategorySchema.index({ parentSlug: 1 });

export const CategoryModel: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
