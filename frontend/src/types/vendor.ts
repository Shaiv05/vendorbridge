export type VendorStatus = "ACTIVE" | "INACTIVE" | "BLACKLISTED";

export interface Vendor {
  id: number;
  vendor_name: string;
  category: string;
  gst_number: string;
  email: string;
  phone: string;
  address: string;
  status: VendorStatus;
  created_at: string;
  updated_at: string;
}

export const VENDOR_STATUS_LABEL: Record<VendorStatus, string> = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  BLACKLISTED: "Blacklisted",
};
