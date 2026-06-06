import { api } from "./api";
import type { Quotation } from "@/types/quotation";

export type QuotationCreatePayload = Omit<Quotation, "id" | "submitted_at" | "updated_at" | "vendor"> & Partial<Pick<Quotation, "vendor">>;

export const quotationService = {
  getAll: () => api.get<Quotation[]>("/quotations/"),
  getById: (id: number) => api.get<Quotation>(`/quotations/${id}/`),
  create: (data: QuotationCreatePayload) => api.post<Quotation>("/quotations/", data),
  update: (id: number, data: Partial<Quotation>) => api.patch<Quotation>(`/quotations/${id}/`, data),
  delete: (id: number) => api.delete(`/quotations/${id}/`),
  getComparison: (rfqId: number) => api.get<Quotation[]>(`/rfqs/${rfqId}/comparison/`),
};
