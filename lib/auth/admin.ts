import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@blankethouse.ae";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123456";
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "bht_collections_luxury_secret_key_2026";
const COOKIE_NAME = "bht_admin_token";

export interface AdminPayload {
  email: string;
  role: "admin";
  iat?: number;
  exp?: number;
}

export function verifyAdminCredentials(email: string, pass: string): boolean {
  if (!email || !pass) return false;
  return (
    email.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase() &&
    pass === ADMIN_PASSWORD
  );
}

export function signAdminToken(email: string): string {
  return jwt.sign({ email, role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminPayload;
    if (decoded && decoded.role === "admin") {
      return decoded;
    }
    return null;
  } catch {
    return null;
  }
}

export async function getAuthenticatedAdmin(): Promise<AdminPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export { COOKIE_NAME };
