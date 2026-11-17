#!/usr/bin/env node

/**
 * Automated Archiving Script for Closed Inquiries and Cancelled Orders
 *
 * Retention Policy:
 * - Records older than 12 months (365 days)
 * - Inquiries with status "archived"
 * - Orders with orderStatus "cancelled"
 * - Triggered automatically if collection exceeds 10,000 documents,
 *   or manually when invoked with `--force`.
 *
 * Usage:
 *   node scripts/archive-old-records.mjs
 *   node scripts/archive-old-records.mjs --force
 *   node scripts/archive-old-records.mjs --threshold 5000
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Load .env.local or .env
function loadEnv() {
  const envFiles = [".env.local", ".env"];
  for (const file of envFiles) {
    const fullPath = path.join(rootDir, file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  }
}

loadEnv();

const DIRECT_REPLICA_HOSTS =
  "ac-3ovvuug-shard-00-00.5mlznon.mongodb.net:27017,ac-3ovvuug-shard-00-01.5mlznon.mongodb.net:27017,ac-3ovvuug-shard-00-02.5mlznon.mongodb.net:27017";

function getResolvedMongoUri(rawUri) {
  if (!rawUri) return rawUri;
  if (rawUri.startsWith("mongodb+srv://") && rawUri.includes("bht-collections.5mlznon.mongodb.net")) {
    const authMatch = rawUri.match(/mongodb\+srv:\/\/([^:]+:[^@]+)@/);
    const auth = authMatch ? `${authMatch[1]}@` : "";
    return `mongodb://${auth}${DIRECT_REPLICA_HOSTS}/bht_collections?ssl=true&authSource=admin&replicaSet=atlas-9sme98-shard-0&retryWrites=true&w=majority`;
  }
  return rawUri;
}

async function run() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const thresholdIdx = args.indexOf("--threshold");
  const threshold = thresholdIdx !== -1 && args[thresholdIdx + 1] ? Number(args[thresholdIdx + 1]) : 10000;
  const retentionDays = 365;

  const rawUri = process.env.MONGODB_URI;
  if (!rawUri) {
    console.error("[ArchiveScript] Error: MONGODB_URI is not set in environment or .env.local.");
    process.exit(1);
  }

  const resolvedUri = getResolvedMongoUri(rawUri);
  console.log(`[ArchiveScript] Connecting to MongoDB Atlas...`);
  await mongoose.connect(resolvedUri, {
    serverSelectionTimeoutMS: 10000,
  });
  console.log(`[ArchiveScript] Connected successfully.`);

  const db = mongoose.connection.db;
  const inquiriesColl = db.collection("inquiries");
  const ordersColl = db.collection("orders");

  const totalInquiries = await inquiriesColl.countDocuments();
  const totalOrders = await ordersColl.countDocuments();

  console.log(`[ArchiveScript] Current collection counts:`);
  console.log(` - Inquiries: ${totalInquiries}`);
  console.log(` - Orders: ${totalOrders}`);
  console.log(` - Threshold: ${threshold} (Force mode: ${force})`);

  if (totalInquiries < threshold && totalOrders < threshold && !force) {
    console.log(`[ArchiveScript] Collections are under the ${threshold} record limit. No archiving needed.`);
    await mongoose.disconnect();
    process.exit(0);
  }

  const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);
  const nowIso = new Date().toISOString();
  const timestamp = nowIso.replace(/[:.]/g, "-");
  const archiveDir = path.join(rootDir, "backups", "archives");
  fs.mkdirSync(archiveDir, { recursive: true });

  console.log(`[ArchiveScript] Cutoff date for 12 months: ${cutoffDate.toISOString()}`);

  // 1. Archive closed inquiries
  const oldInquiries = await inquiriesColl
    .find({
      status: "archived",
      createdAt: { $lt: cutoffDate },
    })
    .toArray();

  if (oldInquiries.length > 0) {
    const backupFile = path.join(archiveDir, `inquiries-archived-${timestamp}.json`);
    const payload = {
      metadata: {
        archivedAt: nowIso,
        recordCount: oldInquiries.length,
        retentionDays,
        cutoffDate: cutoffDate.toISOString(),
        collection: "inquiries",
      },
      records: oldInquiries,
    };
    fs.writeFileSync(backupFile, JSON.stringify(payload, null, 2), "utf8");
    console.log(`[ArchiveScript] Saved ${oldInquiries.length} inquiries to ${backupFile}`);

    const ids = oldInquiries.map((d) => d._id);
    const delResult = await inquiriesColl.deleteMany({ _id: { $in: ids } });
    console.log(`[ArchiveScript] Removed ${delResult.deletedCount} archived inquiries from MongoDB.`);
  } else {
    console.log(`[ArchiveScript] No closed inquiries older than 12 months found.`);
  }

  // 2. Archive cancelled orders
  const oldOrders = await ordersColl
    .find({
      orderStatus: "cancelled",
      createdAt: { $lt: cutoffDate },
    })
    .toArray();

  if (oldOrders.length > 0) {
    const backupFile = path.join(archiveDir, `orders-cancelled-${timestamp}.json`);
    const payload = {
      metadata: {
        archivedAt: nowIso,
        recordCount: oldOrders.length,
        retentionDays,
        cutoffDate: cutoffDate.toISOString(),
        collection: "orders",
      },
      records: oldOrders,
    };
    fs.writeFileSync(backupFile, JSON.stringify(payload, null, 2), "utf8");
    console.log(`[ArchiveScript] Saved ${oldOrders.length} orders to ${backupFile}`);

    const ids = oldOrders.map((d) => d._id);
    const delResult = await ordersColl.deleteMany({ _id: { $in: ids } });
    console.log(`[ArchiveScript] Removed ${delResult.deletedCount} cancelled orders from MongoDB.`);
  } else {
    console.log(`[ArchiveScript] No cancelled orders older than 12 months found.`);
  }

  console.log(`[ArchiveScript] Archiving process complete.`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("[ArchiveScript] Fatal error during archiving:", err);
  process.exit(1);
});
