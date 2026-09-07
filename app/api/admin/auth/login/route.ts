import { NextResponse } from "next/server";
import { verifyAdminCredentials, signAdminToken, COOKIE_NAME } from "@/lib/auth/admin";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!verifyAdminCredentials(email, password)) {
      return NextResponse.json(
        { error: "Invalid admin email or password" },
        { status: 401 }
      );
    }

    const token = signAdminToken(email.trim().toLowerCase());
    const response = NextResponse.json({
      success: true,
      message: "Admin authenticated successfully",
      admin: { email: email.trim().toLowerCase(), role: "admin" },
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
