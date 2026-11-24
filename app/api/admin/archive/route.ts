import { NextResponse } from "next/server";
import { ArchiveService } from "@/lib/services/archive.service";
import { withAuth } from "@/lib/api/helpers";

/**
 * Admin route to trigger automated archiving of closed inquiries
 * and cancelled orders older than 12 months.
 */
export const POST = withAuth("orders:write", async (req: Request) => {
  try {
    let body: { threshold?: number; force?: boolean; retentionDays?: number } = {};
    try {
      body = await req.json();
    } catch {
      // Body is optional
    }

    const result = await ArchiveService.archiveOldRecords({
      threshold: body.threshold,
      force: body.force,
      retentionDays: body.retentionDays,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[AdminArchiveRoute] Archiving failed:", error);
    return NextResponse.json(
      { error: (error instanceof Error ? error.message : "Unexpected error") || "Failed to execute database archive" },
      { status: 500 }
    );
  }
});
