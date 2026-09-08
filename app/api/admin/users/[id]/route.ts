import { NextResponse } from "next/server";
import { UserService } from "@/lib/services/user.service";
import { withAuth } from "@/lib/api/helpers";
import { auth } from "@/lib/auth/auth";

export const PUT = withAuth("users:manage", async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const body = await req.json();
  const updated = await UserService.updateUser(id, body);
  return NextResponse.json({ success: true, user: updated });
});

export const DELETE = withAuth("users:manage", async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();
  
  const success = await UserService.deleteUser(id, session!.user!.id as string);
  return NextResponse.json({ success: true, message: "User deleted" });
});
