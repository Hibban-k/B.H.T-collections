import fs from "fs/promises";
import path from "path";
import { connectToDatabase } from "@/lib/db/mongodb";
import { InquiryModel } from "@/lib/db/models/Inquiry";
import { OrderModel } from "@/lib/db/models/Order";

export interface ArchiveOptions {
  /**
   * Minimum count of total records in a collection before auto-archiving is triggered.
   * Defaults to 10,000 per the database retention policy.
   */
  threshold?: number;
  /**
   * If true, runs archiving regardless of the 10,000 document threshold.
   */
  force?: boolean;
  /**
   * Age in days for records to be considered eligible for archiving.
   * Defaults to 365 (12 months).
   */
  retentionDays?: number;
  /**
   * Output directory for static JSON backup files.
   */
  outputDir?: string;
}

export interface ArchiveResult {
  timestamp: string;
  totalInquiriesBefore: number;
  totalOrdersBefore: number;
  inquiriesArchived: number;
  ordersArchived: number;
  backupFiles: string[];
  skippedReason?: string;
  status: "archived" | "skipped" | "no_eligible_records";
}

export class ArchiveService {
  static async archiveOldRecords(options: ArchiveOptions = {}): Promise<ArchiveResult> {
    await connectToDatabase();

    const threshold = options.threshold ?? 10000;
    const force = options.force ?? false;
    const retentionDays = options.retentionDays ?? 365;
    const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);
    const nowIso = new Date().toISOString();
    const timestamp = nowIso.replace(/[:.]/g, "-");

    const totalInquiries = await InquiryModel.countDocuments();
    const totalOrders = await OrderModel.countDocuments();

    // Check if either collection meets the 10,000 record threshold or force mode is requested
    const exceedsThreshold = totalInquiries >= threshold || totalOrders >= threshold;
    if (!exceedsThreshold && !force) {
      return {
        timestamp: nowIso,
        totalInquiriesBefore: totalInquiries,
        totalOrdersBefore: totalOrders,
        inquiriesArchived: 0,
        ordersArchived: 0,
        backupFiles: [],
        skippedReason: `Collection sizes (inquiries: ${totalInquiries}, orders: ${totalOrders}) are below threshold (${threshold}) and force mode was not set.`,
        status: "skipped",
      };
    }

    const archiveDir = options.outputDir || path.join(process.cwd(), "backups", "archives");
    await fs.mkdir(archiveDir, { recursive: true });

    const backupFiles: string[] = [];
    let inquiriesArchived = 0;
    let ordersArchived = 0;

    // 1. Archive closed/archived inquiries older than 12 months
    const oldInquiries = await InquiryModel.find({
      status: "archived",
      createdAt: { $lt: cutoffDate },
    }).lean();

    if (oldInquiries.length > 0) {
      const inquiryBackupPath = path.join(archiveDir, `inquiries-archived-${timestamp}.json`);
      const payload = {
        metadata: {
          archivedAt: nowIso,
          recordCount: oldInquiries.length,
          retentionDays,
          cutoffDate: cutoffDate.toISOString(),
          collection: "inquiries",
          criteria: { status: "archived", olderThan: `${retentionDays} days` },
        },
        records: oldInquiries,
      };

      await fs.writeFile(inquiryBackupPath, JSON.stringify(payload, null, 2), "utf8");
      backupFiles.push(inquiryBackupPath);

      const inquiryIds = oldInquiries.map((doc) => doc._id);
      const delResult = await InquiryModel.deleteMany({ _id: { $in: inquiryIds } });
      inquiriesArchived = delResult.deletedCount || oldInquiries.length;
    }

    // 2. Archive cancelled orders older than 12 months
    const oldOrders = await OrderModel.find({
      orderStatus: { $in: [/^[Cc]ancelled$/] },
      createdAt: { $lt: cutoffDate },
    }).lean();

    if (oldOrders.length > 0) {
      const orderBackupPath = path.join(archiveDir, `orders-cancelled-${timestamp}.json`);
      const payload = {
        metadata: {
          archivedAt: nowIso,
          recordCount: oldOrders.length,
          retentionDays,
          cutoffDate: cutoffDate.toISOString(),
          collection: "orders",
          criteria: { orderStatus: "cancelled", olderThan: `${retentionDays} days` },
        },
        records: oldOrders,
      };

      await fs.writeFile(orderBackupPath, JSON.stringify(payload, null, 2), "utf8");
      backupFiles.push(orderBackupPath);

      const orderIds = oldOrders.map((doc) => doc._id);
      const delResult = await OrderModel.deleteMany({ _id: { $in: orderIds } });
      ordersArchived = delResult.deletedCount || oldOrders.length;
    }

    const hasArchived = inquiriesArchived > 0 || ordersArchived > 0;
    return {
      timestamp: nowIso,
      totalInquiriesBefore: totalInquiries,
      totalOrdersBefore: totalOrders,
      inquiriesArchived,
      ordersArchived,
      backupFiles,
      status: hasArchived ? "archived" : "no_eligible_records",
    };
  }
}
