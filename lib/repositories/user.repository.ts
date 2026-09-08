import { connectToDatabase } from "@/lib/db/mongodb";
import { UserModel, IUser } from "@/lib/db/models/User";
import type { Role } from "@/lib/auth/rbac";
import type { UpdateQuery } from "mongoose";

export interface SafeUser {
  _id: string;
  email: string;
  name: string;
  role: Role;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithPassword extends SafeUser {
  hashedPassword: string;
}

interface HasId {
  _id: { toString(): string };
  hashedPassword?: string;
}

function serialize<T extends HasId>(doc: T): SafeUser {
  const rest = { ...doc, _id: doc._id.toString() } as unknown as Record<string, unknown>;
  delete rest.hashedPassword;
  return rest as unknown as SafeUser;
}

function serializeWithPassword<T extends HasId>(doc: T): UserWithPassword {
  return { ...doc, _id: doc._id.toString() } as unknown as UserWithPassword;
}

export class UserRepository {
  static async findByEmail(email: string): Promise<UserWithPassword | null> {
    await connectToDatabase();
    const doc = await UserModel.findOne({ email: email.toLowerCase().trim() }).lean();
    return doc ? serializeWithPassword(doc) : null;
  }

  static async findById(id: string): Promise<SafeUser | null> {
    await connectToDatabase();
    const doc = await UserModel.findById(id).lean();
    return doc ? serialize(doc) : null;
  }

  static async findAll(): Promise<SafeUser[]> {
    await connectToDatabase();
    const docs = await UserModel.find().sort({ createdAt: -1 }).lean();
    return docs.map(serialize);
  }

  static async create(data: {
    email: string;
    hashedPassword: string;
    name: string;
    role: Role;
  }): Promise<SafeUser> {
    await connectToDatabase();
    const doc = await UserModel.create(data);
    return serialize(doc.toObject());
  }

  static async update(id: string, data: UpdateQuery<IUser>): Promise<SafeUser | null> {
    await connectToDatabase();
    const doc = await UserModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    ).lean();
    return doc ? serialize(doc) : null;
  }

  static async delete(id: string): Promise<boolean> {
    await connectToDatabase();
    const result = await UserModel.findByIdAndDelete(id);
    return !!result;
  }

  static async countByRole(role: Role): Promise<number> {
    await connectToDatabase();
    return UserModel.countDocuments({ role });
  }
}
