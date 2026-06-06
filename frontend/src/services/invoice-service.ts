import { api } from "./api";

export interface Invoice {
  id: number;
  invoice_number: string;
  purchase_order: number;
  po_number: string;
  vendor: number;
  vendor_name: string;
  amount: string;
  due_date: string;
  status: "PENDING" | "PAID" | "OVERDUE" | "CANCELLED";
  notes: string;
}

export const invoiceService = {
  getAll: () => api.get<Invoice[]>("/invoices/"),
  getById: (id: number) => api.get<Invoice>(`/invoices/${id}/`),
  create: (data: Omit<Invoice, "id" | "invoice_number" | "status">) => api.post<Invoice>("/invoices/", data),
  update: (id: number, data: Partial<Invoice>) => api.patch<Invoice>(`/invoices/${id}/`, data),
};
