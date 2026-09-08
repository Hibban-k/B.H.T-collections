import { UserRepository } from "@/lib/repositories/user.repository";
import type { Role } from "@/lib/auth/rbac";
import bcrypt from "bcryptjs";

export class UserService {
  static async getUsers() {
    return UserRepository.findAll();
  }

  static async createUser(data: { email: string; password?: string; name: string; role?: Role }) {
    if (!data.email || !data.password || !data.name) {
      throw new Error("Email, password, and name are required");
    }

    const validRoles: Role[] = ["super_admin", "admin", "editor", "viewer"];
    if (data.role && !validRoles.includes(data.role)) {
      throw new Error(`Invalid role. Must be one of: ${validRoles.join(", ")}`);
    }

    const existing = await UserRepository.findByEmail(data.email);
    if (existing) {
      throw new Error("A user with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);
    
    return UserRepository.create({
      email: data.email.trim().toLowerCase(),
      hashedPassword,
      name: data.name.trim(),
      role: data.role || "viewer",
    });
  }

  static async updateUser(id: string, data: { name?: string; role?: string; isActive?: boolean; password?: string }) {
    const updates: Record<string, unknown> = {};

    if (data.name) updates.name = data.name.trim();
    if (data.role) {
      const validRoles: Role[] = ["super_admin", "admin", "editor", "viewer"];
      if (!validRoles.includes(data.role as Role)) {
        throw new Error(`Invalid role. Must be one of: ${validRoles.join(", ")}`);
      }
      updates.role = data.role;
    }
    if (data.isActive !== undefined) updates.isActive = Boolean(data.isActive);
    if (data.password) {
      updates.hashedPassword = await bcrypt.hash(data.password, 12);
    }

    const updated = await UserRepository.update(id, updates);
    if (!updated) {
      throw new Error("User not found");
    }
    return updated;
  }

  static async deleteUser(id: string, currentUserId: string) {
    if (id === currentUserId) {
      throw new Error("You cannot delete your own account");
    }

    const success = await UserRepository.delete(id);
    if (!success) {
      throw new Error("User not found");
    }
    return success;
  }
}
