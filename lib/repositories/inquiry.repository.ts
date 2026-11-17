import { connectToDatabase } from "@/lib/db/mongodb";
import { InquiryModel, IInquiry } from "@/lib/db/models/Inquiry";

export interface InquiryFilter {
  status?: string;
  search?: string;
  limit?: number;
  skip?: number;
}

export interface SerializedInquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  productSlug?: string;
  productName?: string;
  status: "new" | "in_progress" | "resolved" | "archived";
  emailNotified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface HasId {
  _id: { toString(): string };
}

function serialize<T extends HasId>(doc: T): SerializedInquiry {
  return { ...doc, _id: doc._id.toString() } as unknown as SerializedInquiry;
}

function buildMongoFilter(options?: InquiryFilter): Record<string, unknown> {
  const filter: Record<string, unknown> = {};
  if (!options) return filter;

  if (options.status && options.status !== "all") {
    filter.status = options.status;
  }
  if (options.search && options.search.trim() !== "") {
    const term = options.search.trim();
    filter.$or = [
      { name: { $regex: term, $options: "i" } },
      { email: { $regex: term, $options: "i" } },
      { phone: { $regex: term, $options: "i" } },
      { subject: { $regex: term, $options: "i" } },
      { message: { $regex: term, $options: "i" } },
    ];
  }
  return filter;
}

export class InquiryRepository {
  static async create(data: Partial<IInquiry>): Promise<SerializedInquiry> {
    await connectToDatabase();
    const doc = await InquiryModel.create(data);
    return serialize(doc.toObject());
  }

  static async findAll(options?: InquiryFilter): Promise<SerializedInquiry[]> {
    await connectToDatabase();
    const filter = buildMongoFilter(options);
    const limit = options?.limit || 50;
    const skip = options?.skip || 0;
    const docs = await InquiryModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    return docs.map(serialize);
  }

  static async count(options?: InquiryFilter): Promise<number> {
    await connectToDatabase();
    const filter = buildMongoFilter(options);
    return InquiryModel.countDocuments(filter);
  }

  static async findById(id: string): Promise<SerializedInquiry | null> {
    await connectToDatabase();
    const doc = await InquiryModel.findById(id).lean();
    return doc ? serialize(doc) : null;
  }

  static async updateStatus(
    id: string,
    status: string,
    emailNotified?: boolean
  ): Promise<SerializedInquiry | null> {
    await connectToDatabase();
    const updateData: Record<string, unknown> = { status, updatedAt: new Date() };
    if (emailNotified !== undefined) {
      updateData.emailNotified = emailNotified;
    }
    const doc = await InquiryModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
    return doc ? serialize(doc) : null;
  }

  static async delete(id: string): Promise<boolean> {
    await connectToDatabase();
    const result = await InquiryModel.findByIdAndDelete(id);
    return !!result;
  }
}
