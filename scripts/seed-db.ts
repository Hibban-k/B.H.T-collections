/**
 * Complete Database Seeder for B.H.T. Collections
 * Seeds Admin User, Categories, Products, and Sample Orders into MongoDB Atlas.
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

// Auto-load .env.local
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

async function main() {
  if (!MONGODB_URI) {
    console.error("ERROR: MONGODB_URI environment variable is required.");
    process.exit(1);
  }

  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected successfully.");

  const db = mongoose.connection.db;
  if (!db) {
    throw new Error("Failed to get MongoDB database instance.");
  }

  // 1. Seed Super Admin User
  const usersCol = db.collection("users");
  const existingAdmin = await usersCol.findOne({ email: ADMIN_EMAIL.trim().toLowerCase() });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await usersCol.insertOne({
      email: ADMIN_EMAIL.trim().toLowerCase(),
      hashedPassword,
      name: ADMIN_NAME,
      role: "super_admin",
      isActive: true,
      lastLogin: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(`[+] Created super_admin user: ${ADMIN_EMAIL}`);
  } else {
    console.log(`[i] super_admin user already exists: ${ADMIN_EMAIL}`);
  }

  // 2. Load and Seed Initial Catalog from data/store.json if collections are empty
  const storePath = path.join(process.cwd(), "data", "store.json");
  if (fs.existsSync(storePath)) {
    const store = JSON.parse(fs.readFileSync(storePath, "utf-8"));

    // Categories
    const categoriesCol = db.collection("categories");
    const catCount = await categoriesCol.countDocuments();
    if (catCount === 0 && store.categories?.length > 0) {
      const catsToInsert = store.categories.map((c: any) => {
        const { _id, ...rest } = c;
        return {
          ...rest,
          createdAt: new Date(c.createdAt || Date.now()),
          updatedAt: new Date(c.updatedAt || Date.now()),
        };
      });
      await categoriesCol.insertMany(catsToInsert);
      console.log(`[+] Seeded ${catsToInsert.length} categories`);
    } else {
      console.log(`[i] Categories collection has ${catCount} records`);
    }

    // Products
    const productsCol = db.collection("products");
    const prodCount = await productsCol.countDocuments();
    if (prodCount === 0 && store.products?.length > 0) {
      const prodsToInsert = store.products.map((p: any) => {
        const { _id, ...rest } = p;
        return {
          ...rest,
          createdAt: new Date(p.createdAt || Date.now()),
          updatedAt: new Date(p.updatedAt || Date.now()),
        };
      });
      await productsCol.insertMany(prodsToInsert);
      console.log(`[+] Seeded ${prodsToInsert.length} products`);
    } else {
      console.log(`[i] Products collection has ${prodCount} records`);
    }

    // Orders
    const ordersCol = db.collection("orders");
    const orderCount = await ordersCol.countDocuments();
    if (orderCount === 0 && store.orders?.length > 0) {
      const ordersToInsert = store.orders.map((o: any) => {
        const { _id, ...rest } = o;
        return {
          ...rest,
          createdAt: new Date(o.createdAt || Date.now()),
          updatedAt: new Date(o.updatedAt || Date.now()),
        };
      });
      await ordersCol.insertMany(ordersToInsert);
      console.log(`[+] Seeded ${ordersToInsert.length} orders`);
    } else {
      console.log(`[i] Orders collection has ${orderCount} records`);
    }
  }

  await mongoose.disconnect();
  console.log("Database initialization & seeding complete!");
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
