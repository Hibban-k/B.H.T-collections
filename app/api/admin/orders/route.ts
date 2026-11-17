import { NextResponse } from "next/server";
import { OrderService } from "@/lib/services/order.service";
import { withAuth } from "@/lib/api/helpers";

export const GET = withAuth("orders:read", async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const orders = await OrderService.getOrders({
    status: searchParams.get("status") || undefined,
    search: searchParams.get("search") || undefined,
  });
  return NextResponse.json({ orders });
});

export const POST = withAuth("orders:write", async (req: Request) => {
  try {
    const body = await req.json();
    const order = await OrderService.createOrder(body);
    return NextResponse.json({ order }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to create order" },
      { status: 400 }
    );
  }
});
