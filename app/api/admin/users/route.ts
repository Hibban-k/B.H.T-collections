import { NextResponse } from "next/server";
import { UserService } from "@/lib/services/user.service";
import { withAuth } from "@/lib/api/helpers";

export const GET = withAuth("users:manage", async () => {
  const users = await UserService.getUsers();
  return NextResponse.json({ users });
});

export const POST = withAuth("users:manage", async (req: Request) => {
  const body = await req.json();
  const user = await UserService.createUser(body);
  return NextResponse.json({ success: true, user }, { status: 201 });
});
