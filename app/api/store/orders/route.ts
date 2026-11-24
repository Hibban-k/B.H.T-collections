import { NextResponse } from "next/server";
import { OrderService } from "@/lib/services/order.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, email, phone, shippingAddress, items, notes } = body;

    if (!customerName || !email || !phone) {
      return NextResponse.json(
        { error: "Customer name, email, and phone number are required." },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Order must contain at least one product." },
        { status: 400 }
      );
    }

    const order = await OrderService.createOrder({
      customerName,
      email,
      phone,
      shippingAddress,
      items,
      paymentStatus: "Cash on Delivery",
      orderStatus: "Pending",
      notes,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully. Our logistics team will contact you to confirm delivery.",
        orderNumber: order.orderNumber,
        orderId: order._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API Store Orders POST] Error:", error);
    return NextResponse.json(
      { error: (error instanceof Error ? error.message : "Unexpected error") || "Failed to process order. Please try again." },
      { status: 500 }
    );
  }
}
