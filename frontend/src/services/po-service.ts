import { api } from "./api";

export interface PurchaseOrder {
  id: number;
  po_number: string;
  vendor: number;
  vendor_name: string;
  rfq: number;
  rfq_title: string;
  quotation: number;
  amount: string;
  issue_date: string;
  delivery_date: string;
  status: "DRAFT" | "ISSUED" | "ACCEPTED" | "DELIVERED" | "CLOSED";
  notes: string;
}

export const poService = {
  getAll: () => api.get<PurchaseOrder[]>("/purchase-orders/"),
  getById: (id: number) => api.get<PurchaseOrder>(`/purchase-orders/${id}/`),
  create: (data: Omit<PurchaseOrder, "id" | "po_number" | "issue_date" | "status">) => api.post<PurchaseOrder>("/purchase-orders/", data),
  update: (id: number, data: Partial<PurchaseOrder>) => api.patch<PurchaseOrder>(`/purchase-orders/${id}/`, data),
  downloadPdf: (id: number) => api.get(`/purchase-orders/${id}/download_pdf/`, { responseType: 'blob' }),
};
