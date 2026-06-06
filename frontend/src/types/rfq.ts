export type RFQStatus = "DRAFT" | "SENT";

export interface RFQ {
  id: number;
  title: string;
  description: string;
  quantity: string;
  deadline: string;
  vendor: number;
  vendor_name?: string;
  status: RFQStatus;
  created_by?: number;
  created_at: string;
  updated_at: string;
}

export const RFQ_STATUS_LABEL: Record<RFQStatus, string> = {
  DRAFT: "Draft",
  SENT: "Sent",
};
