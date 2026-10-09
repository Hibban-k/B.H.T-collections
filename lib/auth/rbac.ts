export const ROLES = ["super_admin", "admin", "editor", "viewer"] as const;
export type Role = (typeof ROLES)[number];

export type Permission =
  | "products:read"
  | "products:write"
  | "brands:read"
  | "brands:write"
  | "categories:read"
  | "categories:write"
  | "orders:read"
  | "orders:write"
  | "users:manage"
  | "dashboard:read"
  | "upload:write";

const PERMISSION_MAP: Record<Permission, readonly Role[]> = {
  "products:read": ["super_admin", "admin", "editor", "viewer"],
  "products:write": ["super_admin", "admin", "editor"],
  "brands:read": ["super_admin", "admin", "editor", "viewer"],
  "brands:write": ["super_admin", "admin", "editor"],
  "categories:read": ["super_admin", "admin", "editor", "viewer"],
  "categories:write": ["super_admin", "admin", "editor"],
  "orders:read": ["super_admin", "admin"],
  "orders:write": ["super_admin", "admin"],
  "users:manage": ["super_admin"],
  "dashboard:read": ["super_admin", "admin", "editor", "viewer"],
  "upload:write": ["super_admin", "admin", "editor"],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  const allowedRoles = PERMISSION_MAP[permission];
  return allowedRoles.includes(role);
}

export function assertPermission(role: Role | undefined | null, permission: Permission): void {
  if (!role || !hasPermission(role, permission)) {
    throw new ForbiddenError(`Role '${role || "none"}' lacks permission '${permission}'`);
  }
}

export class ForbiddenError extends Error {
  public readonly statusCode = 403;
  constructor(message: string = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export class UnauthorizedError extends Error {
  public readonly statusCode = 401;
  constructor(message: string = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}
