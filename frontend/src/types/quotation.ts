export type QuotationStatus = "DRAFT" | "SUBMITTED" | "REJECTED" | "ACCEPTED";

export interface Quotation {
  id: number;
  rfq: number;
  rfq_title?: string;
  vendor: number;
  vendor_name?: string;
  price: string;
  delivery_days: number;
  notes: string;
  status: QuotationStatus;
  submitted_at: string;
  updated_at: string;
  
  // Computed fields from comparison API
  is_lowest_price?: boolean;
  is_fastest_delivery?: boolean;
}

export const QUOTATION_STATUS_LABEL: Record<QuotationStatus, string> = {
  DRAFT: "Draft",
  SUBMITTED: "Submitted",
  REJECTED: "Rejected",
  ACCEPTED: "Accepted",
};
