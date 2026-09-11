import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  faq?: { question: string; answer: string }[];
  image: string;
  type: "primary" | "secondary";
  status: "active" | "disabled";
  productCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, default: "" },
    longDescription: { type: String, default: "" },
    faq: [{ question: String, answer: String }],
    image: { type: String, default: "" },
    type: { type: String, enum: ["primary", "secondary"], default: "primary" },
    status: { type: String, enum: ["active", "disabled"], default: "active" },
    productCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const CategoryModel: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
