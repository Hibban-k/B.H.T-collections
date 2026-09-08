import { NextResponse } from "next/server";
import { OrderService } from "@/lib/services/order.service";
import { withAuth } from "@/lib/api/helpers";

export const PATCH = withAuth("orders:write", async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { orderStatus } = await req.json();
  const updated = await OrderService.updateOrderStatus(id, orderStatus);
  if (!updated) throw new Error("Order not found");
  return NextResponse.json({ success: true, order: updated });
});
