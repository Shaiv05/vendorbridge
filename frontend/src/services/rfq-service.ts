import { api } from "./api";
import type { RFQ } from "@/types/rfq";

export const rfqService = {
  getAll: () => api.get<RFQ[]>("/rfqs/"),
  getById: (id: number) => api.get<RFQ>(`/rfqs/${id}/`),
  create: (data: Omit<RFQ, "id" | "created_at" | "updated_at">) => api.post<RFQ>("/rfqs/", data),
  update: (id: number, data: Partial<RFQ>) => api.patch<RFQ>(`/rfqs/${id}/`, data),
  delete: (id: number) => api.delete(`/rfqs/${id}/`),
};
