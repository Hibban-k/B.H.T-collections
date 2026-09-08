import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { assertPermission, ForbiddenError, UnauthorizedError } from "@/lib/auth/rbac";
import type { Role, Permission } from "@/lib/auth/rbac";

type RouteHandler = (
  req: Request,
  context: any
) => Promise<NextResponse> | NextResponse;

export function withAuth(permission: Permission, handler: RouteHandler): RouteHandler {
  return async (req: Request, context: any) => {
    try {
      const session = await auth();
      if (!session?.user) throw new UnauthorizedError();
      
      assertPermission(session.user.role as Role, permission);
      
      return await handler(req, context);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
      if (error instanceof ForbiddenError) {
        return NextResponse.json({ error: error.message }, { status: 403 });
      }
      const msg = error instanceof Error ? error.message : "Internal Server Error";
      // Map validation errors to 400 Bad Request
      if (msg.toLowerCase().includes("invalid") || msg.toLowerCase().includes("required") || msg.toLowerCase().includes("cannot")) {
        return NextResponse.json({ error: msg }, { status: 400 });
      }
      if (msg.toLowerCase().includes("not found")) {
        return NextResponse.json({ error: msg }, { status: 404 });
      }
      if (msg.toLowerCase().includes("already exists")) {
        return NextResponse.json({ error: msg }, { status: 409 });
      }
      return NextResponse.json({ error: msg }, { status: 500 });
    }
  };
}
