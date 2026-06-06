import { api } from "./api";
import type { Vendor } from "@/types/vendor";

export const vendorService = {
  getAll: () => api.get<Vendor[]>("/vendors/"),
  getById: (id: number) => api.get<Vendor>(`/vendors/${id}/`),
  create: (data: Omit<Vendor, "id" | "created_at" | "updated_at">) => api.post<Vendor>("/vendors/", data),
  update: (id: number, data: Partial<Vendor>) => api.patch<Vendor>(`/vendors/${id}/`, data),
  delete: (id: number) => api.delete(`/vendors/${id}/`),
};
