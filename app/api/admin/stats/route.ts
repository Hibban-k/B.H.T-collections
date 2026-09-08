import { NextResponse } from "next/server";
import { DashboardService } from "@/lib/services/dashboard.service";
import { withAuth } from "@/lib/api/helpers";

export const GET = withAuth("dashboard:read", async () => {
  const stats = await DashboardService.getStats();
  return NextResponse.json(stats);
});
