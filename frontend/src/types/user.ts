export type Role = "ADMIN" | "PROCUREMENT_OFFICER" | "MANAGER" | "VENDOR";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: Role;
  is_active: boolean;
  created_at: string;
}

export const ROLE_LABEL: Record<Role, string> = {
  ADMIN: "Admin",
  PROCUREMENT_OFFICER: "Procurement Officer",
  MANAGER: "Manager",
  VENDOR: "Vendor",
};
