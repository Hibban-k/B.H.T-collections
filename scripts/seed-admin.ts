/**
 * Seed script to create the initial super_admin user.
 * 
 * Usage:
 *   npx tsx scripts/seed-admin.ts
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

// Auto-load .env.local if MONGODB_URI is not set in environment
if (!process.env.MONGODB_URI) {
  for (const envFile of [".env.local", ".env"]) {
    const envPath = path.join(process.cwd(), envFile);
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      content.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#")) {
          const idx = trimmed.indexOf("=");
          if (idx !== -1) {
            const key = trimmed.slice(0, idx).trim();
            const val = trimmed.slice(idx + 1).trim();
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      });
      break;
    }
  }
}

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@blankethouse.ae";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123456";
const ADMIN_NAME = process.env.ADMIN_NAME || "Super Admin";

async function seed() {
  if (!MONGODB_URI) {
    console.error("ERROR: MONGODB_URI environment variable is required.");
    process.exit(1);
  }

  console.log("Connecting to MongoDB...");
  const { connectToDatabase } = await import("../lib/db/mongodb");
  await connectToDatabase();
  console.log("Connected.");

  const UserSchema = new mongoose.Schema(
    {
      email: { type: String, required: true, unique: true, lowercase: true, trim: true },
      hashedPassword: { type: String, required: true },
      name: { type: String, required: true, trim: true },
      role: {
        type: String,
        enum: ["super_admin", "admin", "editor", "viewer"],
        default: "viewer",
      },
      isActive: { type: Boolean, default: true },
      lastLogin: { type: Date, default: null },
    },
    { timestamps: true }
  );

  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  const email = ADMIN_EMAIL.trim().toLowerCase();
  const existing = await User.findOne({ email });

  if (existing) {
    console.log(`User '${email}' already exists with role '${existing.role}'.`);
    console.log("Updating to super_admin role and password...");
    existing.role = "super_admin";
    existing.hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
    existing.isActive = true;
    await existing.save();
    console.log("Updated successfully.");
  } else {
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await User.create({
      email,
      hashedPassword,
      name: ADMIN_NAME,
      role: "super_admin",
      isActive: true,
    });
    console.log(`Created super_admin user: ${email}`);
  }

  await mongoose.disconnect();
  console.log("Done. Disconnected from MongoDB.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
